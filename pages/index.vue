<template>
    <div class="row justify-content-center">
        <div class="col-md-4 col-xl-2">

        </div>
    </div>
</template>

<script>
    import actions from '../store/user/action-types.js';

    export default {
        name: 'gb-main-categories-chart-wrapper',
        components: {

        },
        created(){
            console.log(actions);
            debugger
            this.$store.dispatch(`user/${actions.GET_TEST_DATA}`);
        }
    };
</script>

<style>

</style>
