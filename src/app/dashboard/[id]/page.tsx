'use client'

import { Button } from '@/components/ui/button'
import BalanceCard from './components/BalanceCard'
import { MinusCircle, PlusCircle } from 'lucide-react'
import useUserStore from '@/store/userStore'
import useTransactionStore from '@/store/transactionStore'
import MovementsCard from '@/components/dashboard/MovementsCard'
import { useRouter } from 'next/navigation'
import DollarCard from '@/components/dashboard/DollarCard'

interface DashboardPageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: DashboardPageProps) {
  const { id } = params
  const { user, setUser } = useUserStore()
  const { setTransactions } = useTransactionStore()
  const router = useRouter()

  const fetchAccount = async () => {
    await fetch('/api/accountById', {
      method: 'POST',
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data =>
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          balance: data.balance,
        })
      )
  }

  const fetchTransactions = async () => {
    await fetch('/api/transactionsById', {
      method: 'POST',
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => setTransactions(data))
  }

  if (!user && id) {
    fetchAccount()
    fetchTransactions()
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex space-x-2">
            <Button
              onClick={() =>
                router.push(`/dashboard/${id}/transaction?type=deposit`)
              }
            >
              Deposit <PlusCircle className="ml-2" size={15} />
            </Button>
            <Button
              onClick={() =>
                router.push(`/dashboard/${id}/transaction?type=withdrawal`)
              }
            >
              Withdrawal <MinusCircle className="ml-2" size={15} />
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <BalanceCard />

          <MovementsCard />

          <DollarCard />
        </div>
      </div>
    </>
  )
}
