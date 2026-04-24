import Alpine from 'alpinejs'
import { FONTS, loadGoogleFont, ERA_DEFAULT_FONTS } from './fonts.js'
import { CUSTOMIZER_HTML } from './customizer-html.js'
import { sanitizePackageName, sanitizeArchiveName } from './package-name-utils.js'

const PALETTES = {
  electric:  { primary: '#2563ff', secondary: '#0ea5e9', accent: '#7dd3fc', bg: '#f4f8ff', bg2: '#e8f0ff', text: '#0b1735' },
  sunset:    { primary: '#f97316', secondary: '#dc2626', accent: '#fbbf24', bg: '#1b0f0a', bg2: '#2a160f', text: '#fff4ea' },
  forest:    { primary: '#15803d', secondary: '#166534', accent: '#86efac', bg: '#effaf1', bg2: '#dff3e4', text: '#163622' },
  lavender:  { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ddd6fe', bg: '#faf7ff', bg2: '#f1ebff', text: '#4c1d95' },
  rose:      { primary: '#e11d48', secondary: '#be185d', accent: '#fda4af', bg: '#fff1f2', bg2: '#ffe4e6', text: '#4c0519' },
  midnight:  { primary: '#3b82f6', secondary: '#6366f1', accent: '#93c5fd', bg: '#020617', bg2: '#0b1120', text: '#dbeafe' },
  ocean:     { primary: '#0284c7', secondary: '#0f766e', accent: '#67e8f9', bg: '#ecfeff', bg2: '#d7f4fb', text: '#083344' },
  ember:     { primary: '#fb923c', secondary: '#f97316', accent: '#fdba74', bg: '#1f130f', bg2: '#2b1d16', text: '#fff7ed' },
  mint:      { primary: '#14b8a6', secondary: '#10b981', accent: '#99f6e4', bg: '#f0fdfa', bg2: '#ccfbf1', text: '#134e4a' },
  grayscale: { primary: '#475569', secondary: '#334155', accent: '#94a3b8', bg: '#f8fafc', bg2: '#f1f5f9', text: '#0f172a' },
  obsidian:  { primary: '#cbd5e1', secondary: '#475569', accent: '#93c5fd', bg: '#020202', bg2: '#0b0b0f', text: '#e5e7eb' },
  gold:      { primary: '#ca8a04', secondary: '#a16207', accent: '#facc15', bg: '#fff8e1', bg2: '#fef3c7', text: '#422006' },
  toxic:     { primary: '#a3e635', secondary: '#65a30d', accent: '#d9f99d', bg: '#0a1200', bg2: '#132500', text: '#f7fee7' },
  bubblegum: { primary: '#f472b6', secondary: '#ec4899', accent: '#f9a8d4', bg: '#fff1f8', bg2: '#ffe4f1', text: '#6b2148' },
  clay:      { primary: '#b4533d', secondary: '#92400e', accent: '#e7a98d', bg: '#f8ede3', bg2: '#ecd7c3', text: '#4b2e2b' },
  abyss:     { primary: '#0891b2', secondary: '#1d4ed8', accent: '#67e8f9', bg: '#020617', bg2: '#071329', text: '#c4f1ff' },
}

const DEFAULT_COLORS = {
  primary: '#2563eb',
  secondary: '#14b8a6',
  accent: '#60a5fa',
  bg: '#fbfdff',
  bg2: '#f3f7fb',
  surface: '#f3f7fb',
  text: '#0f172a',
}

const PALETTE_OPTIONS = [
  { id: 'electric', label: 'Electric', mode: 'Bright' },
  { id: 'sunset', label: 'Sunset', mode: 'Warm' },
  { id: 'forest', label: 'Forest', mode: 'Organic' },
  { id: 'lavender', label: 'Lavender', mode: 'Soft' },
  { id: 'rose', label: 'Rose', mode: 'Editorial' },
  { id: 'midnight', label: 'Midnight', mode: 'Dark' },
  { id: 'ocean', label: 'Ocean', mode: 'Fresh' },
  { id: 'ember', label: 'Ember', mode: 'Dark' },
  { id: 'mint', label: 'Mint', mode: 'Clean' },
  { id: 'grayscale', label: 'Grayscale', mode: 'Neutral' },
  { id: 'obsidian', label: 'Obsidian', mode: 'Dark' },
  { id: 'gold', label: 'Gold', mode: 'Classic' },
  { id: 'toxic', label: 'Toxic', mode: 'Acid' },
  { id: 'bubblegum', label: 'Bubblegum', mode: 'Pop' },
  { id: 'clay', label: 'Clay', mode: 'Earth' },
  { id: 'abyss', label: 'Abyss', mode: 'Deep' },
].map((option) => ({
  ...option,
  colors: {
    ...PALETTES[option.id],
    surface: PALETTES[option.id].bg2,
  },
}))

const CUSTOM_COLOR_VARS = [
  'color-bg',
  'color-bg-2',
  'color-bg-3',
  'color-surface',
  'color-primary',
  'color-primary-2',
  'color-secondary',
  'color-accent',
  'color-text',
  'color-text-2',
  'color-text-3',
  'color-border',
  'color-border-2',
]

const PREFS_NAMESPACE = document.documentElement.getAttribute('data-prefs-key') || 'chronos-prefs-v3'
// CUSTOMIZER_ENABLED_START
const CUSTOMIZER_ENABLED = true
// CUSTOMIZER_ENABLED_END
const DEFAULT_FONTS = {
  heading: 'Plus Jakarta Sans',
  body: 'Inter',
  mono: 'JetBrains Mono',
  accent: 'Space Grotesk',
}

const FONT_ROLE_OPTIONS = [
  { id: 'heading', label: 'Heading' },
  { id: 'body', label: 'Body' },
  { id: 'accent', label: 'Accent / Display' },
  { id: 'mono', label: 'Monospace' },
]

const COLOR_ROLE_OPTIONS = [
  { id: 'primary', label: 'Primary' },
  { id: 'secondary', label: 'Secondary' },
  { id: 'accent', label: 'Accent' },
  { id: 'bg', label: 'Background' },
  { id: 'bg2', label: 'Section' },
  { id: 'surface', label: 'Surface' },
  { id: 'text', label: 'Text' },
]

// EXPORT_DEFAULT_THEME_START
// Wait for document to be parsed ideally, but since this module runs after HTML load, document elements exist
const initialEra = document.documentElement.getAttribute('data-original-era') || document.documentElement.getAttribute('data-era') || 'modern'

const DEFAULT_THEME = {
  era: initialEra,
  fonts: { ...DEFAULT_FONTS },
  colors: { ...DEFAULT_COLORS },
  hasCustomFonts: false,
  hasCustomColors: false,
  activePalette: '',
}
// EXPORT_DEFAULT_THEME_END

// DOWNLOAD_FEATURE_START
const DOWNLOAD_LAYOUT_OPTIONS = [
  { file: 'layout-01.html', short: 'L01', label: 'Modern SaaS Landing' },
  { file: 'layout-02.html', short: 'L02', label: 'Creative Portfolio' },
  { file: 'layout-03.html', short: 'L03', label: 'Editorial Feed' },
  { file: 'layout-04.html', short: 'L04', label: 'Text Manuscript' },
  { file: 'layout-05.html', short: 'L05', label: 'Web App Dashboard' },
  { file: 'layout-06.html', short: 'L06', label: 'Artistic Showcase' },
  { file: 'layout-07.html', short: 'L07', label: 'Futuristic Launch' },
  { file: 'layout-08.html', short: 'L08', label: 'Minimal Journal' },
  { file: 'layout-09.html', short: 'L09', label: 'Cyberpunk Agency' },
  { file: 'layout-10.html', short: 'L10', label: 'Gothic Archive' },
  { file: 'layout-11.html', short: 'L11', label: 'Enterprise Business' },
  { file: 'layout-12.html', short: 'L12', label: 'Medical Care' },
  { file: 'layout-13.html', short: 'L13', label: 'Education Campus' },
  { file: 'layout-14.html', short: 'L14', label: 'Travel Explorer' },
  { file: 'layout-15.html', short: 'L15', label: 'Social Community' },
  { file: 'layout-16.html', short: 'L16', label: 'Jurassic Museum' },
  { file: 'layout-17.html', short: 'L17', label: 'Pixelated Desktop' },
  { file: 'layout-18.html', short: 'L18', label: 'Glacier Expeditions' },
  { file: 'layout-19.html', short: 'L19', label: 'Geothermic Console' },
  { file: 'layout-20.html', short: 'L20', label: 'The Grand Library' },
]

function getCurrentLayoutFile() {
  const current = window.location.pathname.split('/').pop()?.toLowerCase() || ''
  return DOWNLOAD_LAYOUT_OPTIONS.some((option) => option.file === current) ? current : ''
}

function getLayoutMeta(layoutFile) {
  return DOWNLOAD_LAYOUT_OPTIONS.find((option) => option.file === layoutFile) || null
}

const DOWNLOAD_ENABLED = document.documentElement.getAttribute('data-download-enabled') !== 'false'
// DOWNLOAD_FEATURE_END

function setVar(name, value) {
  document.documentElement.style.setProperty(`--${name}`, value)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalizeHex(value, fallback = '#000000') {
  const raw = String(value || '').trim()
  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toLowerCase()
  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    const [, a, b, c] = raw
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase()
  }
  return fallback
}

function hexToRgb(value) {
  const hex = normalizeHex(value)
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  }
}

