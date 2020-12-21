import {UserModel, User} from "../../users/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ValidateError, FieldErrors} from "tsoa";

import validateCredentials from "../../helpers/validateCredentials";
import {generateError} from "../../helpers/ValidateErrorResponse";

export type LoginUserParams = Pick<User, "email" | "password">;
export type LoggedUser = Omit<User, "password"> & { token: string };

export class LoginService {
    public async login(loginUserParams: LoginUserParams): Promise<LoggedUser | null> {

        validateCredentials(loginUserParams.email, loginUserParams.password);

        const user = await UserModel.findOne({
            email: loginUserParams.email,
        });

        let fieldErrors: FieldErrors = {};
        if (!user) {
            generateError(fieldErrors, 'email', loginUserParams.email, 'does_not_exist');
            throw new ValidateError(fieldErrors, 'validation_error');
        }

        const passwordMatch = await bcrypt.compare(loginUserParams.password, user.password);
        if (!passwordMatch) {
            generateError(fieldErrors, 'password', loginUserParams.password, 'incorrect');
            throw new ValidateError(fieldErrors, 'validation_error');
        }
        const payload = {
            user: {
                _id: user._id,
                role: user.role,
            }
        };
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            {
                expiresIn: '1d'
            });

        const userData: LoggedUser = {
            _id: user._id,
            token,
            createdAt: user.createdAt,
            email: user.email,
            firstName: user.firstName,
            lastLogin: user.lastLogin,
            lastName: user.lastName,
            role: user.role,
        };

        return userData;
    }

}
