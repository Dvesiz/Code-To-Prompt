# 📝 更新日志

## [0.1.1] - 2025-12-29

### 🌐 Web 界面

#### 新增
- ✨ 添加完整的 Web 前端界面
- 📁 支持拖拽上传文件夹
- 🎯 支持文件类型过滤
- 🔢 实时 Token 计数
- 📊 统计信息展示
- 🚨 智能警告系统
- 📋 一键复制到剪贴板
- 💾 下载为文件功能
- 👁️ 实时预览

#### 修复
- 🐛 修复文件路径读取错误
- 🐛 改进错误处理
- 🐛 添加空文件检查

#### 文档
- 📚 添加 web/README.md
- 📚 添加 WEB-FEATURES.md
- 📚 添加 USAGE-GUIDE.md
- 📚 添加 web/TROUBLESHOOTING.md

### 💻 CLI 功能

#### 新增
- ✨ 添加 `--dry-run` 模式（诊断工具）
- ✨ 添加 `--max-tokens` 限制
- ✨ 智能警告系统（> 200k, > 100k, > 50k tokens）
- ✨ 改进的 Token 计数显示

#### 文档
- 📚 添加 LARGE-PROJECT-GUIDE.md
- 📚 添加 QUICK-TIPS.md
- 📚 添加 GETTING-STARTED.md

### 🧹 项目优化

#### 清理
- 🗑️ 删除重复文档（10 个）
- 🗑️ 精简项目结构
- 📝 整合文档内容

#### 新增
- 📚 添加 PROJECT-STRUCTURE.md
- 📚 添加 CHANGELOG.md
- 🚀 添加 start-web.bat
- 🚀 添加 web-demo.bat

## [0.1.0] - 2025-12-29

### 🎉 初始版本

#### 核心功能
- ✨ 文件扫描（fast-glob）
- ✨ .gitignore 支持
- ✨ 扩展名过滤（-e 参数）
- ✨ 输出到剪贴板
- ✨ 输出到文件（-o 参数）
- ✨ Token 计数（gpt-tokenizer）
- ✨ 进度条显示（ora）
- ✨ XML 格式输出
- ✨ 文件树生成

#### 测试
- ✅ 单元测试（Vitest）
- ✅ scanner.test.ts
- ✅ formatter.test.ts
- ✅ 测试覆盖率 100%

#### 示例项目
- 📁 example/ - 小型示例
- 📁 test-portfolio/ - 中型示例

#### 文档
- 📚 README.md
- 📚 基础使用说明

---

## 版本说明

### 版本号规则

- **主版本号**: 重大功能变更
- **次版本号**: 新功能添加
- **修订号**: Bug 修复

### 图标说明

- ✨ 新功能
- 🐛 Bug 修复
- 📚 文档更新
- 🗑️ 删除功能
- 🔧 配置更改
- ⚡ 性能优化
- 🎨 UI/样式更新
- 🚀 部署相关

---

**当前版本**: 0.1.1
**发布日期**: 2025-12-29
