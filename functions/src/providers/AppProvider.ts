import { container } from "tsyringe";
import * as functions from "firebase-functions";

import TransactionRepository from "../repositories/transactionRepository";
import admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const database = admin.firestore();
const authentication = admin.auth();

container.register<admin.firestore.Firestore>(admin.firestore.Firestore, {
  useValue: database
});

container.register<admin.auth.Auth>("auth", {
  useValue: authentication
});

container.register<TransactionRepository>(TransactionRepository, {
  useClass: TransactionRepository
});

export default container;
