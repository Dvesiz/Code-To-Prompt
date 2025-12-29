# 🚀 Code-To-Prompt

> One command to turn your codebase into a perfect LLM prompt.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/npm-v0.1.0-red.svg)](https://www.npmjs.com/package/code-to-prompt)

## 💡 为什么需要这个工具？

当你想让 ChatGPT、Claude 等 AI 助手帮你写代码或审查代码时，你需要把整个项目的代码复制给它。但是：

- ❌ 手动复制粘贴太麻烦
- ❌ 容易把 `node_modules` 等垃圾文件也复制进去
- ❌ 不知道会不会超出 AI 的上下文窗口限制
- ❌ 格式混乱，AI 难以理解

**Code-To-Prompt 一键解决所有问题！**

## ✨ Features

- 📁 **智能扫描** - 自动尊重 `.gitignore`，不会扫描 `node_modules`
- 🎯 **精准过滤** - 按文件扩展名过滤（只要 `.ts` 文件？没问题！）
- 📋 **一键复制** - 自动复制到剪贴板，直接粘贴给 AI
- 🔢 **Token 计数** - 实时显示 token 数量，避免超出限制
- ⚡ **极速扫描** - 基于 `fast-glob`，大项目也能秒扫
- 🎨 **AI 友好** - 使用 XML 标签格式，AI 理解最佳

## 🚀 Quick Start

### CLI 版本

```bash
# Run directly with npx (no installation needed)
npx code-to-prompt

# Or install globally
npm install -g code-to-prompt
code2prompt
```

### 🌐 Web 版本（推荐新手）

```bash
# 启动 Web 界面
.\start-web.bat

# 或直接打开
start web/index.html
```

**Web 界面特性：**
- 📁 拖拽上传文件夹
- 🎯 可视化配置选项
- 📊 实时统计信息
- 📋 一键复制到剪贴板
- 💾 下载为文件

**详细指南：** 查看 [GETTING-STARTED.md](./GETTING-STARTED.md) 或 [web/README.md](./web/README.md)

## 📖 Usage

```bash
# Convert current directory
code2prompt

# Convert specific directory
code2prompt ./src

# Only include TypeScript and Vue files
code2prompt -e ts,vue

# Include multiple file types
code2prompt -e ts,tsx,js,jsx

# Save to file instead of clipboard
code2prompt -o prompt.txt

# Check token count without generating output (dry run)
code2prompt --dry-run

# Limit maximum tokens
code2prompt --max-tokens 50000 -e ts,tsx -o output.txt

# Combine options
code2prompt ./src -e ts,js -o output.txt
```

## 🚨 大型项目？

如果你的项目有 **数百万 tokens**（例如包含 node_modules），请查看：

- **[QUICK-TIPS.md](./QUICK-TIPS.md)** - 快速解决方案
- **[LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md)** - 完整策略指南

**快速诊断：**
```bash
# 先检查项目大小（不生成输出）
code2prompt --dry-run

# 如果太大，按目录或文件类型过滤
code2prompt ./src --dry-run -e ts,tsx
```

## 📊 输出示例

```markdown
# Project Context

## File Tree
```
├── src/
│   ├── index.ts
│   └── utils.ts
└── README.md
```

## File Contents

<file path="src/index.ts">
console.log("Hello World");
</file>

<file path="src/utils.ts">
export const add = (a, b) => a + b;
</file>
```

## 🎯 实际使用场景

### 1. 代码审查
```bash
code2prompt ./src -e ts,tsx
# 粘贴给 ChatGPT: "请审查这段代码并提供改进建议"
```

### 2. Bug 修复
```bash
code2prompt . -e js,json
# 粘贴给 Claude: "这个项目有个 bug，帮我找出问题"
```

### 3. 重构建议
```bash
code2prompt ./components -e vue
# 粘贴给 AI: "这些组件可以如何重构？"
```

### 4. 文档生成
```bash
code2prompt . -o context.txt
# 让 AI 基于代码生成 README 或 API 文档
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test locally
node bin/code2prompt.js your-project --dry-run
```

## 📚 Documentation

- **[USAGE-GUIDE.md](./USAGE-GUIDE.md)** - 完整使用指南（推荐阅读）
- **[GETTING-STARTED.md](./GETTING-STARTED.md)** - 快速开始
- **[QUICK-TIPS.md](./QUICK-TIPS.md)** - 快速使用技巧和常见场景
- **[LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md)** - 大型项目完整策略指南
- **[web/README.md](./web/README.md)** - Web 界面使用说明
- **[WEB-FEATURES.md](./WEB-FEATURES.md)** - Web 功能详解

## 🤝 Contributing

欢迎提交 Issue 和 Pull Request！

查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何贡献。

## 📝 License

MIT - 查看 [LICENSE](./LICENSE) 文件了解详情

## 🌟 Star History

如果这个工具帮到了你，请给个 Star！⭐

## 📞 Support

- 📖 [文档](./README.md)
- 🐛 [报告 Bug](https://github.com/yourusername/code-to-prompt/issues)
- 💡 [功能建议](https://github.com/yourusername/code-to-prompt/issues)
- 💬 [讨论](https://github.com/yourusername/code-to-prompt/discussions)

---

**Made with ❤️ for developers who love AI coding assistants**
