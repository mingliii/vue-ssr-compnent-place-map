import Vue from 'vue'
import App from './AppB.vue'
import { createStore } from './store'
import Chakra, { CThemeProvider, CReset } from '@chakra-ui/vue'

Vue.config.productionTip = false
Vue.use(Chakra)
// export a factory function for creating fresh app, router and store
// instances
export function createApp () {
  const store = createStore()

  const app = new Vue({
    store,
    // the root instance simply renders the App component.
    render: (h) => h(CThemeProvider, [h(CReset), h(App)])
  })
  return { app, store }
}