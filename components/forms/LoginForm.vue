<template>
    <b-form @submit="onLogin"
            autocomplete="off">
        <form-input fieldName="email"
                    :value="form.email"
                    v-bind:email.sync="form.email"
                    :placeholder="$t('user.email')"
                    :invalidFeedback="getFieldError('email') || $t('user.email_invalid')"
                    @focus="clearServerError('email')"
                    :v="$v.form.email"></form-input>
        <form-input fieldName="password"
                    type="password"
                    :value="form.password"
                    v-bind:password.sync="form.password"
                    :placeholder="$t('user.password')"
                    :invalidFeedback="this.getFieldError('password') || $t('user.password_invalid')"
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
                        return !this.getFieldError('email').length;
                    }
                },
                password: {
                    required,
                    minLength: minLength(6),
                    serverError() {
                        return !this.getFieldError('password').length;
                    }
                },
            }
        },
        methods: {
            getFieldError(key) {
                const fieldError = this.$store.getters['network/getFieldError'](actions.AUTH_LOGIN, key);
                if (fieldError) {
                    this.$v.form[key].$touch();
                    return this.$t(`user.${fieldError.message}`);
                }
                return '';
            },
            clearServerError(key) {
                const responseErrors = this.$store.state.network.responseErrors;
                const index = responseErrors.findIndex(error => error.name === actions.AUTH_LOGIN);

                //TODO
                if (index !== -1) {
                    let error = Object.assign({}, responseErrors[index]);
                    delete error.error[key];
                    this.$store.commit(`network/${mutations.UPDATE_RESPONSE_ERROR}`, {index, error});
                }
            },
            onLogin(e) {
                e.preventDefault();
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                this.$refs.loginButton.blur();
                this.$store.dispatch(`users/${actions.AUTH_LOGIN}`, {
                    data: {
                        email: this.form.email,
                        password: this.form.password,
                    },
                    success: ()=> {
                        this.$router.push({name: 'serverside'})
                    }
                });
            },
        },

    }
</script>
