export default {
    getFieldError: state => {
        return (actionName, key) => {
            const matched = state.responseErrors.find(error => {
                return error.name === actionName
            });
            if (matched && matched.error.details) {
                const fieldError = matched.error.details[`requestBody.${key}`];
                if(fieldError){
                    return fieldError;
                }
            }
            return null;
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
