<template>
  <DemoCard
    title="⑦ 状态管理：namespaced 模块 + getters + actions"
    desc="派生状态（总数/总价）放在 getter；同步改动走 mutation；异步走 action。组件用 mapState/mapGetters 读取。"
    rule="vuex-namespaced-modules"
  >
    <div class="pane good">
      <h4><span class="tag-good">✅</span> cart 模块</h4>
      <ul class="cart">
        <li v-for="item in items" :key="item.id">
          <span>{{ item.name }} · ¥{{ item.price }}</span>
          <span class="row">
            <button @click="dec(item.id)">−</button>
            <b>{{ item.qty }}</b>
            <button @click="inc(item.id)">＋</button>
            <button @click="addOneAsync(item.id)">异步+1</button>
          </span>
        </li>
      </ul>
      <div class="readout">
        合计 <code>{{ totalCount }}</code> 件 · ¥<code>{{ totalPrice }}</code>
        （均来自 <code>getters</code>，自动缓存派生）
      </div>
    </div>
  </DemoCard>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import DemoCard from './DemoCard.vue'

export default {
  name: 'VuexCartDemo',
  components: { DemoCard },
  computed: {
    // vuex-map-helpers: read state/getters via helpers, namespaced by 'cart/'
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['totalCount', 'totalPrice']),
  },
  methods: {
    ...mapMutations('cart', { inc: 'INCREMENT_QTY', dec: 'DECREMENT_QTY' }),
    ...mapActions('cart', ['addOneAsync']),
  },
}
</script>

<style scoped>
.cart { list-style: none; margin: 0 0 8px; padding: 0; }
.cart li { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
</style>
