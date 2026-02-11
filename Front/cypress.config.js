import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  video: false,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: process.env.API_BASE_URL || "http://localhost:5000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
