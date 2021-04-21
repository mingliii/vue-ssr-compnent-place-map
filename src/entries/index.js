import ApolloSSR from 'vue-apollo/ssr';

export function createClientEntry(Component) {
  const {createApp} = require('../app')
  const {app, store} = createApp(Component)

  if (window[`__${Component.name.replace(/-/g,"_").toUpperCase()}_INITIAL_STATE__`]) {
    // We initialize the store state with the data injected from the server
    store.replaceState(window[`__${Component.name.replace(/-/g,"_").toUpperCase()}_INITIAL_STATE__`])
  }

  app.$mount(`#${Component.name.toLowerCase()}-component`)
}

export function createServerEntry(Component) {
  const {createApp} = require('../app');
  return function (context) {
    const {app, store, apolloProvider} = createApp(Component, context.ssr)
    context.rendered = () => {
      // After the app is rendered, our store is now
      // filled with the state from our components.
      // When we attach the state to the context, and the `template` option
      // is used for the renderer, the state will automatically be
      // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
      context[context.contextKey ?? 'state'] = store.state

      // ALso inject the apollo cache state
      context.apolloState = ApolloSSR.getStates(apolloProvider)
    }

    return app
  };
}