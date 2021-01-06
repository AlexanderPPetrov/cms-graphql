<template>
    <v-card class="login-container p-3">
        <v-flex class="d-flex justify-center align-center">
            <img src="~/assets/images/logo.png" width="56px"/>
        </v-flex>
        <login-form></login-form>
    </v-card>
</template>

<script>
    import LoginForm from '../components/forms/LoginForm';

    export default {
        layout: 'login',
        components: {
            LoginForm,
        },
    };
</script>
<style scoped>
    .login-container {
        width: 300px;
    }
</style>
