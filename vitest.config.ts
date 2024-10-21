import { defineConfig } from "vite";

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        coverage: {
            provider: 'v8', // or 'c8'
            reporter: ['text', 'html'], // 'text' for terminal, 'html' for browser report
            all: true, // Include all files in coverage, even if they aren't explicitly tested
        },
    },
});
