import * as mongoose from "mongoose";

interface TokenBlackList {
    _id: string;
    token: string;
}

interface TokenBlackListDocument extends TokenBlackList, mongoose.Document {
    _id: string;
}

const TokenBlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
});

const TokenBlackListModel = mongoose.model<TokenBlackListDocument>('TokenBlackList', TokenBlackListSchema);

export { TokenBlackListModel, TokenBlackList }
