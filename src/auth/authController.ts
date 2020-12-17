import {
    Body,
    Controller,
    Post,
    Route,
} from "tsoa";

import {LoginService, LoginUserParams, UserToken} from "./loginService";

@Route("auth/login")
export class AuthController extends Controller {
    @Post()
    public async login(
        @Body() requestBody: LoginUserParams
    ): Promise<UserToken | null> {
        return new LoginService().login(requestBody);
    }
}