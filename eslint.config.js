import prettier from "eslint-config-prettier"
import js from "@eslint/js"
import { includeIgnoreFile } from "@eslint/compat"
import qwikPlugin from "eslint-plugin-qwik"
import compat from "eslint-plugin-compat"
import globals from "globals"
import { fileURLToPath } from "node:url"
import ts from "typescript-eslint"
const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url))

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  compat.configs["flat/recommended"],
  {
    plugins: {
      qwik: qwikPlugin
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...qwikPlugin.configs.recommended.rules
    }
  },
  {
    files: ["**/*.tsx", "**/*.ts"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    ignores: ["dist/**", ".qwik/**", "tmp/**", "server/**"]
  }
)
