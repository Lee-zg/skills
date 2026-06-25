<template>
  <DemoCard
    title="③ 渲染：computed 缓存 vs method 每次重算"
    desc="点「触发重渲染」会改变一个无关变量。computed 依赖未变所以不重算（计数不动）；method 每次渲染都被调用。"
    rule="rendering-computed-over-method"
  >
    <div class="row" style="margin-bottom: 12px">
      <button @click="tick++">触发重渲染（tick = {{ tick }}）</button>
      <button @click="source++">改变 computed 的依赖（source = {{ source }}）</button>
    </div>
    <div class="cols">
      <div class="pane good">
        <h4><span class="tag-good">✅</span> computed（带缓存）</h4>
        <p>结果：{{ computedDouble }}</p>
        <div class="readout">实际计算次数：<code>{{ computedRuns }}</code> —— 只有 source 变化时才 +1。</div>
      </div>
      <div class="pane bad">
        <h4><span class="tag-bad">❌</span> method（无缓存）</h4>
        <p>结果：{{ methodDouble() }}</p>
        <div class="readout">实际计算次数：<code>{{ methodRuns }}</code> —— 每次重渲染都 +1。</div>
      </div>
    </div>
  </DemoCard>
</template>

<script>
import DemoCard from './DemoCard.vue'

export default {
  name: 'ComputedVsMethodDemo',
  components: { DemoCard },
  data() {
    // Only tick/source are reactive. The run counters are deliberately NOT in
    // data — incrementing reactive state during render would trigger an
    // infinite re-render loop (Vue would re-run render → re-increment → …).
    return { tick: 0, source: 2 }
  },
  created() {
    // non-reactive instance fields, read during render but never tracked
    this.computedRuns = 0
    this.methodRuns = 0
  },
  computed: {
    computedDouble() {
      // cached on `source`: a `tick` change does NOT re-run this getter
      this.computedRuns++
      return this.source * 2
    },
  },
  methods: {
    methodDouble() {
      // called on every render, cached by nothing
      this.methodRuns++
      return this.source * 2
    },
  },
}
</script>
