import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true, // Enable global test APIs
        environment: "jsdom", // For React component testing
        setupFiles: ["./src/setupTests.ts"],
    },
});
