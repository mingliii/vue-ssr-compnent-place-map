import Vue from 'vue'
import App from './App.vue'
import Chakra, {CReset, CThemeProvider} from '@chakra-ui/vue'
import {createStore} from "@/store";

Vue.config.productionTip = false
Vue.use(Chakra)
const store = createStore()

new Vue({
  store,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount('#app')
