<template>
    <b-form @submit="onLogin"
            autocomplete="off">
        <form-input fieldName="email"
                    :value="form.email"
                    v-bind:email.sync="form.email"
                    :placeholder="$t('user.email')"
                    :invalidFeedback="$t('user.email_invalid')"
                    :v="$v.form.email"></form-input>
        <form-input fieldName="password"
                    type="password"
                    :value="form.password"
                    v-bind:password.sync="form.password"
                    :placeholder="$t('user.password')"
                    :invalidFeedback="$t('user.password_invalid')"
                    :v="$v.form.password"></form-input>
        <form-input fieldName="nonRequired"
                    :value="form.nonRequired"
                    v-bind:nonRequired.sync="form.nonRequired"
                    :placeholder="$t('user.non_required')"
                    ></form-input>

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
    import {required, email, minLength} from 'vuelidate/lib/validators';
    import FormInput from '../form-elements/FormInput';

    import actions from '../../store/users/action-types';

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
                    nonRequired: '',
                }
            };
        },
        validations: {
            form: {
                email: {
                    required,
                    email,
                    fieldError() {
                        return !this.getFieldError('email');
                    }
                },
                password: {
                    required,
                    minLength: minLength(6),
                    fieldError() {
                        return !this.getFieldError('password');
                    }
                },
            }
        },
        methods: {
            getFieldError(fieldName) {
                return this.$store.getters['network/getFieldError'](actions.AUTH_LOGIN, fieldName);
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
                    success: this.onLoginSuccess
                });
            },
            onLoginSuccess(user) {
                console.log('logged with', user);
                this.$router.push({name: 'index___en'})
            }
        },

    }
</script>
