import "reflect-metadata";

// DI Container binds should be set up before importing
// anything that depends on it such as a router
require("./providers/AppProvider");

import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";

import { TransactionRouter } from "./routers/transactionRouter";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/transactions", TransactionRouter);

export const banking = functions.region("europe-west2").https.onRequest(app);
