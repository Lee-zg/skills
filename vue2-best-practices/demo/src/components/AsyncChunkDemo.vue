<template>
  <DemoCard
    title="⑥ 打包：按需异步加载重组件"
    desc="HeavyChart 通过 () => import() 异步加载——它会被 Vite 打成独立 chunk，首屏不加载。点击后看 Network 里新增的 JS 文件。"
    rule="bundle-async-component"
  >
    <div class="pane good">
      <h4><span class="tag-good">✅</span> 动态 import + 独立 chunk</h4>
      <button v-if="!show" @click="show = true">加载图表组件</button>
      <HeavyChart v-if="show" />
      <div class="readout">
        <code>components: { Chart: () =&gt; import('./HeavyChart.vue') }</code>
        —— 路由级用 <code>bundle-async-route-components</code>，命名 chunk 用
        <code>/* webpackChunkName */</code>（webpack）或 Vite 自动分包。
      </div>
    </div>
  </DemoCard>
</template>

<script>
import DemoCard from './DemoCard.vue'

export default {
  name: 'AsyncChunkDemo',
  components: {
    DemoCard,
    // bundle-async-component: the factory returns a dynamic import, so Vite
    // emits HeavyChart in its own chunk that loads only on first render.
    HeavyChart: () => import('./HeavyChart.vue'),
  },
  data() {
    return { show: false }
  },
}
</script>
