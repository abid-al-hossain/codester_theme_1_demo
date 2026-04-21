import JSZip from 'jszip'

import packageJsonRaw from '../package.json?raw'
import packageLockRaw from '../package-lock.json?raw'
import gitignoreRaw from '../.gitignore?raw'
import styleRaw from './style.css?raw'
import mainRaw from './main.js?raw'
import customizerRaw from './customizer.js?raw'
import customizerHtmlRaw from './customizer-html.js?raw'
import fontsRaw from './fonts.js?raw'
import transitionsRaw from './transitions.js?raw'
import packageNameUtilsRaw from './package-name-utils.js?raw'
import faviconRaw from './export-assets/favicon.svg?raw'
import iconsRaw from './export-assets/icons.svg?raw'
import themeBootRaw from './theme-boot.js?raw'
import { sanitizePackageName, sanitizeArchiveName } from './package-name-utils.js'
import layout01Raw from '../layout-01.html?raw'
import layout02Raw from '../layout-02.html?raw'
import layout03Raw from '../layout-03.html?raw'
import layout04Raw from '../layout-04.html?raw'
import layout05Raw from '../layout-05.html?raw'
import layout06Raw from '../layout-06.html?raw'
import layout07Raw from '../layout-07.html?raw'
import layout08Raw from '../layout-08.html?raw'
import layout09Raw from '../layout-09.html?raw'
import layout10Raw from '../layout-10.html?raw'
import layout11Raw from '../layout-11.html?raw'
import layout12Raw from '../layout-12.html?raw'
import layout13Raw from '../layout-13.html?raw'
import layout14Raw from '../layout-14.html?raw'
import layout15Raw from '../layout-15.html?raw'
import layout16Raw from '../layout-16.html?raw'
import layout17Raw from '../layout-17.html?raw'
import layout18Raw from '../layout-18.html?raw'
import layout19Raw from '../layout-19.html?raw'
import layout20Raw from '../layout-20.html?raw'

