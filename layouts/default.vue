<template>
    <v-app>
        <drawer></drawer>
        <app-bar></app-bar>
        <v-main>
            <v-container fluid fill-height>
                <v-layout>
                    <v-flex>
                        <breadcrumbs></breadcrumbs>
                        <nuxt/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
        <network-error></network-error>
    </v-app>
</template>

<script>
import AppBar from '../components/app-bar/AppBar';
import Drawer from "@/components/drawer/Drawer";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import NetworkError from "@/components/network-error/NetworkError";
export default {
    components: {
        Drawer,
        AppBar,
        Breadcrumbs,
        NetworkError,
    }
}
</script>
<style lang="scss">
    @import '~vuetify/src/styles/settings/_variables';

    .v-main__wrap {
        padding: 24px;
    }
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
        .v-main__wrap {
            padding: 6px;
        }
    }
</style>
