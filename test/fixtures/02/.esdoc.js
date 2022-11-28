module.exports = {
  "source": "./src",
  "destination": "./docs",
//  "ast": true,
  "debug": true,
  "verbose": true,
  "includes": /*[*/
    "**/*.js[m]"
  /*]*/,
  "excludes": [
    "*.config.js",
    "*modules/"
  ],
  "index": "./README.md",
  "package": "./package.json",
  "plugins": [{
    "name": "esdoc-standard-plugin",
    "option": {
      "accessor": { "access": ["public", "protected"], "autoPrivate": true },
//      "lint": { "enable": true },
//      "coverage": { "enable": true },
//      "undocumentIdentifier": { "enable": true },
//      "unexportedIdentifier": { "enable": false },
//      "typeInference": { "enable": true },
//      "test": {
//        "source": "./test",
//        "includes": ["*.(spec|Spec|test|Test).js"],
//        "excludes": ["*.config.js"]
//      }
    }
  }]
}
