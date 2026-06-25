<template>
  <DemoCard
    title="① 响应式：新增属性 / 数组下标"
    desc="Vue 2 基于 Object.defineProperty，新增对象属性、数组下标赋值都不是响应式的。点按钮对比——左边数据变了但视图不动。"
    rule="reactivity-set-for-new-keys"
  >
    <div class="cols">
      <!-- ❌ 错误：直接赋值新 key / 下标 -->
      <div class="pane bad">
        <h4><span class="tag-bad">❌</span> 直接赋值</h4>
        <p>昵称：{{ user.nickname || '（未定义的新属性）' }}</p>
        <p>第二个标签：{{ tags[1] || '（下标赋值）' }}</p>
        <div class="row">
          <button @click="badAddKey">user.nickname = ...</button>
          <button @click="badSetIndex">tags[1] = ...</button>
        </div>
        <div class="readout">
          实际数据：nickname=<code>{{ rawNickname }}</code> · tags=<code>{{ rawTags }}</code>
          <br />数据改了，但视图不更新 → 这就是「数据改了视图没动」的经典坑。
        </div>
      </div>

      <!-- ✅ 正确：$set -->
      <div class="pane good">
        <h4><span class="tag-good">✅</span> Vue.set / this.$set</h4>
        <p>昵称：{{ user2.nickname || '（点右键添加）' }}</p>
        <p>第二个标签：{{ tags2[1] || '（点按钮）' }}</p>
        <div class="row">
          <button @click="goodAddKey">$set(user2, 'nickname')</button>
          <button @click="goodSetIndex">$set(tags2, 1, ...)</button>
        </div>
        <div class="readout">视图随数据实时更新。新增 key 用 <code>$set</code>，数组用 <code>splice/$set</code>。</div>
      </div>
    </div>
  </DemoCard>
</template>

<script>
import DemoCard from './DemoCard.vue'

let n = 0

export default {
  name: 'ReactivitySetDemo',
  components: { DemoCard },
  data() {
    // reactivity-declare-all-data-keys: declare known keys up front.
    // Here nickname is intentionally undeclared to demonstrate the trap.
    return {
      user: {},
      tags: ['vue'],
      user2: {},
      tags2: ['vue'],
    }
  },
  computed: {
    // Read raw values through a getter so we can prove the data DID change
    // underneath even when the (❌) view above won't re-render.
    rawNickname() {
      return JSON.stringify(this.user.nickname)
    },
    rawTags() {
      return JSON.stringify(this.tags)
    },
  },
  methods: {
    badAddKey() {
      // ❌ new key is not reactive
      this.user.nickname = 'Neo-' + ++n
    },
    badSetIndex() {
      // ❌ index assignment is not reactive
      this.tags[1] = 'reactive-' + ++n
    },
    goodAddKey() {
      // ✅ reactive
      this.$set(this.user2, 'nickname', 'Neo-' + ++n)
    },
    goodSetIndex() {
      // ✅ reactive (could also use splice)
      this.$set(this.tags2, 1, 'reactive-' + ++n)
    },
  },
}
</script>
