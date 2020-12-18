import {UserModel, User} from "../../users/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type LoginUserParams = Pick<User, "email" | "password" >;
export type LoggedUser = Omit<User, "password" > & {token: string};

export class LoginService {
    public async login(loginUserParams: LoginUserParams): Promise<LoggedUser | null> {
        const user = await UserModel.findOne({
            email: loginUserParams.email,
        });
        if(!user){
            //TODO invalid email
            return null;
        }
        const passwordMatch = await bcrypt.compare(loginUserParams.password, user.password);
        if(!passwordMatch){
            //TODO invalid password
            return null
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
