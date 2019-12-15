import admin = require("firebase-admin");
import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";

import TransactionRepository from "../repositories/transactionRepository";
import { TransactionTypes } from "../starling/transactionTypes";

@injectable()
class TransactionsHandler {
  constructor(
    @inject("auth") private auth: admin.auth.Auth,
    private transactionRepository: TransactionRepository,
    private db: admin.firestore.Firestore
  ) {}

  async get(req: Request, res: Response) {
    const user = await this.auth.getUserByEmail("wardy484@gmail.com");

    const transactions = await this.transactionRepository.findUserById(
      user.uid
    );

    res.json(transactions).status(200);
  }

  async post(req: Request, res: Response) {
    const { accountHolderUid } = req.body;
    const { type, transactionUid, amount } = req.body.content;

    if (type === TransactionTypes.Card) {
      const users = await this.db
        .collection("users")
        .where("account_uid", "==", accountHolderUid)
        .limit(1)
        .get();

      const user = await this.auth.getUser(users.docs[0].get("user_id"));

      this.db
        .collection("transactions")
        .doc()
        .set({
          type: type,
          amount: amount,
          user_id: user.uid,
          transaction_id: transactionUid
        })
        .then(ref => res.json({ ref: ref }).status(201))
        .catch(e => res.json(e));
    }
  }
}

export default TransactionsHandler;
