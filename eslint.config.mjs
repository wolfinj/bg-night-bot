import importPlugin from "eslint-plugin-import";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ["**/*.{ts}", "**/*.{svg}"]},
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    importPlugin.flatConfigs.recommended,
    {
        plugins: {},
        rules: {
            "import/no-unresolved": "off",
            "import/order": [
                "error",
                {
                    alphabetize: {
                        order: "asc",
                    },
                    named: true,
                    "newlines-between": "always",
                    groups: [
                        "builtin",
                        "external",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                },
            ],
            "import/exports-last": "off"
        },
    },
    ...tseslint.configs.recommended
]
