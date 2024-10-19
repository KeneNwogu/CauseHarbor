import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import router from "./router";
import upload from "./middlewares/multer";
import multer from "multer";
// import { H, Handlers } from '@highlight-run/node'
// import { highlightConfig } from './highlight'

// don't remove this, it streams the errors from the application to the error handler
import 'express-async-errors'
import { pinoLoggerMiddleware } from "./middlewares/logger";


declare global {
    namespace Express {
        interface Request {}
    }
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: any;
        }
    }
}

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(upload.none());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to db"));

app.use(pinoLoggerMiddleware);

app.use("/", router());

app.get("/health", (req: Request, res: Response) =>
    res.status(200).send("Good health").end()
);

// app.use(Handlers.middleware(highlightConfig));
// ERROR HANDLER MUST BE LAST!!!
app.use(errorHandler);

app.listen(port, () => {
    console.log("App listening on port " + port);
});
