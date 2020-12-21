import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Path,
    Route,
    Response,
    SuccessResponse,
} from "tsoa";
import {User} from "./user";

import {ValidateErrorResponse} from '../helpers/ValidateErrorResponse';

import {UsersService, CreateUserParams, GetUsersParams} from "./usersService";


@Route("users")
export class UsersController extends Controller {
    @Get()
    public async getAllUsers(): Promise<GetUsersParams[] | null> {
        return new UsersService().getAll();
    }
    @Get("{id}")
    public async getUser(
        @Path() id: string,
    ): Promise<GetUsersParams | null> {
        return new UsersService().get(id);
    }

    @Response<ValidateErrorResponse>(422, "Validation failed")
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: CreateUserParams
    ): Promise<User | null> {
        this.setStatus(201); // set return status 201
        return new UsersService().create(requestBody);
    }

    @Put('/{id}')
    public async update(
        @Path() id: string,
        @Body() requestBody: CreateUserParams
    ): Promise<User | null> {
        return new UsersService().update(id, requestBody);
    }
    @Delete('/{id}')
    public async remove(id: string): Promise<void> {
        return new UsersService().remove(id);
    }
}

@Route("getCurrentUser")
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
