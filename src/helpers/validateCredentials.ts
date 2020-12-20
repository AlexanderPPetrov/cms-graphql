import validator from "validator";
import {FieldErrors, ValidateError} from 'tsoa';
import {generateError} from "./ValidateErrorResponse";


export default function (email: string, password: string): FieldErrors {
    let fieldErrors: FieldErrors = {};
    if (!validator.isEmail(email)) {
        generateError(fieldErrors, 'email', email);
    }
    if (!validator.isLength(password, {min: 6, max: 20})) {
        generateError(fieldErrors, 'password', password);
    }
    if (Object.keys(fieldErrors).length) {
        throw new ValidateError(fieldErrors, 'validation_error');
    }
    return fieldErrors;
}
