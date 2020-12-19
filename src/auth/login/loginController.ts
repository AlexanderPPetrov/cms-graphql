import {
    Body,
    Controller,
    Post,
    Route,
    Response,
} from "tsoa";

import {LoginService, LoginUserParams, LoggedUser} from "./loginService";
import {ValidateErrorResponse} from "../../helpers/ValidateErrorResponse";

@Route("auth/login")
export class LoginController extends Controller {
    @Response<ValidateErrorResponse>(422, "Validation failed")
    @Post()
    public async login(
        @Body() requestBody: LoginUserParams
    ): Promise<LoggedUser | null> {
        return new LoginService().login(requestBody);
    }
}
