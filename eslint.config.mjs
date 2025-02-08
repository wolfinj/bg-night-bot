import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals"
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ["src/generated/"],
    },
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
