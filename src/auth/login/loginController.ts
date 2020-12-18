import {
    Body,
    Controller,
    Post,
    Route,
} from "tsoa";

import {LoginService, LoginUserParams, LoggedUser} from "./loginService";

@Route("auth/login")
export class LoginController extends Controller {
    @Post()
    public async login(
        @Body() requestBody: LoginUserParams
    ): Promise<LoggedUser | null> {
        return new LoginService().login(requestBody);
    }
}
