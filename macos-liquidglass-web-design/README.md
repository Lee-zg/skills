# macOS Liquid Glass Web Design

基于 macOS 26 **Liquid Glass（液态毛玻璃）** 设计语言的 Qoder 技能，将这套苹果最新设计语言应用于前端 Web 界面。

> 技能名称：`macos-liquidglass-web-design`

## Liquid Glass 是什么

macOS 26 引入的设计语言，核心特征：

- **半透明毛玻璃表面** — 界面元素揭示底层内容，而非遮挡
- **环境自适应着色** — 玻璃色调根据背景内容实时调整
- **光线折射与高光** — 模拟真实玻璃的物理光效
- **分层深度** — 多层毛玻璃面板构建 Z 轴空间层级
- **流体动效** — 流畅过渡，强化"液态"质感

与传统的 `backdrop-filter: blur()` 不同，Liquid Glass 要求完整的视觉系统：变量驱动、高光层次、动效曲线和暗黑模式一体化。

## 文件结构

```
macos-liquidglass-web-design/
├── SKILL.md                    # 技能入口（Qoder 加载）
├── README.md                   # 本文件
├── design-tokens.md            # CSS 变量体系（颜色、阴影、圆角、动效等）
├── components.md               # 10 个 UI 组件（HTML + CSS 完整实现）
└── assets/
    └── liquid-glass-demo.html  # 可直接打开的演示页面
```

| 文件 | 说明 |
|------|------|
| `SKILL.md` | Qoder 技能定义，含触发条件、核心 CSS 类（`.liquid-glass`）、层叠层次、暗黑模式、使用规则 |
| `design-tokens.md` | 99+ 个 CSS 变量，涵盖颜色、边框、文本、模糊、阴影、圆角、间距、排版、动效、高光、预置背景 |
| `components.md` | 10 个组件：Navbar、Card、Button、Modal、Input、Sidebar、Toast、Badge、Tooltip、Divider |
| `assets/liquid-glass-demo.html` | 完整演示页面，含动态光晕背景、响应式布局、所有组件实际效果 |

## 快速开始

### 1. 复制 CSS 变量

从 `design-tokens.md` 复制变量到你的项目：

```css
:root {
  --lg-blur: 40px;
  --lg-saturation: 180%;
  --lg-surface-bg: rgba(255, 255, 255, 0.12);
  --lg-surface-border: rgba(255, 255, 255, 0.2);
  /* 完整变量见 design-tokens.md */
}
```

### 2. 使用 `.liquid-glass` 类

```css
.liquid-glass {
  background: var(--lg-surface-bg);
  backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
  -webkit-backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
  border: 1px solid var(--lg-surface-border);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.4), transparent 60%);
  pointer-events: none;
}
```

### 3. 确保有丰富背景

玻璃效果需要彩色背景才能可见：

```css
body {
  background:
    radial-gradient(at 20% 80%, rgba(124, 58, 237, 0.6), transparent 50%),
    radial-gradient(at 80% 20%, rgba(6, 182, 212, 0.5), transparent 50%),
    #0f0a1e;
}
```

### 4. 选择组件

从 `components.md` 复制需要的组件 HTML + CSS。

## 预览

直接在浏览器中打开演示页面：

```bash
# macOS
open assets/liquid-glass-demo.html

# Windows
start assets/liquid-glass-demo.html
```

## 核心规则

- **必须** 同时使用 `backdrop-filter` 和 `-webkit-backdrop-filter`
- **必须** 在玻璃层下方提供丰富的彩色/图像背景
- **禁止** 在玻璃表面使用不透明背景
- **圆角** 始终 >= 12px
- **边框透明度** 保持在 0.08 - 0.25
- **高光**（`::before`）应添加在所有抬升的玻璃表面

## 浏览器兼容

| 浏览器 | 版本 |
|--------|------|
| Chrome | 76+ |
| Safari | 9.1+（需 `-webkit-`） |
| Firefox | 103+ |
| Edge | 79+ |

不支持 `backdrop-filter` 的浏览器需要提供降级方案。

---

## 许可

MIT
