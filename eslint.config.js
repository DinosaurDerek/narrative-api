import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        module: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, semi: true }],
      'no-console': 'warn',
      'no-unused-vars': ['warn'],
    },
  },
];
