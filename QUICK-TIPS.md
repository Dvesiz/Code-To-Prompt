# ⚡ 快速使用技巧

## 🎯 针对大型项目（42M+ tokens）

### 第一步：诊断项目大小

```bash
# 使用 --dry-run 查看 token 数，不生成输出
node bin/code2prompt.js your-project --dry-run
```

**输出示例：**
```
📊 Statistics:
   Files: 15,234
   Tokens: ~42,835,987
   Characters: 125,507,961

🚨 CRITICAL: 42,835,987 tokens is too large for any LLM!
   Recommendation: Use -e to filter file types or scan specific directories
```

### 第二步：检查是否包含了不必要的文件

**常见问题：**
- ❌ 扫描了 `node_modules/`（占 90% 的 tokens）
- ❌ 扫描了 `dist/` 或 `build/`
- ❌ 包含了测试文件
- ❌ 包含了日志文件

**解决方案：**

在项目根目录创建或更新 `.gitignore`：

```gitignore
node_modules/
dist/
build/
*.log
coverage/
.next/
.cache/
```

### 第三步：分模块扫描

#### 方案 1: 按目录扫描

```bash
# 只扫描前端源代码
node bin/code2prompt.js your-project/frontend/src --dry-run

# 只扫描后端源代码
node bin/code2prompt.js your-project/backend/src --dry-run

# 找到合适大小的目录后，生成输出
node bin/code2prompt.js your-project/frontend/src -o frontend.txt
```

#### 方案 2: 按文件类型过滤

```bash
# 只看 TypeScript 文件
node bin/code2prompt.js your-project --dry-run -e ts,tsx

# 只看 JavaScript 文件
node bin/code2prompt.js your-project --dry-run -e js,jsx

# 只看样式文件
node bin/code2prompt.js your-project --dry-run -e css,scss
```

#### 方案 3: 设置 token 限制

```bash
# 限制最多 50k tokens
node bin/code2prompt.js your-project --max-tokens 50000 -e ts,tsx -o output.txt

# 如果超过限制，会提示你如何调整
```

## 📋 实用命令速查

### 诊断命令

```bash
# 查看整个项目的统计信息（不生成输出）
node bin/code2prompt.js . --dry-run

# 查看特定目录
node bin/code2prompt.js ./src --dry-run

# 查看特定文件类型
node bin/code2prompt.js . --dry-run -e ts,tsx
```

### 生成命令

```bash
# 基础用法
node bin/code2prompt.js . -o output.txt

# 过滤文件类型
node bin/code2prompt.js . -e ts,tsx,js,jsx -o code.txt

# 限制 token 数
node bin/code2prompt.js . --max-tokens 50000 -e ts -o limited.txt

# 扫描特定目录
node bin/code2prompt.js ./src/components -o components.txt
```

## 🎯 针对不同场景的策略

### 场景 1: 代码审查

```bash
# 1. 先诊断
node bin/code2prompt.js ./src --dry-run

# 2. 如果太大，按模块扫描
node bin/code2prompt.js ./src/auth --dry-run
node bin/code2prompt.js ./src/users --dry-run

# 3. 选择合适的模块生成
node bin/code2prompt.js ./src/auth -o auth-review.txt
```

### 场景 2: Bug 修复

```bash
# 只扫描相关的文件
node bin/code2prompt.js ./src/components/Login -o bug-context.txt
node bin/code2prompt.js ./src/api/auth -o api-context.txt

# 合并（Windows）
type bug-context.txt api-context.txt > full-context.txt
```

### 场景 3: 功能开发

```bash
# 扫描要修改的模块
node bin/code2prompt.js ./src/features/dashboard --dry-run

# 如果合适，生成输出
node bin/code2prompt.js ./src/features/dashboard -o dashboard.txt
```

### 场景 4: 性能优化

```bash
# 只看核心业务代码
node bin/code2prompt.js ./src -e ts,tsx --max-tokens 30000 -o optimize.txt
```

