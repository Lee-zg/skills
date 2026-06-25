# Rendering & Template (HIGH)

Vue 2 re-renders a component when its reactive dependencies change, then diffs the virtual DOM. These rules reduce how often that happens and how much work each render does.

---

## rendering-key-in-v-for

Always bind a stable, unique `:key` on `v-for`.

**Why:** Keys let Vue's diff algorithm match nodes across renders instead of patching in place. Without them, list updates produce wrong component state, lost input focus, and broken transitions.

```html
<!-- ❌ -->
<li v-for="item in items">{{ item.name }}</li>
```

```html
<!-- ✅ stable identity from the data -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
```

---

## rendering-no-index-as-key

Do not use the array index as `:key` when the list can reorder, insert, or remove items.

**Why:** The index is positional, not identity. When items shift, Vue reuses the wrong DOM/component, corrupting local state (checkboxes, inputs, expanded rows). Index is only acceptable for a static, append-only, stateless list.

```html
<!-- ❌ breaks on reorder/insert/delete -->
<row v-for="(item, i) in items" :key="i" :item="item" />
```

```html
<!-- ✅ -->
<row v-for="item in items" :key="item.id" :item="item" />
```

---

## rendering-avoid-v-if-with-v-for

Never put `v-if` and `v-for` on the same element.

**Why:** In Vue 2, `v-for` has higher priority than `v-if`, so the condition is evaluated for every item on every render — even items you mean to skip. Filter in a computed property instead.

```html
<!-- ❌ runs v-if per item, every render -->
<li v-for="u in users" v-if="u.active" :key="u.id">{{ u.name }}</li>
```

```html
<!-- ✅ filter once, reactively -->
<li v-for="u in activeUsers" :key="u.id">{{ u.name }}</li>
```

```js
computed: {
  activeUsers() {
    return this.users.filter(u => u.active)
  }
}
```

If the condition is on the *whole* list (not per item), put `v-if` on a wrapping `<template>` or parent element instead.

---

## rendering-v-show-for-toggles

Use `v-show` for elements toggled frequently; `v-if` for things rarely shown or expensive to mount.

**Why:** `v-if` adds/removes DOM and runs the full mount/destroy lifecycle each toggle. `v-show` only flips `display`, so it is far cheaper for tabs, dropdowns, and hover panels that flip often. The tradeoff: `v-show` always renders once (higher initial cost) and ignores `v-if`/`v-else` branching.

```html
<!-- ✅ frequent toggle -->
<div v-show="isOpen" class="dropdown">…</div>

<!-- ✅ rarely shown / heavy -->
<HeavyModal v-if="showModal" />
```

---

## rendering-computed-over-method

Prefer `computed` over `methods` for derived values used in templates.

**Why:** Computed properties cache based on their reactive dependencies and only recompute when those change. A method runs on **every** re-render, repeating the work even when inputs are identical.

```html
<!-- ❌ recomputes on every render -->
<span>{{ formatTotal() }}</span>
```

```html
<!-- ✅ cached until cart changes -->
<span>{{ formattedTotal }}</span>
```

```js
computed: {
  formattedTotal() {
    return this.cart.reduce((s, i) => s + i.price, 0).toFixed(2)
  }
}
```

Use a method only when the result depends on arguments or must run on each call (e.g. event handlers).

---

## rendering-functional-stateless

Make presentational, stateless components functional.

**Why:** Functional components have no instance, no reactivity, no lifecycle — Vue skips all that overhead. Ideal for pure render-from-props components (list items, cells, icons) rendered in large numbers.

```html
<!-- ✅ Vue 2 SFC functional component -->
<template functional>
  <div class="badge" :class="props.type">{{ props.label }}</div>
</template>
```

```js
// ✅ render-function form
export default {
  functional: true,
  props: ['label', 'type'],
  render(h, { props }) {
    return h('div', { class: ['badge', props.type] }, props.label)
  }
}
```

---

## rendering-v-once-static

Mark genuinely static subtrees with `v-once`.

**Why:** `v-once` renders the element once and then skips it in all future diffs. Good for static headers, legal text, or expensive markup that never changes after first paint.

```html
<!-- ✅ rendered once, skipped forever after -->
<footer v-once>
  <LegalLinks />
  <p>© 2026 Acme Inc.</p>
</footer>
```

---

## rendering-keep-alive

Wrap conditionally-shown or routed components in `<keep-alive>` when re-creation is expensive.

**Why:** `<keep-alive>` caches a deactivated component instance instead of destroying it, preserving its state and skipping re-mount cost. Use the `activated`/`deactivated` hooks for cached components. Use `include`/`max` to bound the cache.

```html
<!-- ✅ keep tab state alive between switches -->
<keep-alive :include="['ProfileTab', 'BillingTab']" :max="5">
  <component :is="currentTab" />
</keep-alive>

<!-- ✅ cache routed views -->
<keep-alive>
  <router-view />
</keep-alive>
```

---

## rendering-defer-heavy-lists

For very large lists, virtualize or render incrementally instead of mounting thousands of nodes.

**Why:** Each rendered row costs DOM + (for components) an instance. Thousands of rows freeze the main thread. Use a windowing library (`vue-virtual-scroller`) or render in batches.

```html
<!-- ✅ only visible rows are in the DOM -->
<RecycleScroller
  :items="rows"
  :item-size="44"
  key-field="id"
  v-slot="{ item }"
>
  <Row :row="item" />
</RecycleScroller>
```

Combine with [reactivity-freeze-static-lists](reactivity.md) for read-only data to drop reactivity overhead too.
