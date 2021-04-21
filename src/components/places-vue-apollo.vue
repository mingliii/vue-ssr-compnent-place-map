<template>
    <div>
        <h1>{{ name }}</h1>
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>
            <c-simple-grid minChildWidth="250px" spacing="30px">
                <card v-for="place in places.slice(0, numOfPlaces)" :key="place.id.value" :place="place"/>
            </c-simple-grid>
        </div>
        <div style="margin: 0 auto;padding: 10px;text-align: center">
            <c-button variant-color="green" @click="loadMore">Show more</c-button>
        </div>
    </div>
</template>

<script>
import {CButton, CSimpleGrid} from '@chakra-ui/vue'
import Card from './lib/card.vue'
import gql from "graphql-tag";

export default {
    name: 'PlacesVueSSR',
    components: {
        CSimpleGrid, Card, CButton
    },
    data() {
        return {
            name: 'Places page using vue-apollo',
            numOfPlaces: 30
        }
    },

    apollo: {
        places: {
            query: gql`{
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
              }`,
            // prefetch: false,
        }
    },
    methods: {
        loadMore() {
            if (this.places.length > 30 + this.numOfPlaces) {
                this.numOfPlaces = 30 + this.numOfPlaces;
            } else {
                this.numOfPlaces = this.places.length;
            }
        }
    }
};
</script>

<style lang="css" scoped>
</style>
