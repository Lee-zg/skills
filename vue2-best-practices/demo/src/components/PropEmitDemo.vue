<template>
  <DemoCard
    title="④ 组件：单向数据流，子改父用 v-model/$emit"
    desc="子组件 PriceTag 绝不直接改 prop，而是通过 input 事件把新值交还父组件。这就是 v-model 的契约。"
    rule="component-no-mutate-props"
  >
    <div class="pane good">
      <h4><span class="tag-good">✅</span> 父持有状态，子用 v-model 上报</h4>
      <div class="row">
        数量：<PriceTag v-model="qty" />
        <span class="muted">（等价于 :value="qty" @input="qty = $event"）</span>
      </div>
      <div class="readout">父组件 qty = <code>{{ qty }}</code>。子组件只负责 <code>$emit('input', ...)</code>，从不写 prop。</div>
    </div>
  </DemoCard>
</template>

<script>
import DemoCard from './DemoCard.vue'
import PriceTag from './PriceTag.vue'

export default {
  name: 'PropEmitDemo',
  components: { DemoCard, PriceTag },
  data() {
    return { qty: 1 }
  },
}
</script>
