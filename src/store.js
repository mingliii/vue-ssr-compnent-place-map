// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import graphqlClient from './apollo'
// Assume we have a universal API that returns Promises
// and ignore the implementation details
import {fetchItem} from './api'
import gql from "graphql-tag";

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      items: {},
      places: []
    }),

    actions: {
      fetchItem({commit}, id) {
        // return the Promise via `store.dispatch()` so that we know
        // when the data has been fetched
        return fetchItem(id).then(item => {
          commit('setItem', {id, item})
        })
      },
      async fetchPlaces({commit}) {
        const response = await graphqlClient.query({
          query: gql`
              {
                  places: allPlaces {
                      id {
                          value
                      }
                      title
                      imageUrl
                      location {
                          latitude
                          longitude
                      }
                      imageDescription
                      county
                      town
                      description
                  }
              }
          `,
        });
        commit('setPlaces', response.data.places);
      }
    },

    mutations: {
      setItem(state, {id, item}) {
        Vue.set(state.items, id, item)
      },
      setPlaces(state, places) {
        state.places = places
      }
    }
  })
}