import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get the current worting directory
const currentWorkingDirectory = new URL(".", import.meta.url).pathname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@fortawesome/free-solid-svg-icons"],
      output: {
        manualChunks: {},
      },
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": `${currentWorkingDirectory}/src`, // Set the base directory for your project
      "@api": `${currentWorkingDirectory}/src/api`,
      "@auth": `${currentWorkingDirectory}/src/components/auth`,
      "@features": `${currentWorkingDirectory}/src/components/features`,
      "@common": `${currentWorkingDirectory}/src/components/common`,
      "@context": `${currentWorkingDirectory}/src/context`,
      "@hooks": `${currentWorkingDirectory}/src/hooks`,
      "@pages": `${currentWorkingDirectory}/src/pages`,
      "@provider": `${currentWorkingDirectory}/src/provider`,
      "@utils": `${currentWorkingDirectory}/src/utils`,
      "@styles": `${currentWorkingDirectory}/src/styles`,
      "@public": `${currentWorkingDirectory}/public`,
    },
  },
});
