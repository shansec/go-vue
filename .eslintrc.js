module.export = {
  "env": {
    "browser": true,
    "es2021": true,
    "node":true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  // 解析器

  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser"
  },
  // 配置插件
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
  }
}