export const LAYOUT_PACKAGE_OPTIONS = [
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

const LAYOUT_HTML = {
  'layout-01.html': layout01Raw,
  'layout-02.html': layout02Raw,
  'layout-03.html': layout03Raw,
  'layout-04.html': layout04Raw,
  'layout-05.html': layout05Raw,
  'layout-06.html': layout06Raw,
  'layout-07.html': layout07Raw,
  'layout-08.html': layout08Raw,
  'layout-09.html': layout09Raw,
  'layout-10.html': layout10Raw,
  'layout-11.html': layout11Raw,
  'layout-12.html': layout12Raw,
  'layout-13.html': layout13Raw,
  'layout-14.html': layout14Raw,
  'layout-15.html': layout15Raw,
  'layout-16.html': layout16Raw,
  'layout-17.html': layout17Raw,
  'layout-18.html': layout18Raw,
  'layout-19.html': layout19Raw,
  'layout-20.html': layout20Raw,
}

export function getCurrentLayoutFile() {
  const current = window.location.pathname.split('/').pop()?.toLowerCase() || ''
  return LAYOUT_HTML[current] ? current : ''
}

function stripMarkedBlocks(source, startMarker, endMarker) {
  const pattern = new RegExp(`\\s*.*${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}.*\\n?`, 'g')
  return source.replace(pattern, '')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildThemeLiteral(theme) {
  return `const DEFAULT_THEME = ${JSON.stringify(theme, null, 2)}`
}

function buildStorageKey(slug) {
  return `${slug}-prefs`
}

function buildThemeBootScript({ storageKey, theme, useStorage }) {
  return `<script>(function(){const base=${JSON.stringify(theme)};const key='${storageKey}';const setVar=(name,value)=>document.documentElement.style.setProperty(name,value);const normalizeHex=(value,fallback)=>{const raw=String(value||'').trim();if(/^#[0-9a-f]{6}$/i.test(raw))return raw.toLowerCase();if(/^#[0-9a-f]{3}$/i.test(raw))return'#'+raw[1]+raw[1]+raw[2]+raw[2]+raw[3]+raw[3];return fallback};const hexToRgb=(value,fallback)=>{const hex=normalizeHex(value,fallback);return{r:parseInt(hex.slice(1,3),16),g:parseInt(hex.slice(3,5),16),b:parseInt(hex.slice(5,7),16)}};const rgbToHex=({r,g,b})=>'#'+[r,g,b].map((channel)=>Math.max(0,Math.min(255,Math.round(channel))).toString(16).padStart(2,'0')).join('');const mixHex=(baseColor,targetColor,weight)=>{const a=hexToRgb(baseColor,baseColor);const b=hexToRgb(targetColor,targetColor);return rgbToHex({r:a.r+((b.r-a.r)*weight),g:a.g+((b.g-a.g)*weight),b:a.b+((b.b-a.b)*weight)})};const withAlpha=(color,alpha)=>{const rgb=hexToRgb(color,color);return'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+alpha+')'};const isDarkColor=(color)=>{const rgb=hexToRgb(color,color);return((rgb.r*299)+(rgb.g*587)+(rgb.b*114))/1000<150};let state=base;if(${useStorage ? 'true' : 'false'}){try{const saved=JSON.parse(localStorage.getItem(key));if(saved){state={...base,...saved,fonts:{...base.fonts,...saved.fonts},colors:{...base.colors,...saved.colors}}}}catch(error){}}if(state.era)document.documentElement.setAttribute('data-era',state.era);if(state.fonts){const families=[...new Set(Object.values(state.fonts).filter(Boolean))];if(families.length){const link=document.createElement('link');link.rel='stylesheet';link.dataset.chronosPreloadFonts='true';link.href='https://fonts.googleapis.com/css2?display=swap&family='+families.map((font)=>encodeURIComponent(font).replace(/%20/g,'+')).join('&family=');document.head.appendChild(link)}Object.entries(state.fonts).forEach(([role,font])=>{setVar('--font-'+role,\"'\"+font+\"', sans-serif\")})}if(state.colors){const colors={...base.colors,...state.colors,surface:(state.colors&&state.colors.surface)||(state.colors&&state.colors.bg2)||base.colors.surface};const bg=normalizeHex(colors.bg,base.colors.bg);const bg2=normalizeHex(colors.bg2,base.colors.bg2);const surface=normalizeHex(colors.surface,bg2);const primary=normalizeHex(colors.primary,base.colors.primary);const secondary=normalizeHex(colors.secondary,base.colors.secondary);const accent=normalizeHex(colors.accent,base.colors.accent);const text=normalizeHex(colors.text,base.colors.text);const dark=isDarkColor(bg);[['--color-bg',bg],['--color-bg-2',bg2],['--color-bg-3',mixHex(bg2,text,dark?0.08:0.06)],['--color-surface',withAlpha(surface,dark?0.82:0.78)],['--color-primary',primary],['--color-primary-2',mixHex(primary,dark?'#ffffff':'#000000',0.12)],['--color-secondary',secondary],['--color-accent',accent],['--color-text',text],['--color-text-2',mixHex(text,bg,dark?0.16:0.22)],['--color-text-3',mixHex(text,bg,dark?0.32:0.42)],['--color-border',mixHex(bg2,text,dark?0.22:0.14)],['--color-border-2',mixHex(bg2,primary,0.28)]].forEach(([name,value])=>setVar(name,value))}})()</script>`
}

function rewriteCustomizerSource(theme, { keepCustomizer, storageKey }) {
  let source = customizerRaw

  source = stripMarkedBlocks(source, '// DOWNLOAD_FEATURE_START', '// DOWNLOAD_FEATURE_END')
  source = source.replace(
    /\/\/ CUSTOMIZER_ENABLED_START[\s\S]*?\/\/ CUSTOMIZER_ENABLED_END/,
    `// CUSTOMIZER_ENABLED_START\nconst CUSTOMIZER_ENABLED = ${keepCustomizer ? 'true' : 'false'}\n// CUSTOMIZER_ENABLED_END`
  )
  source = source.replace(
    /\/\/ EXPORT_DEFAULT_THEME_START[\s\S]*?\/\/ EXPORT_DEFAULT_THEME_END/,
    `// EXPORT_DEFAULT_THEME_START\n${buildThemeLiteral(theme)}\n// EXPORT_DEFAULT_THEME_END`
  )

  return source
}

function rewriteCustomizerHtml() {
  let source = customizerHtmlRaw

  source = source.replace(/\s*<!-- DOWNLOAD_TAB_START -->[\s\S]*?<!-- DOWNLOAD_TAB_END -->\s*/g, '\n')
  source = source.replace(/\s*<!-- DOWNLOAD_PANEL_START -->[\s\S]*?<!-- DOWNLOAD_PANEL_END -->\s*/g, '\n')
  source = source.replace(/\s*<!-- LAYOUTS_TAB_START -->[\s\S]*?<!-- LAYOUTS_TAB_END -->\s*/g, '\n')
  source = source.replace(/\s*<!-- LAYOUTS_PANEL_START -->[\s\S]*?<!-- LAYOUTS_PANEL_END -->\s*/g, '\n')
  source = source.replace(
    'Preview styles here. Download the current layout as a ready-to-run package from any layout page.',
    'Live theme controls for this exported layout.'
  )

  return source
}

function rewriteMainSource(keepCustomizer) {
  if (keepCustomizer) return mainRaw
  return mainRaw.replace("import './customizer.js'\r\n", '').replace("import './customizer.js'\n", '')
}

function rewriteRootHtml(html, { keepCustomizer, storageKey, theme }) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const currentLayoutMessage = 'This export includes only the current layout.'
  const singleLayoutTexts = new Map([
    ['home', 'Back to top'],
    ['view all layouts', 'Current layout'],
    ['open layout directory', 'Current layout'],
    ['view index', 'Current layout'],
    ['browse all layouts', 'Current layout'],
    ['view other layouts', 'Current layout'],
    ['layout directory', 'Current layout'],
    ['layouts', 'Current layout'],
    ['all layouts', 'Current layout'],
    ['return to layout directory', 'Back to top'],
    ['return to surface directory', 'Back to top'],
    ['access terminal', 'Back to top'],
    ['run: index.bat', 'Back to top'],
  ])

  doc.documentElement.setAttribute('data-era', theme.era)
  doc.documentElement.setAttribute('data-prefs-key', storageKey)

  const bootScript = Array.from(doc.head.querySelectorAll('script'))
    .find((script) => {
      const src = script.getAttribute('src') || ''
      return src.includes('theme-boot.js') || script.textContent?.includes("localStorage.getItem('chronos-prefs')")
    })
  if (bootScript) {
    const replacement = parser.parseFromString(buildThemeBootScript({ storageKey, theme, useStorage: keepCustomizer }), 'text/html').head.firstElementChild
    if (replacement) {
      bootScript.replaceWith(replacement)
    }
  }

  doc.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href') || ''
    const label = link.textContent?.trim().replace(/\s+/g, ' ').toLowerCase() || ''
    const isLogoLink = link.classList.contains('chr-logo')

    if (/^layout-\d{2}\.html$/i.test(href)) {
      link.setAttribute('href', '#')
      link.setAttribute('data-demo-message', currentLayoutMessage)
      return
    }

    if (href === 'index.html' && (isLogoLink || singleLayoutTexts.has(label))) {
      link.setAttribute('href', '#main-content')
      link.setAttribute('data-demo-message', currentLayoutMessage)
      if (singleLayoutTexts.has(label)) {
        link.textContent = singleLayoutTexts.get(label)
      }
    }
  })

  if (keepCustomizer) {
    doc.querySelectorAll('script').forEach((script) => {
      if (script.src) return
      script.textContent = script.textContent?.replace(/localStorage\.getItem\('chronos-prefs'\)/g, `localStorage.getItem('${storageKey}')`) || ''
    })
  } else {
    doc.getElementById('chr-customizer-mount')?.remove()
  }

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`
}

function rewritePackageJson(name) {
  const json = JSON.parse(packageJsonRaw)
  json.name = name
  if (json.dependencies?.jszip) {
    delete json.dependencies.jszip
  }
  return `${JSON.stringify(json, null, 2)}\n`
}

function rewritePackageLock(name) {
  const json = JSON.parse(packageLockRaw)
  json.name = name
  if (json.packages?.['']) {
    json.packages[''].name = name
    if (json.packages[''].dependencies?.jszip) {
      delete json.packages[''].dependencies.jszip
    }
  }
  return `${JSON.stringify(json, null, 2)}\n`
}

function buildViteConfig() {
  return `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
})
`
}

function buildReadme({ packageTitle, layoutLabel, keepCustomizer }) {
  return `# ${packageTitle}

