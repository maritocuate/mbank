export interface Dollar {
  oficial: Currency
  blue: Currency
  oficial_euro: Currency
  blue_euro: Currency
  last_update: string
}

interface Currency {
  value_avg: number
  value_sell: number
  value_buy: number
}
