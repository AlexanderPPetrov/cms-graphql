<template>
    <div class="row justify-content-center">
        <div class="col-md-4 col-xl-2">
            <b-form @submit="onLogin">
                <b-form-group
                    id="fieldset-1"
                    invalid-feedback="error"
                    :state="state"
                >
                    <b-form-input id="input-1"
                                  v-model="name"
                                  :state="state"
                                  placeholder="Email"
                                  trim>

                    </b-form-input>
                </b-form-group>
                <b-form-group
                    id="fieldset-1"
                    invalid-feedback="error"
                    :state="state"
                >
                    <b-form-input id="input-1"
                                  v-model="name"
                                  :state="state"
                                  type="password"
                                  placeholder="Password"
                                  trim>

                    </b-form-input>
                </b-form-group>
                <b-button type="submit"
                          block
                          variant="primary"
                          class="text-white">Login
                </b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style>

</style>
