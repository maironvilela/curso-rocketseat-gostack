import { uuid } from 'uuidv4';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < value) {
        throw new Error('Saldo Insuficiente');
      }
    }
    const transaction = this.transactionsRepository.create({
      id: uuid(),
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
