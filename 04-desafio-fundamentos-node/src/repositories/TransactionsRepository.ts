import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getIncomeOutcome('income');
    const outcome = this.getIncomeOutcome('outcome');

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }

  public getIncomeOutcome(value: string): number {
    const result = this.transactions.reduce((prevVal, transaction) => {
      return transaction.type === value ? prevVal + transaction.value : prevVal;
    }, 0);

    return result;
  }
}

export default TransactionsRepository;
