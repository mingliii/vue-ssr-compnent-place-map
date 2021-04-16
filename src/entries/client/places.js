// noinspection JSUnresolvedVariable

import { createApp } from '@/app'
import {PlacesComponent} from "@/components";

const { app, store } = createApp(PlacesComponent)

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')