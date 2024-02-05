import { Account } from '@/interfaces'

export const getAccount = async (id: string): Promise<Account> => {
  const url = '/api/accountById'

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then(res => res.json())
}