## 💡 最佳实践

### ✅ 推荐做法

1. **先用 --dry-run 诊断**
   ```bash
   node bin/code2prompt.js . --dry-run
   ```

2. **使用 .gitignore 排除不必要的文件**
   ```gitignore
   node_modules/
   dist/
   *.log
   ```

3. **按需扫描，不要贪多**
   ```bash
   # 好：只扫描需要的部分
   node bin/code2prompt.js ./src/auth -o auth.txt
   
   # 不好：扫描整个项目
   node bin/code2prompt.js . -o everything.txt
   ```

4. **使用 -e 参数过滤**
   ```bash
   node bin/code2prompt.js . -e ts,tsx -o typescript-only.txt
   ```

5. **控制 token 数在合理范围**
   - 小型任务: < 10k tokens
   - 中型任务: 10k-50k tokens
   - 大型任务: 50k-100k tokens
   - 超大任务: 分批处理

### ❌ 避免做法

1. ❌ 不检查就扫描整个项目
2. ❌ 包含 node_modules
3. ❌ 包含构建输出
4. ❌ 一次性处理超过 200k tokens
5. ❌ 包含所有测试文件（除非需要）

## 🔍 Token 数量参考

| Token 数 | 适用模型 | 建议 |
|---------|---------|------|
| < 4k | GPT-3.5 | ✅ 完美 |
| 4k-8k | GPT-4 | ✅ 很好 |
| 8k-32k | GPT-4-32k | ✅ 可以 |
| 32k-128k | GPT-4-turbo | ✅ 可以 |
| 128k-200k | Claude 3 | ⚠️ 接近上限 |
| > 200k | 无 | ❌ 必须分批 |

## 🚀 快速工作流

### 工作流 1: 新项目快速上手

```bash
# 1. 查看项目结构
node bin/code2prompt.js . --dry-run

# 2. 如果合适，生成完整上下文
node bin/code2prompt.js . -o project-overview.txt

# 3. 粘贴给 AI
# "这是我的项目代码，请帮我理解项目结构"
```

### 工作流 2: 大项目问题定位

```bash
# 1. 先定位问题所在的模块
# 2. 只扫描相关模块
node bin/code2prompt.js ./src/problematic-module --dry-run

# 3. 生成上下文
node bin/code2prompt.js ./src/problematic-module -o issue.txt

# 4. 粘贴给 AI
# "这个模块有个 bug: [描述问题]"
```

### 工作流 3: 代码重构

```bash
# 1. 扫描要重构的代码
node bin/code2prompt.js ./src/legacy --dry-run

# 2. 如果太大，按文件类型过滤
node bin/code2prompt.js ./src/legacy -e ts,js -o refactor.txt

# 3. 粘贴给 AI
# "请帮我重构这段代码，使用现代 ES6+ 语法"
```

## 📞 遇到问题？

### 问题 1: Token 数太大

**解决方案：**
```bash
# 使用 -e 过滤
node bin/code2prompt.js . -e ts,tsx --dry-run

# 或扫描子目录
node bin/code2prompt.js ./src/core --dry-run
```

### 问题 2: 不知道扫描哪些文件

**解决方案：**
```bash
# 先用 --dry-run 查看
node bin/code2prompt.js ./src --dry-run

# 逐步缩小范围
node bin/code2prompt.js ./src/components --dry-run
node bin/code2prompt.js ./src/utils --dry-run
```

### 问题 3: 想要精确控制 token 数

**解决方案：**
```bash
# 使用 --max-tokens
node bin/code2prompt.js . --max-tokens 50000 -e ts -o output.txt

# 如果超过，工具会提示你如何调整
```

## 📚 更多资源

- **LARGE-PROJECT-GUIDE.md** - 大型项目完整指南
- **TUTORIAL.md** - 详细教程
- **test-portfolio/** - 示例项目

---

**记住：** 聪明地选择代码，而不是全部给 AI。精准的上下文比完整的代码库更有用！
