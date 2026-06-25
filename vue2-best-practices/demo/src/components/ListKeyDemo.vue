<template>
  <DemoCard
    title="② 渲染：v-for 的 key 不要用 index"
    desc="在每行的输入框里打字，然后点「头部插入」。用 index 作 key 时，DOM 状态会错位到别的行；用稳定 id 则正确跟随。"
    rule="rendering-no-index-as-key"
  >
    <div class="cols">
      <!-- ❌ index as key -->
      <div class="pane bad">
        <h4><span class="tag-bad">❌</span> :key="index"</h4>
        <ul class="list">
          <li v-for="(item, index) in badList" :key="index">
            <span class="badge">{{ item.label }}</span>
            <input placeholder="在此输入…" />
          </li>
        </ul>
        <button @click="prepend('bad')">头部插入一行</button>
        <div class="readout">输入内容会“粘”在原来的位置，跟错了行。</div>
      </div>

      <!-- ✅ stable id as key -->
      <div class="pane good">
        <h4><span class="tag-good">✅</span> :key="item.id"</h4>
        <ul class="list">
          <li v-for="item in goodList" :key="item.id">
            <span class="badge">{{ item.label }}</span>
            <input placeholder="在此输入…" />
          </li>
        </ul>
        <button @click="prepend('good')">头部插入一行</button>
        <div class="readout">输入内容正确跟随它所属的那一行。</div>
      </div>
    </div>
  </DemoCard>
</template>

<script>
import DemoCard from './DemoCard.vue'

let seq = 3
function seed() {
  return [
    { id: 1, label: 'A' },
    { id: 2, label: 'B' },
    { id: 3, label: 'C' },
  ]
}

export default {
  name: 'ListKeyDemo',
  components: { DemoCard },
  data() {
    return { badList: seed(), goodList: seed() }
  },
  methods: {
    prepend(which) {
      const id = ++seq
      const row = { id, label: String.fromCharCode(64 + id) }
      // rendering-key-in-v-for: prepend forces a re-key; index keys mismatch.
      this[which === 'bad' ? 'badList' : 'goodList'].unshift(row)
    },
  },
}
</script>

<style scoped>
.list { list-style: none; margin: 0 0 12px; padding: 0; }
.list li { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.badge {
  display: inline-block;
  width: 24px;
  text-align: center;
  border-radius: 6px;
  background: rgba(148, 163, 184, 0.2);
}
</style>
