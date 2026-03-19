### eslit

- 安装: pnpm add eslint @mistjs/eslint-config -Dw
- 配置: 在项目根目录下创建 .eslintrc.js 文件，并添加以下内容：

```js
module.exports = {
  root: true, // This prevents ESLint from looking for parent configs
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-var": "error", // 不能使用var声明变量
    "no-extra-semi": "error", // 禁止多余的冒号
    "@typescript-eslint/indent": ["error", 2], // 缩进2个空格
    "import/extensions": "off", // import引入文件不需要写后缀名
    "linebreak-style": [0, "error", "windows"], // 换行符风格
    indent: ["error", 2, { SwitchCase: 1 }], // error类型，缩进2个空格
    "space-before-function-paren": 0, // 在函数左括号的前面是否有空格
    "eol-last": 0, // 不检测新文件末尾是否有空行
    semi: ["error", "always"], // 在语句后面加分号
    quotes: ["error", "single"], // 字符串使用单双引号,double,single
    "no-console": ["error", { allow: ["log", "warn"] }], // 允许使用console.log()
    "arrow-parens": 0, // 箭头函数只有一个参数时，不需要括号
    "no-new": 0, //允许使用 new 关键字
    "comma-dangle": [2, "never"], // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，always-multiline多行模式必须带逗号，单行模式不能带逗号
    "no-undef": 0, // 允许使用未定义的变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
};
```

- 在 package.json 中添加以下内容：

```json
"lint": "eslint packages/**/*.{ts,tsx,js,jsx} examples/**/*.{ts,tsx,js,jsx} --fix --no-error-on-unmatched-pattern",
"lint:check": "eslint packages/**/*.{ts,tsx,js,jsx} examples/**/*.{ts,tsx,js,jsx} --no-error-on-unmatched-pattern"

```

- 安装TypeScript ESLint支持

```txt
# 安装TypeScript ESLint相关包
pnpm i -Dw @typescript-eslint/eslint-plugin@6.2.0 @typescript-eslint/parser@6.2.0
```

### prettier

- 安装: pnpm add prettier @mistjs/prettier-config -D
- 配置: 在项目根目录下创建 .prettierrc.js 文件，并添加以下内容：

```js
module.exports = {
  ...require("@mistjs/prettier-config"),
  // 自定义规则
};
```

#### husky 提交代码前自动格式化代码

- 安装: pnpm add husky -Dw

# 初始化husky

- pnpm exec husky init

# 设置prepare脚本，确保其他人clone后也能自动安装hooks

- npm pkg set scripts.prepare="husky install"

#### 添加commit-msg hook

在根目录创建.husky/commit-msg

```txt
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm exec commitlint --edit $1
```

#### 安装lint-staged

```txt
# 安装lint-staged用于在提交前检查代码
pnpm i -Dw lint-staged
```

- 在package.json中添加lint-staged配置

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

#### 添加pre-commit hook

在根目录创建.husky/pre-commit

```txt
# 添加pre-commit hook来在提交前运行lint-staged
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint:check
```

现在当你提交代码时：

- pre-commit hook 会运行 pnpm lint:check
- commit-msg hook 会验证提交信息是否符合 conventional commit 格式（如 feat: add new feature 或 fix: resolve bug）
