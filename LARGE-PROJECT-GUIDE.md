# 🏗️ 大型项目使用指南

## 问题：项目太大怎么办？

如果你的项目 token 数超过 100,000（例如 42,835,987），直接扫描整个项目是不现实的。

**AI 模型的上下文窗口限制：**
- GPT-3.5: ~4,000 tokens
- GPT-4: ~8,000 tokens
- GPT-4-32k: ~32,000 tokens
- GPT-4-turbo: ~128,000 tokens
- Claude 3: ~200,000 tokens

## 🎯 解决方案：分模块扫描

### 策略 1: 按目录扫描

前后端分离项目通常有这样的结构：

```
my-project/
├── frontend/          # 前端代码
│   ├── src/
│   ├── components/
│   └── pages/
├── backend/           # 后端代码
│   ├── controllers/
│   ├── models/
│   └── routes/
└── shared/            # 共享代码
```

**分别扫描：**

```bash
# 只扫描前端
node bin/code2prompt.js your-project/frontend -o frontend.txt

# 只扫描后端
node bin/code2prompt.js your-project/backend -o backend.txt

# 只扫描共享代码
node bin/code2prompt.js your-project/shared -o shared.txt
```

### 策略 2: 按功能模块扫描

```bash
# 用户认证模块
node bin/code2prompt.js your-project/backend/auth -o auth-module.txt

# 用户管理模块
node bin/code2prompt.js your-project/backend/users -o users-module.txt

# 前端登录页面
node bin/code2prompt.js your-project/frontend/src/pages/login -o login-page.txt
```

### 策略 3: 按文件类型扫描

```bash
# 只看 TypeScript 类型定义
node bin/code2prompt.js your-project -e ts -o types.txt

# 只看 API 路由
node bin/code2prompt.js your-project/backend -e ts,js -o api-routes.txt

# 只看 React 组件
node bin/code2prompt.js your-project/frontend -e tsx,jsx -o components.txt

# 只看样式文件
node bin/code2prompt.js your-project/frontend -e css,scss -o styles.txt
```

### 策略 4: 按问题域扫描

根据你要解决的问题，只扫描相关代码：

**场景 1: 修复登录 Bug**
```bash
# 前端登录组件
node bin/code2prompt.js your-project/frontend/src/components/Login -o login-frontend.txt

# 后端认证逻辑
node bin/code2prompt.js your-project/backend/auth -o login-backend.txt
```

**场景 2: 优化数据库查询**
```bash
# 只看数据库相关代码
node bin/code2prompt.js your-project/backend/models -o db-models.txt
node bin/code2prompt.js your-project/backend/repositories -o db-repos.txt
```

**场景 3: 重构某个页面**
```bash
# 只看特定页面
node bin/code2prompt.js your-project/frontend/src/pages/dashboard -o dashboard.txt
```

## 📊 实际案例

### 案例 1: 42M tokens 的前后端项目

假设你的项目结构：

```
my-fullstack-app/
├── frontend/ (20M tokens)
│   ├── src/
│   ├── node_modules/  ← 这个占了大部分！
│   └── dist/
├── backend/ (22M tokens)
│   ├── src/
│   ├── node_modules/  ← 这个也占了大部分！
│   └── dist/
└── docs/
```

**问题诊断：**

```bash
# 检查是否扫描了 node_modules
node bin/code2prompt.js your-project -o test.txt
# 如果 token 数很大，说明 .gitignore 没有正确配置
```

**解决方案：**

1. **确保 .gitignore 正确配置**

在项目根目录创建或更新 `.gitignore`：

```gitignore
# 依赖
node_modules/
vendor/

# 构建输出
dist/
build/
out/
.next/

# 日志
*.log
logs/

# 环境变量
.env
.env.local

# IDE
.vscode/
.idea/

# 测试覆盖率
coverage/

# 临时文件
*.tmp
.cache/
```

2. **分模块扫描**

```bash
# 只扫描前端源代码
node bin/code2prompt.js your-project/frontend/src -e ts,tsx,js,jsx -o frontend-src.txt

# 只扫描后端源代码
node bin/code2prompt.js your-project/backend/src -e ts,js -o backend-src.txt
```

### 案例 2: 针对性问题解决

**问题：** 用户反馈登录后跳转有问题

**步骤 1: 只扫描相关代码**

```bash
# 前端路由和登录组件
node bin/code2prompt.js your-project/frontend/src -e tsx,ts | grep -A 50 "login\|router\|redirect"

# 或者更精确
node bin/code2prompt.js your-project/frontend/src/components/Auth -o auth-components.txt
node bin/code2prompt.js your-project/frontend/src/routes -o routes.txt
```

