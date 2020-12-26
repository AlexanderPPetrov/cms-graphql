import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {

    constructor(errors){
        super('validation_error');
        // {
        //     "message": "validation_error",
        //     "details": {
        //     "requestBody.email": {
        //         "message": "email_does_not_exist",
        //             "value": "apetroc@abv.bg"
        //     }
        // }
        // }


        this.validationErrors = {
            message: "validation_error",
            details: errors
        };
    }

}

export default ValidationError;
