// fonts.js - 70+ curated Google Fonts manifest

export const FONTS = {
  'Sans-Serif': [
    'DM Sans', 'Exo 2', 'Figtree', 'Geist', 'Inter', 'Josefin Sans', 'Karla',
    'Lexend', 'Manrope', 'Mulish', 'Nunito', 'Outfit', 'Plus Jakarta Sans',
    'Poppins', 'Public Sans', 'Raleway', 'Rubik', 'Sora', 'Space Grotesk', 'Work Sans'
  ],
  'Serif': [
    'Bitter', 'Cormorant Garamond', 'Crimson Pro', 'Domine', 'EB Garamond',
    'Libre Baskerville', 'Lora', 'Merriweather', 'Noto Serif', 'Playfair Display',
    'Source Serif 4', 'Spectral'
  ],
  'Display': [
    'Anton', 'Archivo Black', 'Barlow Condensed', 'Bebas Neue', 'Big Shoulders Display',
    'Changa', 'Creepster', 'Exo', 'Oswald', 'Press Start 2P', 'Readex Pro', 'Silkscreen', 'Syne', 'Teko', 'Unbounded'
  ],
  'Gothic / Historic': [
    'Almendra', 'Cinzel', 'MedievalSharp', 'Uncial Antiqua', 'UnifrakturMaguntia'
  ],
  'Futuristic / Tech': [
    'Audiowide', 'Electrolize', 'Iceland', 'Orbitron', 'Rajdhani', 'Tektur'
  ],
  'Monospace': [
    'Courier Prime', 'DM Mono', 'Fira Code', 'IBM Plex Mono', 'Inconsolata',
    'JetBrains Mono', 'Roboto Mono', 'Source Code Pro', 'Space Mono', 'VT323'
  ],
  'Handwriting': [
    'Caveat', 'Dancing Script', 'Pacifico', 'Sacramento'
  ]
}

const loadedFonts = new Set()
const loadingFonts = new Map()

export function loadGoogleFont(name) {
  if (loadedFonts.has(name)) return Promise.resolve()
  if (loadingFonts.has(name)) return loadingFonts.get(name)

  const encoded = name.replace(/ /g, '+')
  const href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700;800;900&display=swap`

  const request = new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => {
      loadedFonts.add(name)
      loadingFonts.delete(name)
      resolve()
    }
    link.onerror = () => {
      loadingFonts.delete(name)
      resolve()
    }
    document.head.appendChild(link)
  })

  loadingFonts.set(name, request)
  return request
}

export const ERA_DEFAULT_FONTS = {
  modern:     { heading: 'Plus Jakarta Sans', body: 'Inter', mono: 'JetBrains Mono', accent: 'Space Grotesk' },
  gothic:     { heading: 'Cinzel', body: 'Crimson Pro', mono: 'UnifrakturMaguntia', accent: 'UnifrakturMaguntia' },
  futuristic: { heading: 'Space Grotesk', body: 'Plus Jakarta Sans', mono: 'Space Mono', accent: 'Orbitron' },
  retro:      { heading: 'Playfair Display', body: 'Crimson Pro', mono: 'Inconsolata', accent: 'EB Garamond' },
  cyberpunk:  { heading: 'Orbitron', body: 'Tektur', mono: 'Space Mono', accent: 'Audiowide' },
  brutalist:  { heading: 'Archivo Black', body: 'Barlow Condensed', mono: 'Fira Code', accent: 'Oswald' },
  minimalist: { heading: 'Work Sans', body: 'Inter', mono: 'DM Mono', accent: 'Work Sans' },
  eco:        { heading: 'Sora', body: 'DM Sans', mono: 'Source Code Pro', accent: 'Nunito' },
  corporate:  { heading: 'Manrope', body: 'Inter', mono: 'IBM Plex Mono', accent: 'Work Sans' },
  artistic:   { heading: 'Unbounded', body: 'Syne', mono: 'Fira Code', accent: 'Anton' },
  apocalyptic:{ heading: 'UnifrakturMaguntia', body: 'Fira Code', mono: 'Space Mono', accent: 'Almendra' },
  liquid:     { heading: 'Lexend', body: 'DM Sans', mono: 'DM Mono', accent: 'Readex Pro' },
  jurassic:   { heading: 'Creepster', body: 'Lora', mono: 'Space Mono', accent: 'Bebas Neue' },
  pixelated:  { heading: 'Press Start 2P', body: 'VT323', mono: 'VT323', accent: 'Silkscreen' },
  iceage:     { heading: 'Changa', body: 'Exo 2', mono: 'JetBrains Mono', accent: 'Cinzel' },
  volcanic:   { heading: 'Archivo Black', body: 'Syne', mono: 'Source Code Pro', accent: 'Barlow Condensed' },
  magic:      { heading: 'Playfair Display', body: 'EB Garamond', mono: 'Courier Prime', accent: 'Dancing Script' }
}
