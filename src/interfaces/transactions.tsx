export enum TransactionType {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
}

export interface Transaction {
  accountId: string
  type: TransactionType
  amount: number
}
