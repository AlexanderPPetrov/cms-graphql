import validator from "validator";
import {FieldErrors, ValidateError} from 'tsoa';


export default function (email: string, password: string): FieldErrors {
    const fieldErrors: FieldErrors = {};
    if (!validator.isEmail(email)) {
        fieldErrors.email = {
            message: 'email_invalid',
            value: email,
        };
    }
    if (!validator.isLength(password, {min: 6, max: 20})) {
        fieldErrors.password = {
            message: 'password_invalid',
            value: password,
        }
    }
    if (Object.keys(fieldErrors).length) {
        throw new ValidateError(fieldErrors, 'validation_error');
    }
    return fieldErrors;
}
