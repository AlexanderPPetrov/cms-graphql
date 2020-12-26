<template>
    <div class="row justify-content-center vh-100 d-flex align-items-center">
        <div class="col-lg-4">
            <div class="d-flex justify-content-between p-3">
                <b-icon icon="arrow-repeat" variant="primary" @click="$nuxt.refresh()"></b-icon>
                <b-icon icon="box-arrow-in-right" variant="info" @click="onLogout"></b-icon>
            </div>
            <b-list-group>
                <user v-for="user in getUsers"
                      :key="user._id"
                      :user="user"
                >
                </user>
            </b-list-group>
        </div>
    </div>
</template>

<script>
    import actions from '../store/users/action-types'
    import LoginForm from '../components/forms/LoginForm';
    import User from '../components/User';

    export default {
        components: {
            LoginForm,
            User,
        },
        async fetch({ store }){
            await store.dispatch(`users/${actions.GET_USERS}`);
        },
        computed: {
            getCurrentUser(){
                return this.$store.state.users.currentUser
            },
            getUsers(){
                return this.$store.state.users.users;
            }
        },
        methods: {
            onLogout () {
                //TODO cookie is not removed in some cases
                this.$apolloHelpers.onLogout().then(()=> {
                    this.$router.push({name: 'login___en'})
                })
            },
        }

    };
</script>

<style>

</style>
