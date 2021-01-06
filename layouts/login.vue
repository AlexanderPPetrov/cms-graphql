<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height class="pa-0">
                <v-row no-gutters>
                    <div class="main-part d-none d-md-none d-lg-flex col col-7"></div>
                    <div class="login-part d-flex align-center justify-center col-lg-5 col-12">
                        <nuxt />
                    </div>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<style>
    .main-part {
        width: 100%;
        height: 100vh;
    }
</style>
