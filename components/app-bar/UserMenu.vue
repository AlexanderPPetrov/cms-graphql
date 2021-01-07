<template>
    <v-menu
        left
        bottom
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon color="primary" large>mdi-account-circle</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item link @click="onLogout">
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: "user-menu",
    methods: {
        async onLogout () {
            await this.$apolloHelpers.onLogout().then(()=> {
                // For some reason using the router makes an endless call to auth.js
                window.location.href = '/login'
            });
        },
    }
}
</script>


