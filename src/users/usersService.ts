import {UserModel, User} from "./user";
import bcrypt from 'bcrypt';
import validator from 'validator';
import {ValidateError, FieldErrors} from "tsoa";

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
        const fieldErrors: FieldErrors = {};

        if (!validator.isEmail(userParams.email)) {
            fieldErrors.email = {
                message: 'email_invalid',
                value: userParams.email,
            };
        }
        if (!validator.isLength(userParams.password, {min: 6})) {
            fieldErrors.password = {
                message: 'password_min_length',
                value: userParams.password,
            }
        }
        if (!validator.isLength(userParams.password, {max: 20})) {
            fieldErrors.password = {
                message: 'password_max_length',
                value: userParams.password,
            }
        }
        if (Object.keys(fieldErrors).length) {
            throw new ValidateError(fieldErrors, 'validation_error');
        }

        const user = await UserModel.findOne({
            email: userParams.email
        });
        if (user) {
            fieldErrors.email = {
                message: 'email_exists',
                value: userParams.email,
            };
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
