<template>
    <div id="map-component" style="width: 100%;height: 900px;position: relative">
        <h1>{{ name }}</h1>
        <div>
            <GmapMap id="places-map" style="height: 800px;width: 100%"
                     :center="center"
                     :zoom="6"
                     ref="mapRef"
                     map-type-id="roadmap"
                     class="map">
                <!-- google map types are roadmap, satellite, hybrid, terrain -->
                <GmapMarker
                    :key="index"
                    v-for="(place, index) in places"
                    :position="{lng: place.location.longitude, lat: place.location.latitude}"
                    :clickable="false"
                    :draggable="false"
                    :icon="{ url: markerIcon}"
                />
            </GmapMap>
        </div>
    </div>

</template>

<script>
import markerIcon from '@/assets/marker.png'
import { mapState } from 'vuex';

export default {
    name: 'Map',
    components: {},
    computed: {
        ...mapState(['places']),
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
    }
};
</script>

