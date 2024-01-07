/* eslint-disable @typescript-eslint/naming-convention */

const drizzleRules = {
  "drizzle/enforce-delete-with-where": [
    "error",
    {
      // Here you can specify the models you are using
      drizzleObjectName: ["db"],
    },
  ],
};

const reactRules = {
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "function",
      format: ["PascalCase", "camelCase"],
    },
  ],
  "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],

  "react/jsx-sort-props": "off",

  // Irrelevant for functional components
  "react/jsx-no-bind": "off",

  "react/jsx-no-literals": "off",
  "react/jsx-max-depth": ["warn", { max: 4 }],

  "react/require-default-props": "off",
};

const jsRules = {
  "no-ternary": "off",
  "sort-keys": "off",

  "func-names": ["error", "as-needed"],

  // Allow function expressions and declarations
  "func-style": "off",

  "one-var": ["error", "never"],
  "id-length": [
    "error",
    {
      min: 3,
      exceptions: ["_", "__", "id", "db"],
    },
  ],
  "sort-imports": "off",

  // Console statements are allowed in some contexts (aws lambdas)
  "no-console": "off",

  // Prefer cyclomatic complexity
  "max-statements": "off",
  "max-lines-per-function": "off",

  "no-undefined": "off",

  // Comments can be of different lengths and have different purposes
  "no-inline-comments": "off",
  "line-comment-position": "off",

  "no-warning-comments": "warn",
};

const tsRules = {
  "@typescript-eslint/naming-convention": ["error"],

  // Return types are evil
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",

  "@typescript-eslint/no-unused-vars": [
    "error",
    { varsIgnorePattern: "^_*$", argsIgnorePattern: "^_*$" },
  ],

  "@typescript-eslint/prefer-readonly-parameter-types": [
    "off",
    {
      ignoreInferredTypes: true,
    },
  ],

  "@typescript-eslint/sort-type-constituents": "off",

  "@typescript-eslint/no-magic-numbers": [
    "error",
    {
      ignoreEnums: true,
      ignore: [-1, 0, 1, 2],
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
    },
  ],

  // Prefer types over interfaces
  "@typescript-eslint/consistent-type-definitions": ["error", "type"],
};

const parserOptions = {
  ecmaVersion: "latest",
  sourceType: "module",
  project: "./tsconfig.json",
};

module.exports = {
  ignorePatterns: ["**/old/**/*", "next-env.d.ts"],
  env: {
    es2021: true,
    node: true,
  },
  parserOptions,
  extends: [
    "eslint:all",
    "plugin:react/all",
    "next/core-web-vitals",
    "plugin:jsdoc/recommended",
    "plugin:@typescript-eslint/all",
    "prettier",
    "plugin:jsx-a11y/strict",
    "plugin:drizzle/all",
  ],
  rules: Object.assign(jsRules, drizzleRules),
  overrides: [
    {
      files: ["./**/*.cjs", "./**/*.js"],
      rules: tsRules,
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      parserOptions,
    },
    {
      extends: ["plugin:@typescript-eslint/all", "prettier"],
      files: ["*.ts", "*.tsx"],
      rules: tsRules,
      parserOptions,
    },
    {
      files: ["*.[jt]sx"],
      rules: reactRules,
    },
  ],
	globals: {
		React:'readonly',
	}
};
