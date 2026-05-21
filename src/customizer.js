import Alpine from 'alpinejs'
import { FONTS, FONT_STYLE_GROUPS, loadGoogleFont, ERA_DEFAULT_FONTS, getGoogleFontFamilyParam } from './fonts.js'
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
  'shadow-glow',
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
  { file: 'layout-03.html', short: 'L03', label: 'Brutalist Feed' },
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

function normalizeRangeHex(value) {
  const raw = String(value || '').trim().replace(/^#/, '')
  if (/^[0-9a-f]{6}$/i.test(raw)) return `#${raw.toLowerCase()}`
  if (/^[0-9a-f]{3}$/i.test(raw)) {
    const [a, b, c] = raw
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase()
  }
  return ''
}

function hexToNumber(value) {
  const hex = normalizeRangeHex(value)
  return hex ? Number.parseInt(hex.slice(1), 16) : Number.NaN
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

function hexToHsl(color) {
  const { r, g, b } = hexToRgb(color)
  const rr = r / 255
  const gg = g / 255
  const bb = b / 255
  const max = Math.max(rr, gg, bb)
  const min = Math.min(rr, gg, bb)
  const delta = max - min
  let h = 0

  if (delta !== 0) {
    if (max === rr) h = 60 * (((gg - bb) / delta) % 6)
    else if (max === gg) h = 60 * (((bb - rr) / delta) + 2)
    else h = 60 * (((rr - gg) / delta) + 4)
  }

  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs((2 * l) - 1))

  return {
    h: wrapHue(h),
    s: s * 100,
    l: l * 100,
  }
}

function tuneBackgroundTone(color, primary, darkTheme, limits) {
  const tone = hexToHsl(color)
  const primaryTone = hexToHsl(primary)
  const neutralRest = tone.s < 14
  const hue = !neutralRest && hueDistance(tone.h, primaryTone.h) < 24
    ? wrapHue(primaryTone.h + (darkTheme ? -56 : 56))
    : tone.h
  const saturation = neutralRest
    ? clamp(tone.s * 0.5, darkTheme ? 5 : 2, darkTheme ? 12 : 8)
    : clamp(tone.s * 0.42, darkTheme ? 7 : 3, darkTheme ? 22 : 12)
  const lightness = darkTheme
    ? clamp(tone.l, limits.darkMin, limits.darkMax)
    : clamp(tone.l, limits.lightMin, limits.lightMax)

  return hslToHex(hue, saturation, lightness)
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

function wrapHue(hue) {
  return ((hue % 360) + 360) % 360
}

function hueDistance(a, b) {
  const distance = Math.abs(wrapHue(a) - wrapHue(b))
  return Math.min(distance, 360 - distance)
}

const HARMONY_RECIPES = [
  { secondary: [18, 38], accent: [-48, -22], neutral: [82, 122] },
  { secondary: [-38, -18], accent: [22, 48], neutral: [-122, -82] },
  { secondary: [40, 68], accent: [168, 196], neutral: [-84, -54] },
  { secondary: [-68, -40], accent: [164, 192], neutral: [54, 84] },
  { secondary: [104, 132], accent: [224, 252], neutral: [-38, 38] },
  { secondary: [132, 164], accent: [-152, -118], neutral: [76, 112] },
  { secondary: [172, 188], accent: [28, 58], neutral: [-96, -64] },
  { secondary: [-188, -172], accent: [-58, -28], neutral: [64, 96] },
  { secondary: [74, 104], accent: [-116, -84], neutral: [146, 184] },
  { secondary: [-104, -74], accent: [84, 116], neutral: [-184, -146] },
]

const SURPRISE_TONE_PROFILES = [
  {
    theme: 'light',
    primary: { l: [0.42, 0.56], c: [0.12, 0.24] },
    secondary: { l: [0.44, 0.62], c: [0.08, 0.2] },
    accent: { l: [0.56, 0.74], c: [0.14, 0.28] },
    bg: { l: [0.94, 0.99], c: [0.004, 0.024] },
    bg2Shift: [-0.075, -0.03],
    surfaceShift: [-0.045, 0.005],
    text: { l: [0.15, 0.25], c: [0.006, 0.04] },
  },
  {
    theme: 'light',
    primary: { l: [0.36, 0.5], c: [0.08, 0.19] },
    secondary: { l: [0.42, 0.58], c: [0.06, 0.16] },
    accent: { l: [0.54, 0.7], c: [0.1, 0.24] },
    bg: { l: [0.9, 0.97], c: [0.018, 0.055] },
    bg2Shift: [-0.08, -0.025],
    surfaceShift: [-0.04, 0.015],
    text: { l: [0.13, 0.23], c: [0.012, 0.05] },
  },
  {
    theme: 'light',
    primary: { l: [0.46, 0.6], c: [0.16, 0.3] },
    secondary: { l: [0.5, 0.66], c: [0.1, 0.22] },
    accent: { l: [0.62, 0.78], c: [0.18, 0.32] },
    bg: { l: [0.95, 1], c: [0.002, 0.018] },
    bg2Shift: [-0.065, -0.02],
    surfaceShift: [-0.035, 0.01],
    text: { l: [0.1, 0.2], c: [0.004, 0.032] },
  },
  {
    theme: 'dark',
    primary: { l: [0.66, 0.8], c: [0.11, 0.24] },
    secondary: { l: [0.6, 0.76], c: [0.08, 0.2] },
    accent: { l: [0.72, 0.86], c: [0.12, 0.28] },
    bg: { l: [0.16, 0.3], c: [0.006, 0.036] },
    bg2Shift: [0.035, 0.07],
    surfaceShift: [0.055, 0.095],
    text: { l: [0.88, 0.97], c: [0.006, 0.035] },
  },
  {
    theme: 'dark',
    primary: { l: [0.58, 0.74], c: [0.15, 0.3] },
    secondary: { l: [0.56, 0.72], c: [0.1, 0.24] },
    accent: { l: [0.7, 0.84], c: [0.18, 0.34] },
    bg: { l: [0.14, 0.27], c: [0.014, 0.05] },
    bg2Shift: [0.04, 0.08],
    surfaceShift: [0.06, 0.105],
    text: { l: [0.9, 0.99], c: [0.004, 0.028] },
  },
  {
    theme: 'dark',
    primary: { l: [0.64, 0.78], c: [0.06, 0.18] },
    secondary: { l: [0.58, 0.74], c: [0.04, 0.14] },
    accent: { l: [0.68, 0.84], c: [0.08, 0.2] },
    bg: { l: [0.18, 0.31], c: [0.004, 0.03] },
    bg2Shift: [0.03, 0.065],
    surfaceShift: [0.05, 0.09],
    text: { l: [0.88, 0.96], c: [0.004, 0.03] },
  },
]

const SURPRISE_HUE_BUCKET_SIZE = 30
const SURPRISE_RECENT_HUE_LIMIT = 5
const recentSurpriseHueBuckets = []

function improveContrast(color, background, minRatio) {
  if (contrastRatio(color, background) >= minRatio) return color

  const target = isDarkColor(background) ? '#ffffff' : '#000000'
  let candidate = color

  for (let step = 1; step <= 10; step += 1) {
    candidate = mixHex(color, target, step * 0.1)
    if (contrastRatio(candidate, background) >= minRatio) return candidate
  }

  return target
}

function improveContrastAcross(color, backgrounds, minRatio) {
  let candidate = color

  for (let attempt = 0; attempt < 4; attempt += 1) {
    candidate = backgrounds.reduce((next, background) => improveContrast(next, background, minRatio), candidate)
    if (backgrounds.every((background) => contrastRatio(candidate, background) >= minRatio)) return candidate
  }

  const darkestBackground = backgrounds.some((background) => isDarkColor(background))
  return darkestBackground ? '#ffffff' : '#0b0b0b'
}

function softenExtremeAccent(color, background, darkTheme) {
  const tone = hexToHsl(color)
  if (darkTheme && tone.l > 86) return mixHex(color, background, 0.18)
  if (!darkTheme && tone.l < 14) return mixHex(color, background, 0.1)
  return color
}

function mixReadableText(text, background, weight, minRatio) {
  for (let step = weight; step >= 0; step -= 0.06) {
    const candidate = mixHex(text, background, step)
    if (contrastRatio(candidate, background) >= minRatio) return candidate
  }

  return improveContrast(text, background, minRatio)
}

function randomFloat(min, max) {
  return min + (Math.random() * (max - min))
}

function randomInRange(range) {
  return randomFloat(range[0], range[1])
}

function offsetHue(baseHue, range) {
  return wrapHue(baseHue + randomInt(range[0], range[1]))
}

function linearSrgbToDisplay(value) {
  const channel = clamp(value, 0, 1)
  return channel <= 0.0031308
    ? channel * 12.92
    : (1.055 * (channel ** (1 / 2.4))) - 0.055
}

function oklchToLinearSrgb(lightness, chroma, hue) {
  const radians = (wrapHue(hue) * Math.PI) / 180
  const a = chroma * Math.cos(radians)
  const b = chroma * Math.sin(radians)
  const lPrime = lightness + (0.3963377774 * a) + (0.2158037573 * b)
  const mPrime = lightness - (0.1055613458 * a) - (0.0638541728 * b)
  const sPrime = lightness - (0.0894841775 * a) - (1.291485548 * b)
  const l = lPrime ** 3
  const m = mPrime ** 3
  const s = sPrime ** 3

  return {
    r: (4.0767416621 * l) - (3.3077115913 * m) + (0.2309699292 * s),
    g: (-1.2684380046 * l) + (2.6097574011 * m) - (0.3413193965 * s),
    b: (-0.0041960863 * l) - (0.7034186147 * m) + (1.707614701 * s),
  }
}

function oklchToHex(lightness, chroma, hue) {
  const rgb = oklchToLinearSrgb(lightness, chroma, hue)
  return rgbToHex({
    r: linearSrgbToDisplay(rgb.r) * 255,
    g: linearSrgbToDisplay(rgb.g) * 255,
    b: linearSrgbToDisplay(rgb.b) * 255,
  })
}

function oklchToHexInGamut(lightness, chroma, hue) {
  const l = clamp(lightness, 0, 1)
  let c = Math.max(0, chroma)

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const rgb = oklchToLinearSrgb(l, c, hue)
    if (rgb.r >= 0 && rgb.r <= 1 && rgb.g >= 0 && rgb.g <= 1 && rgb.b >= 0 && rgb.b <= 1) {
      return oklchToHex(l, c, hue)
    }
    c *= 0.82
  }

  return oklchToHex(l, 0, hue)
}

function sampleOklchColor(hue, tone) {
  return oklchToHexInGamut(randomInRange(tone.l), randomInRange(tone.c), hue)
}

function getSurpriseHueBucket(hue) {
  return Math.floor(wrapHue(hue) / SURPRISE_HUE_BUCKET_SIZE)
}

function rememberSurpriseHue(hue) {
  recentSurpriseHueBuckets.push(getSurpriseHueBucket(hue))
  if (recentSurpriseHueBuckets.length > SURPRISE_RECENT_HUE_LIMIT) {
    recentSurpriseHueBuckets.splice(0, recentSurpriseHueBuckets.length - SURPRISE_RECENT_HUE_LIMIT)
  }
}

function surpriseHueWasRecentlyUsed(hue) {
  return recentSurpriseHueBuckets.includes(getSurpriseHueBucket(hue))
}

function pickSurprisePrimaryHue() {
  const bucketCount = Math.ceil(360 / SURPRISE_HUE_BUCKET_SIZE)
  const blocked = new Set(recentSurpriseHueBuckets.slice(-Math.min(SURPRISE_RECENT_HUE_LIMIT, bucketCount - 1)))
  const availableBuckets = Array.from({ length: bucketCount }, (_, bucket) => bucket)
    .filter((bucket) => !blocked.has(bucket))
  const bucket = pickRandom(availableBuckets)
  const minHue = bucket * SURPRISE_HUE_BUCKET_SIZE
  const maxHue = Math.min(359, minHue + SURPRISE_HUE_BUCKET_SIZE - 1)

  return randomInt(minHue, maxHue)
}

function generateSurpriseColors(primaryHue = randomInt(0, 359)) {
  const profile = pickRandom(SURPRISE_TONE_PROFILES)
  const darkTheme = profile.theme === 'dark'
  const recipe = HARMONY_RECIPES[randomInt(0, HARMONY_RECIPES.length - 1)]
  const secondaryHue = offsetHue(primaryHue, recipe.secondary)
  const accentHue = offsetHue(primaryHue, recipe.accent)
  const neutralHue = offsetHue(primaryHue, recipe.neutral)
  const bgLightness = randomInRange(profile.bg.l)
  const bgChroma = randomInRange(profile.bg.c)

  const bg = oklchToHexInGamut(bgLightness, bgChroma, neutralHue + randomInt(-6, 6))
  const bg2 = oklchToHexInGamut(
    bgLightness + randomInRange(profile.bg2Shift),
    bgChroma * randomFloat(0.82, 1.35),
    neutralHue + randomInt(-10, 10)
  )
  const surface = oklchToHexInGamut(
    bgLightness + randomInRange(profile.surfaceShift),
    bgChroma * randomFloat(0.7, 1.18),
    neutralHue + randomInt(-8, 8)
  )

  let primary = sampleOklchColor(primaryHue, profile.primary)
  let secondary = sampleOklchColor(secondaryHue, profile.secondary)
  let accent = sampleOklchColor(accentHue, profile.accent)
  let text = sampleOklchColor(neutralHue + randomInt(-8, 8), profile.text)

  text = improveContrastAcross(text, [bg, bg2, surface], 7)
  primary = improveContrastAcross(primary, [bg, bg2, surface], 4.5)
  secondary = improveContrastAcross(secondary, [bg, bg2, surface], 3.5)
  accent = improveContrastAcross(accent, [bg, bg2, surface], 3.5)

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
  const rawPrimary = normalizeHex(colors.primary, DEFAULT_COLORS.primary)
  const rawBg = normalizeHex(colors.bg, DEFAULT_COLORS.bg)
  const darkTheme = isDarkColor(rawBg)
  const bg = tuneBackgroundTone(rawBg, rawPrimary, darkTheme, { darkMin: 20, darkMax: 30, lightMin: 94, lightMax: 98 })
  const bg2 = tuneBackgroundTone(normalizeHex(colors.bg2, DEFAULT_COLORS.bg2), rawPrimary, darkTheme, { darkMin: 24, darkMax: 30, lightMin: 90, lightMax: 96 })
  const surface = tuneBackgroundTone(normalizeHex(colors.surface || colors.bg2, bg2), rawPrimary, darkTheme, { darkMin: 26, darkMax: 30, lightMin: 92, lightMax: 98 })
  const primary = improveContrastAcross(softenExtremeAccent(improveContrastAcross(rawPrimary, [bg, bg2, surface], 4.5), bg, darkTheme), [bg, bg2, surface], 4.5)
  const secondary = improveContrastAcross(softenExtremeAccent(improveContrastAcross(normalizeHex(colors.secondary, DEFAULT_COLORS.secondary), [bg, bg2, surface], 3.5), bg, darkTheme), [bg, bg2, surface], 3.5)
  const accent = improveContrastAcross(softenExtremeAccent(improveContrastAcross(normalizeHex(colors.accent, DEFAULT_COLORS.accent), [bg, bg2, surface], 3.5), bg, darkTheme), [bg, bg2, surface], 3.5)
  const text = improveContrastAcross(normalizeHex(colors.text, DEFAULT_COLORS.text), [bg, bg2, surface], 7)
  const shadeTarget = darkTheme ? '#ffffff' : '#000000'
  const secondaryText = mixReadableText(text, bg, darkTheme ? 0.16 : 0.22, 5.2)
  const tertiaryText = mixReadableText(text, bg, darkTheme ? 0.32 : 0.42, 4.5)

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
    'color-text-2': secondaryText,
    'color-text-3': tertiaryText,
    'color-border': mixHex(bg2, text, darkTheme ? 0.22 : 0.14),
    'color-border-2': mixHex(bg2, primary, 0.28),
    'shadow-glow': `0 0 52px ${withAlpha(primary, darkTheme ? 0.32 : 0.2)}`,
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

// NOTE: This key scheme is intentionally mirrored in public/theme-boot.js.
// Update both files if the localStorage scope changes.
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
  link.href = `https://fonts.googleapis.com/css2?display=swap&family=${families.map(getGoogleFontFamilyParam).join('&family=')}`
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

function setupChronosTooltips() {
  let activeTarget = null
  let hideTimer = 0
  const tooltip = document.createElement('div')
  tooltip.className = 'chr-smart-tooltip'
  tooltip.setAttribute('role', 'tooltip')
  tooltip.hidden = true
  document.body.appendChild(tooltip)

  const hideTooltip = () => {
    activeTarget = null
    window.clearTimeout(hideTimer)
    tooltip.classList.remove('visible')
    hideTimer = window.setTimeout(() => {
      if (!activeTarget) tooltip.hidden = true
    }, 160)
  }

  const positionTooltip = () => {
    if (!activeTarget || tooltip.hidden) return
    const rect = activeTarget.getBoundingClientRect()
    const tipRect = tooltip.getBoundingClientRect()
    const gap = 10
    const margin = 12
    let top = rect.top - tipRect.height - gap
    if (top < margin) top = rect.bottom + gap
    const left = Math.min(
      window.innerWidth - tipRect.width - margin,
      Math.max(margin, rect.left + (rect.width / 2) - (tipRect.width / 2)),
    )
    tooltip.style.left = `${Math.round(left)}px`
    tooltip.style.top = `${Math.round(top)}px`
  }

  const showTooltip = (target) => {
    const text = target?.getAttribute('data-tooltip')
    if (!text) return
    activeTarget = target
    window.clearTimeout(hideTimer)
    tooltip.textContent = text
    tooltip.hidden = false
    tooltip.classList.remove('visible')
    requestAnimationFrame(() => {
      positionTooltip()
      tooltip.classList.add('visible')
    })
  }

  document.addEventListener('pointerover', (event) => {
    const target = event.target.closest?.('[data-tooltip]')
    if (!target || !document.getElementById('chr-customizer')?.contains(target)) return
    showTooltip(target)
  })

  document.addEventListener('pointerout', (event) => {
    if (!activeTarget) return
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && activeTarget.contains(nextTarget)) return
    hideTooltip()
  })

  document.addEventListener('focusin', (event) => {
    const target = event.target.closest?.('[data-tooltip]')
    if (!target || !document.getElementById('chr-customizer')?.contains(target)) return
    showTooltip(target)
  })

  document.addEventListener('focusout', hideTooltip)
  window.addEventListener('resize', positionTooltip)
  document.addEventListener('scroll', positionTooltip, true)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideTooltip()
  })
}

