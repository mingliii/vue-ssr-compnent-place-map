<template>
    <c-box border-width="1px" maxW="sm" overflow="hidden" rounded="lg">
        <c-image :alt="place.imageDescription" :src="place.imageUrl"/>
        <c-box p="6">
            <c-box align-items="baseline" d="flex">
                <c-badge px="2" rounded="full" variant-color="green">
                    {{ place.county }}
                </c-badge>
                <c-box
                    color="gray.500"
                    font-size="xs"
                    font-weight="semibold"
                    letter-spacing="wide"
                    ml="2"
                    text-transform="uppercase"
                >
                    {{ place.town }}
                </c-box>
            </c-box>
            <c-box
                as="h4"
                font-weight="semibold"
                is-truncated
                line-height="tight"
                mt="1"
            >
                {{ place.title }}
            </c-box>
            <c-box> {{ place.description }}</c-box>
            <c-box align-items="center" d="flex" mt="2">
                <c-icon
                    v-for="(_, i) in Array(5).fill('')"
                    :key="i"
                    :color="i <= parseInt(place.id.value)%5 ? 'green.500' : 'gray.300'"
                    name="star"
                />
                <c-box as="span" color="gray.600" font-size="sm" ml="2">
                    {{ Math.floor(Math.random() * 10000) }} reviews
                </c-box>
            </c-box>
        </c-box>
    </c-box>
</template>

<script>
import {CBadge, CBox, CIcon, CImage} from '@chakra-ui/vue';

export default {
    name: 'Card',
    components: {
        CBox, CBadge, CImage, CIcon
    },
    serverCacheKey: props => props.place.id.value,
    props: {
        place: {
            type: Object,
            required: true
        },
    },
    data() {
        return {}
    },
    created() {
    }
}
</script>