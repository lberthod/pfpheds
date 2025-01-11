// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/OneDrive%20-%20HESSO/Bureau/designwe/pfpheds/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/OneDrive%20-%20HESSO/Bureau/designwe/pfpheds/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///E:/OneDrive%20-%20HESSO/Bureau/designwe/pfpheds/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { VitePWA } from "file:///E:/OneDrive%20-%20HESSO/Bureau/designwe/pfpheds/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/OneDrive%20-%20HESSO/Bureau/designwe/pfpheds/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "CacheFirst",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60
                // 30 jours
              }
            }
          }
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
        // Limite augmentée à 5 Mo
      },
      manifest: {
        name: "HEdS",
        short_name: "HEdS",
        description: "Progressive Web App pour PFPHEDS",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/assets/images/hespicto.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/assets/images/hespicto.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router"]
          // Par exemple, regrouper les dépendances tierces
        }
      }
    },
    chunkSizeWarningLimit: 1e3
    // Optionnel : augmente la limite d'avertissement pour les chunks
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxPbmVEcml2ZSAtIEhFU1NPXFxcXEJ1cmVhdVxcXFxkZXNpZ253ZVxcXFxwZnBoZWRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxPbmVEcml2ZSAtIEhFU1NPXFxcXEJ1cmVhdVxcXFxkZXNpZ253ZVxcXFxwZnBoZWRzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9PbmVEcml2ZSUyMC0lMjBIRVNTTy9CdXJlYXUvZGVzaWdud2UvcGZwaGVkcy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXHJcbiAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAoeyB1cmwgfSkgPT4gdXJsLm9yaWdpbiA9PT0gc2VsZi5sb2NhdGlvbi5vcmlnaW4sXHJcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ3N0YXRpYy1yZXNvdXJjZXMnLFxyXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDUwLFxyXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGpvdXJzXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNSAqIDEwMjQgKiAxMDI0LCAvLyBMaW1pdGUgYXVnbWVudFx1MDBFOWUgXHUwMEUwIDUgTW9cclxuICAgICAgfSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiAnSEVkUycsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ0hFZFMnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnUHJvZ3Jlc3NpdmUgV2ViIEFwcCBwb3VyIFBGUEhFRFMnLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnL2Fzc2V0cy9pbWFnZXMvaGVzcGljdG8ucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICcvYXNzZXRzL2ltYWdlcy9oZXNwaWN0by5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgdmVuZG9yOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sIC8vIFBhciBleGVtcGxlLCByZWdyb3VwZXIgbGVzIGRcdTAwRTlwZW5kYW5jZXMgdGllcmNlc1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLCAvLyBPcHRpb25uZWwgOiBhdWdtZW50ZSBsYSBsaW1pdGUgZCdhdmVydGlzc2VtZW50IHBvdXIgbGVzIGNodW5rc1xyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVUsU0FBUyxlQUFlLFdBQVc7QUFFcFcsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsZUFBZTtBQUwrSyxJQUFNLDJDQUEyQztBQVF4UCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxTQUFTO0FBQUEsUUFDUCxnQkFBZ0I7QUFBQSxVQUNkO0FBQUEsWUFDRSxZQUFZLENBQUMsRUFBRSxJQUFJLE1BQU0sSUFBSSxXQUFXLEtBQUssU0FBUztBQUFBLFlBQ3RELFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxjQUNYLFlBQVk7QUFBQSxnQkFDVixZQUFZO0FBQUEsZ0JBQ1osZUFBZSxLQUFLLEtBQUssS0FBSztBQUFBO0FBQUEsY0FDaEM7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLCtCQUErQixJQUFJLE9BQU87QUFBQTtBQUFBLE1BQzVDO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxPQUFPLFlBQVk7QUFBQTtBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBO0FBQUEsRUFDekI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
