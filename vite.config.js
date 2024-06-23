import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import * as h3 from 'h3-js';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),cesium()]
})
