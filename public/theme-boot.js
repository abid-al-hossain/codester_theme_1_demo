(function () {
  var DEFAULTS = {
    primary: '#2563eb',
    secondary: '#14b8a6',
    accent: '#60a5fa',
    bg: '#fbfdff',
    bg2: '#f3f7fb',
    surface: '#f3f7fb',
    text: '#0f172a'
  }

  function setVar(name, value) {
    document.documentElement.style.setProperty('--' + name, value)
  }

  function normalizeHex(value, fallback) {
    var raw = String(value || '').trim()
    if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toLowerCase()
    if (/^#[0-9a-f]{3}$/i.test(raw)) {
      return '#' + raw[1] + raw[1] + raw[2] + raw[2] + raw[3] + raw[3]
    }
    return fallback
  }

  function hexToRgb(value, fallback) {
    var hex = normalizeHex(value, fallback)
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    }
  }

  function mixHex(base, target, weight) {
    var a = hexToRgb(base, base)
    var b = hexToRgb(target, target)
    return '#' + [
      a.r + ((b.r - a.r) * weight),
      a.g + ((b.g - a.g) * weight),
      a.b + ((b.b - a.b) * weight)
    ].map(function (channel) {
      return Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0')
    }).join('')
  }

  function withAlpha(color, alpha) {
    var rgb = hexToRgb(color, color)
    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + alpha + ')'
  }

  function isDarkColor(color) {
    var rgb = hexToRgb(color, color)
    return ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000 < 150
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
  }

  function wrapHue(hue) {
    return ((hue % 360) + 360) % 360
  }

  function hueDistance(a, b) {
    var distance = Math.abs(wrapHue(a) - wrapHue(b))
    return Math.min(distance, 360 - distance)
  }

  function hslToHex(h, s, l) {
    var hue = wrapHue(h)
    var sat = clamp(s, 0, 100) / 100
    var light = clamp(l, 0, 100) / 100
    var c = (1 - Math.abs((2 * light) - 1)) * sat
    var x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
    var m = light - (c / 2)
    var r = 0
    var g = 0
    var b = 0

    if (hue < 60) { r = c; g = x; b = 0 }
    else if (hue < 120) { r = x; g = c; b = 0 }
    else if (hue < 180) { r = 0; g = c; b = x }
    else if (hue < 240) { r = 0; g = x; b = c }
    else if (hue < 300) { r = x; g = 0; b = c }
    else { r = c; g = 0; b = x }

    return '#' + [r, g, b].map(function (channel) {
      return clamp(Math.round((channel + m) * 255), 0, 255).toString(16).padStart(2, '0')
    }).join('')
  }

  function hexToHsl(color) {
    var rgb = hexToRgb(color, color)
    var rr = rgb.r / 255
    var gg = rgb.g / 255
    var bb = rgb.b / 255
    var max = Math.max(rr, gg, bb)
    var min = Math.min(rr, gg, bb)
    var delta = max - min
    var h = 0

    if (delta !== 0) {
      if (max === rr) h = 60 * (((gg - bb) / delta) % 6)
      else if (max === gg) h = 60 * (((bb - rr) / delta) + 2)
      else h = 60 * (((rr - gg) / delta) + 4)
    }

    var light = (max + min) / 2
    var saturation = delta === 0 ? 0 : delta / (1 - Math.abs((2 * light) - 1))
    return { h: wrapHue(h), s: saturation * 100, l: light * 100 }
  }

  function tuneBackgroundTone(color, primary, darkTheme, limits) {
    var tone = hexToHsl(color)
    var primaryTone = hexToHsl(primary)
    var neutralRest = tone.s < 14
    var hue = !neutralRest && hueDistance(tone.h, primaryTone.h) < 24
      ? wrapHue(primaryTone.h + (darkTheme ? -56 : 56))
      : tone.h
    var saturation = neutralRest
      ? clamp(tone.s * 0.5, darkTheme ? 5 : 4, darkTheme ? 12 : 10)
      : clamp(tone.s * 0.42, darkTheme ? 7 : 5, darkTheme ? 22 : 18)
    var lightness = darkTheme
      ? clamp(tone.l, limits.darkMin, limits.darkMax)
      : clamp(tone.l, limits.lightMin, limits.lightMax)

    return hslToHex(hue, saturation, lightness)
  }

  function relativeLuminance(color) {
    var rgb = hexToRgb(color, color)

    function normalize(channel) {
      var value = channel / 255
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
    }

    var rr = normalize(rgb.r)
    var gg = normalize(rgb.g)
    var bb = normalize(rgb.b)
    return (0.2126 * rr) + (0.7152 * gg) + (0.0722 * bb)
  }

  function contrastRatio(colorA, colorB) {
    var l1 = relativeLuminance(colorA)
    var l2 = relativeLuminance(colorB)
    var lighter = Math.max(l1, l2)
    var darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  }

  function getReadableOnColor(background) {
    var whiteContrast = contrastRatio(background, '#ffffff')
    var darkContrast = contrastRatio(background, '#0b0b0b')
    return whiteContrast >= darkContrast ? '#ffffff' : '#0b0b0b'
  }

  function improveContrast(color, background, minRatio) {
    if (contrastRatio(color, background) >= minRatio) return color

    var target = isDarkColor(background) ? '#ffffff' : '#000000'
    var candidate = color

    for (var step = 1; step <= 10; step += 1) {
      candidate = mixHex(color, target, step * 0.1)
      if (contrastRatio(candidate, background) >= minRatio) return candidate
    }

    return target
  }

  function improveContrastAcross(color, backgrounds, minRatio) {
    var candidate = color

    for (var attempt = 0; attempt < 4; attempt += 1) {
      candidate = backgrounds.reduce(function (next, background) {
        return improveContrast(next, background, minRatio)
      }, candidate)

      if (backgrounds.every(function (background) {
        return contrastRatio(candidate, background) >= minRatio
      })) {
        return candidate
      }
    }

    return backgrounds.some(function (background) {
      return isDarkColor(background)
    }) ? '#ffffff' : '#0b0b0b'
  }

  function mixReadableText(text, background, weight, minRatio) {
    for (var step = weight; step >= 0; step -= 0.06) {
      var candidate = mixHex(text, background, step)
      if (contrastRatio(candidate, background) >= minRatio) return candidate
    }

    return improveContrast(text, background, minRatio)
  }

  function getCurrentPageKey() {
    return window.location.pathname.split('/').pop() || 'index.html'
  }

  function getPrefsScopeKey() {
    var parts = window.location.pathname.split('/').filter(Boolean)
    if (parts.length <= 1) return 'root'
    return parts.slice(0, -1).join('/').toLowerCase()
  }

  // NOTE: This key scheme is intentionally mirrored in src/customizer.js.
  // Update both files if the localStorage scope changes.
  function getPrefsKey() {
    var namespace = document.documentElement.getAttribute('data-prefs-key') || 'chronos-prefs-v3'
    return document.documentElement.hasAttribute('data-prefs-key')
      ? namespace
      : namespace + ':' + getPrefsScopeKey() + ':' + getCurrentPageKey()
  }

  try {
    var prefs = JSON.parse(localStorage.getItem(getPrefsKey()))
    var currentEra = document.documentElement.getAttribute('data-era')
    if (currentEra && !document.documentElement.hasAttribute('data-original-era')) {
      document.documentElement.setAttribute('data-original-era', currentEra)
    }

    if (!prefs) return

    if (prefs.era) {
      document.documentElement.setAttribute('data-era', prefs.era)
    }

    if (prefs.hasCustomFonts && prefs.fonts) {
      var families = Array.from(new Set(Object.keys(prefs.fonts).map(function (role) {
        return prefs.fonts[role]
      }).filter(Boolean)))

      if (families.length && !document.querySelector('link[data-chronos-preload-fonts="true"]')) {
        var link = document.createElement('link')
        link.rel = 'stylesheet'
        link.dataset.chronosPreloadFonts = 'true'
        link.href = 'https://fonts.googleapis.com/css2?display=swap&family=' + families.map(function (font) {
          return encodeURIComponent(font).replace(/%20/g, '+')
        }).join('&family=')
        document.head.appendChild(link)
      }

      Object.keys(prefs.fonts).forEach(function (role) {
        setVar('font-' + role, "'" + prefs.fonts[role] + "', sans-serif")
      })
    }

    if (prefs.hasCustomColors && prefs.colors) {
      var colors = Object.assign({}, DEFAULTS, prefs.colors, {
        surface: prefs.colors.surface || prefs.colors.bg2 || DEFAULTS.surface
      })
      var rawPrimary = normalizeHex(colors.primary, DEFAULTS.primary)
      var rawBg = normalizeHex(colors.bg, DEFAULTS.bg)
      var dark = isDarkColor(rawBg)
      var bg = tuneBackgroundTone(rawBg, rawPrimary, dark, { darkMin: 30, darkMax: 40, lightMin: 78, lightMax: 88 })
      var bg2 = tuneBackgroundTone(normalizeHex(colors.bg2, DEFAULTS.bg2), rawPrimary, dark, { darkMin: 38, darkMax: 48, lightMin: 70, lightMax: 80 })
      var surface = tuneBackgroundTone(normalizeHex(colors.surface, bg2), rawPrimary, dark, { darkMin: 42, darkMax: 54, lightMin: 74, lightMax: 86 })
      var primary = improveContrastAcross(rawPrimary, [bg, bg2, surface], 4.5)
      var secondary = improveContrastAcross(normalizeHex(colors.secondary, DEFAULTS.secondary), [bg, bg2, surface], 3.5)
      var accent = improveContrastAcross(normalizeHex(colors.accent, DEFAULTS.accent), [bg, bg2, surface], 3.5)
      var text = improveContrastAcross(normalizeHex(colors.text, DEFAULTS.text), [bg, bg2, surface], 7)
      var secondaryText = mixReadableText(text, bg, dark ? 0.16 : 0.22, 5.2)
      var tertiaryText = mixReadableText(text, bg, dark ? 0.32 : 0.42, 4.5)

      ;[
        ['color-bg', bg],
        ['color-bg-2', bg2],
        ['color-bg-3', mixHex(bg2, text, dark ? 0.08 : 0.06)],
        ['color-surface', withAlpha(surface, dark ? 0.82 : 0.78)],
        ['color-primary', primary],
        ['color-primary-2', mixHex(primary, dark ? '#ffffff' : '#000000', 0.12)],
        ['color-on-primary', getReadableOnColor(primary)],
        ['color-secondary', secondary],
        ['color-accent', accent],
        ['color-text', text],
        ['color-text-2', secondaryText],
        ['color-text-3', tertiaryText],
        ['color-border', mixHex(bg2, text, dark ? 0.22 : 0.14)],
        ['color-border-2', mixHex(bg2, primary, 0.28)],
        ['shadow-glow', '0 0 52px ' + withAlpha(primary, dark ? 0.32 : 0.2)]
      ].forEach(function (pair) {
        setVar(pair[0], pair[1])
      })
    }
  } catch (error) {}
})()
