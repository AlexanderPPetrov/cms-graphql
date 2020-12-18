import {
    Body,
    Controller,
    Post,
    Route,
} from "tsoa";

import {LogoutService, UserToken} from "./logoutService";

@Route("auth/logout")
export class LogoutController extends Controller {
    @Post()
    public async logout(
        @Body() requestBody: UserToken
    ): Promise<UserToken | null> {
        return new LogoutService().logout(requestBody);
    }
}
