import { Transaction } from '@/interfaces'

export const saveTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  const url = '/api/transactions'

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(transaction),
  }).then(res => res.json())
}
