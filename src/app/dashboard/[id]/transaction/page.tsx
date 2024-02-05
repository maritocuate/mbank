'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import useUserStore from '@/store/userStore'
import { saveTransaction, getBalance } from './services'
import { TransactionType } from '@/interfaces'

type TransactionPageProps = {
  params: {
    id: string
  }
}

export default function TransactionPage({ params }: TransactionPageProps) {
  const { id } = params
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const router = useRouter()
  const { updateBalance } = useUserStore()
  const [amount, setAmount] = useState<number>(0)

  if (type !== 'deposit' && type !== 'withdrawal') {
    router.push(`/dashboard/${id}`)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value))
  }

  const handleTransaction = async () => {
    const data = {
      accountId: id,
      amount: amount,
      type: type as TransactionType,
    }

    await saveTransaction(data)
      .catch(() =>
        toast({ title: 'Something went wrong!', variant: 'destructive' })
      )
      .then(() => router.push(`/dashboard/${id}`))
      .then(() => getBalance(id))
      .then(res => updateBalance(res.balance))
      .finally(() => toast({ title: 'Transaction Successful!' }))
  }

  return (
    <>
      <div className="flex justify-center space-y-4 p-8 pt-6">
        <Card className="w-full sm:w-1/2 md:w-1/3">
          <CardHeader>
            <CardTitle className="capitalize">{type}</CardTitle>
            <CardDescription>
              Select the amount to {type}. The maximum value is 10,000.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Input
              type="number"
              placeholder="Enter Amount"
              className="w-full"
              value={Number(amount).toString()}
              onChange={handleAmountChange}
              min={0}
              max={10000}
            />
            <Button className="w-full" onClick={handleTransaction}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
