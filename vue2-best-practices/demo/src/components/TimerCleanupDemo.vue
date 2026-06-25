<template>
  <DemoCard
    title="⑤ 内存：beforeDestroy 清理定时器"
    desc="挂载/卸载子组件。✅ 卸载时 clearInterval；❌ 不清理则定时器在卸载后仍在跑——看右侧「幽灵 tick」持续增长。"
    rule="memory-clear-timers"
  >
    <div class="cols">
      <div class="pane good">
        <h4><span class="tag-good">✅</span> 卸载时清理</h4>
        <button @click="showGood = !showGood">{{ showGood ? '卸载' : '挂载' }}</button>
        <div style="margin-top: 10px">
          <TickingClock v-if="showGood" :cleanup="true" :on-tick="onGoodTick" />
          <span v-else class="muted">（已卸载）</span>
        </div>
        <div class="readout">卸载后回调停止：tick 计数冻结在 <code>{{ goodTicks }}</code>。</div>
      </div>
      <div class="pane bad">
        <h4><span class="tag-bad">❌</span> 忘记清理</h4>
        <button @click="showBad = !showBad">{{ showBad ? '卸载' : '挂载' }}</button>
        <div style="margin-top: 10px">
          <TickingClock v-if="showBad" :cleanup="false" :on-tick="onBadTick" />
          <span v-else class="muted">（已卸载，但…）</span>
        </div>
        <div class="readout">幽灵 tick：<code>{{ badTicks }}</code> —— 卸载后仍在涨，定时器泄漏了。</div>
      </div>
    </div>
  </DemoCard>
</template>

<script>
import DemoCard from './DemoCard.vue'
import TickingClock from './TickingClock.vue'

export default {
  name: 'TimerCleanupDemo',
  components: { DemoCard, TickingClock },
  data() {
    return { showGood: true, showBad: true, goodTicks: 0, badTicks: 0 }
  },
  methods: {
    onGoodTick() {
      this.goodTicks += 1
    },
    onBadTick() {
      this.badTicks += 1
    },
  },
}
</script>