function clearCustomColorVars() {
  CUSTOM_COLOR_VARS.forEach((token) => {
    document.documentElement.style.removeProperty(`--${token}`)
  })
}

function clearCustomFontVars() {
  FONT_ROLE_OPTIONS.forEach((option) => {
    document.documentElement.style.removeProperty(`--font-${option.id}`)
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

function normalizeColorRange(value) {
  if (typeof value === 'string') {
    const [rawStart, rawEnd] = value.split('-').map((part) => part.trim())
    if (!rawStart || !rawEnd) return null
    return normalizeColorRange({ start: rawStart, end: rawEnd })
  }

  const start = normalizeRangeHex(value?.start)
  const end = normalizeRangeHex(value?.end)
  if (!start || !end) return null

  const startNumber = hexToNumber(start)
  const endNumber = hexToNumber(end)
  if (!Number.isFinite(startNumber) || !Number.isFinite(endNumber)) return null

  return startNumber <= endNumber
    ? { start, end }
    : { start: end, end: start }
}

function normalizeColorRanges(values) {
  const ranges = (Array.isArray(values) ? values : [])
    .map((value) => normalizeColorRange(value))
    .filter(Boolean)
    .sort((a, b) => hexToNumber(a.start) - hexToNumber(b.start))

  const merged = []

  ranges.forEach((range) => {
    const last = merged[merged.length - 1]
    if (!last) {
      merged.push(range)
      return
    }

    const rangeStart = hexToNumber(range.start)
    const lastEnd = hexToNumber(last.end)
    if (rangeStart <= lastEnd + 1) {
      if (hexToNumber(range.end) > lastEnd) last.end = range.end
      return
    }

    merged.push(range)
  })

  return merged
}

function normalizeColorExclusionsByRole(rawColors) {
  const fallback = Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, []]))
  if (!rawColors) return fallback

  if (Array.isArray(rawColors.ranges)) {
    const globalRanges = normalizeColorRanges(rawColors.ranges)
    return Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, globalRanges]))
  }

  return Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => {
    const values = Array.isArray(rawColors[option.id]) ? rawColors[option.id] : []
    const ranges = normalizeColorRanges(values.map((value) => {
      if (typeof value === 'string') {
        const color = normalizeRangeHex(value)
        return color ? { start: color, end: color } : value
      }
      return value
    }))
    return [option.id, ranges]
  }))
}

