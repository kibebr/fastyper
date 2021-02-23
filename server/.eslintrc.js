module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    include: ['lib/'],
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  }
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowHigherOrderFunctions: true
    }]
  }
}

