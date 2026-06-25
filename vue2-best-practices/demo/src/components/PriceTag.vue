<template>
  <!-- A small child to demonstrate the v-model contract + no prop mutation -->
  <span class="price-tag">
    <button @click="$emit('input', Math.max(0, value - 1))">−</button>
    <span class="price-tag__value">{{ value }}</span>
    <button @click="$emit('input', value + 1)">＋</button>
  </span>
</template>

<script>
export default {
  name: 'PriceTag',
  // component-v-model-contract: a v-model child uses `value` prop + `input` event
  props: {
    value: { type: Number, required: true },
  },
  // component-no-mutate-props: we NEVER write `this.value = ...`; we $emit instead.
}
</script>

<style scoped>
.price-tag { display: inline-flex; align-items: center; gap: 8px; }
.price-tag__value { min-width: 28px; text-align: center; font-variant-numeric: tabular-nums; }
</style>
