import express from "express";
const { graphqlHTTP } = require('express-graphql');
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
import schema from "./graphql/GraphQLSchema";
import dotenv from "dotenv";
import consola from "consola";
import jwt from "express-jwt";

dotenv.config();
export const app = express();

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['RS256'],
    credentialsRequired: false,
});

const db = process.env.MONGODB_URL;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: true,
        useCreateIndex: true,
    })
    .then(() => consola.success('Connected to MongoDB'))
    .catch(err => consola.error(err));

app.use(
    "/graphql",
    cors(),
    // Incase you need to allow cors
    // cors({
    //     credentials: true,
    //     origin: 'http://localhost:3001'
    // }),
    bodyParser.json(),
    auth,
    graphqlHTTP(req => {
        return {
            schema,
            context: {
                user: req.user
            },
            graphiql: true,
            customFormatErrorFn: error => {
                if (error.originalError instanceof ValidationError) {
                    return {
                        message: error.mesage,
                        validationErrors: error.originalError && error.originalError.validationErrors,
                        // locations: error.locations,
                        // path: error.path
                    }
                }
                return error
            }
        }
    })
);
