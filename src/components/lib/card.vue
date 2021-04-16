<template>
    <c-box maxW="sm" border-width="1px" rounded="lg" overflow="hidden">
        <c-image :src="place.imageUrl" :alt="place.imageDescription" />
        <c-box p="6">
            <c-box d="flex" align-items="baseline">
                <c-badge rounded="full" px="2" variant-color="green">
                    {{ place.county }}
                </c-badge>
                <c-box
                    color="gray.500"
                    font-weight="semibold"
                    letter-spacing="wide"
                    font-size="xs"
                    text-transform="uppercase"
                    ml="2"
                >
                    {{ place.town }}
                </c-box>
            </c-box>
            <c-box
                mt="1"
                font-weight="semibold"
                as="h4"
                line-height="tight"
                is-truncated
            >
                {{ place.title }}
            </c-box>
            <c-box> {{ place.description }} </c-box>
            <c-box d="flex" mt="2" align-items="center">
                <c-icon
                    v-for="(_, i) in Array(5).fill('')"
                    name="star"
                    :key="i"
                    :color="i <= parseInt(place.id.value)%5 ? 'green.500' : 'gray.300'"
                />
                <c-box as="span" ml="2" color="gray.600" font-size="sm">
                    {{ Math.floor(Math.random() * 10000) }} reviews
                </c-box>
            </c-box>
        </c-box>
    </c-box>
</template>

<script>
import { CBox, CBadge, CImage, CIcon } from '@chakra-ui/vue';

export default {
    name: 'Example',
    components: {
        CBox, CBadge, CImage, CIcon
    },
    props: {
        place: {
            type: Object,
            required: true
        },
    },
    data () {
        return {
        }
    },
    created() {
    }
}
</script>