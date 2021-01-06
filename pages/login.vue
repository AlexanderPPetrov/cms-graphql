<template>
    <div class="login-container">
        <div class="d-flex justify-center align-center mb-12">
            <img src="~/assets/images/logo.png" width="170px"/>
        </div>
        <v-card class="px-8 py-7">
            <login-form></login-form>
        </v-card>
    </div>
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
