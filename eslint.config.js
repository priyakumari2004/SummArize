// eslint.config.js
import js from '@eslint/js';

export default [
  {
    // ✅ Ignore files like tailwind.config.js that use CommonJS
    ignores: ['tailwind.config.js'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {},
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
