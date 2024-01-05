module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "prettier",
    "plugin:typescript-sort-keys/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "typescript-sort-keys",
    "sort-keys-fix",
  ],
  rules: {
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        selector: "default",
      },
      {
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        selector: "variable",
      },
      {
        format: null,
        selector: "objectLiteralProperty",
      },
      {
        format: ["PascalCase"],
        selector: "typeLike",
      },
      {
        format: ["UPPER_CASE"],
        selector: "enumMember",
      },
    ],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "sort-keys-fix/sort-keys-fix": "warn",
    "storybook/prefer-pascal-case": "off",
    "no-use-before-define": "off",
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": ["warn"],
  },
};
