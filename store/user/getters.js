export default {
    getResponseError: state => {
        return name => {
            const error = state.responseErrors.filter(error => {
                return error.name === name
            });
            if (error.length) {
                if(error[0].error && error[0].error.message){
                    return [error[0].error.message];
                }
                return error[0].error
            }
            return {};
        };
    },
    getActiveAction: state => {
        return actionName => {
            const actionIndex = state.activeActions.findIndex(action => {
                return action.name === actionName
            });
            if(actionIndex !== -1){
                return state.activeActions[actionIndex]
            }
            return null;
        }
    },
    getActiveActions: state =>
        state.activeActions,
};