import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built assets resolve correctly whether the site is
  // served from a domain root (Cloudflare Pages) or a GitHub Pages project
  // subpath (username.github.io/repo-name/). See README for details.
  base: './',
  plugins: [react()],
})
