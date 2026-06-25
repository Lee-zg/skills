# Vue 2 Best Practices · 可运行演示工程

`vue2-best-practices` 技能的配套演示。每个组件对应技能里的一条规则，用**左红（❌ 错误）/ 右绿（✅ 正确）**的可交互方式直观呈现「为什么要这么写」。

技术栈：**Vue 2.7（Options API）+ Vuex 3 + Vite 5**。

## 运行

```bash
cd vue2-best-practices/demo
npm install
npm run dev      # 开发服务器，默认 http://localhost:5173
```

构建与本地预览：

```bash
npm run build    # 产物输出到 dist/，可观察异步组件被打成独立 chunk
npm run preview
```

> 要求 Node.js 18+。

## 演示清单

| # | 演示 | 对应规则 | 怎么看 |
|---|------|----------|--------|
| ① | 响应式：新增属性 / 数组下标 | `reactivity-set-for-new-keys` | 点「直接赋值」数据变了但视图不动；`$set` 才更新 |
| ② | v-for 的 key 不要用 index | `rendering-no-index-as-key` | 在输入框打字后头部插入一行，看 DOM 状态是否错位 |
| ③ | computed 缓存 vs method | `rendering-computed-over-method` | 触发重渲染，对比两者「实际计算次数」 |
| ④ | 单向数据流 / v-model 契约 | `component-no-mutate-props` | 子组件只 `$emit('input')`，从不改 prop |
| ⑤ | beforeDestroy 清理定时器 | `memory-clear-timers` | 卸载未清理的组件，看「幽灵 tick」持续增长 |
| ⑥ | 按需异步加载重组件 | `bundle-async-component` | 点击后在 Network 看到新增的独立 JS chunk |
| ⑦ | Vuex namespaced 模块 | `vuex-namespaced-modules` | 派生状态走 getter、异步走 action |

完整的 8 大类 55 条规则见上层目录的 [`SKILL.md`](../SKILL.md) 与 [`rules/`](../rules/)。

## 目录结构

```
demo/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js
    ├── App.vue
    ├── store/index.js          # Vuex namespaced 模块
    ├── styles/global.css
    └── components/
        ├── DemoCard.vue        # 复用的卡片容器
        ├── ReactivitySetDemo.vue
        ├── ListKeyDemo.vue
        ├── ComputedVsMethodDemo.vue
        ├── PropEmitDemo.vue / PriceTag.vue
        ├── TimerCleanupDemo.vue / TickingClock.vue
        ├── AsyncChunkDemo.vue / HeavyChart.vue
        └── VuexCartDemo.vue
```
