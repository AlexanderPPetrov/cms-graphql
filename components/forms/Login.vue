<template>
    <b-form @submit="onLogin"
            autocomplete="off"
            v-view-loader="{
                loaderName: this.getLoginAction,
                loaderClass: 'view-loader loader-center'
            }">
        <cl-form-input fieldName="email"
                       :value="form.email"
                       v-bind:email.sync="form.email"
                       :placeholder="$translation('_localizer.REGISTER.placeholder_email')"
                       :invalidFeedback="getServerError('email') || 'Please enter a valid email'"
                       @focus="clearServerError('email')"
                       :v="$v.form.email"></cl-form-input>
        <cl-form-input fieldName="password"
                       type="password"
                       :value="form.password"
                       v-bind:password.sync="form.password"
                       :placeholder="$translation('_localizer.REGISTER.placeholder_password')"
                       :invalidFeedback="this.getServerError('password') || getPasswordInvalidFeedback"
                       @focus="clearServerError('password')"
                       :v="$v.form.password"></cl-form-input>

        <b-button ref="loginButton"
                  type="submit"
                  variant="primary"
                  block
                  class="btn-cta-register text-uppercase"
        >
            Login
        </b-button>
    </b-form>
</template>

<script>
    import {required, email, sameAs, minLength, requiredIf} from 'vuelidate/lib/validators';
    import FormInput from '../form-elements/FormInput';

    import actions from '../../../store/user/action-types';
    import mutations from '../../../store/network/mutation-types';

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
                    minLength: minLength(5),
                    serverError() {
                        return !this.getServerError('password').length;
                    }
                },
            }
        },
        
        computed: {
            getLoginAction() {
                return actions.REGISTER_USER;
            },

        },
        methods: {
            getServerError(key) {
                if (this.$store.getters['network/getResponseError'](actions.REGISTER_USER)[key]) {
                    this.$v.form[key].$touch();
                    return this.$store.getters['network/getResponseError'](actions.REGISTER_USER)[key];
                }
                return '';
            },
            clearServerError(key) {
                const responseErrors = this.$store.state.network.responseErrors;
                const index = responseErrors.findIndex(error => error.name === actions.REGISTER_USER);
                if (index !== -1 && responseErrors[index].error[key]) {
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
                this.$store.dispatch(`user/${actions.REGISTER_USER}`, {
                    params: {
                        email: this.form.email,
                        password: this.form.password,
                    },
                    success: () => {
                        console.log('success')
                    }
                });
            },
      

        }
    }
</script>
