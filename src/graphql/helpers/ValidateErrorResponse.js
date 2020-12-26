export function generateError(fieldErrors, field, value, message = 'invalid') {
    fieldErrors[`requestBody.${field}`] = {
        message: `${field}_${message}`,
        value: value,
    };
}
