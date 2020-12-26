<template>
    <div class="justify-content-center vh-100 d-flex align-items-center">
        <div class="login-container">
            <div class="d-flex justify-content-center pb-4">
                <img src="~/assets/images/logo_graph.png"/>
            </div>
            <login-form></login-form>
        </div>
    </div>
</template>

<script>
    import LoginForm from '../components/forms/LoginForm';

    export default {
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
