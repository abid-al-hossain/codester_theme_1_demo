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

  function getCurrentPageKey() {
    return window.location.pathname.split('/').pop() || 'index.html'
  }

  function getPrefsKey() {
    var namespace = document.documentElement.getAttribute('data-prefs-key') || 'chronos-prefs-v3'
    return document.documentElement.hasAttribute('data-prefs-key')
      ? namespace
      : namespace + ':' + getCurrentPageKey()
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
      var primary = normalizeHex(colors.primary, DEFAULTS.primary)
      var secondary = normalizeHex(colors.secondary, DEFAULTS.secondary)
      var accent = normalizeHex(colors.accent, DEFAULTS.accent)
      var text = normalizeHex(colors.text, DEFAULTS.text)
      var dark = isDarkColor(bg)

      ;[
        ['color-bg', bg],
        ['color-bg-2', bg2],
        ['color-bg-3', mixHex(bg2, text, dark ? 0.08 : 0.06)],
        ['color-surface', withAlpha(surface, dark ? 0.82 : 0.78)],
        ['color-primary', primary],
        ['color-primary-2', mixHex(primary, dark ? '#ffffff' : '#000000', 0.12)],
        ['color-secondary', secondary],
        ['color-accent', accent],
        ['color-text', text],
        ['color-text-2', mixHex(text, bg, dark ? 0.16 : 0.22)],
        ['color-text-3', mixHex(text, bg, dark ? 0.32 : 0.42)],
        ['color-border', mixHex(bg2, text, dark ? 0.22 : 0.14)],
        ['color-border-2', mixHex(bg2, primary, 0.28)]
      ].forEach(function (pair) {
        setVar(pair[0], pair[1])
      })
    }
  } catch (error) {}
})()
