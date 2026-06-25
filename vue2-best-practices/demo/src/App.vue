<template>
  <div class="app">
    <header class="hero">
      <h1>Vue 2 Best Practices · 可运行演示</h1>
      <p class="muted">
        每张卡片对应 <code>vue2-best-practices</code> 技能中的一条规则，左红右绿、可亲手操作。
        Vue {{ vueVersion }} · Options API。
      </p>
      <p class="muted">
        规则全文见
        <a href="../rules/" target="_blank" rel="noopener">../rules/</a>
        ｜ 技能入口 <code>SKILL.md</code>
      </p>
    </header>

    <main>
      <ReactivitySetDemo />
      <ListKeyDemo />
      <ComputedVsMethodDemo />
      <PropEmitDemo />
      <TimerCleanupDemo />
      <AsyncChunkDemo />
      <VuexCartDemo />
    </main>

    <footer class="foot muted">
      55 条规则 · 8 大类 —— 本页仅演示其中 7 条最直观的。完整清单见 SKILL.md。
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import ReactivitySetDemo from './components/ReactivitySetDemo.vue'
import ListKeyDemo from './components/ListKeyDemo.vue'
import ComputedVsMethodDemo from './components/ComputedVsMethodDemo.vue'
import PropEmitDemo from './components/PropEmitDemo.vue'
import TimerCleanupDemo from './components/TimerCleanupDemo.vue'
import AsyncChunkDemo from './components/AsyncChunkDemo.vue'
import VuexCartDemo from './components/VuexCartDemo.vue'

export default {
  name: 'AppRoot',
  components: {
    ReactivitySetDemo,
    ListKeyDemo,
    ComputedVsMethodDemo,
    PropEmitDemo,
    TimerCleanupDemo,
    AsyncChunkDemo,
    VuexCartDemo,
  },
  data() {
    return { vueVersion: Vue.version }
  },
}
</script>

<style scoped>
.app { max-width: 960px; margin: 0 auto; padding: 32px 20px 64px; }
.hero { margin-bottom: 28px; }
.hero h1 { margin: 0 0 8px; font-size: 1.8rem; }
.hero p { margin: 4px 0; }
.foot { margin-top: 24px; text-align: center; font-size: 0.85rem; }
</style>
