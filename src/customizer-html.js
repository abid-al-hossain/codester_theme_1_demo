export const CUSTOMIZER_HTML = /* html */ `
<aside
  id="chr-customizer"
  role="complementary"
  aria-label="Theme Customizer"
  x-data
  :class="$store.chr.open ? 'open' : ''"
>
  <button type="button"
    id="chr-customizer-toggle"
    onclick="Alpine.store('chr').toggle()"
    x-data
    :aria-label="$store.chr.open ? 'Close theme customizer' : 'Open theme customizer'"
    :aria-expanded="$store.chr.open ? 'true' : 'false'"
  >
    <span class="cust-toggle-label">CUSTOMIZE</span>
    <span class="cust-toggle-cue" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" focusable="false">
        <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </button>

  <div class="cust-header">
    <div>
      <div style="font-family:var(--font-accent);font-weight:800;font-size:1.1rem;color:var(--color-primary)">CHRONOS</div>
      <div class="cust-subtitle">Preview styles here. Demo mode keeps export disabled while you explore the layouts.</div>
      <div style="margin-top:8px;font-size:0.75rem;line-height:1.5;color:var(--color-text-2);font-weight:600;">Demo Mode: export and package download are disabled in this public preview.</div>
      <div
        x-show="$store.chr.isModified()"
        x-cloak
        style="margin-top:10px;display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;background:color-mix(in srgb, var(--color-primary) 10%, transparent);border:1px solid color-mix(in srgb, var(--color-primary) 24%, transparent);font-size:0.72rem;font-weight:700;color:var(--color-text)"
      >
        <span aria-hidden="true" style="width:8px;height:8px;border-radius:999px;background:var(--color-primary)"></span>
        <span x-text="$store.chr.getModifiedMessage()"></span>
      </div>
    </div>
  </div>

  <div class="cust-tabs" role="tablist">
    <button type="button" class="cust-tab" :class="$store.chr.activeTab==='era'?'active':''" @click="$store.chr.setActiveTab('era')" @keydown.arrow-right.prevent="$store.chr.moveTab('era', 1)" @keydown.arrow-left.prevent="$store.chr.moveTab('era', -1)" @keydown.home.prevent="$store.chr.focusFirstTab()" @keydown.end.prevent="$store.chr.focusLastTab()" role="tab" id="chr-tab-era" :aria-selected="$store.chr.activeTab==='era' ? 'true' : 'false'" aria-controls="chr-panel-era">Eras</button>
    <button type="button" class="cust-tab" :class="$store.chr.activeTab==='colors'?'active':''" @click="$store.chr.setActiveTab('colors')" @keydown.arrow-right.prevent="$store.chr.moveTab('colors', 1)" @keydown.arrow-left.prevent="$store.chr.moveTab('colors', -1)" @keydown.home.prevent="$store.chr.focusFirstTab()" @keydown.end.prevent="$store.chr.focusLastTab()" role="tab" id="chr-tab-colors" :aria-selected="$store.chr.activeTab==='colors' ? 'true' : 'false'" aria-controls="chr-panel-colors">Colors</button>
    <button type="button" class="cust-tab" :class="$store.chr.activeTab==='fonts'?'active':''" @click="$store.chr.setActiveTab('fonts')" @keydown.arrow-right.prevent="$store.chr.moveTab('fonts', 1)" @keydown.arrow-left.prevent="$store.chr.moveTab('fonts', -1)" @keydown.home.prevent="$store.chr.focusFirstTab()" @keydown.end.prevent="$store.chr.focusLastTab()" role="tab" id="chr-tab-fonts" :aria-selected="$store.chr.activeTab==='fonts' ? 'true' : 'false'" aria-controls="chr-panel-fonts">Fonts</button>
    <!-- DOWNLOAD_TAB_START -->
    <button type="button" x-show="$store.chr.downloadAvailable" class="cust-tab" :class="$store.chr.activeTab==='download'?'active':''" @click="$store.chr.setActiveTab('download')" @keydown.arrow-right.prevent="$store.chr.moveTab('download', 1)" @keydown.arrow-left.prevent="$store.chr.moveTab('download', -1)" @keydown.home.prevent="$store.chr.focusFirstTab()" @keydown.end.prevent="$store.chr.focusLastTab()" role="tab" id="chr-tab-download" :aria-selected="$store.chr.activeTab==='download' ? 'true' : 'false'" aria-controls="chr-panel-download">Download</button>
    <!-- DOWNLOAD_TAB_END -->
    <!-- LAYOUTS_TAB_START -->
    <button type="button" class="cust-tab" :class="$store.chr.activeTab==='layouts'?'active':''" @click="$store.chr.setActiveTab('layouts')" @keydown.arrow-right.prevent="$store.chr.moveTab('layouts', 1)" @keydown.arrow-left.prevent="$store.chr.moveTab('layouts', -1)" @keydown.home.prevent="$store.chr.focusFirstTab()" @keydown.end.prevent="$store.chr.focusLastTab()" role="tab" id="chr-tab-layouts" :aria-selected="$store.chr.activeTab==='layouts' ? 'true' : 'false'" aria-controls="chr-panel-layouts">Layouts</button>
    <!-- LAYOUTS_TAB_END -->
  </div>

  <div class="cust-body">
    <div x-show="$store.chr.activeTab==='era'" x-cloak role="tabpanel" id="chr-panel-era" aria-labelledby="chr-tab-era">
      <span class="cust-label">Select Era</span>
      <div class="era-grid">
        <button type="button" class="era-card" :class="$store.chr.era==='modern'?'active':''" @click="$store.chr.setEra('modern')">Modern</button>
        <button type="button" class="era-card" :class="$store.chr.era==='gothic'?'active':''" @click="$store.chr.setEra('gothic')">Gothic</button>
        <button type="button" class="era-card" :class="$store.chr.era==='futuristic'?'active':''" @click="$store.chr.setEra('futuristic')">Futuristic</button>
        <button type="button" class="era-card" :class="$store.chr.era==='retro'?'active':''" @click="$store.chr.setEra('retro')">Retro</button>
        <button type="button" class="era-card" :class="$store.chr.era==='cyberpunk'?'active':''" @click="$store.chr.setEra('cyberpunk')">Cyberpunk</button>
        <button type="button" class="era-card" :class="$store.chr.era==='brutalist'?'active':''" @click="$store.chr.setEra('brutalist')">Brutalist</button>
        <button type="button" class="era-card" :class="$store.chr.era==='minimalist'?'active':''" @click="$store.chr.setEra('minimalist')">Minimalist</button>
        <button type="button" class="era-card" :class="$store.chr.era==='eco'?'active':''" @click="$store.chr.setEra('eco')">Eco</button>
        <button type="button" class="era-card" :class="$store.chr.era==='corporate'?'active':''" @click="$store.chr.setEra('corporate')">Corporate</button>
        <button type="button" class="era-card" :class="$store.chr.era==='artistic'?'active':''" @click="$store.chr.setEra('artistic')">Artistic</button>
        <button type="button" class="era-card" :class="$store.chr.era==='apocalyptic'?'active':''" @click="$store.chr.setEra('apocalyptic')">Apocalyptic</button>
        <button type="button" class="era-card" :class="$store.chr.era==='liquid'?'active':''" @click="$store.chr.setEra('liquid')">Liquid</button>
        <button type="button" class="era-card" :class="$store.chr.era==='jurassic'?'active':''" @click="$store.chr.setEra('jurassic')">Jurassic</button>
        <button type="button" class="era-card" :class="$store.chr.era==='pixelated'?'active':''" @click="$store.chr.setEra('pixelated')">Pixelated</button>
        <button type="button" class="era-card" :class="$store.chr.era==='iceage'?'active':''" @click="$store.chr.setEra('iceage')">Ice Age</button>
        <button type="button" class="era-card" :class="$store.chr.era==='volcanic'?'active':''" @click="$store.chr.setEra('volcanic')">Volcanic</button>
        <button type="button" class="era-card" :class="$store.chr.era==='magic'?'active':''" @click="$store.chr.setEra('magic')">Magic</button>
      </div>

      <span class="cust-label" style="margin-top:20px">Era Status</span>
      <div style="font-size:0.78rem;color:var(--color-text-2);background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:12px;line-height:1.6">
        <span x-text="$store.chr.era.charAt(0).toUpperCase()+$store.chr.era.slice(1)"></span> is active.
        The same layout structure now reflects a new era token set.
      </div>
    </div>

    <div x-show="$store.chr.activeTab==='colors'" x-cloak role="tabpanel" id="chr-panel-colors" aria-labelledby="chr-tab-colors">
      <span class="cust-label">Preset Palettes</span>
      <div class="palette-grid" style="margin-bottom:18px">
        <template x-for="palette in $store.chr.paletteOptions" :key="palette.id">
          <button type="button"
            class="palette-card"
            :class="$store.chr.activePalette === palette.id ? 'active' : ''"
            @click="$store.chr.applyPalette(palette.id)"
            :aria-pressed="$store.chr.activePalette === palette.id ? 'true' : 'false'"
          >
            <span class="palette-swatch-stack" aria-hidden="true">
              <span class="palette-swatch" :style="'background:' + palette.colors.primary"></span>
              <span class="palette-swatch" :style="'background:' + palette.colors.secondary"></span>
              <span class="palette-swatch" :style="'background:' + palette.colors.accent"></span>
              <span class="palette-swatch" :style="'background:' + palette.colors.surface"></span>
            </span>
            <span class="palette-meta">
              <span class="palette-name" x-text="palette.label"></span>
              <span class="palette-sub" x-text="palette.mode"></span>
            </span>
          </button>
        </template>
      </div>

      <span class="cust-label">Fine Tune Colors</span>
      <div>
        <div class="color-row">
          <label for="chr-color-primary">Primary</label>
          <input id="chr-color-primary" type="color" :value="$store.chr.colors.primary" @input="$store.chr.setColor('primary',$event.target.value)">
        </div>
        <div class="color-row">
          <label for="chr-color-secondary">Secondary</label>
          <input id="chr-color-secondary" type="color" :value="$store.chr.colors.secondary" @input="$store.chr.setColor('secondary',$event.target.value)">
        </div>
        <div class="color-row">
          <label for="chr-color-accent">Accent</label>
          <input id="chr-color-accent" type="color" :value="$store.chr.colors.accent" @input="$store.chr.setColor('accent',$event.target.value)">
        </div>
        <div class="color-row">
          <label for="chr-color-bg">Background</label>
          <input id="chr-color-bg" type="color" :value="$store.chr.colors.bg" @input="$store.chr.setColor('bg',$event.target.value)">
        </div>
        <div class="color-row">
          <label for="chr-color-bg2">Section</label>
          <input id="chr-color-bg2" type="color" :value="$store.chr.colors.bg2" @input="$store.chr.setColor('bg2',$event.target.value)">
        </div>
        <div class="color-row">
          <label for="chr-color-surface">Surface</label>
          <input id="chr-color-surface" type="color" :value="$store.chr.colors.surface" @input="$store.chr.setColor('surface',$event.target.value)">
        </div>
        <div class="color-row">
          <label for="chr-color-text">Text</label>
          <input id="chr-color-text" type="color" :value="$store.chr.colors.text" @input="$store.chr.setColor('text',$event.target.value)">
        </div>
      </div>
    </div>

    <div x-show="$store.chr.activeTab==='fonts'" x-cloak role="tabpanel" id="chr-panel-fonts" aria-labelledby="chr-tab-fonts">
      <template x-for="f in [{id:'heading', label:'Heading'}, {id:'body', label:'Body'}, {id:'accent', label:'Accent / Display'}, {id:'mono', label:'Monospace'}]" :key="f.id">
        <div style="margin-bottom:16px;">
          <span class="cust-label" x-text="f.label + ' Font'"></span>

          <div x-data="chrFontDropdown(f.id)" @click.outside="open = false" style="position:relative">
            <button type="button" @click="toggle()" :aria-expanded="open ? 'true' : 'false'" :aria-controls="'chr-font-list-' + f.id" :aria-label="'Select ' + f.label + ' font'" style="width:100%;display:flex;justify-content:space-between;align-items:center;background:var(--color-bg);border:1px solid var(--color-border);padding:10px 14px;border-radius:var(--radius-sm);color:var(--color-text);font-size:0.85rem;cursor:pointer;">
              <span x-text="$store.chr.fonts[f.id]" :style="'font-family:' + $store.chr.fonts[f.id]"></span>
              <span style="font-size:0.6rem;opacity:0.5">v</span>
            </button>

            <div x-show="open" :id="'chr-font-list-' + f.id" role="listbox" :aria-label="f.label + ' font options'" style="position:absolute;top:calc(100% + 4px);left:0;width:100%;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-sm);z-index:100;box-shadow:0 10px 25px rgba(0,0,0,0.2)" x-transition x-cloak>
              <div style="padding:8px">
                <input type="text" x-model="search" x-ref="search" :aria-label="'Search ' + f.label + ' fonts'" @input="activeIndex = 0" @keydown.arrow-down.prevent="move(1)" @keydown.arrow-up.prevent="move(-1)" @keydown.enter.prevent="selectActive()" placeholder="Search fonts..." style="width:100%;padding:8px 12px;background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:4px;color:var(--color-text);font-size:0.8rem;outline:none;cursor:text">
              </div>
              <div style="max-height:220px;overflow-y:auto;padding-bottom:8px">
                <template x-for="(font, index) in filtered" :key="font">
                  <button
                    type="button"
                    role="option"
                    :aria-selected="$store.chr.fonts[f.id] === font ? 'true' : 'false'"
                    @click="selectFont(font)"
                    @mouseenter="activeIndex = index"
                    :style="\`display:block;width:100%;padding:8px 16px;font-size:0.9rem;text-align:left;cursor:pointer;border:0;font-family:\${font};\` + (($store.chr.fonts[f.id] === font || activeIndex === index) ? 'background:var(--color-bg-2);color:var(--color-text)' : 'background:transparent;color:var(--color-text)')"
                    x-text="font"
                  ></button>
                </template>
                <div x-show="filtered.length===0" class="font-empty-state" style="padding:16px;text-align:center;font-size:0.8rem;cursor:default">No fonts found</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="font-picker-note" style="margin-top:16px;font-size:0.75rem">
        70+ fonts available. Loaded on demand to keep performance fast.
      </div>
    </div>

    <!-- DOWNLOAD_PANEL_START -->
    <div x-show="$store.chr.downloadAvailable && $store.chr.activeTab==='download'" x-cloak role="tabpanel" id="chr-panel-download" aria-labelledby="chr-tab-download">
      <span class="cust-label">Layout Package</span>
      <p style="font-size:0.78rem;color:var(--color-text-2);margin-bottom:14px;line-height:1.6">
        This panel shows the package builder interface so visitors can review the export setup.
      </p>

      <div style="margin-bottom:14px;padding:12px;background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:var(--radius-md);font-size:0.78rem;line-height:1.6;color:var(--color-text-2)">
        <strong style="color:var(--color-text)">Preview only:</strong> the export controls are visible here, but the actual download button is disabled in this preview.
      </div>

      <label class="cust-label" for="chr-package-name">Package name</label>
      <input id="chr-package-name" type="text" x-model="$store.chr.downloadPackageName" placeholder="my-brand-site" style="width:100%;padding:11px 12px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-sm);color:var(--color-text);font-size:0.85rem;outline:none" disabled aria-disabled="true">

      <label class="cust-label">Current layout</label>
      <div style="padding:11px 12px;background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:var(--radius-sm);color:var(--color-text);font-size:0.84rem;line-height:1.5">
        <strong x-text="$store.chr.currentLayoutLabel || 'Layout page'"></strong>
        <div style="margin-top:4px;color:var(--color-text-2)">This page will be exported as <code style="font-family:var(--font-mono)">index.html</code>.</div>
      </div>

      <label class="cust-label">Customizer in download</label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button type="button" class="era-card" :class="$store.chr.downloadMode==='without-customizer' ? 'active' : ''" :aria-pressed="$store.chr.downloadMode==='without-customizer' ? 'true' : 'false'" @click="$store.chr.downloadMode='without-customizer'" disabled aria-disabled="true">Without</button>
        <button type="button" class="era-card" :class="$store.chr.downloadMode==='with-customizer' ? 'active' : ''" :aria-pressed="$store.chr.downloadMode==='with-customizer' ? 'true' : 'false'" @click="$store.chr.downloadMode='with-customizer'" disabled aria-disabled="true">With</button>
      </div>

      <div style="margin-top:16px;padding:12px;background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:var(--radius-md);display:grid;gap:6px">
        <div style="font-size:0.74rem;color:var(--color-text-3);text-transform:uppercase;letter-spacing:0.08em">Package preview</div>
        <div style="font-size:0.84rem;color:var(--color-text)"><strong>Zip:</strong> <span x-text="$store.chr.getDownloadFileName()"></span></div>
        <div style="font-size:0.84rem;color:var(--color-text-2)"><strong>Starts with:</strong> current page as <code style="font-family:var(--font-mono)">index.html</code></div>
        <div style="font-size:0.84rem;color:var(--color-text-2);line-height:1.6">
          <strong>Run in terminal:</strong><br>
          <code style="font-family:var(--font-mono);display:block;margin-top:6px">npm install</code>
          <code style="font-family:var(--font-mono);display:block">npm run dev</code>
        </div>
      </div>

      <p x-show="$store.chr.downloadError" x-text="$store.chr.downloadError" style="margin:12px 0 0;color:#dc2626;font-size:0.78rem;line-height:1.5"></p>

      <button type="button" class="chr-btn-primary" style="width:100%;justify-content:center;font-size:0.84rem;padding:12px 16px;margin-top:16px;opacity:.62;cursor:not-allowed" :disabled="true" aria-disabled="true" @click="$store.chr.downloadPackage()">
        <span>Download Disabled In Demo</span>
      </button>
    </div>
    <!-- DOWNLOAD_PANEL_END -->


    <!-- LAYOUTS_PANEL_START -->
    <div x-show="$store.chr.activeTab==='layouts'" x-cloak role="tabpanel" id="chr-panel-layouts" aria-labelledby="chr-tab-layouts">
      <span class="cust-label" style="display:flex;justify-content:space-between;align-items:center">
        Theme Layouts
        <a href="index.html" style="font-size:0.7rem;font-weight:normal;color:var(--color-primary);text-decoration:underline">View Index</a>
      </span>
      <div style="display:flex;flex-direction:column;gap:8px">
        <a href="layout-01.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><defs><linearGradient id="l01" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#2563eb"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs><rect width="160" height="100" fill="#f8fbff"/><rect width="160" height="12" fill="#eaf1f8"/><rect x="12" y="23" width="56" height="6" rx="3" fill="#14213d"/><rect x="12" y="33" width="46" height="4" rx="2" fill="#7c8fa5"/><rect x="12" y="40" width="50" height="4" rx="2" fill="#7c8fa5"/><rect x="12" y="50" width="26" height="8" rx="4" fill="#2563eb"/><rect x="42" y="50" width="22" height="8" rx="4" fill="#cfe0ff"/><rect x="89" y="22" width="58" height="42" rx="6" fill="#fff" stroke="#d6e3f0"/><rect x="96" y="28" width="44" height="18" rx="4" fill="url(#l01)" opacity=".85"/><rect x="96" y="52" width="20" height="6" rx="3" fill="#d9e4f2"/><rect x="120" y="52" width="20" height="6" rx="3" fill="#2563eb" opacity=".18"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Modern SaaS Landing</div>
            <div class="layout-link-meta">Layout 01</div>
          </div>
        </a>
        <a href="layout-02.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><defs><linearGradient id="l02" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#60a5fa"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs><rect width="160" height="100" fill="#f5f7fb"/><rect width="58" height="100" fill="#171717"/><rect x="10" y="14" width="28" height="4" rx="2" fill="#fff"/><rect x="10" y="68" width="36" height="6" rx="3" fill="#fff"/><rect x="10" y="78" width="28" height="4" rx="2" fill="#8f8f8f"/><rect x="68" y="12" width="80" height="44" rx="7" fill="url(#l02)"/><rect x="68" y="64" width="68" height="6" rx="3" fill="#111827"/><rect x="68" y="74" width="54" height="4" rx="2" fill="#94a3b8"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Creative Portfolio</div>
            <div class="layout-link-meta">Layout 02</div>
          </div>
        </a>
        <a href="layout-03.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><defs><linearGradient id="l03" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ef4444"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><rect width="160" height="100" fill="#fff7ef"/><rect x="0" y="0" width="160" height="12" fill="#101010"/><rect x="10" y="18" width="88" height="28" rx="5" fill="url(#l03)"/><rect x="104" y="18" width="46" height="28" rx="5" fill="#fff" stroke="#fed7aa"/><rect x="10" y="52" width="42" height="36" rx="5" fill="#fff" stroke="#fed7aa"/><rect x="58" y="52" width="42" height="36" rx="5" fill="#fff" stroke="#fed7aa"/><rect x="106" y="52" width="44" height="36" rx="5" fill="#111827"/><rect x="16" y="58" width="24" height="4" rx="2" fill="#111827"/><rect x="64" y="58" width="24" height="4" rx="2" fill="#111827"/><rect x="112" y="58" width="24" height="4" rx="2" fill="#fff"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Editorial Feed</div>
            <div class="layout-link-meta">Layout 03</div>
          </div>
        </a>
        <a href="layout-04.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#f5efe1"/><rect x="16" y="10" width="128" height="1.5" fill="#b08968"/><rect x="16" y="88" width="128" height="1.5" fill="#b08968"/><rect x="44" y="22" width="72" height="4" rx="2" fill="#6b4f3a"/><rect x="54" y="32" width="52" height="2.5" rx="1.25" fill="#b08968"/><rect x="46" y="44" width="68" height="2.5" rx="1.25" fill="#8b7355"/><rect x="46" y="52" width="68" height="2.5" rx="1.25" fill="#8b7355"/><rect x="46" y="60" width="68" height="2.5" rx="1.25" fill="#8b7355"/><rect x="58" y="72" width="44" height="2.5" rx="1.25" fill="#b08968"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Text Manuscript</div>
            <div class="layout-link-meta">Layout 04</div>
          </div>
        </a>
        <a href="layout-05.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#eef7fb"/><rect width="36" height="100" fill="#0f172a"/><rect x="44" y="8" width="108" height="12" rx="4" fill="#fff"/><rect x="44" y="28" width="32" height="22" rx="5" fill="#14b8a6"/><rect x="82" y="28" width="32" height="22" rx="5" fill="#38bdf8"/><rect x="120" y="28" width="32" height="22" rx="5" fill="#cfeefa"/><rect x="44" y="56" width="108" height="30" rx="6" fill="#fff" stroke="#d6e9f5"/><rect x="50" y="62" width="96" height="4" rx="2" fill="#9fb9ca"/><rect x="50" y="70" width="74" height="4" rx="2" fill="#9fb9ca"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Web App Dashboard</div>
            <div class="layout-link-meta">Layout 05</div>
          </div>
        </a>
        <a href="layout-06.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><defs><linearGradient id="l06" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f43f5e"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs><rect width="160" height="100" fill="#120f18"/><rect x="14" y="16" width="58" height="32" rx="6" fill="url(#l06)" opacity=".95"/><rect x="84" y="12" width="52" height="20" rx="4" fill="#fef08a"/><rect x="74" y="40" width="68" height="38" rx="8" fill="#fff" opacity=".1" stroke="#ffffff33"/><rect x="20" y="60" width="46" height="6" rx="3" fill="#fff"/><rect x="20" y="72" width="38" height="4" rx="2" fill="#c4b5fd"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Artistic Showcase</div>
            <div class="layout-link-meta">Layout 06</div>
          </div>
        </a>
        <a href="layout-07.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#031322"/><path d="M0 14h160M0 34h160M0 54h160M0 74h160M0 94h160M20 0v100M60 0v100M100 0v100M140 0v100" stroke="#0f3550" stroke-width="0.8" opacity=".55"/><rect x="40" y="18" width="80" height="7" rx="3.5" fill="#67e8f9" opacity=".8"/><rect x="28" y="32" width="104" height="10" rx="5" fill="#fff"/><rect x="36" y="48" width="88" height="5" rx="2.5" fill="#86a9c1"/><rect x="24" y="62" width="24" height="18" rx="4" fill="#0f3550" stroke="#67e8f9"/><rect x="52" y="62" width="24" height="18" rx="4" fill="#0f3550" stroke="#67e8f9"/><rect x="80" y="62" width="24" height="18" rx="4" fill="#0f3550" stroke="#67e8f9"/><rect x="108" y="62" width="24" height="18" rx="4" fill="#0f3550" stroke="#67e8f9"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Futuristic Launch</div>
            <div class="layout-link-meta">Layout 07</div>
          </div>
        </a>
        <a href="layout-08.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#fbfbfa"/><rect x="20" y="10" width="120" height="2" rx="1" fill="#cbd5e1"/><rect x="34" y="24" width="92" height="5" rx="2.5" fill="#111827"/><rect x="44" y="34" width="72" height="2.5" rx="1.25" fill="#94a3b8"/><rect x="32" y="48" width="96" height="16" rx="6" fill="#ffffff" stroke="#e5e7eb"/><rect x="32" y="70" width="96" height="16" rx="6" fill="#ffffff" stroke="#e5e7eb"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Minimal Journal</div>
            <div class="layout-link-meta">Layout 08</div>
          </div>
        </a>
        <a href="layout-09.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#050507"/><rect y="10" width="160" height="2" fill="#ff0080"/><rect x="16" y="22" width="76" height="8" rx="4" fill="#00ffff"/><rect x="16" y="34" width="60" height="6" rx="3" fill="#ff0080"/><rect x="16" y="46" width="54" height="4" rx="2" fill="#6b7280"/><rect x="102" y="24" width="42" height="24" rx="5" fill="#0f172a" stroke="#00ffff"/><rect x="16" y="62" width="128" height="10" rx="5" fill="#111827" stroke="#ff0080"/><rect x="16" y="78" width="128" height="10" rx="5" fill="#111827" stroke="#00ffff"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Cyberpunk Agency</div>
            <div class="layout-link-meta">Layout 09</div>
          </div>
        </a>
        <a href="layout-10.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#f3ede1"/><rect width="40" height="100" fill="#0d0a08"/><rect x="8" y="12" width="24" height="4" rx="2" fill="#d4af37"/><rect x="8" y="24" width="24" height="2.5" rx="1.25" fill="#826a2a"/><rect x="50" y="10" width="100" height="12" rx="4" fill="#e4dac3"/><rect x="50" y="30" width="96" height="56" rx="6" fill="#fbf7ef" stroke="#c7b68a"/><rect x="60" y="40" width="56" height="5" rx="2.5" fill="#5b4630"/><rect x="60" y="50" width="72" height="3" rx="1.5" fill="#af9a77"/><rect x="60" y="58" width="72" height="3" rx="1.5" fill="#af9a77"/><rect x="60" y="66" width="48" height="3" rx="1.5" fill="#af9a77"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Gothic Archive</div>
            <div class="layout-link-meta">Layout 10</div>
          </div>
        </a>
        <a href="layout-11.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#f5f8fc"/><rect width="160" height="12" fill="#dbe7f2"/><rect x="12" y="22" width="62" height="6" rx="3" fill="#183153"/><rect x="12" y="34" width="54" height="4" rx="2" fill="#6f8296"/><rect x="12" y="48" width="48" height="22" rx="5" fill="#ffffff" stroke="#d0dcea"/><rect x="66" y="48" width="38" height="22" rx="5" fill="#eef4f8"/><rect x="110" y="22" width="38" height="48" rx="6" fill="#1e3a6e" opacity=".14"/><rect x="110" y="30" width="26" height="4" rx="2" fill="#1e3a6e"/><rect x="110" y="40" width="32" height="4" rx="2" fill="#7a8ea8"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Enterprise Business</div>
            <div class="layout-link-meta">Layout 11</div>
          </div>
        </a>
        <a href="layout-12.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#fbfcfd"/><rect x="10" y="18" width="86" height="28" rx="6" fill="#eef3f7"/><rect x="104" y="18" width="46" height="54" rx="6" fill="#ffffff" stroke="#e8e7e3"/><rect x="18" y="26" width="34" height="4" rx="2" fill="#111111"/><rect x="18" y="36" width="54" height="4" rx="2" fill="#979792"/><rect x="10" y="54" width="66" height="24" rx="6" fill="#ffffff" stroke="#e8e7e3"/><circle cx="126" cy="38" r="10" fill="#14b8a6" opacity=".18"/><rect x="114" y="56" width="24" height="4" rx="2" fill="#5b5b56"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Medical Care</div>
            <div class="layout-link-meta">Layout 12</div>
          </div>
        </a>
        <a href="layout-13.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#f7faf5"/><rect x="10" y="16" width="72" height="40" rx="6" fill="#eef4ea"/><rect x="90" y="16" width="60" height="40" rx="6" fill="#ffffff" stroke="#c2d9bc"/><rect x="18" y="24" width="36" height="4" rx="2" fill="#1a2e1b"/><rect x="18" y="34" width="50" height="4" rx="2" fill="#7a9e7b"/><rect x="10" y="64" width="40" height="18" rx="5" fill="#ffffff" stroke="#c2d9bc"/><rect x="56" y="64" width="40" height="18" rx="5" fill="#ffffff" stroke="#c2d9bc"/><rect x="102" y="64" width="48" height="18" rx="5" fill="#3d6e3e" opacity=".15"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Education Campus</div>
            <div class="layout-link-meta">Layout 13</div>
          </div>
        </a>
        <a href="layout-14.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#e9fdff"/><rect x="12" y="18" width="84" height="30" rx="8" fill="#ffffff" opacity=".72" stroke="#ffffff"/><rect x="104" y="18" width="44" height="40" rx="10" fill="#ffffff" opacity=".72" stroke="#ffffff"/><rect x="20" y="26" width="42" height="5" rx="2.5" fill="#083344"/><rect x="20" y="36" width="54" height="4" rx="2" fill="#2993b8"/><rect x="14" y="60" width="40" height="22" rx="8" fill="#62d0ff"/><rect x="60" y="60" width="40" height="22" rx="8" fill="#7dd3fc"/><rect x="106" y="64" width="40" height="18" rx="8" fill="#2dd4bf" opacity=".6"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Travel Explorer</div>
            <div class="layout-link-meta">Layout 14</div>
          </div>
        </a>
        <a href="layout-15.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#fbfdff"/><rect x="10" y="16" width="76" height="44" rx="6" fill="#ffffff" stroke="#dde7f1"/><rect x="94" y="16" width="56" height="52" rx="6" fill="#ffffff" stroke="#dde7f1"/><rect x="18" y="24" width="12" height="12" rx="4" fill="#2563eb" opacity=".2"/><rect x="36" y="24" width="38" height="4" rx="2" fill="#0f172a"/><rect x="36" y="34" width="30" height="4" rx="2" fill="#8aa0b5"/><rect x="18" y="44" width="56" height="8" rx="4" fill="#f3f7fb"/><rect x="102" y="24" width="34" height="4" rx="2" fill="#2563eb"/><rect x="102" y="36" width="40" height="4" rx="2" fill="#14b8a6"/><rect x="102" y="52" width="28" height="4" rx="2" fill="#8aa0b5"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Social Community</div>
            <div class="layout-link-meta">Layout 15</div>
          </div>
        </a>
        <a href="layout-16.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#181510"/><rect x="0" y="34" width="160" height="34" fill="#2c251a"/><path d="M0 70 22 58 40 78 62 52 82 74 104 48 122 78 142 56 160 68V100H0Z" fill="#1f1a14"/><rect x="18" y="16" width="70" height="8" rx="4" fill="#c19a6b"/><rect x="18" y="28" width="56" height="4" rx="2" fill="#7f6742"/><rect x="96" y="18" width="42" height="42" rx="8" fill="#2f281d" stroke="#6b5a3e"/><path d="M104 52c8-20 10-20 18 0M118 52c6-14 8-14 14 0" stroke="#d4b483" stroke-width="3" fill="none"/><rect x="22" y="76" width="116" height="8" rx="4" fill="#3a301f"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Jurassic Museum</div>
            <div class="layout-link-meta">Layout 16</div>
          </div>
        </a>
        <a href="layout-17.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#000"/><rect x="10" y="10" width="58" height="38" fill="#000" stroke="#39ff14" stroke-width="2"/><rect x="10" y="10" width="58" height="8" fill="#39ff14"/><rect x="82" y="18" width="68" height="50" fill="#000" stroke="#39ff14" stroke-width="2"/><rect x="82" y="18" width="68" height="8" fill="#39ff14"/><rect x="18" y="60" width="42" height="24" fill="#000" stroke="#ff00ff" stroke-width="2"/><rect x="18" y="60" width="42" height="8" fill="#ff00ff"/><rect x="92" y="74" width="48" height="6" rx="3" fill="#39ff14"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Pixelated Desktop</div>
            <div class="layout-link-meta">Layout 17</div>
          </div>
        </a>
        <a href="layout-18.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#def5fa"/><rect x="12" y="12" width="96" height="36" rx="10" fill="#ffffff" fill-opacity=".46" stroke="#ffffff" stroke-opacity=".65"/><rect x="52" y="30" width="96" height="52" rx="12" fill="#ffffff" fill-opacity=".58" stroke="#ffffff" stroke-opacity=".8"/><rect x="20" y="20" width="38" height="4" rx="2" fill="#006064" opacity=".75"/><rect x="20" y="30" width="52" height="4" rx="2" fill="#6aaab2"/><circle cx="30" cy="78" r="14" fill="#006064" opacity=".15"/><rect x="98" y="42" width="28" height="4" rx="2" fill="#006064" opacity=".65"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Glacier Expeditions</div>
            <div class="layout-link-meta">Layout 18</div>
          </div>
        </a>
        <a href="layout-19.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#050505"/><rect x="10" y="18" width="46" height="64" fill="#0d0800" stroke="#ff3d00" stroke-width="2"/><rect x="10" y="18" width="46" height="8" fill="#ff3d00"/><rect x="68" y="18" width="82" height="18" fill="#120900" stroke="#ff3d00" stroke-width="2"/><rect x="68" y="42" width="82" height="20" fill="#120900" stroke="#ff3d00" stroke-width="2"/><rect x="68" y="68" width="82" height="14" fill="#120900" stroke="#ff3d00" stroke-width="2"/><rect x="18" y="34" width="30" height="4" rx="2" fill="#ffc400"/><rect x="18" y="46" width="30" height="4" rx="2" fill="#ff6a00"/><rect x="76" y="48" width="46" height="4" rx="2" fill="#ffc400"/><rect x="124" y="48" width="16" height="4" rx="2" fill="#ff3d00"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Geothermic Console</div>
            <div class="layout-link-meta">Layout 19</div>
          </div>
        </a>
        <a href="layout-20.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><svg viewBox="0 0 160 100" preserveAspectRatio="none" class="layout-thumb-svg"><rect width="160" height="100" fill="#0b0c10"/><rect x="18" y="12" width="124" height="76" rx="14" fill="#16182c" stroke="#d4af37"/><rect x="28" y="22" width="104" height="56" rx="10" fill="#11131f" stroke="#6c5c2b"/><rect x="38" y="30" width="84" height="4" rx="2" fill="#d4af37" opacity=".8"/><rect x="38" y="40" width="66" height="3" rx="1.5" fill="#8f7d45"/><rect x="38" y="48" width="72" height="3" rx="1.5" fill="#8f7d45"/><rect x="38" y="56" width="54" height="3" rx="1.5" fill="#8f7d45"/><circle cx="112" cy="58" r="12" fill="#181a38" stroke="#d4af37"/><path d="M112 48l3.5 7 7.5 1-5.5 5.2 1.4 7.8-6.9-3.8-6.9 3.8 1.4-7.8-5.5-5.2 7.5-1z" fill="#d4af37"/></svg></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">The Grand Library</div>
            <div class="layout-link-meta">Layout 20</div>
          </div>
        </a>
      </div>
      <div style="margin-top:20px;padding:12px;background:var(--color-bg-2);border-radius:var(--radius-md);border:1px solid var(--color-border)">
        <p style="font-size:0.75rem;color:var(--color-text-2);margin:0;line-height:1.5">
          <strong>Tip:</strong> Each layout remembers its own choices locally, so a first visit still opens in that layout's default era.
        </p>
      </div>
    </div>
    <!-- LAYOUTS_PANEL_END -->
  </div>

  <div class="cust-footer" style="padding:16px;border-top:1px solid var(--color-border);background:var(--color-bg);flex-shrink:0;display:flex;flex-direction:column;gap:8px;">
    <div class="surprise-action-row">
      <button type="button" class="chr-btn-primary" style="font-size:0.75rem;padding:10px 16px;justify-content:center;flex:1" @click="$store.chr.surpriseMe()">
        Surprise Me
      </button>
      <button class="chr-btn-ghost" type="button" style="font-size:0.75rem;padding:10px 14px;justify-content:center;min-width:98px" @click="$store.chr.toggleSurpriseSettings()">
        Settings
      </button>
    </div>
    <button type="button" class="chr-btn-ghost" style="font-size:0.75rem;padding:10px 16px;width:100%;justify-content:center" @click="$store.chr.reset()">
      Reset Theme
    </button>
    <button class="chr-btn-ghost" type="button" style="font-size:0.75rem;padding:10px 16px;width:100%;justify-content:center" @click="$store.chr.clearAllSavedThemeData()">
      Clear Saved Theme Data
    </button>
  </div>

  <div
    x-show="$store.chr.surpriseSettingsOpen"
    x-cloak
    class="surprise-modal-backdrop"
    x-transition:enter="surprise-fade-enter"
    x-transition:enter-start="surprise-fade-enter-start"
    x-transition:enter-end="surprise-fade-enter-end"
    x-transition:leave="surprise-fade-leave"
    x-transition:leave-start="surprise-fade-leave-start"
    x-transition:leave-end="surprise-fade-leave-end"
    @click.self="$store.chr.closeSurpriseSettings()"
    @keydown.escape.window="$store.chr.surpriseSettingsOpen && $store.chr.closeSurpriseSettings()"
  >
    <div
      id="chr-surprise-dialog"
      class="surprise-modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chr-surprise-title"
      x-transition:enter="surprise-card-enter"
      x-transition:enter-start="surprise-card-enter-start"
      x-transition:enter-end="surprise-card-enter-end"
      x-transition:leave="surprise-card-leave"
      x-transition:leave-start="surprise-card-leave-start"
      x-transition:leave-end="surprise-card-leave-end"
      @keydown.tab="$store.chr.handleSurpriseDialogTab($event)"
    >
      <div class="surprise-settings-head">
        <div>
          <div class="cust-label" id="chr-surprise-title" style="margin:0 0 4px">Surprise Me Settings</div>
          <div class="surprise-settings-note">Exclude exact fonts and swatches from future surprises.</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="surprise-settings-count" x-text="$store.chr.getSurpriseExclusionCount() + ' exclusions'"></div>
          <button type="button" data-surprise-initial-focus="true" @click="$store.chr.closeSurpriseSettings()" aria-label="Close surprise settings" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-size:0.9rem;cursor:pointer">X</button>
        </div>
      </div>

      <div class="surprise-modal-body">
        <div class="surprise-settings-section">
          <div class="cust-label" style="margin-top:0">Font Exclusions</div>
          <template x-for="role in $store.chr.fontRoleOptions" :key="'surprise-font-' + role.id">
            <div class="surprise-setting-block">
              <div class="surprise-setting-title" x-text="role.label + ' Font'"></div>
              <div class="surprise-setting-row">
                <select
                  class="surprise-select"
                  :aria-label="'Choose a ' + role.label + ' font to exclude'"
                  :value="$store.chr.surpriseFontDrafts[role.id]"
                  @change="$store.chr.surpriseFontDrafts[role.id] = $event.target.value"
                >
                  <template x-for="font in $store.chr.allFonts" :key="role.id + '-' + font">
                    <option :value="font" x-text="font"></option>
                  </template>
                </select>
                <button type="button" class="surprise-add-btn" @click="$store.chr.addSurpriseFontExclusion(role.id)">Exclude</button>
              </div>
              <div class="surprise-chip-list">
                <template x-for="font in $store.chr.surpriseSettings.fonts[role.id]" :key="role.id + '-chip-' + font">
                  <button type="button" class="surprise-chip" @click="$store.chr.removeSurpriseFontExclusion(role.id, font)">
                    <span x-text="font"></span>
                    <span aria-hidden="true">x</span>
                  </button>
                </template>
                <div x-show="$store.chr.surpriseSettings.fonts[role.id].length === 0" class="surprise-empty">Nothing excluded</div>
              </div>
            </div>
          </template>
        </div>

        <div class="surprise-settings-section">
          <div class="cust-label" style="margin-top:0">Color Exclusions</div>
          <template x-for="slot in $store.chr.colorRoleOptions" :key="'surprise-color-' + slot.id">
            <div class="surprise-setting-block">
              <div class="surprise-setting-title" x-text="slot.label"></div>
              <div class="surprise-setting-row">
                <input
                  class="surprise-color-input"
                  type="color"
                  :aria-label="'Choose a ' + slot.label + ' color to exclude'"
                  :value="$store.chr.surpriseColorDrafts[slot.id]"
                  @input="$store.chr.setSurpriseColorDraft(slot.id, $event.target.value)"
                >
                <button type="button" class="surprise-add-btn" @click="$store.chr.addSurpriseColorExclusion(slot.id)">Exclude</button>
              </div>
              <div class="surprise-chip-list">
                <template x-for="color in $store.chr.surpriseSettings.colors[slot.id]" :key="slot.id + '-chip-' + color">
                  <button type="button" class="surprise-chip surprise-color-chip" @click="$store.chr.removeSurpriseColorExclusion(slot.id, color)">
                    <span class="surprise-color-swatch" :style="'background:' + color"></span>
                    <span x-text="color.toUpperCase()"></span>
                    <span aria-hidden="true">x</span>
                  </button>
                </template>
                <div x-show="$store.chr.surpriseSettings.colors[slot.id].length === 0" class="surprise-empty">Nothing excluded</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</aside>
`
