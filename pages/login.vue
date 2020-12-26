<template>
    <div class="row justify-content-center vh-100 d-flex align-items-center">
        <div class="col-lg-4 pb-5">
                <div class="d-flex justify-content-center pb-4">
                    <img src="~/assets/images/logo.jpg"/>
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