function rgbToHex({ r, g, b }) {
  const toHex = (channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function getReadableOnColor(background) {
  const whiteContrast = contrastRatio(background, '#ffffff')
  const darkContrast = contrastRatio(background, '#0b0b0b')
  return whiteContrast >= darkContrast ? '#ffffff' : '#0b0b0b'
}

function hslToHex(h, s, l) {
  const hue = ((h % 360) + 360) % 360
  const sat = clamp(s, 0, 100) / 100
  const light = clamp(l, 0, 100) / 100
  const c = (1 - Math.abs((2 * light) - 1)) * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = light - (c / 2)

  let r = 0
  let g = 0
  let b = 0

  if (hue < 60) [r, g, b] = [c, x, 0]
  else if (hue < 120) [r, g, b] = [x, c, 0]
  else if (hue < 180) [r, g, b] = [0, c, x]
  else if (hue < 240) [r, g, b] = [0, x, c]
  else if (hue < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  return rgbToHex({
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
  })
}

function relativeLuminance(color) {
  const { r, g, b } = hexToRgb(color)
  const normalize = (channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }

  const rr = normalize(r)
  const gg = normalize(g)
  const bb = normalize(b)

  return (0.2126 * rr) + (0.7152 * gg) + (0.0722 * bb)
}

function contrastRatio(colorA, colorB) {
  const l1 = relativeLuminance(colorA)
  const l2 = relativeLuminance(colorB)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function randomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min
}

function generateSurpriseColors() {
  const darkTheme = Math.random() < 0.5
  const baseHue = randomInt(0, 359)
  const primaryHue = baseHue
  const secondaryHue = (baseHue + randomInt(38, 112)) % 360
  const accentHue = (baseHue + randomInt(165, 245)) % 360

  const bg = darkTheme
    ? hslToHex(baseHue, randomInt(18, 34), randomInt(7, 12))
    : hslToHex(baseHue, randomInt(28, 58), randomInt(95, 98))
  const bg2 = darkTheme
    ? hslToHex(baseHue + randomInt(-12, 12), randomInt(18, 30), randomInt(12, 18))
    : hslToHex(baseHue + randomInt(-12, 12), randomInt(24, 46), randomInt(88, 94))
  const surface = darkTheme
    ? hslToHex(baseHue + randomInt(-8, 8), randomInt(16, 28), randomInt(16, 22))
    : hslToHex(baseHue + randomInt(-8, 8), randomInt(18, 40), randomInt(92, 97))

  const primary = darkTheme
    ? hslToHex(primaryHue, randomInt(72, 92), randomInt(58, 72))
    : hslToHex(primaryHue, randomInt(66, 90), randomInt(42, 56))
  const secondary = darkTheme
    ? hslToHex(secondaryHue, randomInt(58, 84), randomInt(54, 68))
    : hslToHex(secondaryHue, randomInt(52, 78), randomInt(36, 50))
  const accent = darkTheme
    ? hslToHex(accentHue, randomInt(72, 94), randomInt(72, 84))
    : hslToHex(accentHue, randomInt(70, 94), randomInt(58, 72))

  let text = darkTheme
    ? hslToHex(baseHue + randomInt(-10, 10), randomInt(14, 26), randomInt(91, 96))
    : hslToHex(baseHue + randomInt(-10, 10), randomInt(12, 24), randomInt(10, 18))

  if (
    contrastRatio(text, bg) < 5.5 ||
    contrastRatio(text, bg2) < 5 ||
    contrastRatio(text, surface) < 4.8
  ) {
    text = darkTheme ? '#f8f4ea' : '#101217'
  }

  return {
    primary,
    secondary,
    accent,
    bg,
    bg2,
    surface,
    text,
  }
}

function mixHex(base, target, weight) {
  const baseRgb = hexToRgb(base)
  const targetRgb = hexToRgb(target)
  const mix = clamp(weight, 0, 1)
  return rgbToHex({
    r: baseRgb.r + ((targetRgb.r - baseRgb.r) * mix),
    g: baseRgb.g + ((targetRgb.g - baseRgb.g) * mix),
    b: baseRgb.b + ((targetRgb.b - baseRgb.b) * mix),
  })
}

function withAlpha(color, alpha) {
  const { r, g, b } = hexToRgb(color)
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`
}

function isDarkColor(color) {
  const { r, g, b } = hexToRgb(color)
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return brightness < 150
}

function colorValueToHex(value, fallback) {
  const raw = String(value || '').trim()
  if (!raw) return fallback
  if (raw.startsWith('#')) return normalizeHex(raw, fallback)

  const match = raw.match(/rgba?\(([^)]+)\)/i)
  if (!match) return fallback

  const channels = match[1].split(',').slice(0, 3).map((channel) => Number.parseFloat(channel.trim()))
  if (channels.some((channel) => Number.isNaN(channel))) return fallback

  return rgbToHex({ r: channels[0], g: channels[1], b: channels[2] })
}

function buildDerivedColorTokens(colors) {
  const bg = normalizeHex(colors.bg, DEFAULT_COLORS.bg)
  const bg2 = normalizeHex(colors.bg2, DEFAULT_COLORS.bg2)
  const surface = normalizeHex(colors.surface || colors.bg2, bg2)
  const primary = normalizeHex(colors.primary, DEFAULT_COLORS.primary)
  const secondary = normalizeHex(colors.secondary, DEFAULT_COLORS.secondary)
  const accent = normalizeHex(colors.accent, DEFAULT_COLORS.accent)
  const text = normalizeHex(colors.text, DEFAULT_COLORS.text)
  const darkTheme = isDarkColor(bg)
  const shadeTarget = darkTheme ? '#ffffff' : '#000000'
  const secondaryTextMix = darkTheme ? 0.16 : 0.22
  const tertiaryTextMix = darkTheme ? 0.32 : 0.42

  return {
    'color-bg': bg,
    'color-bg-2': bg2,
    'color-bg-3': mixHex(bg2, text, darkTheme ? 0.08 : 0.06),
    'color-surface': withAlpha(surface, darkTheme ? 0.82 : 0.78),
    'color-primary': primary,
    'color-primary-2': mixHex(primary, shadeTarget, 0.12),
    'color-secondary': secondary,
    'color-accent': accent,
    'color-on-primary': getReadableOnColor(primary),
    'color-text': text,
    'color-text-2': mixHex(text, bg, secondaryTextMix),
    'color-text-3': mixHex(text, bg, tertiaryTextMix),
    'color-border': mixHex(bg2, text, darkTheme ? 0.22 : 0.14),
    'color-border-2': mixHex(bg2, primary, 0.28),
  }
}

function savePrefs(prefs) {
  if (!CUSTOMIZER_ENABLED) return
  try {
    localStorage.setItem(getPrefsKey(), JSON.stringify(prefs))
  } catch {}
}

function loadPrefs() {
  if (!CUSTOMIZER_ENABLED) return null
  try {
    const raw = localStorage.getItem(getPrefsKey())
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function getCurrentPageKey() {
  return window.location.pathname.split('/').pop()?.toLowerCase() || 'index.html'
}

function getPrefsScopeKey() {
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts.length <= 1) return 'root'
  return parts.slice(0, -1).join('/').toLowerCase()
}

function getPrefsKey() {
  return document.documentElement.hasAttribute('data-prefs-key')
    ? PREFS_NAMESPACE
    : `${PREFS_NAMESPACE}:${getPrefsScopeKey()}:${getCurrentPageKey()}`
}

function buildBootTheme(prefs) {
  const preset = cloneThemePreset(prefs || DEFAULT_THEME)
  const eraDefaults = ERA_DEFAULT_FONTS[preset.era] || DEFAULT_THEME.fonts

  return {
    era: preset.era,
    fonts: preset.hasCustomFonts ? { ...eraDefaults, ...preset.fonts } : { ...eraDefaults },
    colors: { ...DEFAULT_COLORS, ...preset.colors, surface: preset.colors.surface || preset.colors.bg2 || DEFAULT_COLORS.surface },
    hasCustomFonts: preset.hasCustomFonts,
    hasCustomColors: preset.hasCustomColors,
  }
}

function clearAllPrefs() {
  if (!CUSTOMIZER_ENABLED) return
  try {
    const keysToRemove = []
    const currentScopePrefix = document.documentElement.hasAttribute('data-prefs-key')
      ? PREFS_NAMESPACE
      : `${PREFS_NAMESPACE}:${getPrefsScopeKey()}:`
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (!key) continue
      if (key === currentScopePrefix || key.startsWith(currentScopePrefix)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
  } catch {}
}

function preloadFonts(fonts) {
  const families = [...new Set(Object.values(fonts || {}).filter(Boolean))]
  if (!families.length || document.querySelector('link[data-chronos-preload-fonts="true"]')) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.dataset.chronosPreloadFonts = 'true'
  link.href = `https://fonts.googleapis.com/css2?display=swap&family=${families.map((font) => encodeURIComponent(font).replace(/%20/g, '+')).join('&family=')}`
  document.head.appendChild(link)
}

function applyBootTheme(prefs) {
  const theme = buildBootTheme(prefs)
  document.documentElement.setAttribute('data-era', theme.era)

  if (prefs?.hasCustomFonts && theme.fonts) {
    preloadFonts(theme.fonts)
    Object.entries(theme.fonts).forEach(([role, font]) => {
      setVar(`font-${role}`, `'${font}', sans-serif`)
    })
  }

  if (prefs?.hasCustomColors && theme.colors) {
    const tokens = buildDerivedColorTokens(theme.colors)
    Object.entries(tokens).forEach(([token, value]) => {
      setVar(token, value)
    })
  } else {
    const primary = colorValueToHex(getComputedStyle(document.documentElement).getPropertyValue('--color-primary'), DEFAULT_COLORS.primary)
    setVar('color-on-primary', getReadableOnColor(primary))
  }
}

async function applyEra(era) {
  document.documentElement.setAttribute('data-era', era)
  const eraFonts = ERA_DEFAULT_FONTS[era]
  if (eraFonts) {
    Promise.all(Object.values(eraFonts).map(loadGoogleFont)).catch(() => {})
  }
  const primary = colorValueToHex(getComputedStyle(document.documentElement).getPropertyValue('--color-primary'), DEFAULT_COLORS.primary)
  setVar('color-on-primary', getReadableOnColor(primary))
}

async function applyFont(role, fontName) {
  setVar(`font-${role}`, `'${fontName}', sans-serif`)
  loadGoogleFont(fontName).catch(() => {})
}

function syncCustomizerToggle(open) {
  const toggleBtn = document.getElementById('chr-customizer-toggle')
  if (!toggleBtn) return

  toggleBtn.classList.toggle('panel-open', open)
  toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
}

function clearCustomColorVars() {
  CUSTOM_COLOR_VARS.forEach((token) => {
    document.documentElement.style.removeProperty(`--${token}`)
  })
}

function cloneThemePreset(preset = DEFAULT_THEME) {
  return {
    era: preset.era,
    fonts: { ...preset.fonts },
    colors: { ...DEFAULT_COLORS, ...preset.colors },
    hasCustomFonts: Boolean(preset.hasCustomFonts),
    hasCustomColors: Boolean(preset.hasCustomColors),
    activePalette: preset.activePalette || '',
  }
}

function createEmptySurpriseSettings() {
  return {
    fonts: Object.fromEntries(FONT_ROLE_OPTIONS.map((option) => [option.id, []])),
    colors: Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, []])),
  }
}

