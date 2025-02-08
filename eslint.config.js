import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  typescript: true,
  rules: {
    'antfu/if-newline': ['off'],
    'curly': ['off'],
    'style/brace-style': ['off'],
    'ts/no-use-before-define': ['off'],
    'no-console': ['off'],
    'vue/require-component-is': ['off'],
    'no-throw-literal': ['off'],
    'no-new': ['off'],
    'vue/singleline-html-element-content-newline': ['off'],
  },
})
