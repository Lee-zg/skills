# Design Engineering

面向**设计工程师**的动画与界面设计技能集合，整合自 [emilkowalski/skills](https://github.com/emilkowalski/skills)（"Skills for Design Engineers"）。以路由式组织，将源仓库的 7 个技能忠实保留为 `references/` 下的独立子文档，统一由 `SKILL.md` 作为入口索引。所有内容源自 Emil Kowalski 的动画设计哲学（[animations.dev](https://animations.dev)、[emilkowal.ski](https://emilkowal.ski/)）。

> 技能名称：`design-engineering` ｜ 核心理念：**克制（restraint）**——最好的动画往往是「没有动画」。

## 为什么需要它

大多数界面的问题不是「动画太少」，而是**动画太多、太慢、太随意**。这套技能提供一整套判断与执行框架：先问「该不该动」（按使用频率决策），再决定「怎么动」（缓动、时长、物理感、可打断性、性能、可访问性）。它既能指导你从零构建体验良好的动效，也能严格评审既有动画代码、审计整个代码库的动效并产出可交接的实施计划。

一句话：**让动画为体验服务，而不是拖慢体验。**

## 文件结构

```
design-engineering/
├── SKILL.md                                    # 技能入口（AI 加载，英文，含路由表 + 核心规则速览）
├── README.md                                   # 本文件（中文说明）
└── references/
    ├── emil-design-eng.md                      # 主技能：动画 + 设计建议（决策框架、缓动/时长、springs、CSS 精通…）
    ├── apple-design.md                         # Apple 界面与流体动效设计原则
    ├── animation-vocabulary.md                 # 动画术语词汇表（把模糊描述反查成精确术语）
    ├── find-animation-opportunities.md         # 发现「该加动画却没加」的位置（只读，严格过滤）
    ├── review-animations.md                    # 严格评审动画代码（十条不可协商标准）
    ├── review-animations-standards.md          # 评审标准参考（精确曲线/时长/配置）
    ├── improve-animations.md                   # 全局审计动效 + 产出自包含实施计划
    ├── improve-animations-audit.md             # 审计手册（八大类别）
    ├── improve-animations-plan-template.md     # 实施计划模板
    └── pick-ui-library.md                      # 为具体任务挑选可信的前端库
```

## 子技能一览

| # | 子技能 | 用途 | 参考文档 |
|---|--------|------|----------|
| 1 | **emil-design-eng** | 主技能：动画与设计综合建议，含决策框架、缓动/时长、spring 物理、CSS 变换、手势、性能、可访问性 | [references/emil-design-eng.md](references/emil-design-eng.md) |
| 2 | **apple-design** | Apple 的界面与流体动效设计原则 | [references/apple-design.md](references/apple-design.md) |
| 3 | **animation-vocabulary** | 反查词汇表：把「那个……的效果叫什么」变成精确术语 | [references/animation-vocabulary.md](references/animation-vocabulary.md) |
| 4 | **find-animation-opportunities** | 扫描界面，找出真正值得加动画的位置（只读、克制） | [references/find-animation-opportunities.md](references/find-animation-opportunities.md) |
| 5 | **review-animations** | 按十条不可协商标准严格评审动画代码 | [review-animations.md](references/review-animations.md)（标准见 [review-animations-standards.md](references/review-animations-standards.md)） |
| 6 | **improve-animations** | 审计整个代码库的动效，产出可交接的实施计划 | [improve-animations.md](references/improve-animations.md)（[审计手册](references/improve-animations-audit.md)、[计划模板](references/improve-animations-plan-template.md)） |
| 7 | **pick-ui-library** | 为具体任务（toast、命令面板、图表、拖拽…）推荐可信的前端库 | [references/pick-ui-library.md](references/pick-ui-library.md) |

## 快速开始

1. **确定任务类型**：构建 / 命名 / 评审 / 审计 / 找机会 / 应用设计原则 / 选库。
2. **路由到对应子技能**，打开上表中的参考文档。
3. **精确取值，绝不估算**：需要具体曲线、时长、spring 配置时，从 [review-animations-standards.md](references/review-animations-standards.md) 或 [improve-animations-audit.md](references/improve-animations-audit.md) 直接引用。
4. **默认克制**：若动画在其使用频率下没有明确目的，最强的做法就是删掉它。

## 核心理念（动画速查）

- **该不该动？** 每天 100+ 次（键盘快捷键、命令面板）→ **永不加动画**；每天数十次 → 大幅削减；偶发（弹窗、抽屉、toast）→ 标准动画；罕见/首次（引导、成功、庆祝）→ 可加惊喜。
- **缓动：** 入场/出场用 `ease-out`；屏幕内移动用 `ease-in-out`；hover/变色用 `ease`；匀速动画用 `linear`。**UI 上永不用 `ease-in`**——它拖慢了用户最关注的那一刻。内置缓动太弱，改用强自定义曲线（`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`）。
- **时长：** UI 动画**控制在 300ms 以内**（按压反馈 100–160ms，tooltip 125–200ms，下拉 150–250ms，弹窗/抽屉 200–500ms）。
- **物理感：** 绝不 `scale(0)`——从 `scale(0.9–0.97)` + `opacity: 0` 开始。弹出层/下拉/tooltip 从触发点缩放（`transform-origin`），而非中心；弹窗除外。
- **可打断：** 频繁触发或手势驱动的动效（toast、开关、拖拽）用 CSS transition 或 spring，而非从零重启的 keyframes。
- **性能：** 只动画 `transform` 与 `opacity`。避免 `transition: all` 与动画布局属性（`width`/`height`/`margin`/`top`/`left`）。
- **可访问性：** 尊重 `prefers-reduced-motion`（减弱而非归零）；hover 动效用 `@media (hover: hover) and (pointer: fine)` 门控。
- **非对称时长：** 刻意动作（按压、长按、危险确认）动得慢；系统响应要利落。
- **打磨：** 组入场错峰 30–80ms；半透明阴影优于实线边框；用轻微 `filter: blur(2px)` 掩盖不完美的交叉淡入。

## 适用场景

- 构建或打磨 UI 动画、转场、微交互
- 选择缓动曲线、时长、spring 配置或 `transform-origin`
- 判断某个元素**到底该不该**加动画
- 评审动画/动效代码的一次改动
- 审计整个代码库的动效并产出优先级修复计划
- 扫描界面找出「该动却没动」的位置
- 给一个模糊的动效起名字
- 应用 Apple 风格的流体界面与设计原则
- 为具体任务挑选可信的前端库（toast、命令面板、图表、拖拽、状态、样式…）

## 出处署名

本模块的全部子技能均忠实整合自 Emil Kowalski 的 [emilkowalski/skills](https://github.com/emilkowalski/skills)，各参考文档顶部均保留了对应源技能的出处说明。

[【原项目地址：https://github.com/emilkowalski/skills】](https://github.com/emilkowalski/skills)

---

## 许可

MIT
