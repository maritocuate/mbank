'use client'

import { Button } from '@/components/ui/button'
import BalanceCard from './components/BalanceCard'
import { MinusCircle, PlusCircle } from 'lucide-react'
import useUserStore from '@/store/userStore'
import useTransactionStore from '@/store/transactionStore'
import MovementsCard from '@/components/dashboard/MovementsCard'
import { useRouter } from 'next/navigation'
import DollarCard from './components/DollarCard'
import { getAccount, getTransactions } from './services'
import TransactionsCard from './components/TransactionsCard'
import { useCallback, useEffect } from 'react'

interface DashboardPageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: DashboardPageProps) {
  const { id } = params
  const { user, setUser } = useUserStore()
  const { setTransactions, transactions } = useTransactionStore()
  const router = useRouter()

  const setAccount = useCallback(
    async (id: string) => {
      const account = await getAccount(id)
      setUser({
        id: account.id,
        name: account.name,
        email: account.email,
        balance: account.balance,
      })
    },
    [setUser]
  )

  const setTransactionsById = useCallback(
    async (id: string) => {
      const transactions = await getTransactions(id)
      setTransactions(transactions)
    },
    [setTransactions]
  )

  useEffect(() => {
    if (!user && id) {
      setAccount(id)
    }
    setTransactionsById(id)
  }, [user, id, setAccount, setTransactionsById])

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

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <TransactionsCard type="deposit" data={transactions} />
          <TransactionsCard type="withdrawal" data={transactions} />
        </div>
      </div>
    </>
  )
}
