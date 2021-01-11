<template>
    <div class="d-flex align-center mx-1">
        <v-icon class="mr-3">mdi-weather-night</v-icon>
        <v-switch v-model="darkTheme" hide-details
        ></v-switch>
    </div>
</template>
<script>
export default {
    name: 'theme-switch',
    data () {
        return {
            darkTheme: false,
        }
    },
    watch: {
        darkTheme(value){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
    }
}
</script>
