<template>
    <v-snackbar
        v-model="isVisible"
        :multi-line="multiLine"
        color="error"
        absolute
        top
        outlined
        :timeout="10000"
        transition="slide-y-transition"
    >
        <div v-for="(error, index) in getNetworkErrors"
             :key="index">
            {{ error.message }}
        </div>
        <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="isVisible = false"
            >
                <v-icon
                    small
                >
                    mdi-close
                </v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import mutations from "@/store/network/mutation-types";

export default {
    name: 'network-error',
    data: () => ({
        multiLine: true,
        isVisible: false,
    }),
    computed: {
        getNetworkErrors() {
            return this.$store.state.network.networkErrors
        }
    },
    watch: {
        async isVisible(visible){
            if(visible) {
                return;
            }
            await this.$nextTick();
            this.$store.commit(`network/${mutations.SET_NETWORK_ERRORS}`, []);
        },
        getNetworkErrors: {
            handler: function(value) {
                if(value.length){
                    this.isVisible = true;
                }
            },
            immediate: true,
        },
    }
}
</script>
<style scoped>
.v-snack {
    z-index: 7;
}
</style>
