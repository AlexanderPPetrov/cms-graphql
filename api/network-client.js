import axios from 'axios';
import store from '../store';
import mutations from '../store/network/mutation-types';
// Added store and mutations in order to track active requests for component loaders and requests errors;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const CancelToken = axios.CancelToken;

const buildFormData = function (formData, data, parentKey) {
    if(Array.isArray(data)){
        data.forEach(element => {
            buildFormData(formData, element, parentKey ? `${parentKey}[]` : '[]');
        })
    }else{
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    }

};
const networkClient = {
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
        });
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
        });
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
        });
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
        });
    },
    request: (options = {}) => {
        if (!options.url) {
            console.log('URL is required');
            return;
        }
        const requestOptions = Object.assign({}, options);

        let baseURL = '/' + Config.LOCALE_SHORT + '/';
        if (options.params && options.params.external) {
            baseURL = '';
        }
        if (options.method == 'post') {
            options.config = {headers: {'Content-Type': 'multipart/form-data'}};
            if (options.params && options.params.formData) {
                const bodyFormData = new FormData();
                buildFormData(bodyFormData, options.params.formData);
                options.data = bodyFormData;
                delete options.params.formData;
            }
        }

        const data = Object.assign({
            method: 'get',
            baseURL,

        }, options);

        const activeRequest = store.state.network.activeActions.find(action => action.name === options.action);
        let timeExecuted = 0;
        if (activeRequest) {
            activeRequest.cancel(`Cancel previous call for: ${options.action}`);
            if(activeRequest.repeatTimeout){
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

        if(!options.executeInitially){
            requestOptions.executeInitially = true;
            networkClient.requestWithTimeout(requestOptions);
            return;
        }
        axios(data)
            .then(response => {
                if (response.data.error || response.status === 'error') {
                    const error = response.data.error ? response.data.error : response.data;
                    if (options.failure) {
                        options.failure(error);
                    }
                    store.commit(`network/${mutations.ADD_RESPONSE_ERROR}`, {
                        name: options.action,
                        error
                    });
                } else {
                    if (options.success) {
                        if (response.data.data && response.status !== 'error') {
                            options.success(response.data.data);
                        } else {
                            //Sometimes there is no data nesting so remove the status and pass the response.data object
                            delete response.data.status;
                            options.success(response.data);
                        }
                    }
                }
                if (options.done) {
                    options.done(response.data)
                }
                networkClient.requestWithTimeout(requestOptions);

            })
            .catch(error => {
                if (options.failure) {
                    options.failure(error);
                    store.commit(`network/${mutations.ADD_RESPONSE_ERROR}`, {
                        name: options.action,
                        error
                    });
                }
                if (options.done) {
                    options.done(error)
                }
                networkClient.requestWithTimeout(requestOptions);
            });
    },
    requestWithTimeout: options => {
        if(options.repeatTime){
            const index = store.state.network.activeActions.findIndex(action => action.name === options.action);
            if(index === -1){
                // Return if the request was already removed from activeActions
                return;
            }
            let action = store.state.network.activeActions[index];
            const repeatTimeout = setTimeout(() => {
                networkClient.request(options);
            }, options.repeatTime);

            action = Object.assign({}, action, {repeatTimeout});
            action.timeExecuted = action.timeExecuted + 1;
            store.commit(`network/${mutations.UPDATE_ACTIVE_ACTION}`, {index, action});
        }else{
            store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, options.action);
        }
    },
    clearRequest: actionName => {
        const activeRequest = store.state.network.activeActions.find(action => action.name === actionName);
        if(activeRequest){
            clearTimeout(activeRequest.repeatTimeout);
        }
        store.commit(`network/${mutations.REMOVE_ACTIVE_ACTION}`, actionName);
    }
};

export default networkClient;