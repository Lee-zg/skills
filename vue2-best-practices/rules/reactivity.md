# Reactivity Correctness (CRITICAL)

Vue 2 reactivity is built on `Object.defineProperty`, which converts existing object keys into getters/setters **at instance-creation time**. Keys added later, array index writes, and `length` changes are invisible to the reactivity system. These rules prevent the single most common Vue 2 bug: "the data changed but the view didn't update."

---

## reactivity-set-for-new-keys

Add new reactive properties to an object with `this.$set` (or `Vue.set`), never plain assignment.

**Why:** Vue 2 can only track keys that existed when the object was made reactive. A newly assigned key has no getter/setter, so the view never re-renders.

```js
// ❌ not reactive — view will not update
this.user.age = 30
this.form['email'] = 'a@b.com'
```

```js
// ✅ reactive
this.$set(this.user, 'age', 30)
this.$set(this.form, 'email', 'a@b.com')

// adding several keys: replace the whole object instead
this.user = { ...this.user, age: 30, email: 'a@b.com' }
```

---

## reactivity-array-index-mutation

Never set an array item by index. Use `splice` or `this.$set`.

**Why:** Vue 2 cannot detect `arr[index] = value`. Index assignment bypasses the reactive setter.

```js
// ❌ not reactive
this.list[0] = newItem
```

```js
// ✅ reactive
this.$set(this.list, 0, newItem)
this.list.splice(0, 1, newItem)
```

Vue wraps these array mutators to be reactive: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`. Prefer them over manual index work.

---

## reactivity-array-length

Never change reactivity-tracked array contents via `.length`.

**Why:** `arr.length = 0` is not observed. Use `splice` to truncate.

```js
// ❌ not reactive
this.list.length = 0
```

```js
// ✅ reactive
this.list.splice(0)
this.list = []   // reassignment is also reactive
```

---

## reactivity-replace-dont-mutate-nested

For deep updates, prefer replacing the object/array immutably over deep `$set` chains.

**Why:** Reassigning a top-level reactive property is always reactive and is easier to reason about than nested `$set` calls. It also plays well with Vuex strict mode and devtools time-travel.

```js
// ❌ fragile deep mutation
this.$set(this.state.items[i].meta, 'flag', true)
```

```js
// ✅ replace the branch
this.state.items = this.state.items.map((item, idx) =>
  idx === i ? { ...item, meta: { ...item.meta, flag: true } } : item
)
```

---

## reactivity-declare-all-data-keys

Declare every property a component will ever use up-front in `data()`, even if the initial value is `null`/`[]`/`{}`.

**Why:** Pre-declared keys get reactive getters/setters at init, so later assignment works without `$set`. This is the cleanest way to avoid reactivity-set-for-new-keys entirely.

```js
// ❌ keys appear later and are not reactive
data() {
  return {}
},
created() {
  this.profile = {}        // not reactive
}
```

```js
// ✅ declared up-front
data() {
  return {
    profile: null,
    items: [],
    filters: { status: 'all', q: '' },
  }
}
```

---

## reactivity-no-reactive-on-instances

Do not store class instances, large third-party objects, or non-plain objects in reactive `data`.

**Why:** Vue walks and converts every nested property to reactive. Doing this to a map instance, chart instance, or huge config is wasteful and can break the library. Hold them as plain instance fields or freeze them.

```js
// ❌ Vue deeply observes the whole map instance
data() {
  return { map: new mapboxgl.Map(opts) }
}
```

```js
// ✅ keep non-reactive — assign outside data
data() {
  return { mapReady: false }
},
mounted() {
  this.map = new mapboxgl.Map(opts)   // plain field, not reactive
  this.mapReady = true
}
```

---

## reactivity-freeze-static-lists

`Object.freeze` large lists/objects that are displayed but never mutated.

**Why:** Frozen objects are skipped by Vue's reactivity conversion, saving memory and CPU on large datasets. Ideal for read-only reference data, big tables, or static option lists.

```js
// ✅ render a 10k-row dataset without reactivity overhead
async created() {
  const rows = await fetchRows()
  this.rows = Object.freeze(rows)   // no getters/setters created
}
```

Note: you must reassign the whole array to update it (`this.rows = Object.freeze(next)`), since the contents are frozen.

---

## reactivity-avoid-reactive-refs-to-dom

Never put `$refs`, DOM nodes, or event objects into reactive `data`.

**Why:** DOM nodes have huge property graphs and circular references; making them reactive is expensive and can crash devtools. Access `this.$refs.x` directly when needed.

```js
// ❌
data() { return { el: this.$refs.box } }
```

```js
// ✅ read on demand
mounted() {
  const el = this.$refs.box
  this.height = el.offsetHeight
}
```
