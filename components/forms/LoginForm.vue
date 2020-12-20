<template>
    <b-form @submit="onLogin"
            autocomplete="off">
        <form-input fieldName="email"
                    :value="form.email"
                    v-bind:email.sync="form.email"
                    :placeholder="$t('user.email')"
                    :invalidFeedback="getServerError('email') || $t('user.email_invalid')"
                    @focus="clearServerError('email')"
                    :v="$v.form.email"></form-input>
        <form-input fieldName="password"
                    type="password"
                    :value="form.password"
                    v-bind:password.sync="form.password"
                    :placeholder="$t('user.password')"
                    :invalidFeedback="this.getServerError('password') || $t('user.password_invalid')"
                    @focus="clearServerError('password')"
                    :v="$v.form.password"></form-input>

        <b-button ref="loginButton"
                  type="submit"
                  variant="primary"
                  class="text-uppercase"
                  block
        >
            {{ this.$t('user.login') }}
        </b-button>
    </b-form>
</template>

<script>
    import {required, email, sameAs, minLength, requiredIf} from 'vuelidate/lib/validators';
    import FormInput from '../form-elements/FormInput';

    import actions from '../../store/users/action-types';
    import mutations from '../../store/network/mutation-types';

    export default {
        name: "login-form",
        components: {
            FormInput,
        },
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                }
            };
        },
        validations: {
            form: {
                email: {
                    required,
                    email,
                    serverError() {
                        return !this.getServerError('email').length;
                    }
                },
                password: {
                    required,
                    minLength: minLength(6),
                    serverError() {
                        return !this.getServerError('password').length;
                    }
                },
            }
        },
        computed: {
            getLoginAction()
            {
                return '';
            //    return actions.REGISTER_USER;
            },

        },
        methods: {
            getServerError(key) {
                // if (this.$store.getters['network/getResponseError'](actions.REGISTER_USER)[key]) {
                //     this.$v.form[key].$touch();
                //     return this.$store.getters['network/getResponseError'](actions.REGISTER_USER)[key];
                // }
                return '';
            },
            clearServerError(key) {
                // const responseErrors = this.$store.state.network.responseErrors;
                // const index = responseErrors.findIndex(error => error.name === actions.REGISTER_USER);
                // if (index !== -1 && responseErrors[index].error[key]) {
                //     let error = Object.assign({}, responseErrors[index]);
                //     delete error.error[key];
                //     this.$store.commit(`network/${mutations.UPDATE_RESPONSE_ERROR}`, {index, error});
                // }
            },
            onLogin(e) {
                e.preventDefault();
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                this.$refs.loginButton.blur();
                this.$store.dispatch(`users/${actions.AUTH_LOGIN}`, {
                    email: this.form.email,
                    password: this.form.password,
                });
            },

        },

    }
</script>
