<template>
    <div class="row justify-content-center">
        <div class="col-md-4 col-xl-2">
            {{ getUserName }}
        </div>
    </div>
</template>

<script>
    import actions from '../store/users/action-types'
    export default {
        name: 'gb-main-categories-chart-wrapper',
        components: {

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
