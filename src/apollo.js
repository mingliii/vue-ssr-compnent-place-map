import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from "node-fetch";

export default new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:3000/graphql', fetch}),
  cache: new InMemoryCache({
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
});