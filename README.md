# 🧠 Skills

> 无人问津的 Skill 技能综合库 🥲 —— 但每一个都是精心打磨的「AI 外挂」✨

给你的 AI 编程助手加点料 🌶️！这里收集了一系列 Agent Skills，让它们从「只会写代码」进化成「会搞设计的代码仔」🎨。

虽然现在看的人不多（Star 数在哭了 😭），但质量绝不含糊 —— 毕竟，好东西不怕没人发现，怕的是发现了不 Star ⭐（疯狂暗示）。


## 📦 技能列表

| 技能 | 说明 |
|------|------|
| [macos-liquidglass-web-design](macos-liquidglass-web-design/) | macOS 26 Liquid Glass 液态毛玻璃设计语言的前端 Web 适配方案。提供完整的 CSS 变量体系、组件库和可运行演示页面。 |
| [animation-principles](animation-principles/) | 迪士尼 12 条动画原则的完整技能库（144 个子技能）。覆盖 CSS/GSAP/Framer Motion 等主流框架，适用于 Web 动画、微交互、游戏 UI、数据可视化等全场景。[【原项目地址：https://github.com/dylantarre/animation-principles】](https://github.com/dylantarre/animation-principles) |
| [vue2-best-practices](vue2-best-practices/) | Vue 2（Options API）代码风格与性能最佳实践技能。8 大类 55 条规则，覆盖响应式正确性、打包分割、渲染优化、数据请求、Vuex、内存管理等，专治「数据改了视图没更新」等 Vue 2 经典坑。**附带一个可运行的 Vite + Vue 2.7 演示工程**（[demo/](vue2-best-practices/demo/)，左红右绿交互对比）。参考 [vercel-react-best-practices](https://github.com/vercel-labs/agent-skills) 组织方式。 |

## 🏗️ 技能结构

每个技能遵循统一结构（强迫症友好 ✅）：

```
skill-name/
├── SKILL.md      # 技能入口文件（必需）
└── assets/       # 静态资源（可选）
```

`SKILL.md` 包含：

- **YAML frontmatter** — 技能名称、描述、触发关键词
- **指令** — 执行步骤、设计规范、代码示例
- **引用** — 指向资源文件

## 🚀 使用

### 方式一：通过 Skills CLI 安装（推荐 👍）

使用 [Skills CLI](https://github.com/vercel-labs/skills) 一键安装技能到你的 AI IDE 中。

**前置要求：** 已安装 [Node.js](https://nodejs.org/) 18+。

```bash
# 安装本仓库中的所有技能
npx skills add Lee-zg/skills

# 仅安装指定技能
npx skills add Lee-zg/skills --skill macos-liquidglass-web-design
npx skills add Lee-zg/skills --skill animation-principles
npx skills add Lee-zg/skills --skill vue2-best-practices

# 先预览可用技能，不执行安装
npx skills add Lee-zg/skills --list
```

**安装范围：**

| 范围 | 参数 | 安装路径 | 适用场景 |
|------|------|----------|----------|
| 项目级（默认） | — | `./<agent>/skills/` | 随项目提交，团队共享 |
| 全局 | `-g` | `~/<agent>/skills/` | 所有项目通用 |

```bash
# 全局安装
npx skills add Lee-zg/skills -g

# 安装到指定 AI Agent
npx skills add Lee-zg/skills -a qoder -a codex -a trae

# 非交互模式（CI/CD 适用）
npx skills add Lee-zg/skills --all -y
```

> 完整文档请参考 [skills.sh/docs](https://www.skills.sh/docs)

### 方式二：手动下载 Skill 文件 📥

如果不使用 CLI 工具，可以直接下载技能文件：

1. **从 GitHub 下载**：访问仓库页面，进入对应的技能目录（如 `macos-liquidglass-web-design/`），点击 `SKILL.md` 文件，右键保存 Raw 内容
2. **使用 Git Clone**：
   ```bash
   git clone https://github.com/Lee-zg/skills.git
   ```
   然后从克隆目录中复制需要的技能文件夹

每个技能的核心是 `SKILL.md` 文件，确保下载时保留完整目录结构（包括 `assets/` 等资源文件）。

### 方式三：导入到 AI IDE 🤖

将下载的技能文件放置到对应 AI IDE 的技能目录中即可生效：

| AI IDE | 项目级路径 | 全局路径 |
|--------|-----------|----------|
| **Qoder** | `.qoder/skills/<skill-name>/` | `~/.qoder/skills/<skill-name>/` |
| **Codex** | `.agents/skills/<skill-name>/` | `~/.codex/skills/<skill-name>/` |
| **Trae** | `.trae/skills/<skill-name>/` | `~/.trae/skills/<skill-name>/` |
| **Cursor** | `.agents/skills/<skill-name>/` | `~/.cursor/skills/<skill-name>/` |
| **Claude Code** | `.claude/skills/<skill-name>/` | `~/.claude/skills/<skill-name>/` |
| **Windsurf** | `.windsurf/skills/<skill-name>/` | `~/.codeium/windsurf/skills/<skill-name>/` |
| **GitHub Copilot** | `.agents/skills/<skill-name>/` | `~/.copilot/skills/<skill-name>/` |

**操作步骤（以 Qoder 为例）：**

```bash
# 1. 创建技能目录
mkdir -p .qoder/skills/macos-liquidglass-web-design

# 2. 将技能文件复制到该目录
cp -r /path/to/downloaded/macos-liquidglass-web-design/* .qoder/skills/macos-liquidglass-web-design/

# 3. 确认目录结构
tree .qoder/skills/macos-liquidglass-web-design/
# ├── SKILL.md
# ├── components.md
# ├── design-tokens.md
# └── assets/
#     └── liquid-glass-demo.html
```

放置完成后，AI IDE 会在后续对话中自动识别并加载技能。

### ⚠️ 注意事项

- **SKILL.md 必需**：每个技能目录必须包含 `SKILL.md` 作为入口文件，其中 `name` 和 `description` 的 YAML frontmatter 为必填字段
- **资源文件完整性**：部分技能引用了 `assets/` 目录下的资源文件，下载时需一并获取
- **符号链接 vs 复制**：Skills CLI 默认使用符号链接（推荐），如需独立副本请使用 `--copy` 参数
- **Windows 用户**：使用符号链接可能需要以管理员权限运行终端，或开启开发者模式

### 🛠️ 管理已安装的技能

```bash
# 查看已安装的技能
npx skills list

# 搜索可用技能
npx skills find liquid glass

# 更新已安装的技能
npx skills update

# 移除技能
npx skills remove macos-liquidglass-web-design
```


## ➕ 添加新技能

想贡献一个技能？太棒了 🎉！（感动到哭 😢）

```bash
mkdir my-skill
touch my-skill/SKILL.md
```

编写 `SKILL.md`，包含元数据和指令，提交 PR 即可。

> 💡 小提示：提交前请确保你的 Skill 真的有用，不要塞一个「帮我写 Hello World」的技能进来哦 😏

---

## 📜 许可

MIT（随便用，别客气 🤝）
