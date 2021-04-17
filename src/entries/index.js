const path = require('path');
const serverPath = path.resolve(process.cwd(), 'src', 'entries', 'server');
const clientPath = path.resolve(process.cwd(), 'src', 'entries', 'client');

exports.servers = {
  places: path.join(serverPath, 'places.js'),
  place: path.join(serverPath, 'place.js'),
  map: path.join(serverPath, 'map.js'),
}

exports.clients = {
  places: path.join(clientPath, 'places.js'),
  place: path.join(clientPath, 'place.js'),
  map: path.join(clientPath, 'map.js'),
}

exports.createClientEntry = Component => {
  const {createApp} = require('../app')
  const { app, store } = createApp(Component)

  if (window[`__${Component.name.toUpperCase()}_INITIAL_STATE__`]) {
    // We initialize the store state with the data injected from the server
    store.replaceState(window[`__${Component.name.toUpperCase()}_INITIAL_STATE__`])
  }

  app.$mount(`#${Component.name.toLowerCase()}-component`)
}

exports.createServerEntry = Component => {
  const {createApp} = require('../app')
  return context => {
    const {app, store} = createApp(Component)
    context.rendered = () => {
      // After the app is rendered, our store is now
      // filled with the state from our components.
      // When we attach the state to the context, and the `template` option
      // is used for the renderer, the state will automatically be
      // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
      context[context.contextKey ?? 'state'] = store.state
    }

    return app
  }
}