function colorInRange(color, range) {
  const colorNumber = hexToNumber(color)
  return Number.isFinite(colorNumber)
    && colorNumber >= hexToNumber(range.start)
    && colorNumber <= hexToNumber(range.end)
}

function colorInRanges(color, ranges) {
  return ranges.some((range) => colorInRange(color, range))
}

function numberToHex(value) {
  return `#${clamp(Math.round(value), 0, 0xffffff).toString(16).padStart(6, '0')}`
}

function getAllowedColorSegments(ranges) {
  const normalized = normalizeColorRanges(ranges)
  const segments = []
  let cursor = 0

  normalized.forEach((range) => {
    const start = hexToNumber(range.start)
    const end = hexToNumber(range.end)
    if (cursor < start) segments.push([cursor, start - 1])
    cursor = Math.max(cursor, end + 1)
  })

  if (cursor <= 0xffffff) segments.push([cursor, 0xffffff])
  return segments.filter(([start, end]) => start <= end)
}

function pickColorFromSegments(segments) {
  const total = segments.reduce((sum, [start, end]) => sum + (end - start + 1), 0)
  if (total <= 0) return ''

  let offset = Math.floor(Math.random() * total)
  for (const [start, end] of segments) {
    const length = end - start + 1
    if (offset < length) return numberToHex(start + offset)
    offset -= length
  }

  return numberToHex(segments[segments.length - 1][1])
}

