const nextPlugin = require('@next/eslint-plugin-next')
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y')
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'dist/**', '.contentlayer/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...(nextPlugin.configs?.recommended?.rules ?? {}),
      ...(nextPlugin.configs?.['core-web-vitals']?.rules ?? {}),
    },
  },
]

