<template>
    <div id="app">
        <h1 class="about">{{ name }}</h1>
        <div>
            <card :place="places[Math.floor(Math.random() * places.length)]"/>
        </div>
    </div>
</template>

<script>
import Card from './lib/card.vue'
import { mapState } from 'vuex';

export default {
    name: 'Place',
    components: {
        Card
    },
    computed: {
        ...mapState(['places']),
    },
    data() {
        return {
            name: 'Place page',
        }
    },
    serverPrefetch() {
        return this.$store.dispatch('fetchPlaces');
    }
};
</script>