function normalizeSurpriseSettings(settings) {
  const fallback = createEmptySurpriseSettings()
  const rawFonts = settings?.fonts || {}
  const rawColors = settings?.colors || {}

  return {
    fonts: Object.fromEntries(FONT_ROLE_OPTIONS.map((option) => {
      const values = Array.isArray(rawFonts[option.id]) ? rawFonts[option.id] : []
      return [option.id, [...new Set(values.filter(Boolean))]]
    })),
    colors: Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => {
      const values = Array.isArray(rawColors[option.id]) ? rawColors[option.id] : []
      const normalized = values
        .map((value) => normalizeHex(value, ''))
        .filter(Boolean)
      return [option.id, normalized.length ? [...new Set(normalized)] : fallback.colors[option.id]]
    })),
  }
}

function pickRandom(list, excluded = []) {
  const blocked = new Set((Array.isArray(excluded) ? excluded : [excluded]).filter(Boolean))
  const pool = list.filter((item) => item && !blocked.has(item))
  if (!pool.length) return list[0]
  return pool[Math.floor(Math.random() * pool.length)]
}

function generateSurpriseColorsWithExclusions(exclusions) {
  const normalized = normalizeSurpriseSettings({ colors: exclusions }).colors

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const candidate = generateSurpriseColors()
    const matchesExcluded = COLOR_ROLE_OPTIONS.some((option) => normalized[option.id].includes(normalizeHex(candidate[option.id], '')))
    if (!matchesExcluded) return candidate
  }

  return generateSurpriseColors()
}

