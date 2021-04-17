<template>
    <div id="places-component">
        <h1>{{ name }}</h1>
        <div>
            <c-simple-grid minChildWidth="250px" spacing="30px">
                <card :key="place.id.value" v-for="place in this.places.slice(0,30)" :place="place"/>
            </c-simple-grid>
        </div>
    </div>
</template>

<script>
import {CSimpleGrid} from '@chakra-ui/vue'
import Card from './lib/card.vue'
import { mapState } from 'vuex';

export default {
    name: 'Places',
    components: {
        CSimpleGrid, Card
    },
    computed: {
        ...mapState(['places']),
    },
    data() {
        return {
            name: 'Places page',
        }
    },
    serverPrefetch() {
        return this.$store.dispatch('fetchPlaces');
    }
};
</script>

<style lang="css" scoped>
</style>
