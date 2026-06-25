# Bundle Size & Code Splitting (CRITICAL)

A smaller initial bundle means faster Time to Interactive and first paint. In Vue 2 the biggest wins come from splitting routes and heavy components into async chunks and importing UI/utility libraries on demand.

---

## bundle-async-route-components

Lazy-load route components with dynamic `import()`.

**Why:** Eagerly importing every view puts the entire app in one bundle. Dynamic imports let webpack emit a separate chunk per route, loaded only when navigated to.

```js
// ❌ all views in the main bundle
import Dashboard from '@/views/Dashboard.vue'
const routes = [{ path: '/dashboard', component: Dashboard }]
```

```js
// ✅ one chunk per route, loaded on demand
const routes = [
  { path: '/dashboard', component: () => import('@/views/Dashboard.vue') },
]
```

---

## bundle-async-component

Define heavy or rarely-used components as async components.

**Why:** A component the user may never open (a complex modal, a chart, a rich editor) should not be in the initial bundle. Vue 2 supports the factory form with loading/error states.

```js
// ✅ loaded only when first rendered
components: {
  ChartPanel: () => import('@/components/ChartPanel.vue'),
}
```

```js
// ✅ with loading + error UX
components: {
  RichEditor: () => ({
    component: import('@/components/RichEditor.vue'),
    loading: SpinnerComponent,
    error: ErrorComponent,
    delay: 200,
    timeout: 10000,
  }),
}
```

---

## bundle-named-chunks

Give dynamic imports webpack chunk names and group related ones.

**Why:** Named chunks are debuggable in the network tab and the build report. Sharing a name across related lazy components bundles them together, avoiding a flood of tiny requests.

```js
// ✅ grouped, named chunk
const routes = [
  { path: '/billing', component: () => import(/* webpackChunkName: "billing" */ '@/views/Billing.vue') },
  { path: '/invoices', component: () => import(/* webpackChunkName: "billing" */ '@/views/Invoices.vue') },
]
```

---

## bundle-on-demand-ui-libs

Import only the components you use from UI libraries; never the whole library.

**Why:** Importing the full library (and its CSS) pulls in dozens of unused components. Element UI, Vuetify, Ant Design Vue, etc. all support per-component imports — often automated via `babel-plugin-component` or `babel-plugin-import`.

```js
// ❌ entire library + all styles in the bundle
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

```js
// ✅ only what you use
import { Button, Table, Dialog } from 'element-ui'
Vue.use(Button)
Vue.use(Table)
Vue.use(Dialog)
```

---

## bundle-defer-third-party

Load heavy third-party scripts (maps, analytics, editors) on demand, not at app boot.

**Why:** Third-party libs often dwarf your own code. Import them inside the lifecycle hook or event handler that first needs them so they never block initial load.

```js
// ✅ load the charting lib only when the panel mounts
async mounted() {
  const { default: echarts } = await import('echarts')
  this.chart = echarts.init(this.$refs.chart)
}
```

---

## bundle-no-moment-locales

Avoid Moment.js; if unavoidable, strip its locales. Prefer `dayjs` or `date-fns`.

**Why:** Moment bundles all locale files by default, adding hundreds of KB. `dayjs` is a ~2KB drop-in alternative with a compatible API.

```js
// ❌ moment + every locale
import moment from 'moment'
```

```js
// ✅ tiny, same-ish API
import dayjs from 'dayjs'
dayjs().format('YYYY-MM-DD')
```

```js
// if you must keep moment, in webpack config:
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```

---

## bundle-tree-shakeable-imports

Import named exports from utility libraries; avoid default-importing the whole namespace.

**Why:** Named imports let the bundler tree-shake unused code. Importing the entire namespace (`import _ from 'lodash'`) defeats it. Use `lodash-es` with named imports, or per-method packages.

```js
// ❌ pulls in all of lodash
import _ from 'lodash'
_.debounce(fn, 200)
```

```js
// ✅ tree-shakeable
import debounce from 'lodash-es/debounce'
debounce(fn, 200)
```
