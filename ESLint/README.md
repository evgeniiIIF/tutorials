### Добавление Prettier в проект с ESLint 9 (плоский конфиг)

Prettier форматирует код (отступы, кавычки, запятые и т.д.), а ESLint отвечает за качество кода. Чтобы они не конфликтовали, используем два пакета:

1. Установить зависимости.

eslint-plugin-prettier — запускает Prettier как правило ESLint.
eslint-config-prettier — отключает все правила ESLint, которые могут конфликтовать с Prettier.

```bash
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

2. Создать файл в корне проекта
   // .prettierrc
   export default {
   semi: true,
   singleQuote: true,
   tabWidth: 4,
   trailingComma: 'es5',
   printWidth: 100,
   endOfLine: 'auto',
   };

3. Настроить eslint.config.js для Prettier


// eslint.config.js
--------------------------------
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            eslintConfigPrettier, // отключает правила, конфликтующие с Prettier
        ],
        plugins: {
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': 'warn',
            eqeqeq: 'error',
            curly: 'error',
            'prettier/prettier': 'error', // включает Prettier как правило ESLint
            usePrettierrc: true,  // использовать .prettierrc
        },
    },
]);
