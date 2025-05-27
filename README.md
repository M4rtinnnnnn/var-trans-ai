# VarTransAI

VarTransAI 是一个 VSCode 插件，它使用 AI 技术帮助开发者将中文（或其他语言）的变量名智能翻译成符合编程规范的英文变量名。

## 功能特点

- 支持将中文变量名翻译成英文
- 自动识别编程语言，遵循相应的命名规范
- 支持多种命名风格（camelCase, PascalCase, UPPER_SNAKE_CASE）
- 保持语义准确性
- 支持多种 AI 模型（OpenAI, Anthropic）
- 快捷键支持（Windows/Linux: Ctrl+Shift+T, Mac: Cmd+Shift+T）

## 安装要求

- VSCode 1.85.0 或更高版本
- AI 模型 API Key（OpenAI/Anthropic/OpenAI Completion API）

## 使用方法

### 配置设置

1. 在 VSCode 中安装插件
2. 在设置中配置你的 AI 模型：
   - 打开 VSCode 设置
   - 搜索 "VarTransAI"
   - 选择模型提供商（OpenAI/Anthropic/OpenAI Completion API）
   - 输入对应的 API Key
   - 选择要使用的模型名称

![设置页面](截屏2025-05-27%2010.43.12.png)

### 使用插件

3. 在代码中选择要翻译的变量名
4. 使用快捷键（Windows/Linux: Ctrl+Shift+T, Mac: Cmd+Shift+T）或右键菜单选择 "Translate Variable Name"

### 操作演示

观看下面的视频了解如何使用插件：

https://github.com/user-attachments/assets/录屏2025-05-27%2010.48.33.mov

## 配置选项

在 VSCode 设置中可以配置以下选项：

- `varTransAI.apiKey`: AI 模型的 API Key
- `varTransAI.baseUrl`: 自定义 API 基础 URL（可选）
  - OpenAI 示例: `https://api.openai.com/v1` 或 `https://your-proxy.com/v1`
  - Anthropic 示例: `https://api.anthropic.com` 或 `https://your-proxy.com/anthropic`
- `varTransAI.modelProvider`: 选择 AI 模型提供商（openai/anthropic）
- `varTransAI.modelName`: 选择具体的模型名称（例如：gpt-3.5-turbo, claude-2 等）

## 支持的模型

- OpenAI: gpt-3.5-turbo, gpt-4 等
- Anthropic: claude-2, claude-instant 等

## 注意事项

- 请确保你有有效的 AI 模型 API Key
- 翻译结果的质量取决于所选 AI 模型的性能
- 建议在使用前先备份你的代码
- 不同模型可能有不同的 API 调用限制和计费方式

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
