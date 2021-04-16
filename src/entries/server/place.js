import { createApp } from '@/appB'

export default context => {
  const { app, store} = createApp()
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