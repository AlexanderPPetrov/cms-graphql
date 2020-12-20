import {UserModel, User} from "./user";
import bcrypt from 'bcrypt';
import {ValidateError, FieldErrors} from "tsoa";
import validateCredentials from "../helpers/validateCredentials";
import {generateError} from "../helpers/ValidateErrorResponse";

export type CreateUserParams = Omit<User, "_id">;
export type GetUsersParams = Omit<User, "password">;

export class UsersService {
    public async get(_id: string): Promise<GetUsersParams | null> {
        const user = await UserModel.findOne({_id});
        return user;
    }

    public async getAll(): Promise<GetUsersParams[]> {
        const users = await UserModel.find({});
        const allUsers = users.map(user => {
            return {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin,
                role: user.role,
            }
        });
        return allUsers;
    }

    public async create(userParams: CreateUserParams): Promise<User | null> {

        validateCredentials(userParams.email, userParams.password);

        const user = await UserModel.findOne({
            email: userParams.email
        });

        let fieldErrors: FieldErrors = {};

        if (user) {
            generateError(fieldErrors, 'email', userParams.email, 'exists');
            throw new ValidateError(fieldErrors, 'validation_error');
        }
        const newUser = new UserModel(userParams);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(userParams.password, salt);
        await newUser.save();

        return newUser;
    }

    public async update(_id: string, userParams: CreateUserParams): Promise<User | null> {
        const updatedUser = await UserModel.findOneAndUpdate({_id}, userParams, {new: true});
        return updatedUser;
    }

    public async remove(_id: string): Promise<void> {
        await UserModel.findByIdAndRemove(_id);
    }

}
