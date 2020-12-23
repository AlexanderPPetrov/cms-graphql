import {
    Controller,
    Get,
    Route,

} from "tsoa";

import {GetUsersParams} from "../../users/usersService";
//TODO write proper get auth user
@Route("auth/user")
export class TestData extends Controller {
    @Get()
    public async getCurrentUser(
    ): Promise<GetUsersParams | null> {
        return {
            _id: '123123123123',
            createdAt: 1608544082900,
            email: 'apetrovdev@gmail.com',
            firstName: 'Aleksandar',
            lastName: 'Petrov',
            lastLogin: 1608544082900,
            role: 'admin',
        };
    }
}
