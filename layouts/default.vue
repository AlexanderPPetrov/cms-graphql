<template>
    <v-app id="inspire">
        <drawer></drawer>
        <app-bar></app-bar>
        <v-main>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-flex>
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
export default {
    components: {
        Drawer,
        AppBar,
    }
}
</script>
