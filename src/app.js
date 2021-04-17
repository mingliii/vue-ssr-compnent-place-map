import Vue from 'vue'
import {createStore} from './store'
import Chakra, {CReset, CThemeProvider} from '@chakra-ui/vue'
import * as VueGoogleMaps from '../node_modules/vue2-google-maps'

Vue.config.productionTip = false
Vue.use(Chakra)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDKIzOcpR-5CcJAWJjkEJWNz-_8W7lKsmY',
    libraries: 'places',
  },
})

// export a factory function for creating fresh app, router and store
// instances
export function createApp(Component) {
  const store = createStore()

  const app = new Vue({
    store,
    // the root instance simply renders the App component.
    render: (h) => h(CThemeProvider, [h(CReset), h(Component)])
  })
  return {app, store}
}