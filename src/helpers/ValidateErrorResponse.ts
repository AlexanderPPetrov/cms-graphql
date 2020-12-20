import {FieldErrors} from "tsoa";

export interface ValidateErrorResponse {
    message: "validation_error";
    details: FieldErrors;
}

export function generateError(fieldErrors: FieldErrors, field: string, value: string, message: string = 'invalid') {
    fieldErrors[`requestBody.${field}`] = {
        message: `${field}_${message}`,
        value: value,
    };
}
