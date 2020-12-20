import mutations from "../store/network/mutation-types";

export default function ({$axios, store, redirect}, inject) {

    const CancelToken = $axios.CancelToken;
    const api = {
        get(action, url, params, success, failure, done, repeatTime = 0, executeInitially = true) {
            this.request({
                method: 'get',
                url,
                action,
                params,
                success,
                failure,
                done,
                repeatTime,
                executeInitially,
            }, $axios.$get);
        },
        post(action, url, params, success, failure, done, repeatTime = 0, executeInitially = true) {
            this.request({
                method: 'post',
                url,
                action,
                params,
                success,
                failure,
                done,
                repeatTime,
                executeInitially,
            }, $axios.$post);
        },
        put(action, url, params, success, failure, done) {
            this.request({
                method: 'put',
                url,
                action,
                params,
                success,
                failure,
                done,
            }, $axios.$put);
        },
        delete(action, url, params, success, failure, done) {
            this.request({
                method: 'delete',
                url,
                action,
                params,
                success,
                failure,
                done,
            }, $axios.$delete);
        },
        request: (options = {}, $axiosMethod) => {
            if (!options.url) {
                console.log('URL is required');
                return;
            }
            const requestOptions = Object.assign({}, options);

            if (options.params && options.params.external) {
                baseURL = '';
            }
            const data = Object.assign({
                method: 'get',
            }, options);

            const activeRequest = store.state.network.activeActions.find(action => action.name === options.action);
            let timeExecuted = 0;
            if (activeRequest) {
                activeRequest.cancel(`Cancel previous call for: ${options.action}`);
                if (activeRequest.repeatTimeout) {
                    timeExecuted = activeRequest.timeExecuted;
                }
                store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, options.action);
            }

            data.cancelToken = new CancelToken(function executor(cancel) {
                let action = {
                    name: data.action,
                    cancel,
                    timeExecuted
                };
                store.commit(`network/${mutations.ADD_ACTIVE_ACTION}`, action);
            });

            store.commit(`network/${mutations.REMOVE_RESPONSE_ERROR}`, options.action);

            if (!options.executeInitially) {
                requestOptions.executeInitially = true;
                api.requestWithTimeout(requestOptions);
                return;
            }

            $axiosMethod(data.url, data.params)
                .then(response => {
                    if (options.success) {
                        options.success(response);
                    }
                    if (options.done) {
                        options.done(response)
                    }
                    api.requestWithTimeout(requestOptions);

                })
                .catch(error => {
                    const code = parseInt(error.response && error.response.status)

                    // 422 - Fields validation error
                    if (code === 422) {
                        store.commit(`network/${mutations.ADD_RESPONSE_ERROR}`, {
                            name: options.action,
                            error: error.response.data,
                        });
                    }
                    if (options.failure) {
                        options.failure(error);
                    }
                    if (options.done) {
                        options.done(error)
                    }
                    api.requestWithTimeout(requestOptions);
                });
        },
        requestWithTimeout: options => {
            if (options.repeatTime) {
                const index = store.state.network.activeActions.findIndex(action => action.name === options.action);
                if (index === -1) {
                    // Return if the request was already removed from activeActions
                    return;
                }
                let action = store.state.network.activeActions[index];
                const repeatTimeout = setTimeout(() => {
                    api.request(options);
                }, options.repeatTime);

                action = Object.assign({}, action, {repeatTimeout});
                action.timeExecuted = action.timeExecuted + 1;
                store.commit(`network/${mutations.UPDATE_ACTIVE_ACTION}`, {index, action});
            } else {
                store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, options.action);
            }
        },
        clearRequest: actionName => {
            const activeRequest = store.state.network.activeActions.find(action => action.name === actionName);
            if (activeRequest) {
                clearTimeout(activeRequest.repeatTimeout);
            }
            store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, actionName);
        }
    };

    // Inject to context as $api
    inject('api', api)
}
