<template>
    <b-form-group :label="label">
        <b-form-input :type="type"
                      @input="formInputFieldOnInput"
                      @focus="formInputFieldOnFocus"
                      :value="value"
                      :state="getState"
                      :placeholder="placeholder">
        </b-form-input>
        <b-form-invalid-feedback v-if="invalidFeedback" :state="getState">
            {{ getInvalidFeedback }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script>
    import mutations from '../../store/network/mutation-types';

    export default {
        name: 'cl-form-input',
        props: {
            label: {
                type: String
            },
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String
            },
            invalidFeedback: {
                type: String
            },
            id: {
                type: String,
            },
            fieldName: {
                type: String,
                required: true
            },
            v: Object,
            actionName: String,
        },
        computed: {
            getState() {
                if (this.v && this.v.$error) {
                    return false;
                }
                return null;
            },
            getFieldError() {
                const fieldError = this.$store.getters['network/getFieldError'](this.actionName, this.fieldName);
                if (fieldError) {
                    return this.$t(`user.${fieldError}`);
                }
                return '';
            },
            getInvalidFeedback(){
                if(this.getFieldError){
                    return this.getFieldError
                }
                return this.invalidFeedback
            }
        },
        watch: {
            getFieldError: function(value){
                if(value){
                    this.$v.$touch();
                }
            }
        },
        methods: {
            formInputFieldOnInput(value){
                this.$emit(`update:${this.fieldName}`, value);
            },
            formInputFieldOnFocus(value){
                this.$emit('focus', value);
                if(this.actionName){
                    this.clearServerError();
                }
            },

            clearServerError() {
                const responseErrors = this.$store.state.network.responseErrors;
                const index = responseErrors.findIndex(error => error.name === this.actionName);

                if (index !== -1 && responseErrors[index].error.details[`requestBody.${this.fieldName}`]) {
                    let fieldError = Object.assign({}, responseErrors[index]);
                    delete fieldError.error.details[`requestBody.${this.fieldName}`];
                    if (Object.keys(fieldError.error.details).length) {
                        this.$store.commit(`network/${mutations.UPDATE_RESPONSE_ERROR}`, {index, fieldError});
                    } else {
                        this.$store.commit(`network/${mutations.REMOVE_RESPONSE_ERROR}`, this.actionName);
                    }
                }
            },
        },

    };
</script>
