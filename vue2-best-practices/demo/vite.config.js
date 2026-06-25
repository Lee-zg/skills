import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// Vue 2.7 + Vite. The @vitejs/plugin-vue2 plugin compiles .vue SFCs.
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    // Demonstrates `bundle-named-chunks`: the lazily-imported HeavyChart
    // component is emitted as its own chunk (see AsyncChunkDemo.vue).
    chunkSizeWarningLimit: 600,
  },
})
