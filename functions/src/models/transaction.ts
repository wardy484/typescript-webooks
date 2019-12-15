export default class Transaction {
  constructor(
    public user_id: string,
    public type: string,
    public transaction_id: string,
    public amount: number
  ) {}
}
