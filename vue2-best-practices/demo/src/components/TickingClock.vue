<template>
  <div class="clock">
    <span class="clock__dot" />
    存活 {{ seconds }}s（实例 #{{ id }}）
  </div>
</template>

<script>
let counter = 0

export default {
  name: 'TickingClock',
  props: {
    // memory-clear-timers: when false, we intentionally leak to show the cost
    cleanup: { type: Boolean, default: true },
    onTick: { type: Function, default: null },
  },
  data() {
    return { seconds: 0, id: ++counter }
  },
  created() {
    // data-fetch-in-created-not-mounted style: side-effect set up early
    this.timer = setInterval(() => {
      this.seconds += 1
      if (this.onTick) this.onTick(this.id)
    }, 1000)
  },
  beforeDestroy() {
    // ✅ memory-clear-timers — only when cleanup is enabled
    if (this.cleanup) clearInterval(this.timer)
    // when cleanup === false, the interval keeps firing after unmount → leak
  },
}
</script>

<style scoped>
.clock { display: flex; align-items: center; gap: 8px; }
.clock__dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--good);
  animation: pulse 1s infinite ease-in-out;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
</style>
