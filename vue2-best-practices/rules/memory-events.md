# Memory & Event Management (MEDIUM)

Vue cleans up its own watchers and reactive bindings when a component is destroyed, but it cannot clean up anything *you* created outside its reactivity: timers, global/DOM listeners, and third-party instances. Leaking these accumulates over a session and degrades or crashes long-lived SPAs.

---

## memory-clear-timers

Clear every `setInterval`/`setTimeout` in `beforeDestroy`.

**Why:** A surviving interval keeps firing after the component is gone, referencing dead state and leaking the closure (and everything it captures) forever.

```js
// ❌ interval outlives the component
mounted() {
  setInterval(this.poll, 5000)
}
```

```js
// ✅ store the id and clear it
mounted() {
  this.timer = setInterval(this.poll, 5000)
},
beforeDestroy() {
  clearInterval(this.timer)
}
```

---

## memory-remove-global-listeners

Remove `window`/`document`/`el` listeners you add manually, with the same function reference.

**Why:** Vue only auto-removes listeners bound in templates (`@click`). Listeners you attach with `addEventListener` persist on the global object, holding the component in memory. You must pass the *same* reference to `removeEventListener` — inline arrows can't be removed.

```js
// ❌ leaks: arrow can never be removed; never cleaned up anyway
mounted() {
  window.addEventListener('resize', () => this.onResize())
}
```

```js
// ✅ stable reference, removed on teardown
mounted() {
  window.addEventListener('resize', this.onResize)
},
beforeDestroy() {
  window.removeEventListener('resize', this.onResize)
}
```

---

## memory-destroy-third-party

Call the teardown method of any third-party instance you created (charts, maps, editors, observers).

**Why:** Libraries like ECharts, Mapbox, CodeMirror, and `IntersectionObserver` allocate DOM, canvases, and their own listeners. Without their `dispose`/`destroy`/`disconnect`, that memory leaks every time the component mounts.

```js
mounted() {
  this.chart = echarts.init(this.$refs.chart)
  this.observer = new IntersectionObserver(this.onIntersect)
  this.observer.observe(this.$refs.sentinel)
},
beforeDestroy() {
  this.chart.dispose()
  this.observer.disconnect()
}
```

---

## memory-prefer-event-bus-cleanup

If you use a global event bus (`$on`), always `$off` in `beforeDestroy`.

**Why:** Unlike template listeners, bus subscriptions are not auto-removed. Each remount adds another handler, so one event fires N times and the destroyed components can't be garbage-collected. (Prefer Vuex or props/events over a bus, but if you have one, clean it up.)

```js
created() {
  this.bus.$on('refresh', this.reload)
},
beforeDestroy() {
  this.bus.$off('refresh', this.reload)
}
```

---

## memory-no-leaky-closures-in-watchers

Stop manually-created watchers and avoid capturing large objects in long-lived closures.

**Why:** `this.$watch(...)` returns an unwatch function — if you create watchers imperatively (not via the `watch` option), call it on destroy. Closures that capture big data structures keep them alive as long as the closure lives.

```js
created() {
  this.unwatch = this.$watch('query', this.refetch)
},
beforeDestroy() {
  this.unwatch()   // declarative `watch:` option is auto-cleaned; this is not
}
```
