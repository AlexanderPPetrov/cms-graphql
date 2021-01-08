<template>
    <v-app id="inspire">
        <drawer></drawer>
        <app-bar></app-bar>
        <v-main>
            <v-container fluid fill-height>
                <v-layout>
                    <v-flex>
                        <breadcrumbs></breadcrumbs>
                        <nuxt />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import AppBar from '../components/app-bar/AppBar';
import Drawer from "@/components/drawer/Drawer";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
export default {
    components: {
        Drawer,
        AppBar,
        Breadcrumbs,
    }
}
</script>
<style>
    .v-main__wrap {
        padding: 24px;
    }
</style>
