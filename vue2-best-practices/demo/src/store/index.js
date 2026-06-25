import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Demonstrates: vuex-namespaced-modules, vuex-getters-for-derived,
// vuex-actions-for-async, vuex-no-mutate-state-outside-mutation.
const cart = {
  namespaced: true,
  state: () => ({
    items: [
      { id: 'p1', name: 'Vue 2.7 贴纸', price: 8, qty: 2 },
      { id: 'p2', name: '响应式马克杯', price: 39, qty: 1 },
    ],
  }),
  getters: {
    // ✅ derived state lives in a getter, computed once and cached
    totalCount: (state) => state.items.reduce((n, it) => n + it.qty, 0),
    totalPrice: (state) => state.items.reduce((n, it) => n + it.qty * it.price, 0),
  },
  mutations: {
    // ✅ the ONLY place state is mutated, and synchronously
    INCREMENT_QTY(state, id) {
      const item = state.items.find((it) => it.id === id)
      if (item) item.qty += 1
    },
    DECREMENT_QTY(state, id) {
      const item = state.items.find((it) => it.id === id)
      if (item && item.qty > 0) item.qty -= 1
    },
  },
  actions: {
    // ✅ async work lives in an action, which commits a mutation
    addOneAsync({ commit }, id) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('INCREMENT_QTY', id)
          resolve()
        }, 300)
      })
    },
  },
}

export default new Vuex.Store({
  modules: { cart },
  // vuex-no-bloated-root-state: feature state lives in modules, not the root
  strict: import.meta.env.DEV,
})
