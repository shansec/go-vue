module.exports = {
  parser: 'typescript',
  // 一行最多 120 字符
  printWidth: 120,
  // 使用两个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的key仅在必要时用引号
  quoteProps: "as-needed",
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: "none",
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  bracketSameLine: false,
  // 箭头函数只有一个参数的时候也需要括号
  arrowParens: "always",
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认折行标准
  proseWrap: "preserve",
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: "css",
  // vue 文件中的script和style内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: "lf",
  // 格式化嵌入的内容
  embeddedLanguageFormatting: "auto",
  // html, vue中每个属性占一行
  singleAttributePerLine: false
}
