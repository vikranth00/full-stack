import js from '@eslint/js';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default [{
  files: ['**/*.{js,jsx}'],
  ignores: ['dist/**'],
  plugins: {
    'react-hooks': reactHooksPlugin,
    'react-refresh': reactRefreshPlugin
  },
  languageOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.es2021
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  rules: {
    ...js.configs.recommended.rules,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
    'no-console': 'warn'
  }
}];