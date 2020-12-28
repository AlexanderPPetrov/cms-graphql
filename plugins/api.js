import mutations from "../store/network/mutation-types";

export default function ({$axios, store, redirect}, inject) {

    const CancelToken = $axios.CancelToken;

    const api = {
        async get(action, url, data) {
            const response = await this.request({
                action,
                url,
                data,
            }, $axios.$get);
            return response;
        },
        async post(action, url, data) {
            const response = await this.request({
                action,
                url,
                data,
            }, $axios.$post);
            return response;
        },
        async put(action, url, data) {
            const response = await this.request({
                action,
                url,
                data,
            }, $axios.$put);
            return response;
        },
        async delete(action, url, data) {
            const response = await this.request({
                action,
                url,
                data,
            }, $axios.$delete);
            return response;
        },

        request: async (options = {}, $axiosMethod) => {
            if (typeof options.action !== 'string') {
                console.log('action must be a string');
                return;
            }
            if (!options.url) {
                console.log('you need to provide url');
                return;
            }

            if (!process.server) {
                const activeRequest = store.state.network.activeActions.find(action => action.name === options.action);
                if (activeRequest) {
                    activeRequest.cancel(`Cancel previous call for: ${options.action}`);
                    store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, options.action);
                }

                options.cancelToken = new CancelToken(function executor(cancel) {
                    let action = {
                        name: options.action,
                        cancel,
                    };
                    store.commit(`network/${mutations.ADD_ACTIVE_ACTION}`, action);
                });
            }

            try {
                const response = await $axiosMethod(options.url, options.data)
                return response;
            } catch (error) {
                if (!process.server) {
                    const code = parseInt(error.response && error.response.status)
                    // 422 - Fields validation error
                    if (code === 422) {
                        store.commit(`network/${mutations.ADD_RESPONSE_ERROR}`, {
                            name: options.action,
                            error: error.response.data,
                        });
                    }
                    store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, options.action);
                }
            }
        },

    };

    // Inject to context as $api
    inject('api', api)
}
