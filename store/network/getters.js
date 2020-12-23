export default {
    getFieldError: state => {
        return (actionName, key) => {
            const matched = state.responseErrors.find(error => {
                return error.name === actionName
            });
            if (matched && matched.error.details) {
                const fieldError = matched.error.details[`requestBody.${key}`];
                if(fieldError){
                    return fieldError.message;
                }
            }
            return null;
        };
    },
    getActiveAction: state => {
        return actionName => {
            const activeAction = state.activeActions.find(action => {
                return action.name === actionName
            });
            if(activeAction){
                return activeAction
            }
            return null;
        }
    },
    getActiveActions: state =>
        state.activeActions,
};
