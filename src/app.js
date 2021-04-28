import Vue from 'vue'
import {createStore} from './store'
import VueApollo from 'vue-apollo'
import {createApolloClient} from './apollo'

import Chakra, {CReset, CThemeProvider} from '@chakra-ui/vue'
import * as VueGoogleMaps from '../node_modules/vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(Chakra)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAREmv_v0qtSH8rfmqsBLFNRTmJ774nMy4',
    libraries: 'places',
  },
})

// export a factory function for creating fresh app, router and store
// instances
export function createApp(Component, ssr) {
  const store = createStore()
  const apolloProvider = new VueApollo({
    defaultClient: createApolloClient(ssr),
  })

  const app = new Vue({
    store,
    apolloProvider,
    // the root instance simply renders the App component.
    render: (h) => h(CThemeProvider, [h(CReset), h(Component)])
  })
  return {app, store, apolloProvider}
}