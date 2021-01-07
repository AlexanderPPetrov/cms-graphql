<template>
    <v-row>
        <v-col class="d-flex align-center justify-center text-subtitle-2">
            {{ $t('user.log_in_to_your_account') }}
        </v-col>
        <v-col cols="12">
            <v-form @submit="onLogin"
                  autocomplete="off">
                <form-input fieldName="email"
                            :value="form.email"
                            v-bind:email.sync="form.email"
                            :label="$t('user.email')"
                            :invalidFeedback="$t('user.email_invalid')"
                            :actionName="getActionName"
                            :v="$v.form.email"></form-input>
                <form-input fieldName="password"
                            type="password"
                            :value="form.password"
                            v-bind:password.sync="form.password"
                            :label="$t('user.password')"
                            :invalidFeedback="$t('user.password_invalid')"
                            :actionName="getActionName"
                            :v="$v.form.password"></form-input>
                <v-btn
                    block
                    rounded
                    type="submit"
                    color="primary"
                    class="mt-6"
                    elevation="2"
                    large
                    @click="onLogin"
                >
                    {{ this.$t('user.login') }}
                </v-btn>
            </v-form>
        </v-col>
    </v-row>

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
            }
        };
    },
    computed: {
        getActionName() {
            return actions.AUTH_LOGIN
        }
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

            this.$store.dispatch(`users/${actions.AUTH_LOGIN}`, {
                data: {
                    email: this.form.email,
                    password: this.form.password,
                },
                success: this.onLoginSuccess
            });
        },
        onLoginSuccess() {
            this.$router.push(this.localePath({name: "index"}));
        }
    },

}
</script>
