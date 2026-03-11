import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      'no-restricted-globals': [
        'error',
        { name: 'localStorage', message: 'Do not store sensitive data; use httpOnly cookies or memory.' },
        { name: 'sessionStorage', message: 'Do not store sensitive data; use httpOnly cookies or memory.' },
      ],
    },
  },
]);

export default eslintConfig;
