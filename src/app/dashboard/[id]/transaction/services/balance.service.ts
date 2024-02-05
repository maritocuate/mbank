export const getBalance = async (id: string) => {
  const url = `/api/accounts/${id}/balance`

  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}
