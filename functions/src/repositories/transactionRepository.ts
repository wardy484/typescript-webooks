import * as admin from "firebase-admin";
import { singleton } from "tsyringe";

import Transaction from "../models/Transaction";

@singleton()
class TransactionRepository {
  constructor(private database: admin.firestore.Firestore) {}

  async findUserById(uid: string) {
    const result = await this.database
      .collection("transactions")
      .where("user_id", "==", uid)
      .limit(1)
      .get();

    return result.docs.map(result => {
      const { type, amount, user_id, transaction_id } = result.data();

      return new Transaction(user_id, type, transaction_id, amount);
    });
  }
}

export default TransactionRepository;