**步骤 2: 合并相关代码**

```bash
# 创建一个包含所有相关代码的文件
type auth-components.txt routes.txt > login-issue.txt
```

**步骤 3: 粘贴给 AI**

现在 `login-issue.txt` 只包含相关代码，token 数可能只有 5,000-10,000。

## 🛠️ 高级技巧

### 技巧 1: 使用多个 .gitignore

在子目录创建 `.gitignore` 来更精确地控制：

```bash
# frontend/.gitignore
node_modules/
dist/
.next/
*.test.ts
*.spec.ts

# backend/.gitignore
node_modules/
dist/
uploads/
*.test.js
```

### 技巧 2: 创建临时排除列表

如果你想临时排除某些文件：

```bash
# 在项目根目录创建 .code2promptignore
echo "*.test.ts" >> .code2promptignore
echo "*.spec.js" >> .code2promptignore
echo "*.stories.tsx" >> .code2promptignore
```

### 技巧 3: 分批处理

```bash
# 创建一个脚本来分批处理
# process-modules.bat

@echo off
echo 正在处理用户模块...
node bin/code2prompt.js your-project/backend/modules/users -o output/users.txt

echo 正在处理订单模块...
node bin/code2prompt.js your-project/backend/modules/orders -o output/orders.txt

echo 正在处理支付模块...
node bin/code2prompt.js your-project/backend/modules/payment -o output/payment.txt

echo 完成！
```

### 技巧 4: 智能选择文件

```bash
# 只看核心业务逻辑（排除测试、配置等）
node bin/code2prompt.js your-project/src -e ts,tsx | grep -v ".test\|.spec\|.config"
```

## 📋 推荐工作流程

### 工作流 1: 代码审查

```bash
# 1. 先看项目结构（只看文件名）
dir /s /b your-project\src > structure.txt

# 2. 选择要审查的模块
node bin/code2prompt.js your-project/src/modules/critical -o review.txt

# 3. 粘贴给 AI 进行审查
```

### 工作流 2: Bug 修复

```bash
# 1. 定位 bug 所在的模块
# 2. 只扫描相关文件
node bin/code2prompt.js your-project/src/buggy-module -o bug-context.txt

# 3. 添加相关的类型定义
node bin/code2prompt.js your-project/src/types -e ts -o types.txt

# 4. 合并
type bug-context.txt types.txt > full-context.txt
```

### 工作流 3: 功能开发

```bash
# 1. 扫描要修改的模块
node bin/code2prompt.js your-project/src/feature -o current-feature.txt

# 2. 扫描相关的工具函数
node bin/code2prompt.js your-project/src/utils -o utils.txt

# 3. 粘贴给 AI，描述新功能需求
```

## 💡 最佳实践

### ✅ 推荐做法

1. **按需扫描** - 只扫描你需要的部分
2. **使用 -e 参数** - 过滤文件类型
3. **检查 .gitignore** - 确保排除了 node_modules
4. **分模块处理** - 将大项目分成小块
5. **控制在 50k tokens 以内** - 适合大多数 AI 模型

### ❌ 避免做法

1. ❌ 扫描整个项目（包括 node_modules）
2. ❌ 包含所有测试文件
3. ❌ 包含构建输出（dist/build）
4. ❌ 包含日志文件
5. ❌ 一次性处理超过 100k tokens

## 🎯 Token 数量参考

| 项目规模 | Token 数 | 处理方式 |
|---------|---------|---------|
| 小型 | < 10k | 直接扫描整个项目 |
| 中型 | 10k-50k | 按目录或文件类型扫描 |
| 大型 | 50k-200k | 按模块扫描，分批处理 |
| 超大型 | > 200k | 必须按功能域精确扫描 |

## 🔍 诊断工具

创建一个快速诊断脚本：

```bash
# check-project-size.bat
@echo off
echo 正在分析项目大小...
echo.

echo [前端]
node bin/code2prompt.js your-project/frontend/src -e ts,tsx,js,jsx -o temp-frontend.txt
echo.

echo [后端]
node bin/code2prompt.js your-project/backend/src -e ts,js -o temp-backend.txt
echo.

echo 分析完成！查看生成的文件了解各部分的 token 数。
del temp-*.txt
```

## 📞 需要帮助？

如果你的项目仍然太大：

1. 检查是否扫描了 node_modules
2. 检查是否包含了构建输出
3. 考虑只扫描核心业务代码
4. 使用 -e 参数精确过滤文件类型

---

**记住：** Code-To-Prompt 是为了帮助 AI 理解你的代码，不需要把所有代码都给它。聪明地选择相关代码，效果会更好！
