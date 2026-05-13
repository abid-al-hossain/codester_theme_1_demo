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
    <button type="button" class="cust-close-btn" @click="$store.chr.close()" aria-label="Close theme customizer">X</button>
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
      <div class="layout-panel-header">
        <span class="cust-label">Theme Layouts</span>
        <a href="index.html" class="layout-index-link">View Index</a>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <a href="layout-01.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-01.jpg" alt="Modern SaaS Landing hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Modern SaaS Landing</div>
            <div class="layout-link-meta">Layout 01</div>
          </div>
        </a>
        <a href="layout-02.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-02.jpg" alt="Creative Portfolio hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Creative Portfolio</div>
            <div class="layout-link-meta">Layout 02</div>
          </div>
        </a>
        <a href="layout-03.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-03.jpg" alt="Editorial Feed hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Editorial Feed</div>
            <div class="layout-link-meta">Layout 03</div>
          </div>
        </a>
        <a href="layout-04.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-04.jpg" alt="Text Manuscript hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Text Manuscript</div>
            <div class="layout-link-meta">Layout 04</div>
          </div>
        </a>
        <a href="layout-05.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-05.jpg" alt="Web App Dashboard hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Web App Dashboard</div>
            <div class="layout-link-meta">Layout 05</div>
          </div>
        </a>
        <a href="layout-06.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-06.jpg" alt="Artistic Showcase hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Artistic Showcase</div>
            <div class="layout-link-meta">Layout 06</div>
          </div>
        </a>
        <a href="layout-07.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-07.jpg" alt="Futuristic Launch hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Futuristic Launch</div>
            <div class="layout-link-meta">Layout 07</div>
          </div>
        </a>
        <a href="layout-08.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-08.jpg" alt="Minimal Journal hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Minimal Journal</div>
            <div class="layout-link-meta">Layout 08</div>
          </div>
        </a>
        <a href="layout-09.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-09.jpg" alt="Cyberpunk Agency hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Cyberpunk Agency</div>
            <div class="layout-link-meta">Layout 09</div>
          </div>
        </a>
        <a href="layout-10.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-10.jpg" alt="Gothic Archive hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Gothic Archive</div>
            <div class="layout-link-meta">Layout 10</div>
          </div>
        </a>
        <a href="layout-11.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-11.jpg" alt="Enterprise Business hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Enterprise Business</div>
            <div class="layout-link-meta">Layout 11</div>
          </div>
        </a>
        <a href="layout-12.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-12.jpg" alt="Medical Care hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Medical Care</div>
            <div class="layout-link-meta">Layout 12</div>
          </div>
        </a>
        <a href="layout-13.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-13.jpg" alt="Education Campus hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Education Campus</div>
            <div class="layout-link-meta">Layout 13</div>
          </div>
        </a>
        <a href="layout-14.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-14.jpg" alt="Travel Explorer hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Travel Explorer</div>
            <div class="layout-link-meta">Layout 14</div>
          </div>
        </a>
        <a href="layout-15.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-15.jpg" alt="Social Community hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Social Community</div>
            <div class="layout-link-meta">Layout 15</div>
          </div>
        </a>
        <a href="layout-16.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-16.jpg" alt="Jurassic Museum hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Jurassic Museum</div>
            <div class="layout-link-meta">Layout 16</div>
          </div>
        </a>
        <a href="layout-17.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-17.jpg" alt="Pixelated Desktop hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Pixelated Desktop</div>
            <div class="layout-link-meta">Layout 17</div>
          </div>
        </a>
        <a href="layout-18.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-18.jpg" alt="Glacier Expeditions hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Glacier Expeditions</div>
            <div class="layout-link-meta">Layout 18</div>
          </div>
        </a>
        <a href="layout-19.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-19.jpg" alt="Geothermic Console hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div class="layout-link-title">Geothermic Console</div>
            <div class="layout-link-meta">Layout 19</div>
          </div>
        </a>
        <a href="layout-20.html" class="layout-list-link">
          <div class="layout-thumb-frame layout-mini-thumb"><img src="/previews/layout-20.jpg" alt="The Grand Library hero preview" loading="lazy" decoding="async" class="layout-preview-img"></div>
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
      tabindex="-1"
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
          <div class="surprise-settings-note">Choose what Surprise Me should avoid.</div>
        </div>
        <button type="button" data-surprise-initial-focus="true" @click="$store.chr.closeSurpriseSettings()" aria-label="Close surprise settings" class="surprise-close-btn">X</button>
      </div>

      <div class="surprise-settings-toolbar">
        <div class="surprise-view-tabs" role="tablist" aria-label="Surprise exclusion categories">
          <button type="button" class="surprise-view-tab" :class="$store.chr.surpriseSettingsView === 'fonts' ? 'active' : ''" @click="$store.chr.setSurpriseSettingsView('fonts')" role="tab" :aria-selected="$store.chr.surpriseSettingsView === 'fonts' ? 'true' : 'false'">
            Fonts <span x-text="$store.chr.getSurpriseFontExclusionCount()"></span>
          </button>
          <button type="button" class="surprise-view-tab" :class="$store.chr.surpriseSettingsView === 'colors' ? 'active' : ''" @click="$store.chr.setSurpriseSettingsView('colors')" role="tab" :aria-selected="$store.chr.surpriseSettingsView === 'colors' ? 'true' : 'false'">
            Colors <span x-text="$store.chr.getSurpriseColorExclusionCount()"></span>
          </button>
        </div>
        <div class="surprise-settings-actions">
          <button type="button" class="surprise-reset-btn" @click="$store.chr.resetSurpriseExclusions()" :disabled="$store.chr.getSurpriseExclusionCount() === 0">
            Reset All
          </button>
          <div class="surprise-settings-count" x-text="$store.chr.getSurpriseExclusionCount() + ' exclusions'"></div>
        </div>
      </div>

      <div class="surprise-modal-body">
        <div class="surprise-settings-section" x-show="$store.chr.surpriseSettingsView === 'fonts'">
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

        <div class="surprise-settings-section" x-show="$store.chr.surpriseSettingsView === 'colors'">
          <div class="cust-label" style="margin-top:0">Color Range Exclusions</div>
          <template x-for="slot in $store.chr.colorRoleOptions" :key="'surprise-color-range-' + slot.id">
            <div class="surprise-setting-block surprise-range-block">
              <div class="surprise-setting-title" x-text="slot.label"></div>
              <div class="surprise-range-preview" :style="$store.chr.getSurpriseColorRangePreviewStyle($store.chr.surpriseColorRangeDrafts[slot.id])" aria-hidden="true"></div>
              <div class="surprise-range-row">
                <input
                  class="surprise-range-input"
                  type="text"
                  inputmode="text"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="000000-EEEEEE"
                  :aria-label="'HEX range to exclude from Surprise Me ' + slot.label + ' colors'"
                  :value="$store.chr.surpriseColorRangeDrafts[slot.id]"
                  @input="$store.chr.setSurpriseColorRangeDraft(slot.id, $event.target.value)"
                  @keydown.enter.prevent="$store.chr.addSurpriseColorRangeExclusion(slot.id)"
                >
                <button type="button" class="surprise-add-btn" @click="$store.chr.addSurpriseColorRangeExclusion(slot.id)">Exclude</button>
              </div>
              <div class="surprise-range-meta">
                <span x-text="$store.chr.getSurpriseColorRangeDraftLabel(slot.id)"></span>
                <span x-text="$store.chr.getSurpriseColorRangeDraftCoverage(slot.id)"></span>
              </div>
              <div x-show="$store.chr.getSurpriseColorRangeDraftWarning(slot.id)" class="surprise-range-warning" x-text="$store.chr.getSurpriseColorRangeDraftWarning(slot.id)"></div>
              <div x-show="$store.chr.surpriseColorRangeErrors[slot.id]" class="surprise-range-error" x-text="$store.chr.surpriseColorRangeErrors[slot.id]"></div>
              <div class="surprise-chip-list surprise-range-chip-list">
                <template x-for="range in $store.chr.surpriseSettings.colors[slot.id]" :key="slot.id + '-' + range.start + '-' + range.end">
                  <button type="button" class="surprise-chip surprise-range-chip" @click="$store.chr.removeSurpriseColorRangeExclusion(slot.id, range)">
                    <span class="surprise-range-chip-swatch" :style="$store.chr.getSurpriseColorRangePreviewStyle(range)"></span>
                    <span x-text="$store.chr.getSurpriseColorRangeLabel(range)"></span>
                    <span class="surprise-range-chip-meta" x-text="$store.chr.getSurpriseColorRangeCoverage(range)"></span>
                    <span aria-hidden="true">x</span>
                  </button>
                </template>
                <div x-show="$store.chr.surpriseSettings.colors[slot.id].length === 0" class="surprise-empty">No ranges excluded for this color</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</aside>
`
