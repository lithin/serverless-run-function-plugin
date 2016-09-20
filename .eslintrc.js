module.exports = {
    "extends": "airbnb",
    "plugins": [
        "import"
    ],
    "env": {
      "mocha": true
    },
    "globals": {
      "chai": true,
      "sinon": true,
      "sinon-chai": true
    },
    "rules": {
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": "off",
      "prefer-default-export": "off"
    }
};
