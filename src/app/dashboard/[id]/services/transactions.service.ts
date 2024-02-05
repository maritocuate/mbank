import { Transaction } from '@/interfaces'

export const getTransactions = (id: string): Promise<Transaction[]> => {
  const url = '/api/transactionsById'

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then(res => res.json())
}