function contrastsAcross(color, backgrounds, minRatio) {
  return backgrounds.every((background) => contrastRatio(color, background) >= minRatio)
}

function findReadableColorOutsideRanges(ranges, backgrounds, minRatio) {
  const segments = getAllowedColorSegments(ranges)
  if (!segments.length) return ''

  for (let attempt = 0; attempt < 260; attempt += 1) {
    const color = pickColorFromSegments(segments)
    if (!colorInRanges(color, ranges) && contrastsAcross(color, backgrounds, minRatio)) {
      return color
    }
  }

  return ''
}

function surpriseCandidateHasReadableContrast(candidate) {
  const backgrounds = [candidate.bg, candidate.bg2, candidate.surface]
  return contrastsAcross(candidate.text, backgrounds, 7)
    && contrastsAcross(candidate.primary, backgrounds, 4.5)
    && contrastsAcross(candidate.secondary, backgrounds, 3.5)
    && contrastsAcross(candidate.accent, backgrounds, 3.5)
}

function findBackgroundColorOutsideRanges(ranges, candidate, token) {
  const segments = getAllowedColorSegments(ranges)
  if (!segments.length) return ''

  for (let attempt = 0; attempt < 260; attempt += 1) {
    const color = pickColorFromSegments(segments)
    const nextCandidate = { ...candidate, [token]: color }
    if (!colorInRanges(color, ranges) && surpriseCandidateHasReadableContrast(nextCandidate)) {
      return color
    }
  }

  return ''
}

