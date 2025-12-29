# 🤝 贡献指南

感谢你考虑为 Code-To-Prompt 做出贡献！

## 如何贡献

### 报告 Bug

如果你发现了 bug，请创建一个 Issue 并包含：

1. **Bug 描述** - 清楚地描述问题
2. **重现步骤** - 如何重现这个问题
3. **预期行为** - 你期望发生什么
4. **实际行为** - 实际发生了什么
5. **环境信息** - 操作系统、Node 版本、浏览器版本等
6. **截图** - 如果适用

### 建议新功能

如果你有新功能的想法，请创建一个 Issue 并包含：

1. **功能描述** - 清楚地描述新功能
2. **使用场景** - 为什么需要这个功能
3. **实现建议** - 如果有的话

### 提交代码

1. **Fork 仓库**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/your-username/code-to-prompt.git
   cd code-to-prompt
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **进行更改**
   - 编写代码
   - 更新文档
   - 确保代码风格一致

6. **构建和测试**
   ```bash
   npm run build
   node bin/code2prompt.js your-test-project --dry-run
   ```

7. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # 或
   git commit -m "fix: fix bug description"
   ```

8. **推送到你的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **创建 Pull Request**
   - 访问 GitHub 上的原仓库
   - 点击 "New Pull Request"
   - 选择你的分支
   - 填写 PR 描述
   - 提交

## 代码规范

### TypeScript

- 使用 TypeScript 编写代码
- 遵循现有的代码风格
- 添加适当的类型注解
- 避免使用 `any` 类型

### 命名规范

- 变量和函数：camelCase
- 类和接口：PascalCase
- 常量：UPPER_SNAKE_CASE
- 文件名：kebab-case

### 注释

- 为复杂的逻辑添加注释
- 使用 JSDoc 注释公共 API
- 保持注释简洁明了

### 示例

```typescript
/**
 * 扫描指定目录的文件
 * @param dir - 目录路径
 * @param extensions - 文件扩展名数组（可选）
 * @returns 文件信息数组
 */
export async function getFiles(
  dir: string,
  extensions?: string[]
): Promise<FileInfo[]> {
  // 实现代码
}
```

## 提交信息规范

使用语义化的提交信息：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式（不影响功能）
- `refactor:` - 重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建/工具相关

### 示例

```
feat: add support for custom ignore patterns
fix: resolve file path reading error in web interface
docs: update README with new features
style: format code with prettier
refactor: simplify file scanning logic
```

## 文档贡献

文档同样重要！你可以：

- 修正拼写错误
- 改进说明
- 添加示例
- 翻译文档

## 开发流程

### 1. 设置开发环境

```bash
# 克隆仓库
git clone https://github.com/your-username/code-to-prompt.git
cd code-to-prompt

# 安装依赖
npm install

# 构建
npm run build
```

### 2. 开发模式

```bash
# 监听文件变化，自动重新编译
npm run dev
```

### 3. 测试更改

```bash
# CLI 测试
node bin/code2prompt.js test-project --dry-run

# Web 测试
.\start-web.bat
```

## 项目结构

```
code-to-prompt/
├── src/              # 源代码
│   ├── index.ts      # CLI 入口
│   ├── scanner.ts    # 文件扫描
│   └── formatter.ts  # 格式化
├── web/              # Web 界面
├── bin/              # CLI 可执行文件
└── dist/             # 编译输出
```

## 需要帮助？

- 查看现有的 Issues
- 阅读文档
- 在 Issue 中提问

## 行为准则

- 尊重他人
- 保持友好和专业
- 接受建设性的批评
- 关注对项目最有利的事情

## 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下发布。

---

**感谢你的贡献！** 🎉
