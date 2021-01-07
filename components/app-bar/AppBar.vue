<template>
    <v-app-bar fixed app :class="{white: !$vuetify.theme.dark}">
        <v-app-bar-nav-icon @click.stop="toggleDrawer" />
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <theme-switch></theme-switch>
        <user-menu></user-menu>
    </v-app-bar>
</template>

<script>
import UserMenu from "@/components/app-bar/UserMenu";
import ThemeSwitch from "@/components/app-bar/ThemeSwitch";
import mutations from "@/store/application/mutation-types";
export default {
    name: "app-bar",
    components: {ThemeSwitch, UserMenu},
    methods: {
        toggleDrawer() {
            const drawerOpened = this.$store.state.application.drawerOpened;
            this.$store.commit(`application/${mutations.SET_DRAWER_OPENED}`, !drawerOpened);
        },
    },
}
</script>


