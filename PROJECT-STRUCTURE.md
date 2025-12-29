# 📁 项目结构说明

## 核心文件

```
code-to-prompt/
├── 📂 src/                      # 源代码
│   ├── index.ts                # CLI 入口
│   ├── scanner.ts              # 文件扫描
│   └── formatter.ts            # 格式化输出
│
├── 📂 bin/                      # CLI 可执行文件
│   └── code2prompt.js
│
├── 📂 dist/                     # 编译输出（自动生成）
│
├── 📂 web/                      # Web 界面
│   ├── index.html              # 主页面
│   ├── styles.css              # 样式
│   ├── script.js               # 交互逻辑
│   ├── README.md               # Web 使用说明
│   └── TROUBLESHOOTING.md      # 故障排除
│
├── 📄 README.md                 # 项目主文档
├── 📄 GETTING-STARTED.md        # 快速开始
├── 📄 USAGE-GUIDE.md            # 完整使用指南
├── 📄 QUICK-TIPS.md             # 快速使用技巧
├── 📄 LARGE-PROJECT-GUIDE.md    # 大型项目指南
├── 📄 WEB-FEATURES.md           # Web 功能详解
├── 📄 CHANGELOG.md              # 更新日志
├── 📄 package.json              # 项目配置
├── 📄 tsconfig.json             # TypeScript 配置
└── 📄 start-web.bat             # Web 启动脚本
```

## 文档说明

### 主要文档

- **README.md** - 项目介绍、安装、基础使用
- **GETTING-STARTED.md** - 快速开始指南
- **USAGE-GUIDE.md** - 完整使用指南
- **QUICK-TIPS.md** - 快速使用技巧、常见场景、命令速查
- **LARGE-PROJECT-GUIDE.md** - 大型项目（42M+ tokens）完整策略
- **WEB-FEATURES.md** - Web 界面功能详解
- **CHANGELOG.md** - 版本更新日志

### Web 界面

- **web/index.html** - Web 主页面
- **web/README.md** - Web 使用说明
- **web/TROUBLESHOOTING.md** - 故障排除指南

### 脚本

- **start-web.bat** - 启动 Web 界面

## 快速导航

### 我想...

**快速上手**
→ 阅读 [README.md](./README.md)

**学习使用技巧**
→ 阅读 [QUICK-TIPS.md](./QUICK-TIPS.md)

**处理大型项目**
→ 阅读 [LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md)

**测试工具**
→ 运行 `.\test-all.bat`

**查看示例**
→ 查看 `example/` 或 `test-portfolio/`

## 开发说明

### 构建

```bash
npm run build
```

### 本地测试

```bash
# CLI 测试
node bin/code2prompt.js your-project --dry-run

# Web 界面测试
.\start-web.bat
```

## 文件用途

| 文件 | 用途 |
|------|------|
| src/index.ts | CLI 主逻辑 |
| src/scanner.ts | 文件扫描和过滤 |
| src/formatter.ts | 格式化输出 |
| bin/code2prompt.js | CLI 入口点 |
| web/ | Web 界面文件 |
| start-web.bat | Web 启动脚本 |

## 依赖说明

### 核心依赖

- **cac** - CLI 框架
- **fast-glob** - 快速文件扫描
- **ignore** - .gitignore 解析
- **clipboardy** - 剪贴板操作
- **ora** - 进度条
- **gpt-tokenizer** - Token 计数

### 开发依赖

- **typescript** - TypeScript 编译器
- **vitest** - 测试框架

---

**提示：** 这是一个精简的项目结构，只保留了核心功能和必要文档。