function repairSurpriseCandidateAgainstExclusions(candidate, normalized) {
  const repaired = { ...candidate }
  const readableRoles = [
    ['text', 7],
    ['primary', 4.5],
    ['secondary', 3.5],
    ['accent', 3.5],
  ]

  for (const token of ['bg', 'bg2', 'surface']) {
    const ranges = normalized[token] || []
    if (!ranges.length || colorRangesCoverAll(ranges) || !colorInRanges(repaired[token], ranges)) continue

    const replacement = findBackgroundColorOutsideRanges(ranges, repaired, token)
    if (!replacement) return null
    repaired[token] = replacement
  }

  for (const [token, minRatio] of readableRoles) {
    const ranges = normalized[token] || []
    const backgrounds = [repaired.bg, repaired.bg2, repaired.surface]
    if (
      (!ranges.length || colorRangesCoverAll(ranges) || !colorInRanges(repaired[token], ranges))
      && contrastsAcross(repaired[token], backgrounds, minRatio)
    ) {
      continue
    }

    const replacement = findReadableColorOutsideRanges(ranges, backgrounds, minRatio)
    if (!replacement) return null
    repaired[token] = replacement
  }

  return surpriseCandidateHasReadableContrast(repaired) ? repaired : null
}

function getColorRangeLabel(range) {
  const normalized = normalizeColorRange(range)
  return normalized ? `${normalized.start.slice(1).toUpperCase()}-${normalized.end.slice(1).toUpperCase()}` : ''
}

