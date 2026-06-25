# Vue 2 Best Practices

Vue 2（Options API）的**代码风格与性能优化**技能。参考 [vercel-react-best-practices](https://github.com/vercel-labs/agent-skills) 的组织方式，结合 Vue 2 自身的响应式特性，沉淀为 8 大类、55 条可直接套用的规则。

> 技能名称：`vue2-best-practices` ｜ 适用版本：Vue 2.6 / 2.7

## 为什么需要它

Vue 2 的响应式基于 `Object.defineProperty`，存在 Vue 3 没有的「坑」—— 新增对象属性、数组下标赋值、`length` 修改都**不是响应式的**。本技能大量规则正是为绕开这些坑而生，外加渲染、打包、数据请求、Vuex、内存管理等全链路最佳实践。

最常见的 Vue 2 Bug 就是「数据改了，视图没更新」—— 第 1 类规则专治此症。

## 文件结构

```
vue2-best-practices/
├── SKILL.md                      # 技能入口（AI 加载）
├── README.md                     # 本文件
├── rules/
│   ├── reactivity.md             # 1. 响应式正确性（CRITICAL）
│   ├── bundle.md                 # 2. 打包体积与代码分割（CRITICAL）
│   ├── data-lifecycle.md         # 3. 数据请求与生命周期（HIGH）
│   ├── rendering.md              # 4. 渲染与模板（HIGH）
│   ├── state-vuex.md             # 5. 状态管理 Vuex（MEDIUM-HIGH）
│   ├── component-style.md        # 6. 组件设计与风格（MEDIUM）
│   ├── memory-events.md          # 7. 内存与事件管理（MEDIUM）
│   └── js-template.md            # 8. JS 与模板微优化（LOW）
└── demo/                         # 可运行演示工程（Vite + Vue 2.7 + Vuex）
```

## 可运行演示

[`demo/`](demo/) 是一个真实可跑的 Vite + Vue 2.7 工程，用**左红（❌）/ 右绿（✅）**可交互的方式演示 7 条最直观的规则，亲手点一点就能看到「数据改了视图没动」「输入框跟错行」「定时器泄漏」等经典现象。

```bash
cd demo
npm install
npm run dev        # http://localhost:5173
```

| 演示 | 对应规则 |
|------|----------|
| 响应式新增属性 / 数组下标 | `reactivity-set-for-new-keys` |
| v-for 的 key 不要用 index | `rendering-no-index-as-key` |
| computed 缓存 vs method | `rendering-computed-over-method` |
| 单向数据流 / v-model 契约 | `component-no-mutate-props` |
| beforeDestroy 清理定时器 | `memory-clear-timers` |
| 按需异步加载重组件 | `bundle-async-component` |
| Vuex namespaced 模块 | `vuex-namespaced-modules` |

详见 [demo/README.md](demo/README.md)。

## 规则分类（按影响优先级）

由上至下处理：先解决 CRITICAL，再投入精力到 LOW。

| # | 分类 | 影响 | 前缀 | 文件 |
|---|------|------|------|------|
| 1 | 响应式正确性 | **CRITICAL** | `reactivity-` | [rules/reactivity.md](rules/reactivity.md) |
| 2 | 打包体积与代码分割 | **CRITICAL** | `bundle-` | [rules/bundle.md](rules/bundle.md) |
| 3 | 数据请求与生命周期 | **HIGH** | `data-` | [rules/data-lifecycle.md](rules/data-lifecycle.md) |
| 4 | 渲染与模板 | **HIGH** | `rendering-` | [rules/rendering.md](rules/rendering.md) |
| 5 | 状态管理（Vuex） | **MEDIUM-HIGH** | `vuex-` | [rules/state-vuex.md](rules/state-vuex.md) |
| 6 | 组件设计与风格 | **MEDIUM** | `component-` | [rules/component-style.md](rules/component-style.md) |
| 7 | 内存与事件管理 | **MEDIUM** | `memory-` | [rules/memory-events.md](rules/memory-events.md) |
| 8 | JS 与模板微优化 | **LOW** | `js-` | [rules/js-template.md](rules/js-template.md) |

每条规则的格式统一为：一句话规则 + **为什么** + ❌ 错误示例 + ✅ 正确示例。

## 快速开始

1. **确定任务类型**（新功能 / 代码评审 / 重构 / 排查 Bug）和涉及的分类。
2. **从最高优先级分类入手**。Vue 2 中响应式 Bug 和打包臃肿最影响体验，所以排在最前。
3. **打开 `rules/` 下对应文件**，对照示例修改。
4. **验证**：响应式规则要确认视图真的更新了；打包规则用 `vue-cli-service build --report` 查看 chunk 图。

## 核心规则（绝不违反）

- 对象**新增属性**用 `this.$set` / `Vue.set`，直接赋值不是响应式的
- 数组只能通过 `push`/`splice`/`$set` 等变更，`arr[i] = x`、`arr.length = n` 不是响应式的
- 组件的 `data` **必须是函数**，返回全新对象，不能是共享的对象字面量
- **禁止在子组件中修改 prop**，改用 `$emit` 或本地副本
- `beforeDestroy` 中**务必清理**定时器、全局/DOM 监听器、第三方实例
- `v-for` **必须**绑定稳定唯一的 `:key`，列表会重排/增删时不要用数组下标

## 适用场景

- 编写组件、mixin、单文件组件（`.vue`）
- 在生命周期钩子中实现数据请求
- 设计或重构 Vuex store
- 评审性能、重渲染、响应式问题
- 排查「数据变了视图没更新」「内存泄漏」类 Bug
- 优化打包体积、首屏与可交互时间

> 若使用 Vue 3，请改用 Vue 3 指南 —— 本技能的响应式坑在 Vue 3 中已不存在。

---

## 许可

MIT
