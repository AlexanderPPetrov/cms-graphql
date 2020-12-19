import {FieldErrors} from "tsoa";

export interface ValidateErrorResponse {
    message: "validation_error";
    details: FieldErrors;
}