This package contains the exported ${layoutLabel} layout from Chronos.

## Getting started

Install dependencies, then start the local preview server.

## Included

- Single exported layout as \`index.html\`
- Shared Chronos source files required for the layout
- Theme defaults baked into the project from the customizer state
- ${keepCustomizer ? 'Live customizer included for further adjustments' : 'Customizer UI and runtime removed from the exported package'}

## Notes

- The downloaded package runs through Vite.
- Links to other Chronos layouts are stripped or converted because this export contains one layout only.
- Update the exported content, links, and demo actions as needed for your own project.
`
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function downloadCustomizedPackage({ packageName, layoutFile, keepCustomizer, theme }) {
  const slug = sanitizePackageName(packageName)
  const archiveName = sanitizeArchiveName(packageName)
  const selectedLayout = LAYOUT_PACKAGE_OPTIONS.find((option) => option.file === layoutFile) || LAYOUT_PACKAGE_OPTIONS[0]
  const html = LAYOUT_HTML[selectedLayout.file]

  if (!html) {
    throw new Error('The selected layout could not be packaged.')
  }

  const storageKey = buildStorageKey(slug)
  const zip = new JSZip()

  zip.file('index.html', rewriteRootHtml(html, { keepCustomizer, storageKey, theme }))
  zip.file('package.json', rewritePackageJson(slug))
  zip.file('package-lock.json', rewritePackageLock(slug))
  zip.file('vite.config.js', buildViteConfig())
  zip.file('.gitignore', gitignoreRaw)
  zip.file('README.md', buildReadme({ packageTitle: archiveName, layoutLabel: selectedLayout.label, keepCustomizer }))
  zip.file('src/style.css', styleRaw)
  zip.file('src/main.js', rewriteMainSource(keepCustomizer))
  zip.file('src/fonts.js', fontsRaw)
  zip.file('src/transitions.js', transitionsRaw)
  if (keepCustomizer) {
    zip.file('src/customizer.js', rewriteCustomizerSource(theme, { keepCustomizer, storageKey }))
    zip.file('src/customizer-html.js', rewriteCustomizerHtml())
    zip.file('src/package-name-utils.js', packageNameUtilsRaw)
  }
  zip.file('public/favicon.svg', faviconRaw)
  zip.file('public/icons.svg', iconsRaw)
  zip.file('src/theme-boot.js', themeBootRaw)

  const blob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(blob, `${archiveName}.zip`)
}
