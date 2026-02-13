import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "react/react-in-jsx-scope": "off",
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
      semi: ['error', 'never'],
      'linebreak-style': 'off',
      'no-alert': 'warn',
      'no-shadow': 'off',
      'operator-linebreak': 'off',
      'no-else-return': 'error',
      'no-cond-assign': 'error',
      'no-lonely-if': 'warn',
      indent: 'off',
      'arrow-parens': 'off',
      'object-curly-newline': 'off',
      'max-len': ['off', 150],
      'no-duplicate-case': 'warn',
      'no-param-reassign': 'off',
      'implicit-arrow-linebreak': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-key': [
        'warn',
        {
          checkFragmentShorthand: true,
        },
      ],

      'react/jsx-no-duplicate-props': 'warn',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unescaped-entities': 'warn',
      'react/require-default-props': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'max-lines-per-function': ['warn', 200],
      'import/no-default-export': 'warn',
      'import/extensions': 'off',
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-handler-names': ['warn'],
      'no-unused-expressions': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', {}],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