// DOWNLOAD_FEATURE_START
function getDefaultPackageName(layoutFile) {
  const layout = getLayoutMeta(layoutFile)
  return sanitizePackageName(layout?.label || 'chronos-custom-site')
}

function getThemePresetFromStore(store) {
  return {
    era: store.era,
    fonts: { ...store.fonts },
    colors: { ...store.colors },
    hasCustomFonts: store.hasCustomFonts,
    hasCustomColors: store.hasCustomColors,
    activePalette: store.activePalette,
    surpriseSettings: normalizeSurpriseSettings(store.surpriseSettings),
  }
}
// DOWNLOAD_FEATURE_END

const INITIAL_PREFS = loadPrefs()
if (INITIAL_PREFS) {
  applyBootTheme(INITIAL_PREFS)
}

const ALL_FONTS_FLAT = [...new Set(Object.values(FONTS).flat())].sort()

Alpine.store('chr', {
  open: false,
  activeTab: 'era',
  era: DEFAULT_THEME.era,
  fonts: { ...DEFAULT_THEME.fonts },
  colors: { ...DEFAULT_THEME.colors },
  hasCustomFonts: DEFAULT_THEME.hasCustomFonts,
  hasCustomColors: DEFAULT_THEME.hasCustomColors,
  activePalette: DEFAULT_THEME.activePalette,
  paletteOptions: PALETTE_OPTIONS,
  allFonts: ALL_FONTS_FLAT,
  fontRoleOptions: FONT_ROLE_OPTIONS,
  colorRoleOptions: COLOR_ROLE_OPTIONS,
  surpriseSettings: createEmptySurpriseSettings(),
  surpriseSettingsOpen: false,
  lastSurpriseFocus: null,
  surpriseFontDrafts: { ...DEFAULT_FONTS },
  surpriseColorDrafts: { ...DEFAULT_COLORS },
  // DOWNLOAD_FEATURE_START
  currentLayout: getCurrentLayoutFile(),
  downloadAvailable: DOWNLOAD_ENABLED && Boolean(getCurrentLayoutFile()),
  currentLayoutLabel: '',
  downloadPackageName: '',
  downloadMode: 'without-customizer',
  downloadBusy: false,
  downloadError: '',
  // DOWNLOAD_FEATURE_END

  isModified() {
    return this.era !== DEFAULT_THEME.era
      || this.hasCustomFonts
      || this.hasCustomColors
      || Boolean(this.activePalette)
  },

  getModifiedMessage() {
    const changes = []
    if (this.era !== DEFAULT_THEME.era) changes.push('era')
    if (this.hasCustomColors) changes.push('colors')
    if (this.hasCustomFonts) changes.push('fonts')

    if (!changes.length) return 'Original layout defaults'
    return `Modified from default: ${changes.join(', ')}`
  },

  init() {
    const storedPrefs = loadPrefs()
    const preset = cloneThemePreset(storedPrefs || DEFAULT_THEME)
    // Synchronize with the document era, since theme-boot.js enforces first-visit isolated logic
    preset.era = document.documentElement.getAttribute('data-era') || preset.era
    const eraDefaults = ERA_DEFAULT_FONTS[preset.era] || DEFAULT_THEME.fonts

    this.era = preset.era
    this.fonts = preset.hasCustomFonts ? { ...eraDefaults, ...preset.fonts } : { ...eraDefaults }
    this.colors = { ...DEFAULT_COLORS, ...preset.colors, surface: preset.colors.surface || preset.colors.bg2 || DEFAULT_COLORS.surface }
    this.hasCustomFonts = preset.hasCustomFonts
    this.hasCustomColors = preset.hasCustomColors
    this.activePalette = preset.activePalette
    this.surpriseSettings = normalizeSurpriseSettings(storedPrefs?.surpriseSettings)
    this.surpriseFontDrafts = { ...this.fonts }
    this.surpriseColorDrafts = {
      primary: this.colors.primary,
      secondary: this.colors.secondary,
      accent: this.colors.accent,
      bg: this.colors.bg,
      bg2: this.colors.bg2,
      surface: this.colors.surface,
      text: this.colors.text,
    }

    // DOWNLOAD_FEATURE_START
    const currentLayoutMeta = getLayoutMeta(this.currentLayout)
    this.currentLayoutLabel = currentLayoutMeta?.label || ''
    this.downloadPackageName = getDefaultPackageName(this.currentLayout)
    // DOWNLOAD_FEATURE_END

    applyEra(this.era)

    if (this.hasCustomFonts) {
      Object.entries(this.fonts).forEach(([role, font]) => {
        applyFont(role, font)
      })
    }

    if (this.hasCustomColors) {
      this.applyColorTheme()
    }

    this.syncColorInputsFromComputed()
    this.syncToggle()
  },

  setActiveTab(tab) {
    if (tab === 'download' && !this.downloadAvailable) return
    this.activeTab = tab
  },

  getAvailableTabs() {
    return [
      'era',
      'colors',
      'fonts',
      ...(this.downloadAvailable ? ['download'] : []),
      'layouts',
    ]
  },

  focusTab(tab) {
    this.setActiveTab(tab)
    window.requestAnimationFrame(() => {
      document.getElementById(`chr-tab-${tab}`)?.focus()
    })
  },

  moveTab(currentTab, direction) {
    const tabs = this.getAvailableTabs()
    const currentIndex = tabs.indexOf(currentTab)
    if (currentIndex === -1) return
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length
    this.focusTab(tabs[nextIndex])
  },

  focusFirstTab() {
    const tabs = this.getAvailableTabs()
    if (tabs.length) this.focusTab(tabs[0])
  },

  focusLastTab() {
    const tabs = this.getAvailableTabs()
    if (tabs.length) this.focusTab(tabs[tabs.length - 1])
  },

  setEra(era) {
    this.era = era
    applyEra(era)

    clearCustomColorVars()

    ;['heading', 'body', 'mono', 'accent'].forEach((role) => {
      document.documentElement.style.removeProperty(`--font-${role}`)
    })

    const defaults = ERA_DEFAULT_FONTS[era]
    if (defaults) this.fonts = { ...defaults }
    this.surpriseFontDrafts = { ...this.fonts }

    this.hasCustomFonts = false
    this.hasCustomColors = false
    this.activePalette = ''
    window.setTimeout(() => {
      this.syncColorInputsFromComputed()
      this.save()
    }, 50)
  },

  syncColorInputsFromComputed() {
    const style = getComputedStyle(document.documentElement)
    this.colors = {
      primary: colorValueToHex(style.getPropertyValue('--color-primary'), this.colors.primary),
      secondary: colorValueToHex(style.getPropertyValue('--color-secondary'), this.colors.secondary),
      accent: colorValueToHex(style.getPropertyValue('--color-accent'), this.colors.accent),
      bg: colorValueToHex(style.getPropertyValue('--color-bg'), this.colors.bg),
      bg2: colorValueToHex(style.getPropertyValue('--color-bg-2'), this.colors.bg2),
      surface: colorValueToHex(style.getPropertyValue('--color-surface'), this.colors.surface || this.colors.bg2),
      text: colorValueToHex(style.getPropertyValue('--color-text'), this.colors.text),
    }
    this.surpriseColorDrafts = {
      primary: this.colors.primary,
      secondary: this.colors.secondary,
      accent: this.colors.accent,
      bg: this.colors.bg,
      bg2: this.colors.bg2,
      surface: this.colors.surface,
      text: this.colors.text,
    }
  },

  applyColorTheme() {
    const tokens = buildDerivedColorTokens(this.colors)
    Object.entries(tokens).forEach(([token, value]) => {
      setVar(token, value)
    })
  },

  setColor(token, value) {
    this.hasCustomColors = true
    this.activePalette = 'custom'
    this.colors[token] = value
    this.surpriseColorDrafts[token] = value
    this.applyColorTheme()
    this.save()
  },

  applyPalette(name) {
    const palette = PALETTES[name]
    if (!palette) return

    this.hasCustomColors = true
    this.activePalette = name
    this.colors = { ...this.colors, ...palette, surface: palette.bg2 }
    this.surpriseColorDrafts = {
      ...this.surpriseColorDrafts,
      primary: this.colors.primary,
      secondary: this.colors.secondary,
      accent: this.colors.accent,
      bg: this.colors.bg,
      bg2: this.colors.bg2,
      surface: this.colors.surface,
      text: this.colors.text,
    }
    this.applyColorTheme()
    this.save()
  },

  setFont(role, fontName) {
    this.hasCustomFonts = true
    this.fonts[role] = fontName
    this.surpriseFontDrafts[role] = fontName
    applyFont(role, fontName)
    this.save()
  },

  surpriseMe() {
    const nextHeading = pickRandom(ALL_FONTS_FLAT, this.surpriseSettings.fonts.heading)
    const nextBody = pickRandom(ALL_FONTS_FLAT, [...this.surpriseSettings.fonts.body, nextHeading])
    const nextAccent = pickRandom(ALL_FONTS_FLAT, [...this.surpriseSettings.fonts.accent, nextHeading, nextBody])
    const nextMono = pickRandom(ALL_FONTS_FLAT, this.surpriseSettings.fonts.mono)
    const nextColors = generateSurpriseColorsWithExclusions(this.surpriseSettings.colors)

    this.hasCustomFonts = true
    this.hasCustomColors = true
    this.activePalette = 'custom'
    this.fonts = {
      heading: nextHeading,
      body: nextBody,
      accent: nextAccent,
      mono: nextMono,
    }
    this.colors = {
      ...this.colors,
      ...nextColors,
    }
    this.surpriseFontDrafts = { ...this.fonts }
    this.surpriseColorDrafts = {
      primary: this.colors.primary,
      secondary: this.colors.secondary,
      accent: this.colors.accent,
      bg: this.colors.bg,
      bg2: this.colors.bg2,
      surface: this.colors.surface,
      text: this.colors.text,
    }

    Object.entries(this.fonts).forEach(([role, font]) => {
      applyFont(role, font)
    })

    this.applyColorTheme()
    this.activeTab = 'fonts'
    this.save()
  },

  toggle() {
    this.open = !this.open
    this.syncToggle()
  },

  close() {
    this.open = false
    this.syncToggle()
  },

  toggleSurpriseSettings() {
    if (this.surpriseSettingsOpen) {
      this.closeSurpriseSettings()
      return
    }
    this.openSurpriseSettings()
  },

  openSurpriseSettings() {
    this.lastSurpriseFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    this.surpriseSettingsOpen = true
    window.requestAnimationFrame(() => {
      document.querySelector('[data-surprise-initial-focus="true"]')?.focus()
    })
  },

  closeSurpriseSettings() {
    this.surpriseSettingsOpen = false
    window.requestAnimationFrame(() => {
      this.lastSurpriseFocus?.focus?.()
    })
  },

  getSurpriseDialogFocusables() {
    return [...document.querySelectorAll('#chr-surprise-dialog button, #chr-surprise-dialog input, #chr-surprise-dialog select, #chr-surprise-dialog textarea, #chr-surprise-dialog [href], #chr-surprise-dialog [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hasAttribute('disabled'))
  },

  handleSurpriseDialogTab(event) {
    if (!this.surpriseSettingsOpen || event.key !== 'Tab') return
    const focusables = this.getSurpriseDialogFocusables()
    if (!focusables.length) return
    const currentIndex = focusables.indexOf(document.activeElement)
    const lastIndex = focusables.length - 1

    if (event.shiftKey) {
      if (currentIndex <= 0) {
        event.preventDefault()
        focusables[lastIndex].focus()
      }
      return
    }

    if (currentIndex === lastIndex) {
      event.preventDefault()
      focusables[0].focus()
    }
  },

  addSurpriseFontExclusion(role) {
    const font = this.surpriseFontDrafts[role]
    if (!font) return
    if (!this.surpriseSettings.fonts[role].includes(font)) {
      this.surpriseSettings.fonts[role] = [...this.surpriseSettings.fonts[role], font]
      this.save()
    }
  },

  removeSurpriseFontExclusion(role, font) {
    this.surpriseSettings.fonts[role] = this.surpriseSettings.fonts[role].filter((item) => item !== font)
    this.save()
  },

  addSurpriseColorExclusion(token) {
    const value = normalizeHex(this.surpriseColorDrafts[token], this.colors[token])
    if (!value) return
    if (!this.surpriseSettings.colors[token].includes(value)) {
      this.surpriseSettings.colors[token] = [...this.surpriseSettings.colors[token], value]
      this.save()
    }
  },

  removeSurpriseColorExclusion(token, value) {
    const normalized = normalizeHex(value, '')
    this.surpriseSettings.colors[token] = this.surpriseSettings.colors[token].filter((item) => item !== normalized)
    this.save()
  },

  setSurpriseColorDraft(token, value) {
    this.surpriseColorDrafts[token] = value
  },

  getSurpriseExclusionCount() {
    const fontCount = Object.values(this.surpriseSettings.fonts).reduce((total, list) => total + list.length, 0)
    const colorCount = Object.values(this.surpriseSettings.colors).reduce((total, list) => total + list.length, 0)
    return fontCount + colorCount
  },

  syncToggle() {
    syncCustomizerToggle(this.open)
  },

  // DOWNLOAD_FEATURE_START
  getDownloadFileName() {
    return `${sanitizeArchiveName(this.downloadPackageName) || 'chronos-custom-site'}.zip`
  },

  async downloadPackage() {
    this.downloadBusy = true
    this.downloadError = ''

    try {
      if (!DOWNLOAD_ENABLED) {
        throw new Error('Package export is disabled in this preview.')
      }
      if (!this.downloadAvailable || !this.currentLayout) {
        throw new Error('Open a layout page before downloading a package.')
      }
      const { downloadCustomizedPackage } = await import('./package-export.js')
      await downloadCustomizedPackage({
        packageName: this.downloadPackageName,
        layoutFile: this.currentLayout,
        keepCustomizer: this.downloadMode === 'with-customizer',
        theme: getThemePresetFromStore(this),
      })
    } catch (error) {
      this.downloadError = error instanceof Error ? error.message : 'Unable to build the package.'
    } finally {
      this.downloadBusy = false
    }
  },
  // DOWNLOAD_FEATURE_END

  save() {
    const eraDefaults = ERA_DEFAULT_FONTS[this.era] || DEFAULT_THEME.fonts
    savePrefs({
      era: this.era,
      fonts: this.hasCustomFonts ? this.fonts : { ...eraDefaults },
      colors: this.colors,
      hasCustomFonts: this.hasCustomFonts,
      hasCustomColors: this.hasCustomColors,
      activePalette: this.activePalette,
      surpriseSettings: normalizeSurpriseSettings(this.surpriseSettings),
    })
  },

  reset() {
    const preset = cloneThemePreset(DEFAULT_THEME)

    this.era = preset.era
    this.activeTab = 'era'
    this.hasCustomFonts = preset.hasCustomFonts
    this.hasCustomColors = preset.hasCustomColors
    this.activePalette = preset.activePalette
    this.colors = { ...preset.colors }
    this.fonts = { ...preset.fonts }
    this.surpriseFontDrafts = { ...preset.fonts }
    this.surpriseColorDrafts = {
      primary: preset.colors.primary,
      secondary: preset.colors.secondary,
      accent: preset.colors.accent,
      bg: preset.colors.bg,
      bg2: preset.colors.bg2,
      surface: preset.colors.surface,
      text: preset.colors.text,
    }

    document.documentElement.removeAttribute('style')
    document.documentElement.setAttribute('data-era', this.era)
    applyEra(this.era)

    if (this.hasCustomFonts) {
      Object.entries(this.fonts).forEach(([role, font]) => {
        applyFont(role, font)
      })
    }

    if (this.hasCustomColors) {
      this.applyColorTheme()
    }

    this.syncColorInputsFromComputed()
    this.save()
  },

  clearAllSavedThemeData() {
    clearAllPrefs()
    this.reset()
  },
})

Alpine.data('chrFontDropdown', (role) => ({
  open: false,
  search: '',
  activeIndex: 0,
  get filtered() {
    if (!this.search) return ALL_FONTS_FLAT
    const query = this.search.toLowerCase()
    return ALL_FONTS_FLAT.filter((font) => font.toLowerCase().includes(query))
  },
  selectFont(font) {
    this.$store.chr.setFont(role, font)
    this.open = false
    this.search = ''
  },
  move(step) {
    if (!this.filtered.length) return
    this.activeIndex = (this.activeIndex + step + this.filtered.length) % this.filtered.length
  },
  selectActive() {
    if (!this.filtered.length) return
    this.selectFont(this.filtered[this.activeIndex])
  },
  toggle() {
    this.open = !this.open
    if (this.open) {
      const currentIndex = this.filtered.indexOf(this.$store.chr.fonts[role])
      this.activeIndex = currentIndex >= 0 ? currentIndex : 0
      window.setTimeout(() => this.$refs.search.focus(), 50)
    }
  },
}))

window.Alpine = Alpine

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('chr-customizer-mount')
  if (CUSTOMIZER_ENABLED && mount) {
    mount.innerHTML = CUSTOMIZER_HTML
  }

  Alpine.start()
  if (CUSTOMIZER_ENABLED) {
    syncCustomizerToggle(false)
  }
})
