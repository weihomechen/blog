module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "Babel": true,
    "React": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "global-require": "off",
    "class-methods-use-this": "off",
    "react/jsx-no-bind": "off",
    "no-param-reassign": "off",
    "react/no-string-refs": "off",
    "react/jsx-filename-extension": "off",
    "import/no-extraneous-dependencies": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/extensions": "off",
    "func-names": "off",
    "space-before-blocks": "off",
    "arrow-parens": "off",
    "array-callback-return": "off",
    "max-len": "off",
    "no-console": "off",
    "arrow-body-style": "off",
    "react/sort-comp": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/forbid-prop-types": "off",
    "object-curly-newline": "off",
    "react/jsx-closing-tag-location": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "no-return-assign": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-one-expression-per-line": "off",
    "operator-linebreak": "off",
    "react/destructuring-assignment": "off",
    "no-restricted-globals": "off",
  }
};