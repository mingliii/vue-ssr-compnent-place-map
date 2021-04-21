import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from "node-fetch";

export function createApolloClient(ssr = false) {
  const cache = new InMemoryCache({
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'PlaceSummaryWithActivities':
          return object.id.value;
        case 'PlaceSummary':
          return object.id.value;
        case 'Summary':
          return object.id.value;
        default:
          return object.id || object._id; // fall back to `id` and `_id` for all other types
      }
    }
  })

  // If on the client, recover the injected state
  if (!ssr) {
    if (typeof window !== 'undefined') {
      // noinspection JSUnresolvedVariable
      const state = window.__APOLLO_STATE__
      if (state) {
        // If you have multiple clients, use `state.<client_id>`
        cache.restore(state.defaultClient)
      }
    }
  }

  return new ApolloClient({
    link: new HttpLink({uri: 'http://localhost:3000/graphql', fetch}),
    cache,
  })
}