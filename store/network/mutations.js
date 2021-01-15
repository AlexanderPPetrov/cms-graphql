import mutations from './mutation-types';

export default {
    [mutations.ADD_ACTIVE_ACTION](state, action) {
        state.activeActions.push(action)
    },
    [mutations.REMOVE_ACTIVE_ACTION](state, actionName) {
        const actionIndex = state.activeActions.findIndex(action => {
            return action.name === actionName
        });
        state.activeActions.splice(actionIndex, 1);
    },
    [mutations.UPDATE_ACTIVE_ACTION](state, {index, action}) {
        state.activeActions.splice(index, 1, action);
    },
    [mutations.ADD_RESPONSE_ERROR](state, responseError) {
        state.responseErrors.push(responseError);
    },
    [mutations.REMOVE_RESPONSE_ERROR](state, responseErrorName) {
        const errorIndex = state.responseErrors.findIndex(error => error.name === responseErrorName);
        state.responseErrors.splice(errorIndex, 1);
    },
    [mutations.UPDATE_RESPONSE_ERROR](state, {index, error}) {
        state.responseErrors.splice(index, 1, error);
    },
    [mutations.SET_NETWORK_ERRORS](state, value) {
        state.networkErrors = value;
    },
};
