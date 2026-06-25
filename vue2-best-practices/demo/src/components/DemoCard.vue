<template>
  <!-- component-multi-word-names: "DemoCard" is multi-word -->
  <section class="demo-card">
    <header class="demo-card__head">
      <div>
        <h3 class="demo-card__title">{{ title }}</h3>
        <p class="demo-card__desc muted">{{ desc }}</p>
      </div>
      <code class="demo-card__rule">{{ rule }}</code>
    </header>
    <div class="demo-card__body">
      <!-- component-emit-for-child-to-parent: content comes via slot -->
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'DemoCard',
  props: {
    // component-prop-definitions-detailed: typed + required
    title: { type: String, required: true },
    desc: { type: String, default: '' },
    rule: { type: String, required: true },
  },
}
</script>

<style scoped>
.demo-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 18px;
}
.demo-card__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
}
.demo-card__title { margin: 0; font-size: 1.1rem; }
.demo-card__desc { margin: 4px 0 0; font-size: 0.88rem; }
.demo-card__rule {
  flex: none;
  color: var(--accent);
  background: rgba(96, 165, 250, 0.12);
  white-space: nowrap;
}
</style>
