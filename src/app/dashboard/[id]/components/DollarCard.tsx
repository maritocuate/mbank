import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import { getDollar } from '../services'

async function fetchDollar() {
  return await getDollar()
}

export default function DollarCard() {
  const [dollarValue, setDollarValue] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDollar()
      setDollarValue(data.blue.value_avg)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Dollar Value</CardTitle>
        <DollarSign className="text-primary" size={18} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${dollarValue}</div>
        <p className="text-xs text-muted-foreground">-7% from last month</p>
      </CardContent>
    </Card>
  )
}
