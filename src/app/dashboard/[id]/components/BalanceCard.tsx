'use client'

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { CircleDollarSign } from 'lucide-react'
import useUserStore from '@/store/userStore'

export default function BalanceCard() {
  const { user } = useUserStore()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        <CircleDollarSign className="text-primary" size={18} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${user?.balance}</div>
        <p className="text-xs text-muted-foreground">+3.1% from last month</p>
      </CardContent>
    </Card>
  )
}
