import {UserModel, User} from "../../users/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ValidateError, FieldErrors} from "tsoa";

import validateCredentials from "../../helpers/validateCredentials";

export type LoginUserParams = Pick<User, "email" | "password">;
export type LoggedUser = Omit<User, "password"> & { token: string };

export class LoginService {
    public async login(loginUserParams: LoginUserParams): Promise<LoggedUser | null> {

        validateCredentials(loginUserParams.email, loginUserParams.password);

        const user = await UserModel.findOne({
            email: loginUserParams.email,
        });

        const fieldErrors: FieldErrors = {};
        if (!user) {
            fieldErrors.email = {
                message: 'email_does_not_exist',
                value: loginUserParams.email,
            };
            throw new ValidateError(fieldErrors, 'validation_error');
        }

        const passwordMatch = await bcrypt.compare(loginUserParams.password, user.password);
        if (!passwordMatch) {
            fieldErrors.password = {
                message: 'password_incorrect',
                value: loginUserParams.password,
            };
            throw new ValidateError(fieldErrors, 'validation_error');
        }
        const payload = {
            user: {
                _id: user._id,
                role: user.role,
            }
        };
        let userToken = {
            token: '',
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if (err) throw err;
                userToken.token = token!;
            }
        );
        return {...user, ...userToken};
    }

}
