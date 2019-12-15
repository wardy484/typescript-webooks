import * as express from "express";

import TransactionsHandler from "../handlers/transactionsHandlers";
import { container } from "tsyringe";

const router = express.Router();

const transactionsHandler = container.resolve(TransactionsHandler);

router.get("/", (req, res) => transactionsHandler.get(req, res));

router.post("/", (req, res) => transactionsHandler.post(req, res));

export const TransactionRouter = router;