function getColorRangeCoverage(range) {
  const normalized = normalizeColorRange(range)
  if (!normalized) return ''
  const total = 0xffffff + 1
  const count = hexToNumber(normalized.end) - hexToNumber(normalized.start) + 1
  const percent = (count / total) * 100
  return percent < 0.1 ? '<0.1% of RGB' : `${percent.toFixed(1)}% of RGB`
}

function getColorRangeCoveragePercent(range) {
  const normalized = normalizeColorRange(range)
  if (!normalized) return 0
  return ((hexToNumber(normalized.end) - hexToNumber(normalized.start) + 1) / (0xffffff + 1)) * 100
}

function colorRangesCoverAll(ranges) {
  const normalized = normalizeColorRanges(ranges)
  return normalized.length === 1
    && normalized[0].start === '#000000'
    && normalized[0].end === '#ffffff'
}

function normalizeSurpriseSettings(settings) {
  const rawFonts = settings?.fonts || {}
  const rawColors = settings?.colors || {}

  return {
    fonts: Object.fromEntries(FONT_ROLE_OPTIONS.map((option) => {
      const values = Array.isArray(rawFonts[option.id]) ? rawFonts[option.id] : []
      return [option.id, [...new Set(values.filter(Boolean))]]
    })),
    colors: normalizeColorExclusionsByRole(rawColors),
  }
}

function pickRandom(list, excluded = []) {
  const blocked = new Set((Array.isArray(excluded) ? excluded : [excluded]).filter(Boolean))
  const pool = list.filter((item) => item && !blocked.has(item))
  if (!pool.length) return list[0]
  return pool[Math.floor(Math.random() * pool.length)]
}

