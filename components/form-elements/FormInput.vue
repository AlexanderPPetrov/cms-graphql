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
            {{ invalidFeedback }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script>

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
            v: {
                type: Object,
                required: true
            },
        },
        computed: {
            getState() {
                if (this.v && this.v.$error) {
                    return false;
                }
                return null;

            },
        },
        methods: {
            formInputFieldOnInput(value){
                this.$emit(`update:${this.fieldName}`, value);
            },
            formInputFieldOnFocus(value){
                this.$emit('focus', value);
            }
        },

    };
</script>
