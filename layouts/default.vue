<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" fixed app>
            <v-list dense>
                <v-list-item nuxt to="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item nuxt to="/inspire">
                    <v-list-item-action>
                        <v-icon>mdi-airballoon</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Inspire</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <app-bar @toggleDrawer="drawer = !drawer"></app-bar>
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

export default {
    components: {
        AppBar
    },
    data() {
        return {
            drawer: null
        }
    }
}
</script>
