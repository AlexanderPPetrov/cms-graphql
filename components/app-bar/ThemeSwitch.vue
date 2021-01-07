<template>
    <v-switch
        class="mb-0"
        v-model="darkTheme"
    ></v-switch>
</template>
<script>
export default {
    name: 'theme-switch',
    data () {
        return {
            darkTheme: true,
        }
    },
    watch: {
        darkTheme(value){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
    }
}
</script>
