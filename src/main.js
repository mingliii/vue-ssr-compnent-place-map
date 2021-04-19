import Vue from 'vue'
import App from './components/places'
import Chakra, {CReset, CThemeProvider} from '@chakra-ui/vue'
import {createStore} from "@/store";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false
Vue.use(Chakra)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDKIzOcpR-5CcJAWJjkEJWNz-_8W7lKsmY',
    libraries: 'places',
  },
})

const store = createStore()

new Vue({
  store,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount('#app')
