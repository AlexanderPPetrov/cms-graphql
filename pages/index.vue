<template>
    <div class="row justify-content-center">
        <div class="col-md-4 col-xl-2">
            asd
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
        fetch(){
            this.$store.dispatch(`users/${actions.GET_TEST_DATA}`);
        },
        computed: {
            getUserName(){
                return this.$store.state.users.firstName
            }
        }
    };
</script>

<style>

</style>
