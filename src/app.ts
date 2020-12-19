import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import bodyParser from "body-parser";
import {RegisterRoutes} from "../build/routes";
import swaggerUi from "swagger-ui-express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import consola from "consola";
import {ValidateError} from "tsoa";

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

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        consola.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "validation_error",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        consola.error("Internal Server Error", err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});
