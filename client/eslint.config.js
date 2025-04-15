import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Define file patterns
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },

  // Global settings
  { languageOptions: { globals: globals.browser } },

  // Base configurations
  pluginJs.configs.recommended,
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off', // Disable prop-types as you might be using TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    },
  },

  // Prettier integration
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // Disable rules that conflict with Prettier
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },

  // Custom rules
  {
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];
