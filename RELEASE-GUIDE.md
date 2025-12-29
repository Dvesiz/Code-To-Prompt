# 📦 发布指南

## 发布前检查清单

### ✅ 代码检查

- [x] 所有源代码已完成
- [x] TypeScript 编译无错误
- [x] 核心功能正常工作
- [x] Web 界面正常工作

### ✅ 文档检查

- [x] README.md 完整
- [x] GETTING-STARTED.md 完整
- [x] USAGE-GUIDE.md 完整
- [x] QUICK-TIPS.md 完整
- [x] LARGE-PROJECT-GUIDE.md 完整
- [x] WEB-FEATURES.md 完整
- [x] CHANGELOG.md 更新
- [x] web/README.md 完整
- [x] web/TROUBLESHOOTING.md 完整

### ✅ Package.json 检查

- [x] name: "code-to-prompt"
- [x] version: "0.1.0"
- [x] description 准确
- [x] main 指向正确
- [x] bin 配置正确
- [x] scripts 完整
- [x] keywords 相关
- [x] license: "MIT"
- [x] engines 指定 Node 版本

## 🚀 发布步骤

### 1. 最终构建

```bash
# 清理旧的构建
rmdir /s /q dist

# 重新构建
npm run build

# 验证构建
dir dist
```

### 2. 本地测试

```bash
# CLI 测试
node bin/code2prompt.js your-project --dry-run

# Web 测试
.\start-web.bat
```

### 3. 版本管理

```bash
# 查看当前版本
npm version

# 更新版本（选择一个）
npm version patch  # 0.1.0 -> 0.1.1 (bug 修复)
npm version minor  # 0.1.0 -> 0.2.0 (新功能)
npm version major  # 0.1.0 -> 1.0.0 (重大更新)
```

### 4. Git 提交

```bash
# 添加所有文件
git add .

# 提交
git commit -m "Release v0.1.0"

# 打标签
git tag v0.1.0

# 推送
git push origin main
git push origin v0.1.0
```

### 5. 发布到 NPM

```bash
# 登录 NPM（如果还没登录）
npm login

# 检查包名是否可用
npm search code-to-prompt

# 发布
npm publish

# 验证发布
npm view code-to-prompt
```

### 6. 验证发布

```bash
# 在新目录测试
cd ~
npx code-to-prompt@latest --version
npx code-to-prompt@latest --help
```

## 📝 发布后任务

### 1. 创建 GitHub Release

1. 访问 GitHub 仓库
2. 点击 "Releases"
3. 点击 "Create a new release"
4. 选择标签 v0.1.0
5. 填写发布说明（从 CHANGELOG.md 复制）
6. 发布

### 2. 更新文档

- [ ] 更新 README.md 的安装说明
- [ ] 添加 NPM 徽章
- [ ] 添加下载统计

### 3. 推广

- [ ] 在 Twitter 分享
- [ ] 在 Reddit 分享（r/programming, r/javascript）
- [ ] 在 Product Hunt 发布
- [ ] 在 HackerNews 分享
- [ ] 写博客文章

## 🎯 NPM 包信息

### 包名
`code-to-prompt`

### 安装命令
```bash
# 全局安装
npm install -g code-to-prompt

# 直接使用
npx code-to-prompt
```

### 主要文件
- `bin/code2prompt.js` - CLI 入口
- `dist/` - 编译后的代码
- `web/` - Web 界面

## 📊 发布检查

### NPM 页面应该显示

- ✅ 包名和版本
- ✅ 描述
- ✅ README 内容
- ✅ 关键词
- ✅ 许可证
- ✅ 依赖列表

### GitHub 页面应该有

- ✅ 完整的 README
- ✅ 清晰的文档结构
- ✅ 示例和截图
- ✅ 贡献指南
- ✅ 许可证文件

## 🐛 常见问题

### 问题 1: npm publish 失败

**可能原因：**
- 包名已被占用
- 没有登录
- 版本号重复

**解决方案：**
```bash
# 检查登录状态
npm whoami

# 重新登录
npm logout
npm login

# 更改包名（如果需要）
# 编辑 package.json 中的 name 字段
```

### 问题 2: 构建失败

**解决方案：**
```bash
# 清理并重新安装
rmdir /s /q node_modules
rmdir /s /q dist
npm install
npm run build
```

### 问题 3: Git 推送失败

**解决方案：**
```bash
# 检查远程仓库
git remote -v

# 添加远程仓库（如果需要）
git remote add origin https://github.com/yourusername/code-to-prompt.git

# 推送
git push -u origin main
```

## 📈 发布后监控

### 关注指标

- NPM 下载量
- GitHub Stars
- GitHub Issues
- 用户反馈

### 定期更新

- 修复 bug
- 添加新功能
- 更新文档
- 回复 Issues

## 🎉 完成！

发布完成后，你的工具就可以被全世界的开发者使用了！

---

**下一步：** 继续改进工具，收集用户反馈，发布新版本。
