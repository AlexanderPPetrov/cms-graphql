import mutations from "../store/network/mutation-types";

export default function ({app, store, redirect}, inject) {
    const apolloClient = app.apolloProvider.defaultClient
    const apollo = {
        async query(action, options) {
            const response = await this.request({
                action,
                options,
            }, apolloClient.query);
            return response;
        },
        async mutate(action, options) {
            const response = await this.request({
                action,
                options,
            }, apolloClient.mutate);
            return response;
        },
        request: async (data = {}, $apolloMethod) => {
            if (typeof data.action !== 'string') {
                console.log('action must be a string');
                return;
            }
            if (!data.options) {
                console.log('you need to provide apollo options')
                return;
            }
            if(!process.server){
                store.commit(`network/${mutations.ADD_ACTIVE_ACTION}`, data.action);
                store.commit(`network/${mutations.REMOVE_RESPONSE_ERROR}`, data.action);
            }

            const response = await $apolloMethod(data.options)
                .then(() => {
                    if(!process.server){
                        store.commit(`network/${mutations.REMOVE_RESPONSE_ERROR}`, data.action);
                    }
                })
                .catch(error => {
                    console.log(error.graphQLErrors)
                    if(!process.server){
                        if (error.graphQLErrors) {
                            error.graphQLErrors.forEach(error => {
                                if(error.message === 'validation_error'){
                                    store.commit(`network/${mutations.ADD_RESPONSE_ERROR}`, {
                                        name: data.action,
                                        error: error.validationErrors,
                                    });
                                }
                            })

                        }
                    }

                }).finally(()=> {
                    if(!process.server){
                        store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, data.action);
                    }
                })

            return response;
        },

    };
    inject('apollo', apollo);
}
