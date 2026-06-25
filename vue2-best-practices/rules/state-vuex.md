# State Management — Vuex (MEDIUM-HIGH)

Vuex is the standard Vue 2 store. These rules keep state predictable, debuggable (devtools time-travel), and free of the most common pitfalls: mutating state outside mutations and a bloated root store.

---

## vuex-namespaced-modules

Split the store into `namespaced: true` modules by domain.

**Why:** A single flat store becomes unmanageable and prone to name collisions. Namespaced modules scope mutations/actions/getters, keeping features isolated and self-documenting.

```js
// ✅ store/modules/cart.js
export default {
  namespaced: true,
  state: () => ({ items: [] }),   // function — fresh state per use
  mutations: { ADD(state, item) { state.items.push(item) } },
  actions: { add({ commit }, item) { commit('ADD', item) } },
  getters: { count: s => s.items.length },
}
```

```js
// component usage
this.$store.commit('cart/ADD', item)
this.$store.getters['cart/count']
```

Note: module `state` should be a **function** so the state isn't shared if the module is reused.

---

## vuex-getters-for-derived

Compute derived state in getters, not in each component.

**Why:** Getters are cached based on their dependencies (like computed) and centralize logic. Recomputing the same filtered/aggregated value in five components duplicates work and code.

```js
// ✅ one definition, cached
getters: {
  activeItems: s => s.items.filter(i => i.active),
  total: s => s.items.reduce((sum, i) => sum + i.price, 0),
}
```

---

## vuex-no-mutate-state-outside-mutation

Change state only inside mutations. Enable `strict` mode in development to enforce it.

**Why:** Direct state mutation from a component or action bypasses devtools tracking and breaks time-travel debugging. Strict mode throws when state changes outside a mutation, catching the bug immediately.

```js
// ❌ mutating store state directly from a component
this.$store.state.cart.items.push(item)
```

```js
// ✅ go through a mutation
this.$store.commit('cart/ADD', item)
```

```js
// store setup — dev only (strict mode is costly in prod)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { cart },
})
```

---

## vuex-actions-for-async

Put async work (API calls) in actions; keep mutations synchronous.

**Why:** Mutations must be synchronous so devtools can snapshot state before/after each one. Async logic belongs in actions, which then commit mutations with the results.

```js
// ❌ async inside a mutation — untrackable
mutations: {
  async LOAD(state) { state.items = await api.get() }
}
```

```js
// ✅ action does async, mutation does the sync write
actions: {
  async load({ commit }) {
    const items = await api.get()
    commit('SET_ITEMS', items)
  }
},
mutations: {
  SET_ITEMS(state, items) { state.items = items }
}
```

---

## vuex-map-helpers

Use `mapState`, `mapGetters`, `mapActions`, `mapMutations` instead of long `this.$store.…` chains.

**Why:** The helpers cut boilerplate and make a component's store dependencies explicit at the top. Pass the namespace as the first argument for module access.

```js
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['total']),
  },
  methods: {
    ...mapActions('cart', ['add', 'load']),
  },
  created() { this.load() },
}
```

---

## vuex-no-bloated-root-state

Don't put everything in Vuex. Keep component-local UI state in the component.

**Why:** Global state that only one component uses (a dropdown's open flag, a form's draft) adds noise, coupling, and re-render surface area. Reserve Vuex for state shared across distant components or that must persist across routes.

```js
// ❌ local UI flag living in the global store
this.$store.commit('SET_DROPDOWN_OPEN', true)
```

```js
// ✅ keep it local
data() { return { dropdownOpen: false } }
```
