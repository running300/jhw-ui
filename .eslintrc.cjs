module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  // 使用 extends 继承推荐配置，比自己手动写一堆 rules 更稳健
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    // 建议使用 "latest" 或者具体的年份版本，6 对应 ES2015，太老了
    ecmaVersion: "latest",
    sourceType: "module",
    // ecmaFeatures.modules 在 sourceType: 'module' 时是默认开启的，不需要显式声明
  },
  rules: {
    // 基础规则
    "no-var": "error",
    "no-extra-semi": "error",
    semi: ["error", "always"],

    // 代码风格
    // 优先使用 TS 专属的缩进规则，或者关闭 TS 规则使用基础规则，不要混用
    // "@typescript-eslint/indent": ["error", 2, { SwitchCase: 1 }],// 已废弃
    quotes: ["error", "double"], // 之前报错是因为这里要求双引号，而你用了单引号
    "comma-dangle": ["error", "never"],
    "eol-last": "off", // 0 等同于 'off'
    "space-before-function-paren": "off",

    // 兼容性
    "import/extensions": "off",

    // 调试与开发
    "no-console": ["error", { allow: ["log", "warn"] }],

    // TS 特定规则 (覆盖默认规则)
    // 在 TS 项目中，通常不需要 no-undef，因为 TS 编译器已经检查了
    "no-undef": "off",

    // 其他
    "arrow-parens": "off",
    "no-new": "off",

    // 换行符配置
    // 之前的配置 [0, "error", "windows"] 是无效的（0 代表关闭，后面的参数无效）
    // Windows 下通常不需要强制设置为 windows，保持默认即可，或者强制 unix
    "linebreak-style": ["error", "unix"], // 建议统一使用 LF，Git 也可以配置自动转换
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // 如果有针对 TS 文件的特殊规则，可以在这里写
      },
    },
  ],
};
