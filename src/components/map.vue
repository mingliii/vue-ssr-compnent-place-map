<template>
    <div :id="componentId" style="width: 100%;height: 900px;position: relative">
        <h1>{{ name }}</h1>
        <div>
            <GmapMap id="places-map" ref="mapRef"
                     :center="center"
                     :zoom="6"
                     class="map"
                     map-type-id="roadmap"
                     style="height: 800px;width: 100%">
                <!-- google map types are roadmap, satellite, hybrid, terrain -->
                <GmapMarker
                    v-for="(place, index) in places"
                    :key="index"
                    :clickable="false"
                    :draggable="false"
                    :icon="{ url: markerIcon}"
                    :position="{lng: place.location.longitude, lat: place.location.latitude}"
                />
            </GmapMap>
        </div>
    </div>

</template>

<script>
import markerIcon from '@/assets/marker.png'
import {mapState} from 'vuex';

export default {
    name: 'Map',
    components: {},
    computed: {
        ...mapState(['places']),
        componentId: function () {return `${this.$options.name.toLowerCase()}-component`},
    },
    data() {
        return {
            name: 'Map page',
            center: {lng: -2.547855, lat: 54.00366},
            zoom: 6,
            markerIcon,
        }
    },
    serverPrefetch() {
        return this.$store.dispatch('fetchPlaces');
    },
    created() {
        if (this.places.length === 0) {
            return this.$store.dispatch('fetchPlaces');
        }
    }
};
</script>

