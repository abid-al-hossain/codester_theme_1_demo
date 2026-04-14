import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        layout01: 'layout-01.html',
        layout02: 'layout-02.html',
        layout03: 'layout-03.html',
        layout04: 'layout-04.html',
        layout05: 'layout-05.html',
        layout06: 'layout-06.html',
        layout07: 'layout-07.html',
        layout08: 'layout-08.html',
        layout09: 'layout-09.html',
        layout10: 'layout-10.html',
        layout11: 'layout-11.html',
        layout12: 'layout-12.html',
        layout13: 'layout-13.html',
        layout14: 'layout-14.html',
        layout15: 'layout-15.html',
        layout16: 'layout-16.html',
        layout17: 'layout-17.html',
        layout18: 'layout-18.html',
        layout19: 'layout-19.html',
        layout20: 'layout-20.html',
      }
    }
  }
})
