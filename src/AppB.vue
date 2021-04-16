<template>
    <div id="app">
        <c-box>
            <c-button>
                AppB
            </c-button>
        </c-box>
    </div>
</template>

<script lang="js">
import { CBox, CButton } from '@chakra-ui/vue'

export default {
    name: 'AppB',
    components: {
        CBox,
        CButton
    }
}
</script>