function generateSurpriseColorsWithExclusions(exclusions, currentColors = {}) {
  const normalized = normalizeSurpriseSettings({ colors: exclusions }).colors

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const primaryHue = pickSurprisePrimaryHue()
    const candidate = generateSurpriseColors(primaryHue)
    COLOR_ROLE_OPTIONS.forEach((option) => {
      if (colorRangesCoverAll(normalized[option.id]) && currentColors[option.id]) {
        candidate[option.id] = currentColors[option.id]
      }
    })
    const repairedCandidate = repairSurpriseCandidateAgainstExclusions(candidate, normalized)
    if (!repairedCandidate) continue

    const matchesExcluded = COLOR_ROLE_OPTIONS.some((option) => (
      !colorRangesCoverAll(normalized[option.id])
      && colorInRanges(repairedCandidate[option.id], normalized[option.id])
    ))
    const visiblePrimaryHue = hexToHsl(repairedCandidate.primary).h
    const repeatsVisibleHue = !colorRangesCoverAll(normalized.primary)
      && surpriseHueWasRecentlyUsed(visiblePrimaryHue)
    if (!matchesExcluded && !repeatsVisibleHue) {
      rememberSurpriseHue(visiblePrimaryHue)
      return repairedCandidate
    }
  }

  const currentFallback = { ...currentColors }
  if (COLOR_ROLE_OPTIONS.every((option) => /^#[0-9a-f]{6}$/i.test(currentFallback[option.id] || ''))) {
    return currentFallback
  }

  const primaryHue = pickSurprisePrimaryHue()
  const fallback = generateSurpriseColors(primaryHue)
  rememberSurpriseHue(hexToHsl(fallback.primary).h)
  return fallback
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

function uniqueFonts(fonts) {
  return [...new Set((fonts || []).filter((font) => ALL_FONTS_FLAT.includes(font)))]
}

const FONT_ROLE_FALLBACK_POOLS = {
  heading: uniqueFonts([
    ...FONTS['Sans-Serif'],
    ...FONTS.Serif,
    ...FONTS.Display,
    ...FONTS['Gothic / Historic'],
    ...FONTS['Futuristic / Tech'],
  ]),
  body: uniqueFonts([
    ...FONTS['Sans-Serif'],
    ...FONTS.Serif,
  ]),
  accent: uniqueFonts([
    ...FONTS['Sans-Serif'],
    ...FONTS.Serif,
    ...FONTS.Display,
    ...FONTS['Gothic / Historic'],
    ...FONTS['Futuristic / Tech'],
    ...FONTS.Handwriting,
  ]),
  mono: uniqueFonts(FONTS.Monospace),
}

function normalizeBlockedFonts(fonts) {
  return new Set((Array.isArray(fonts) ? fonts : [fonts]).filter((font) => ALL_FONTS_FLAT.includes(font)))
}

function pickFontFromPools(primaryPool, fallbackPool, options = {}) {
  const hardBlocked = normalizeBlockedFonts(options.hardExcluded)
  const softBlocked = normalizeBlockedFonts(options.softExcluded)
  const withSoftBlocks = (font) => !hardBlocked.has(font) && !softBlocked.has(font)
  const withoutSoftBlocks = (font) => !hardBlocked.has(font)
  const fallbackFont = ALL_FONTS_FLAT.includes(options.fallbackFont) ? options.fallbackFont : ''
  const primaryCandidates = uniqueFonts(primaryPool).filter(withSoftBlocks)
  if (primaryCandidates.length) return pickRandom(primaryCandidates)

  const fallbackCandidates = uniqueFonts(fallbackPool).filter(withSoftBlocks)
  if (fallbackCandidates.length) return pickRandom(fallbackCandidates)

  const globalCandidates = ALL_FONTS_FLAT.filter(withSoftBlocks)
  if (globalCandidates.length) return pickRandom(globalCandidates)

  const primaryHardCandidates = uniqueFonts(primaryPool).filter(withoutSoftBlocks)
  if (primaryHardCandidates.length) return pickRandom(primaryHardCandidates)

  const fallbackHardCandidates = uniqueFonts(fallbackPool).filter(withoutSoftBlocks)
  if (fallbackHardCandidates.length) return pickRandom(fallbackHardCandidates)

  const globalHardCandidates = ALL_FONTS_FLAT.filter(withoutSoftBlocks)
  if (globalHardCandidates.length) return pickRandom(globalHardCandidates)

  return fallbackFont || fallbackPool[0] || ALL_FONTS_FLAT[0]
}

function pickSurpriseFonts(exclusions, currentFonts = {}) {
  const normalized = normalizeSurpriseSettings({ fonts: exclusions }).fonts
  const group = pickRandom(FONT_STYLE_GROUPS)
  const nextHeading = pickFontFromPools(group.heading, FONT_ROLE_FALLBACK_POOLS.heading, {
    hardExcluded: normalized.heading,
    fallbackFont: currentFonts.heading,
  })
  const nextBody = pickFontFromPools(group.body, FONT_ROLE_FALLBACK_POOLS.body, {
    hardExcluded: normalized.body,
    softExcluded: nextHeading,
    fallbackFont: currentFonts.body,
  })
  const nextAccent = pickFontFromPools(group.accent, FONT_ROLE_FALLBACK_POOLS.accent, {
    hardExcluded: normalized.accent,
    softExcluded: [nextHeading, nextBody],
    fallbackFont: currentFonts.accent,
  })
  const nextMono = pickFontFromPools(group.mono, FONT_ROLE_FALLBACK_POOLS.mono, {
    hardExcluded: normalized.mono,
    fallbackFont: currentFonts.mono,
  })

  return {
    heading: nextHeading,
    body: nextBody,
    accent: nextAccent,
    mono: nextMono,
  }
}

function resetCustomizerBodyScroll() {
  const body = document.querySelector('#chr-customizer .cust-body')
  if (!body) return
  body.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

function scheduleCustomizerBodyScrollReset() {
  Alpine.nextTick(() => {
    window.requestAnimationFrame(resetCustomizerBodyScroll)
  })
}

function resetSurpriseModalBodyScroll() {
  const body = document.querySelector('#chr-surprise-dialog .surprise-modal-body')
  if (!body) return
  body.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

function scheduleSurpriseModalBodyScrollReset() {
  Alpine.nextTick(() => {
    window.requestAnimationFrame(resetSurpriseModalBodyScroll)
  })
}

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
  surpriseSettingsView: 'fonts',
  lastSurpriseFocus: null,
  surpriseFontDrafts: { ...DEFAULT_FONTS },
  surpriseColorRangeDrafts: Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, '000000-000000'])),
  surpriseColorRangeErrors: Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, ''])),
  // DOWNLOAD_FEATURE_START
  currentLayout: getCurrentLayoutFile(),
  // Demo keeps the package builder visible as a disabled preview, while
  // downloadPackage() below still blocks actual package export.
  downloadAvailable: Boolean(getCurrentLayoutFile()),
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
    this.surpriseColorRangeDrafts = Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, '000000-000000']))
    this.surpriseColorRangeErrors = Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, '']))

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
    if (this.activeTab === tab) return
    this.activeTab = tab
    scheduleCustomizerBodyScrollReset()
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

    clearCustomFontVars()

    const defaults = ERA_DEFAULT_FONTS[era]
    if (defaults) this.fonts = { ...defaults }
    this.surpriseFontDrafts = { ...this.fonts }

    this.hasCustomFonts = false
    this.hasCustomColors = false
    this.activePalette = ''
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.syncColorInputsFromComputed()
        this.save()
      })
    })
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
    this.applyColorTheme()
    this.save()
  },

  applyPalette(name) {
    const palette = PALETTES[name]
    if (!palette) return

    this.hasCustomColors = true
    this.activePalette = name
    this.colors = { ...this.colors, ...palette, surface: palette.bg2 }
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
    const nextFonts = pickSurpriseFonts(this.surpriseSettings.fonts, this.fonts)
    const nextColors = generateSurpriseColorsWithExclusions(this.surpriseSettings.colors, this.colors)

    this.hasCustomFonts = true
    this.hasCustomColors = true
    this.activePalette = 'custom'
    this.fonts = { ...nextFonts }
    this.colors = {
      ...this.colors,
      ...nextColors,
    }
    this.surpriseFontDrafts = { ...this.fonts }

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
    const focusInitialControl = () => {
      const initialControl = document.querySelector('[data-surprise-initial-focus="true"]')
      const dialog = document.getElementById('chr-surprise-dialog')
      const focusTarget = initialControl || dialog
      focusTarget?.focus({ preventScroll: true })
    }
    Alpine.nextTick(focusInitialControl)
    window.requestAnimationFrame(() => {
      focusInitialControl()
      window.requestAnimationFrame(() => {
        focusInitialControl()
      })
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
      .filter((element) => !element.hasAttribute('disabled') && element.offsetParent !== null)
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

  setSurpriseSettingsView(view) {
    if (!['fonts', 'colors'].includes(view)) return
    if (this.surpriseSettingsView === view) return
    this.surpriseSettingsView = view
    scheduleSurpriseModalBodyScrollReset()
  },

  setSurpriseColorRangeDraft(token, value) {
    this.surpriseColorRangeDrafts[token] = value
    this.surpriseColorRangeErrors[token] = ''
  },

  addSurpriseColorRangeExclusion(token) {
    const range = normalizeColorRange(this.surpriseColorRangeDrafts[token])
    if (!range) {
      this.surpriseColorRangeErrors[token] = 'Use HEX-HEX, for example 000000-EEEEEE.'
      return
    }

    const current = normalizeSurpriseSettings(this.surpriseSettings).colors[token] || []
    const key = `${range.start}-${range.end}`
    if (!current.some((item) => `${item.start}-${item.end}` === key)) {
      this.surpriseSettings.colors[token] = normalizeColorRanges([...current, range])
      this.save()
    }
    this.surpriseColorRangeDrafts[token] = getColorRangeLabel(range)
    this.surpriseColorRangeErrors[token] = ''
  },

  removeSurpriseColorRangeExclusion(token, range) {
    const normalized = normalizeColorRange(range)
    if (!normalized) return
    const key = `${normalized.start}-${normalized.end}`
    this.surpriseSettings.colors[token] = this.surpriseSettings.colors[token].filter((item) => `${item.start}-${item.end}` !== key)
    this.save()
  },

  getSurpriseColorRangePreviewStyle(range) {
    const normalized = normalizeColorRange(range)
    if (!normalized) {
      return 'background:linear-gradient(135deg, var(--color-bg-2), var(--color-bg));'
    }
    return `background:linear-gradient(90deg, ${normalized.start}, ${normalized.end});`
  },

  getSurpriseColorRangeDraftLabel(token) {
    const range = normalizeColorRange(this.surpriseColorRangeDrafts[token])
    return range ? getColorRangeLabel(range) : 'Waiting for a valid range'
  },

  getSurpriseColorRangeDraftCoverage(token) {
    const range = normalizeColorRange(this.surpriseColorRangeDrafts[token])
    return range ? getColorRangeCoverage(range) : ''
  },

  getSurpriseColorRangeDraftWarning(token) {
    const range = normalizeColorRange(this.surpriseColorRangeDrafts[token])
    if (range?.start === '#000000' && range?.end === '#ffffff') {
      return 'This covers every RGB color; Surprise Me will keep this slot unchanged.'
    }
    return getColorRangeCoveragePercent(range) > 80
      ? 'This range is very broad; Surprise Me may keep contrast-safe colors if no readable palette remains.'
      : ''
  },

  getSurpriseColorRangeLabel(range) {
    return getColorRangeLabel(range)
  },

  getSurpriseColorRangeCoverage(range) {
    return getColorRangeCoverage(range)
  },

  getSurpriseExclusionCount() {
    return this.getSurpriseFontExclusionCount() + this.getSurpriseColorExclusionCount()
  },

  getSurpriseFontExclusionCount() {
    return Object.values(this.surpriseSettings.fonts).reduce((total, list) => total + list.length, 0)
  },

  getSurpriseColorExclusionCount() {
    return Object.values(this.surpriseSettings.colors).reduce((total, list) => total + list.length, 0)
  },

  resetSurpriseExclusions() {
    this.surpriseSettings = createEmptySurpriseSettings()
    this.surpriseFontDrafts = { ...this.fonts }
    this.surpriseColorRangeDrafts = Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, '000000-000000']))
    this.surpriseColorRangeErrors = Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, '']))
    this.save()
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
      throw new Error('Package export is disabled in this preview.')
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

  reset({ persist = true } = {}) {
    const preset = cloneThemePreset(DEFAULT_THEME)

    this.era = preset.era
    this.activeTab = 'era'
    this.hasCustomFonts = preset.hasCustomFonts
    this.hasCustomColors = preset.hasCustomColors
    this.activePalette = preset.activePalette
    this.colors = { ...preset.colors }
    this.fonts = { ...preset.fonts }
    this.surpriseFontDrafts = { ...preset.fonts }
    this.surpriseColorRangeDrafts = Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, '000000-000000']))
    this.surpriseColorRangeErrors = Object.fromEntries(COLOR_ROLE_OPTIONS.map((option) => [option.id, '']))

    clearCustomColorVars()
    clearCustomFontVars()
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
    if (persist) this.save()
  },

  clearAllSavedThemeData() {
    clearAllPrefs()
    this.reset({ persist: false })
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
      this.$nextTick(() => {
        window.requestAnimationFrame(() => this.$refs.search?.focus())
      })
    }
  },
}))

window.Alpine = Alpine

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('chr-customizer-mount')
  if (CUSTOMIZER_ENABLED && mount) {
    // CUSTOMIZER_HTML is a static build-time constant, not user data.
    mount.innerHTML = CUSTOMIZER_HTML
  }

  Alpine.start()
  if (CUSTOMIZER_ENABLED) {
    syncCustomizerToggle(false)
    setupChronosTooltips()
  }
})
