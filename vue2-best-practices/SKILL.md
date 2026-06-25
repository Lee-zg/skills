---
name: vue2-best-practices
description: Vue 2 code-style and performance optimization guidelines. Covers the reactivity system caveats, render/template optimization, bundle splitting, component design, data fetching, Vuex state management, memory management, and JavaScript micro-optimizations. Use this skill when writing, reviewing, or refactoring Vue 2 (Options API) components, mixins, Vuex stores, or single-file components (.vue), or when the user mentions Vue 2 performance, reactivity loss, re-render issues, or code style.
license: MIT
metadata:
  author: skills
  version: 1.0.0
  framework: vue@2
---

# Vue 2 Best Practices

Performance and code-style guidelines for **Vue 2** (Options API). Contains 55 rules across 8 categories, prioritized by impact. Vue 2's reactivity is based on `Object.defineProperty`, which has caveats that do not exist in Vue 3 — many of these rules exist specifically to work around them.

> Targets Vue 2.6 / 2.7. Vue 2.7 backports `defineComponent`, `computed`, `ref`, and the Composition API; rules that are 2.7-only are marked. If you are on Vue 3, use a Vue 3 guide instead — the reactivity caveats here do not apply.

## When to Apply

Reference these guidelines when:

- Writing new components, mixins, or single-file components (`.vue`)
- Implementing data fetching in lifecycle hooks
- Designing or refactoring a Vuex store
- Reviewing code for performance, re-render, or reactivity bugs
- Diagnosing "data changed but the view didn't update" issues
- Optimizing bundle size, Time to Interactive, or first paint
- Reviewing for memory leaks (listeners, timers, third-party instances)

## Rule Categories by Priority

Work top-down: fix CRITICAL categories before spending effort on LOW ones.

| # | Category | Impact | Prefix | File |
|---|----------|--------|--------|------|
| 1 | Reactivity Correctness | **CRITICAL** | `reactivity-` | [rules/reactivity.md](rules/reactivity.md) |
| 2 | Bundle Size & Code Splitting | **CRITICAL** | `bundle-` | [rules/bundle.md](rules/bundle.md) |
| 3 | Data Fetching & Lifecycle | **HIGH** | `data-` | [rules/data-lifecycle.md](rules/data-lifecycle.md) |
| 4 | Rendering & Template | **HIGH** | `rendering-` | [rules/rendering.md](rules/rendering.md) |
| 5 | State Management (Vuex) | **MEDIUM-HIGH** | `vuex-` | [rules/state-vuex.md](rules/state-vuex.md) |
| 6 | Component Design & Style | **MEDIUM** | `component-` | [rules/component-style.md](rules/component-style.md) |
| 7 | Memory & Event Management | **MEDIUM** | `memory-` | [rules/memory-events.md](rules/memory-events.md) |
| 8 | JavaScript & Template Micro-opts | **LOW** | `js-` | [rules/js-template.md](rules/js-template.md) |

## Quick Reference

### 1. Reactivity Correctness (CRITICAL) — `rules/reactivity.md`
`reactivity-set-for-new-keys`, `reactivity-array-index-mutation`, `reactivity-array-length`, `reactivity-replace-dont-mutate-nested`, `reactivity-declare-all-data-keys`, `reactivity-no-reactive-on-instances`, `reactivity-freeze-static-lists`, `reactivity-avoid-reactive-refs-to-dom`

### 2. Bundle Size & Code Splitting (CRITICAL) — `rules/bundle.md`
`bundle-async-route-components`, `bundle-async-component`, `bundle-named-chunks`, `bundle-on-demand-ui-libs`, `bundle-defer-third-party`, `bundle-no-moment-locales`, `bundle-tree-shakeable-imports`

### 3. Data Fetching & Lifecycle (HIGH) — `rules/data-lifecycle.md`
`data-parallel-requests`, `data-fetch-in-created-not-mounted`, `data-cancel-on-destroy`, `data-watch-immediate`, `data-no-await-waterfall`, `data-guard-stale-responses`, `data-nexttick-for-dom`

### 4. Rendering & Template (HIGH) — `rules/rendering.md`
`rendering-key-in-v-for`, `rendering-no-index-as-key`, `rendering-avoid-v-if-with-v-for`, `rendering-v-show-for-toggles`, `rendering-computed-over-method`, `rendering-functional-stateless`, `rendering-v-once-static`, `rendering-keep-alive`, `rendering-defer-heavy-lists`

### 5. State Management — Vuex (MEDIUM-HIGH) — `rules/state-vuex.md`
`vuex-namespaced-modules`, `vuex-getters-for-derived`, `vuex-no-mutate-state-outside-mutation`, `vuex-actions-for-async`, `vuex-map-helpers`, `vuex-no-bloated-root-state`

### 6. Component Design & Style (MEDIUM) — `rules/component-style.md`
`component-multi-word-names`, `component-prop-definitions-detailed`, `component-data-must-be-function`, `component-no-mutate-props`, `component-emit-for-child-to-parent`, `component-single-responsibility`, `component-scoped-styles`, `component-v-model-contract`

### 7. Memory & Event Management (MEDIUM) — `rules/memory-events.md`
`memory-clear-timers`, `memory-remove-global-listeners`, `memory-destroy-third-party`, `memory-prefer-event-bus-cleanup`, `memory-no-leaky-closures-in-watchers`

### 8. JavaScript & Template Micro-opts (LOW) — `rules/js-template.md`
`js-object-freeze-constants`, `js-hoist-static-jsx-config`, `js-debounce-throttle-handlers`, `js-index-map-over-find`, `js-avoid-inline-object-literals-in-template`

## How to Use

1. **Identify the task** (new feature, review, refactor, bug) and the relevant categories.
2. **Start at the highest-impact category** that applies. Reactivity bugs and bundle bloat cause the most user-visible pain in Vue 2, so they come first.
3. **Open the matching rule file** in `rules/`. Each rule has: a one-line statement, the *why*, an ❌ incorrect example, and a ✅ correct example.
4. **Apply the fix and verify.** For reactivity rules, confirm the view actually updates. For bundle rules, check the built chunk graph (e.g. `vue-cli-service build --report`).

When generating new Vue 2 code, follow every rule by default — they encode the idioms a senior Vue 2 engineer applies without thinking.

## Runnable Demo

A working Vite + Vue 2.7 project under [`demo/`](demo/) demonstrates seven of the most impactful rules with side-by-side ❌/✅ interactive examples (reactivity `$set`, `v-for` key, computed-vs-method caching, the `v-model` contract, timer cleanup, async-chunk splitting, and a namespaced Vuex module).

```bash
cd demo && npm install && npm run dev
```

When explaining a rule to a user, point them at the matching demo component in `demo/src/components/` — each file is annotated with the rule id it illustrates.

## Critical Rules (never violate)

- **Add new reactive object keys with `this.$set` / `Vue.set`** — direct assignment to a new key is NOT reactive in Vue 2.
- **Mutate arrays only via reactive methods** (`push`, `splice`, `$set`) — `arr[i] = x` and `arr.length = n` are NOT reactive.
- **`data` in a component must be a function** that returns a fresh object, never a shared object literal.
- **Never mutate a prop** inside a child — emit an event or use a local copy.
- **Always clean up** timers, global/DOM listeners, and third-party instances in `beforeDestroy`.
- **Always provide a stable, unique `:key`** on `v-for`; never the array index when the list reorders or items are inserted/removed.
