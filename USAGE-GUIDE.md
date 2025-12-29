# 📖 完整使用指南

## 🎯 选择合适的方式

### 🌐 Web 界面 - 适合所有人

**优点：**
- ✅ 无需安装，直接使用
- ✅ 可视化操作，简单直观
- ✅ 实时反馈，立即看到结果
- ✅ 适合新手和非技术人员

**启动方式：**
```bash
.\start-web.bat
# 或直接打开 web/index.html
```

**查看详细说明：** [web/README.md](./web/README.md)

---

### 💻 CLI 命令行 - 适合开发者

**优点：**
- ✅ 速度更快
- ✅ 可以自动化
- ✅ 适合集成到工作流
- ✅ 更多高级选项

**基础用法：**
```bash
node bin/code2prompt.js your-project -o output.txt
```

**查看详细说明：** [GETTING-STARTED.md](./GETTING-STARTED.md)

## 📚 文档导航

根据你的需求选择合适的文档：

| 需求 | 推荐文档 |
|------|---------|
| 快速上手 | [GETTING-STARTED.md](./GETTING-STARTED.md) |
| Web 界面使用 | [web/README.md](./web/README.md) |
| 使用技巧 | [QUICK-TIPS.md](./QUICK-TIPS.md) |
| 大型项目 | [LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md) |
| Web 功能详解 | [WEB-FEATURES.md](./WEB-FEATURES.md) |
| 项目结构 | [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) |

## 🚀 快速开始

### 新手推荐流程

1. **启动 Web 界面**
   ```bash
   .\start-web.bat
   ```

2. **测试工具**
   - 准备一个小型项目文件夹
   - 拖拽到浏览器
   - 查看生成的结果
   - 熟悉界面操作

3. **处理真实项目**
   - 拖拽你的项目文件夹
   - 设置文件类型过滤（如 `ts,tsx,js,jsx`）
   - 复制输出粘贴给 AI

### 开发者推荐流程

1. **安装依赖**
   ```bash
   npm install
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **测试工具**
   ```bash
   node bin/code2prompt.js your-project --dry-run
   ```

4. **使用工具**
   ```bash
   node bin/code2prompt.js your-project -e ts,tsx -o output.txt
   ```

## 💡 常见使用场景

### 场景 1: 代码审查

**Web 方式：**
1. 拖拽项目文件夹
2. 设置过滤: `ts,tsx,js,jsx`
3. 点击"复制到剪贴板"
4. 粘贴给 ChatGPT: "请审查这段代码"

**CLI 方式：**
```bash
node bin/code2prompt.js ./src -e ts,tsx,js,jsx -o review.txt
# 打开 review.txt，复制内容
# 粘贴给 ChatGPT
```

### 场景 2: Bug 修复

**Web 方式：**
1. 只拖拽有问题的模块
2. 复制输出
3. 粘贴给 AI 并描述 bug

**CLI 方式：**
```bash
node bin/code2prompt.js ./src/buggy-module -o bug.txt
```

### 场景 3: 功能开发

**Web 方式：**
1. 拖拽要修改的功能模块
2. 设置过滤: `ts,tsx`
3. 复制输出
4. 描述新功能需求

**CLI 方式：**
```bash
node bin/code2prompt.js ./src/features/dashboard -e ts,tsx -o feature.txt
```

### 场景 4: 大型项目（42M+ tokens）

**必须分模块处理！**

**Web 方式：**
1. 先拖拽 `frontend/src` 目录
2. 保存为 `frontend.txt`
3. 再拖拽 `backend/src` 目录
4. 保存为 `backend.txt`
5. 根据需要使用不同的文件

**CLI 方式：**
```bash
# 先诊断
node bin/code2prompt.js your-project --dry-run

