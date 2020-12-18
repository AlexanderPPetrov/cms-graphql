import {TokenBlackListModel} from "./token";

export interface UserToken {
    token: string,
}

export class LogoutService {
    public async logout(userToken: UserToken): Promise<UserToken | null> {
        const blackListToken = await TokenBlackListModel.findOne({
            token: userToken.token
        });
        if (blackListToken) {
            //TODO token already blacklisted
            return null;
        }
        const newBlackListToken = new TokenBlackListModel(userToken);
        await newBlackListToken.save();
        return newBlackListToken;
    }
}
