import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {

    constructor(errors){
        super('validation_error');
        this.validationErrors = {
            message: "validation_error",
            details: errors
        };
    }

}

export default ValidationError;
