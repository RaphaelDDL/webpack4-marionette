const path = require( 'path' );

module.exports = {
    "plugins": [
        // 'jasmine-jquery',
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    },
    "extends": [
        'eslint:recommended',
        'airbnb-base',
        'plugin:jasmine-jquery/recommended',
        // "plugin:prettier/recommended"
    ],
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        jasmine: true,
        jquery: true,
    },

    rules: {
        'global-require': 'off', // nested (runtime) requires will yell
        'import/no-extraneous-dependencies': 'off', // external deps won't be included in each project
        'no-underscore-dangle': 'off',

        'max-len': [ 'error', 150, 2, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        } ],

        'prefer-destructuring': [ 'warn', {
            VariableDeclarator: {
                array: false,
                object: true,
            },
            AssignmentExpression: {
                array: true,
                object: true,
            },
        }, {
            enforceForRenamedProperties: false,
        } ],

        'jasmine-jquery/no-global-shortcuts': [ 2, [
            'preloadFixtures',
            'loadFixtures',
            'appendLoadFixtures',
            'readFixtures',
            'setFixtures',
            'appendSetFixtures',
            'loadStyleFixtures',
            'appendLoadStyleFixtures',
            'setStyleFixtures',
            'appendSetStyleFixtures',
            'loadJSONFixtures',
            'getJSONFixture',
        ] ],

        'no-plusplus': 'warn',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: path.resolve( process.cwd(), 'config/webpack.prod.babel.js' ),
            },
        },
    },
};
