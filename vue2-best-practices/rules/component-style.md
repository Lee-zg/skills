# Component Design & Style (MEDIUM)

Conventions that keep Vue 2 components predictable, reusable, and aligned with the official style guide. These prevent subtle bugs (shared state, prop mutation) and make components easier to review.

---

## component-multi-word-names

Name components with multiple words (except the root `App`).

**Why:** Single-word names risk clashing with current or future HTML elements. `<user>` could collide; `<user-card>` never will. Use PascalCase in SFCs and `name` fields.

```js
// ❌
export default { name: 'Todo' }
```

```js
// ✅
export default { name: 'TodoItem' }
```

---

## component-prop-definitions-detailed

Define props as objects with `type`, and add `required`/`default`/`validator` where relevant — never bare string arrays in app code.

**Why:** Typed props document the contract, fail loudly in dev when misused, and provide safe defaults. The array form gives none of that.

```js
// ❌
props: ['status', 'count']
```

```js
// ✅
props: {
  status: {
    type: String,
    required: true,
    validator: v => ['active', 'archived', 'draft'].includes(v),
  },
  count: { type: Number, default: 0 },
  // object/array defaults MUST be factory functions
  config: { type: Object, default: () => ({}) },
}
```

---

## component-data-must-be-function

`data` in a component must be a function returning a fresh object.

**Why:** A component is instantiated many times. If `data` were a shared object, every instance would share one reactive state object, so changing one instance changes them all. The function guarantees each instance gets its own copy.

```js
// ❌ shared across all instances
data: { count: 0 }
```

```js
// ✅ fresh per instance
data() {
  return { count: 0 }
}
```

The same rule applies to object/array prop defaults — use a factory function (see component-prop-definitions-detailed).

---

## component-no-mutate-props

Never mutate a prop inside the child. Emit an event or copy to local state.

**Why:** Props are one-way (parent → child). Mutating one is overwritten on the next parent render, breaks the data-flow model, and triggers a Vue warning. It also hides where state really lives.

```js
// ❌ mutating a prop
props: ['value'],
methods: { clear() { this.value = '' } }   // warning + lost on re-render
```

```js
// ✅ local copy for internal edits
props: ['value'],
data() { return { localValue: this.value } },
watch: { value(v) { this.localValue = v } }
```

```js
// ✅ ask the parent to change it
methods: { clear() { this.$emit('input', '') } }
```

---

## component-emit-for-child-to-parent

Communicate child → parent via `$emit`, not by calling parent methods or reaching into `$parent`.

**Why:** `this.$parent.doThing()` couples the child to a specific parent structure and breaks reuse. Events keep components decoupled and testable.

```js
// ❌
this.$parent.refreshList()
```

```js
// ✅
this.$emit('submitted', payload)
// parent: <Form @submitted="refreshList" />
```

---

## component-single-responsibility

Keep components focused. Split when one component handles fetching, layout, and many unrelated concerns.

**Why:** Small components are easier to test, reuse, and re-render efficiently (a change re-renders only the small piece). A 500-line SFC with ten responsibilities re-renders entirely on any change.

Signs to split: multiple unrelated data domains, deeply nested template branches, or a name that needs "and" to describe it.

---

## component-scoped-styles

Use `<style scoped>` (or CSS Modules) in SFCs; avoid global leakage.

**Why:** Scoped styles attach a data-attribute so rules only apply to that component, preventing accidental cross-component bleed. Reserve global styles for a single deliberate stylesheet.

```html
<!-- ✅ -->
<style scoped>
.card { padding: 16px; }
</style>
```

To style a child component's internals from a scoped block, use the deep combinator (`::v-deep` / `>>>`) deliberately rather than dropping `scoped`.

---

## component-v-model-contract

Honor the `v-model` contract: accept a `value` prop and emit `input` (Vue 2). Customize with the `model` option when needed.

**Why:** Following the contract lets your component drop into `v-model` like a native input. Diverging silently breaks consumers.

```js
// ✅ default v-model contract
props: { value: { type: String, default: '' } },
methods: {
  onInput(e) { this.$emit('input', e.target.value) }
}
```

```js
// ✅ custom model (e.g. a checkbox-like component)
model: { prop: 'checked', event: 'change' },
props: { checked: Boolean },
```