# 分模块扫描
node bin/code2prompt.js your-project/frontend/src -e ts,tsx -o frontend.txt
node bin/code2prompt.js your-project/backend/src -e ts,js -o backend.txt
```

**查看完整策略：** [LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md)

## 🎯 最佳实践

### ✅ 推荐做法

1. **先用 --dry-run 诊断**（CLI）
   ```bash
   node bin/code2prompt.js . --dry-run
   ```

2. **使用文件类型过滤**
   - Web: 在"文件类型过滤"输入框填写
   - CLI: 使用 `-e` 参数

3. **控制 Token 数量**
   - 小型任务: < 10k tokens
   - 中型任务: 10k-50k tokens
   - 大型任务: 分批处理

4. **按需扫描**
   - ✅ 只扫描需要的模块
   - ❌ 不要扫描整个项目

5. **检查 .gitignore**
   - 确保排除了 `node_modules/`
   - 确保排除了 `dist/`, `build/`

### ❌ 避免做法

1. ❌ 扫描包含 node_modules 的目录
2. ❌ 一次性处理超过 100k tokens
3. ❌ 包含构建输出和日志文件
4. ❌ 忽略警告提示
5. ❌ 不设置任何过滤

## 📊 Token 数量参考

| Token 数 | 适用模型 | 建议 |
|---------|---------|------|
| < 4k | GPT-3.5 | ✅ 完美 |
| 4k-8k | GPT-4 | ✅ 很好 |
| 8k-32k | GPT-4-32k | ✅ 可以 |
| 32k-128k | GPT-4-turbo | ✅ 可以 |
| 128k-200k | Claude 3 | ⚠️ 接近上限 |
| > 200k | 无 | ❌ 必须分批 |

## 🔧 高级功能

### CLI 高级选项

```bash
# 检查大小（不生成输出）
node bin/code2prompt.js . --dry-run

# 限制 Token 数
node bin/code2prompt.js . --max-tokens 50000 -e ts -o output.txt

# 扫描特定目录
node bin/code2prompt.js ./src/components -o components.txt

# 组合使用
node bin/code2prompt.js ./src -e ts,tsx --max-tokens 30000 -o limited.txt
```

### Web 高级技巧

1. **精确控制 Token 数**
   - 设置"最大 Token 限制"
   - 如果超过会自动提示

2. **快速测试**
   - 使用 test-portfolio 文件夹
   - 熟悉界面操作

3. **分批处理**
   - 分别处理不同模块
   - 保存为不同的文件

## 🚨 常见问题

### Q: Token 数量太大怎么办？

**A: 三种解决方案**

1. **使用文件类型过滤**
   ```bash
   # CLI
   node bin/code2prompt.js . -e ts,tsx
   
   # Web
   # 在"文件类型过滤"输入: ts,tsx
   ```

2. **只扫描特定目录**
   ```bash
   # CLI
   node bin/code2prompt.js ./src/auth
   
   # Web
   # 只拖拽 src/auth 文件夹
   ```

3. **分批处理**
   - 分别处理不同模块
   - 根据需要使用不同的输出

### Q: 如何选择 Web 还是 CLI？

**A: 根据你的需求**

- **新手/偶尔使用** → Web 界面
- **开发者/频繁使用** → CLI 命令行
- **需要自动化** → CLI 命令行
- **团队协作** → Web 界面（可部署）

### Q: 数据安全吗？

**A: 完全安全**

- ✅ Web 版本：所有处理在浏览器本地完成
- ✅ CLI 版本：所有处理在你的电脑上完成
- ✅ 不上传任何数据到服务器
- ✅ 不保存任何文件

## 📞 获取帮助

### 文档资源

- [README.md](./README.md) - 项目介绍
- [GETTING-STARTED.md](./GETTING-STARTED.md) - 快速开始
- [QUICK-TIPS.md](./QUICK-TIPS.md) - 使用技巧
- [LARGE-PROJECT-GUIDE.md](./LARGE-PROJECT-GUIDE.md) - 大型项目
- [web/README.md](./web/README.md) - Web 界面
- [WEB-FEATURES.md](./WEB-FEATURES.md) - Web 功能详解

### 启动脚本

- `start-web.bat` - 启动 Web 界面

## 🎉 开始使用

选择你喜欢的方式开始：

**Web 界面：**
```bash
.\start-web.bat
```

**CLI 命令行：**
```bash
node bin/code2prompt.js your-project --dry-run
```

---

**祝你使用愉快！** 如果有任何问题，查看相关文档或提交 Issue。
