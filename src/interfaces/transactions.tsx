enum TransactionType {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
}

export interface Transaction {
  accounId: string
  type: TransactionType
  amount: number
}
