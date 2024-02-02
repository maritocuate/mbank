'use client'

import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import useUserStore from '@/store/userStore'
import { UserNav } from './UserNav'

const NavBar = () => {
  const { user, updateBalance } = useUserStore()

  const handleDebit = (amount: number) => {
    const data = {
      accountId: user?.id,
      amount: amount,
      type: 'debit',
    }
    axios
      .post('/api/transactions', data)
      .catch(() => toast.error('Something went wrong!'))
      .then(() => fetchBalance())
      .finally(() => toast.success('Debit Successful!'))
  }

  const handleWithdrawal = (amount: number) => {
    const data = {
      accountId: String(user?.id),
      amount: amount,
      type: 'withdrawal',
    }
    axios
      .post('/api/transactions', data)
      .catch(() => toast.error('Something went wrong!'))
      .then(() => fetchBalance())
      .finally(() => toast.success('Withdrawal Successful!'))
  }

  const fetchBalance = () => {
    axios
      .get(`/api/accounts/${user?.id}/balance`)
      .then(res => updateBalance(res.data.balance))
  }

  return (
    <nav className="flex justify-between h-16 items-center px-6 border-b">
      <div className="flex gap-2">
        <div>
          <Image src="/images/logo.svg" alt="Logo" width={30} height={30} />
        </div>
        <span className="hidden md:flex items-center text-pretty font-bold">
          Eme Bank
        </span>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <div className="capitalize text-sm">Welcome {'username'}</div>
        <UserNav />
      </div>
    </nav>
  )
}

export default NavBar
