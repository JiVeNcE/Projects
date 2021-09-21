module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  rules: {
    'react/prop-types': 0, //removed eslint react type suggestions, becuase it's incompatible with our current type style
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 0, //fix for gulp requires (disabled from ES5 by default)
    '@typescript-eslint/prefer-namespace-keyword': 0,
    '@typescript-eslint/no-namespace': 0,
    'prefer-namespace-keyword': 'off',
    'no-namespace': 'off',
    camelcase: 'off',
    '@typescript-eslint/camelcase': 0,
    'no-console': 1,
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // currently all files support crlf format. Eventually we can change this, depending on our build environment.
      },
    ],
    // 'import/no-cycle': ['warn', { maxDepth: 1 }],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'ignore',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/internal-module-folders': ['src/'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
