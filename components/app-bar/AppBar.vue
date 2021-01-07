<template>
    <v-app-bar light fixed app>
        <v-app-bar-nav-icon @click.stop="toggleDrawer" />
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <user-menu></user-menu>
    </v-app-bar>
</template>

<script>
import UserMenu from "@/components/app-bar/UserMenu";

export default {
    name: "app-bar",
    components: {UserMenu},
    methods: {
        toggleDrawer() {
            this.$emit('toggleDrawer');
        },
    },
}
</script>


