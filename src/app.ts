import express, {Response as ExResponse, Request as ExRequest} from "express";
import bodyParser from "body-parser";
import {RegisterRoutes} from "../build/routes";
import swaggerUi from "swagger-ui-express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import consola from "consola";

dotenv.config();
export const app = express();

const db = process.env.MONGODB_URL!;
    mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => consola.success('Connected to MongoDB'))
    .catch(err => consola.error(err));

// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
        swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
});

RegisterRoutes(app);
