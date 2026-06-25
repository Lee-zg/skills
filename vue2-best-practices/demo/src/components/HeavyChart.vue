<template>
  <!-- Pretend-heavy component that ships in its own lazy chunk -->
  <div class="chart">
    <div v-for="(h, i) in bars" :key="i" class="chart__bar" :style="{ height: h + '%' }" />
  </div>
</template>

<script>
export default {
  name: 'HeavyChart',
  data() {
    // js-object-freeze-constants: static data that never changes is frozen,
    // so Vue skips making it reactive (reactivity-freeze-static-lists).
    return { bars: Object.freeze([35, 70, 45, 90, 60, 80, 30, 55]) }
  },
}
</script>

<style scoped>
.chart { display: flex; align-items: flex-end; gap: 6px; height: 120px; }
.chart__bar {
  flex: 1;
  background: linear-gradient(to top, var(--accent), #a78bfa);
  border-radius: 4px 4px 0 0;
  transition: height 0.4s ease;
}
</style>
