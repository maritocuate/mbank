import { Dollar } from '@/interfaces'

export const getDollar = async (): Promise<Dollar> => {
  const url = 'https://api.bluelytics.com.ar/v2/latest'

  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}
