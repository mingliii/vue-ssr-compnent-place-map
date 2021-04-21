<template>
    <div>
        <h1>{{ name }}</h1>
        <div>
            <c-simple-grid minChildWidth="250px" spacing="30px">
                <card v-for="place in this.places.slice(0, this.numOfPlaces)" :key="place.id.value" :place="place"/>
            </c-simple-grid>
        </div>
        <div style="margin: 0 auto;padding: 10px;text-align: center">
            <c-button variant-color="green" @click="loadMore">Show more</c-button>
        </div>
    </div>
</template>

<script>
import {CSimpleGrid, CButton} from '@chakra-ui/vue'
import Card from './lib/card.vue'
import {mapState} from 'vuex';

export default {
    name: 'Places',
    components: {
        CSimpleGrid, CButton, Card
    },
    computed: {
        ...mapState(['places']),
    },
    data() {
        return {
            name: 'Places page',
            numOfPlaces: 30
        }
    },
    serverPrefetch() {
        return this.$store.dispatch('fetchPlaces');
    },
    created() {
        if (this.places.length === 0) {
            return this.$store.dispatch('fetchPlaces');
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
