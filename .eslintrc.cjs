module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  rules: {
    indent: ["error", 2],
    "prettier/prettier": "error",
    "linebreak-style": [0, "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "import/no-unresolved": [2, { caseSensitive: false }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/order": [
      2,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
    react: {
      version: "detect",
    },
  },
};
