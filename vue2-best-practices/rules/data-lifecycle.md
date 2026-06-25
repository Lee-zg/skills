# Data Fetching & Lifecycle (HIGH)

How and where you fetch data determines perceived speed. The biggest losses come from sequential request waterfalls and from leaking requests/state after a component is gone.

---

## data-parallel-requests

Fire independent requests in parallel with `Promise.all`, not one after another.

**Why:** Sequential `await`s add up every request's latency. Independent requests should overlap so total time ≈ the slowest one, not the sum.

```js
// ❌ waterfall — total = user + orders + prefs
async created() {
  this.user   = await api.getUser()
  this.orders = await api.getOrders()
  this.prefs  = await api.getPrefs()
}
```

```js
// ✅ parallel — total ≈ slowest single request
async created() {
  const [user, orders, prefs] = await Promise.all([
    api.getUser(),
    api.getOrders(),
    api.getPrefs(),
  ])
  this.user = user; this.orders = orders; this.prefs = prefs
}
```

---

## data-no-await-waterfall

Only chain `await` when a request genuinely depends on a previous result.

**Why:** A dependent chain is fine; an accidental one is wasted time. If request B needs A's id, await A — otherwise parallelize. When only part depends, start the independent ones first.

```js
// ✅ start independent work immediately, await dependency only where needed
const userP = api.getUser()                 // no await yet
const config = await api.getConfig()         // needed to build the next call
const orders = await api.getOrders(config)   // truly depends on config
this.user = await userP                       // resolved in parallel meanwhile
```

---

## data-fetch-in-created-not-mounted

Start data fetching in `created`, not `mounted`, unless the request needs the DOM.

**Why:** `created` runs earlier (before the first render and before child mount), so the request is in flight sooner. Reserve `mounted` for work that truly needs `$refs`/DOM measurements.

```js
// ✅ request starts as early as possible
created() {
  this.loadData()
}
```

---

## data-cancel-on-destroy

Cancel in-flight requests in `beforeDestroy` (AbortController / axios CancelToken).

**Why:** A user can navigate away before a request resolves. The late callback then sets data on a destroyed component (warning + leak) or wastes work. Abort on teardown.

```js
created() {
  this.controller = new AbortController()
  fetch('/api/data', { signal: this.controller.signal })
    .then(r => r.json())
    .then(d => { this.data = d })
    .catch(e => { if (e.name !== 'AbortError') throw e })
},
beforeDestroy() {
  this.controller.abort()
}
```

---

## data-guard-stale-responses

When a parameter (search query, id) drives fetching, ignore responses that arrive out of order.

**Why:** Type "ab" then "abc" and the "ab" response may land last, overwriting newer results. Track the latest request and drop stale ones.

```js
methods: {
  async search(q) {
    const reqId = ++this.lastReqId
    const res = await api.search(q)
    if (reqId !== this.lastReqId) return   // a newer search superseded this
    this.results = res
  }
}
```

---

## data-watch-immediate

Use `watch` with `immediate: true` instead of duplicating fetch logic in `created` + `watch`.

**Why:** When data depends on a reactive source (a route param, a prop), an immediate watcher both runs on init and re-runs on change — one source of truth instead of two.

```js
// ❌ duplicated
created() { this.fetch(this.id) },
watch: { id(v) { this.fetch(v) } }
```

```js
// ✅ one declaration
watch: {
  id: {
    immediate: true,
    handler(v) { this.fetch(v) },
  }
}
```

---

## data-nexttick-for-dom

After changing data that affects the DOM, use `this.$nextTick` before reading/measuring it.

**Why:** Vue updates the DOM asynchronously. Reading `$refs` or offsets right after a data change sees the old DOM. `$nextTick` runs after the re-render flush.

```js
this.showPanel = true
this.$nextTick(() => {
  this.$refs.panel.focus()           // DOM now reflects showPanel
  this.height = this.$refs.panel.offsetHeight
})
```
