import mutations from "../store/network/mutation-types";

export default function ({app, store, redirect}, inject) {
    const apolloClient = app.apolloProvider.defaultClient;
    const apollo = {
        async query(action, queryOptions) {
            const defaultOptions = {
                errorPolicy: "all",
                fetchPolicy: "no-cache",
            }
            const options = Object.assign({}, defaultOptions, queryOptions);
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
                console.log('you need to provide apollo options');
                return;
            }
            if (!process.server) {
                store.commit(`network/${mutations.ADD_ACTIVE_ACTION}`, data.action);
                store.commit(`network/${mutations.REMOVE_RESPONSE_ERROR}`, data.action);
            }
            console.log(data.options);
            try {
                const response = await $apolloMethod(data.options);
                return response;
            } catch (error) {
                console.log(error);
                if (!process.server) {
                    if (error.graphQLErrors) {
                        const validationErrors = error.graphQLErrors.filter(error => error.message === 'validation_error')
                        validationErrors.forEach(error => {
                            store.commit(`network/${mutations.ADD_RESPONSE_ERROR}`, {
                                name: data.action,
                                error: error.validationErrors,
                            });
                        })
                        const networkErrors = error.graphQLErrors.filter(error => error.message !== 'validation_error');
                        if(networkErrors.length){
                            store.commit(`network/${mutations.SET_NETWORK_ERRORS}`, networkErrors);
                        }
                    }
                    store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, data.action);
                }
            }
        },

    };
    inject('apollo', apollo);
}
