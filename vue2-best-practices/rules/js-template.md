# JavaScript & Template Micro-opts (LOW)

Small wins that matter in hot paths — large lists, frequent events, big render loops. Apply these after the higher-impact categories; individually minor, they add up in performance-sensitive views.

---

## js-object-freeze-constants

`Object.freeze` constant lookup tables, option lists, and config that components only read.

**Why:** When a constant is referenced in `data`/`props`, Vue would otherwise make it reactive. Freezing skips that conversion. It also signals intent (this never changes) and prevents accidental mutation.

```js
// ✅ defined once at module scope, frozen
const STATUS_OPTIONS = Object.freeze([
  Object.freeze({ value: 'active',   label: 'Active' }),
  Object.freeze({ value: 'archived', label: 'Archived' }),
])

export default {
  data() { return { statusOptions: STATUS_OPTIONS } }
}
```

---

## js-hoist-static-jsx-config

Hoist static objects/arrays out of `render`/`methods` to module or instance scope.

**Why:** A literal created inside a function is rebuilt on every call — every render for render functions. A new object identity also defeats child `prop` change checks, causing extra child re-renders. Define it once.

```js
// ❌ new array + object every render
render(h) {
  return h(MyChart, { props: { options: { animation: false, colors: ['#f00'] } } })
}
```

```js
// ✅ created once
const CHART_OPTIONS = { animation: false, colors: ['#f00'] }
render(h) {
  return h(MyChart, { props: { options: CHART_OPTIONS } })
}
```

---

## js-debounce-throttle-handlers

Debounce/throttle high-frequency handlers (input, scroll, resize, mousemove).

**Why:** These events fire dozens of times per second. Running a fetch, filter, or layout calc on each one floods the main thread. Debounce trailing-edge for "settled" inputs (search), throttle for continuous ones (scroll).

```js
import debounce from 'lodash-es/debounce'

created() {
  // create per-instance so debounce state isn't shared across instances
  this.search = debounce(this._search, 300)
},
beforeDestroy() {
  this.search.cancel()   // drop a pending trailing call (see memory rules)
},
methods: {
  _search(q) { /* real work */ }
}
```

---

## js-index-map-over-find

When looking items up by key repeatedly, build a `Map`/object index once instead of `.find()` in a loop.

**Why:** `.find()` is O(n); calling it inside a loop over m items is O(n·m). A pre-built index makes each lookup O(1). Critical when joining or cross-referencing large lists in a computed property.

```js
// ❌ O(n·m): find for every order
orders.map(o => ({ ...o, user: users.find(u => u.id === o.userId) }))
```

```js
// ✅ O(n+m): index once, then O(1) lookups
const byId = new Map(users.map(u => [u.id, u]))
orders.map(o => ({ ...o, user: byId.get(o.userId) }))
```

---

## js-avoid-inline-object-literals-in-template

Avoid creating new object/array/function literals inline in templates passed as props.

**Why:** `:style="{ color: c }"`, `:items="[...]"`, or `@click="() => fn(id)"` create a fresh reference on every render, breaking the child's ability to skip re-rendering on unchanged props. Move them to computed properties or methods.

```html
<!-- ❌ new object + new function each render -->
<Child :config="{ mode: 'x', size: big }" @save="() => save(item.id)" />
```

```html
<!-- ✅ stable references -->
<Child :config="childConfig" @save="onSave" />
```

```js
computed: {
  childConfig() { return { mode: 'x', size: this.big } }
},
methods: {
  onSave() { this.save(this.item.id) }
}
```

For unavoidable per-row handlers, pass the id through the event instead of closing over it: `@save="onSave"` and `this.$emit('save', item.id)` from the child.
