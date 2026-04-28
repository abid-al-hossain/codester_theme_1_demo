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
      var bg = normalizeHex(colors.bg, DEFAULTS.bg)
      var bg2 = normalizeHex(colors.bg2, DEFAULTS.bg2)
      var surface = normalizeHex(colors.surface, bg2)
      var primary = improveContrastAcross(normalizeHex(colors.primary, DEFAULTS.primary), [bg, bg2, surface], 4.5)
      var secondary = improveContrastAcross(normalizeHex(colors.secondary, DEFAULTS.secondary), [bg, bg2, surface], 3.5)
      var accent = improveContrastAcross(normalizeHex(colors.accent, DEFAULTS.accent), [bg, bg2, surface], 3.5)
      var text = improveContrastAcross(normalizeHex(colors.text, DEFAULTS.text), [bg, bg2, surface], 7)
      var dark = isDarkColor(bg)
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
