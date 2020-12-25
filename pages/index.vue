<template>
    <div class="row justify-content-center vh-100 d-flex align-items-center">
        <div class="col-lg-4">
            <div class="d-flex justify-content-end p-3">
                <b-icon icon="box-arrow-in-right" class="ml-3" @click="onLogout"></b-icon>
            </div>
            <b-list-group>
                <b-list-group-item href="#" class="flex-column align-items-start" @click="$nuxt.refresh()">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ getCurrentUser.firstName }} {{ getCurrentUser.lastName }}</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>

                    <div class="mt-1 mb-3">
                        {{ getCurrentUser.email }}
                    </div>
                    <div class="d-flex">
                        <div class="d-flex align-items-center mr-2" v-for="role in getCurrentUser.roles" :key="role">
                            <b-icon icon="file-earmark-person-fill" class="mr-1"></b-icon>
                            <span class="text-muted">
                                {{ role }}
                            </span>
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
    import actions from '../store/users/action-types'
    import LoginForm from '../components/forms/LoginForm';

    export default {
        name: 'gb-main-categories-chart-wrapper',
        components: {
            LoginForm,
        },
        async fetch({ store }){
            await store.dispatch(`users/${actions.GET_CURRENT_USER}`);
        },
        computed: {
            getCurrentUser(){
                return this.$store.state.users.currentUser
            }
        },
        methods: {
            async onLogout () {
                await this.$apolloHelpers.onLogout();
                await this.$router.push({name: 'login___en'})
            },
        }

    };
</script>

<style>

</style>
