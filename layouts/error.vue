<template>
    <v-card>
        <v-alert v-if="error.statusCode === 404"
                 outlined
                 prominent
                 type="warning"
        >
            Page not found
            <div>
                <NuxtLink to="/">Dashboard</NuxtLink>
            </div>
        </v-alert>
        <v-alert v-else
                 type="error"
                 outlined
                 text
        >
            An error occurred
            <div>
                <NuxtLink to="/">Dashboard</NuxtLink>
            </div>
        </v-alert>
    </v-card>
</template>

<script>
export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
}
</script>
