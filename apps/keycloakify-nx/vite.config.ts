/// <reference types='vitest' />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { keycloakify } from "keycloakify/vite-plugin";

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/keycloakify-nx",

  server: {
    port: 4200,
    host: "localhost",
  },

  preview: {
    port: 4300,
    host: "localhost",
  },
  define: {
    "process.env": { ...process.env, ...loadEnv(mode, process.cwd()) },
  },

  plugins: [react(), nxViteTsPaths(), keycloakify({ themeName: "my-theme" })],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/apps/keycloakify-nx",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest/apps/keycloakify-nx",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/apps/keycloakify-nx",
      provider: "v8",
    },
  },
}));
