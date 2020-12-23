<template>
    <div class="row justify-content-center vh-100 d-flex align-items-center">
        <div class="col-md-4 col-xl-2">
            <b-list-group>
                <b-list-group-item href="#" class="flex-column align-items-start" @click="$nuxt.refresh()">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ getCurrentUser.firstName }} {{ getCurrentUser.lastName }}</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>

                    <p class="mb-1">
                        {{ getCurrentUser.email }}
                    </p>

                    <small class="text-muted">{{ getCurrentUser.role }}</small>
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

    };
</script>

<style>

</style>
