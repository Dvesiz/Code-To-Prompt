# 🚀 快速开始

## 选择你的方式

### 🌐 方式 1: Web 界面（推荐新手）

**最简单的方式，无需命令行！**

```bash
# 启动 Web 界面
.\start-web.bat

# 或直接打开
start web/index.html
```

**使用步骤：**
1. 拖拽文件夹到浏览器
2. 配置选项（可选）
3. 点击"复制到剪贴板"
4. 粘贴给 ChatGPT 或 Claude

**查看详细说明：** [web/README.md](./web/README.md)

---

### 💻 方式 2: CLI 命令行（推荐开发者）

**适合习惯使用命令行的开发者**

### 1. 安装依赖

```bash
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 测试工具

```bash
# 检查项目大小（不生成输出）
node bin/code2prompt.js your-project --dry-run
```

### 4. 实际使用

```bash
# 扫描你的项目
node bin/code2prompt.js your-project -o output.txt

# 打开 output.txt，复制内容
# 粘贴到 ChatGPT 或 Claude
# 开始与 AI 协作！
```

## 📚 文档导航

根据你的需求选择：

| 需求 | 文档 |
|------|------|
| 基础使用 | [README.md](./README.md) |
| 快速技巧 | [QUICK-TIPS.md](./QUICK-TIPS.md) |
| 大型项目 | [LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md) |
| 项目结构 | [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) |

## 🎯 常用命令

```bash
# 基础扫描
node bin/code2prompt.js . -o output.txt

# 过滤文件类型
node bin/code2prompt.js . -e ts,tsx,js,jsx -o code.txt

# 检查大小（不生成输出）
node bin/code2prompt.js . --dry-run

# 限制 token 数
node bin/code2prompt.js . --max-tokens 50000 -e ts -o limited.txt

# 扫描特定目录
node bin/code2prompt.js ./src -o src-code.txt
```

## ⚡ 快速场景

### 场景 1: 代码审查

```bash
node bin/code2prompt.js ./src -o review.txt
# 粘贴给 AI: "请审查这段代码"
```

### 场景 2: Bug 修复

```bash
node bin/code2prompt.js ./src/buggy-module -o bug.txt
# 粘贴给 AI: "这个模块有个 bug: [描述]"
```

### 场景 3: 添加功能

```bash
node bin/code2prompt.js ./src/feature -o feature.txt
# 粘贴给 AI: "请帮我添加 [功能描述]"
```

## 🚨 项目太大？

如果你的项目有数百万 tokens：

1. **先诊断**
   ```bash
   node bin/code2prompt.js . --dry-run
   ```

2. **检查 .gitignore**
   确保排除了 `node_modules/`, `dist/` 等

3. **分模块扫描**
   ```bash
   node bin/code2prompt.js ./src/auth -o auth.txt
   ```

4. **查看完整指南**
   阅读 [LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md)

## 🧪 运行测试

```bash
# 单元测试
npm test

# 完整测试
.\test-all.bat

# 演示
.\test-portfolio-demo.bat
```

## 📦 发布到 NPM

```bash
npm login
npm publish
```

## 💡 提示

- ✅ 使用 `--dry-run` 先检查大小
- ✅ 使用 `-e` 过滤文件类型
- ✅ 控制在 50k tokens 以内
- ✅ 按需扫描，不要贪多

## 🎉 开始使用

现在你已经准备好了！试试扫描你的第一个项目：

```bash
node bin/code2prompt.js your-project --dry-run
```

---

**需要帮助？** 查看 [README.md](./README.md) 或 [QUICK-TIPS.md](./QUICK-TIPS.md)
