<template>
    <div class="row justify-content-center">
        <div class="col-md-4 col-xl-2">
            <login-form></login-form>
            {{ getUserName }}
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
            getUserName(){
                return this.$store.state.users.currentUser.firstName
            }
        },

    };
</script>

<style>

</style>
