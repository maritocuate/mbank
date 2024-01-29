'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { DownloadCloud, UploadCloud } from 'lucide-react'
import Popup from '@/components/ui/popup'
import axios from 'axios'
import toast from 'react-hot-toast'
import useUserStore from '@/store/userStore'

const NavBar = () => {
  const router = useRouter()
  const { user } = useUserStore()

  const handleDebit = (amount: number) => {
    const data = {
      accountId: user?.id,
      amount: amount,
      type: 'debit',
    }
    axios
      .post('/api/transactions', data)
      .catch(() => toast.error('Something went wrong!'))
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
      .finally(() => toast.success('Withdrawal Successful!'))
  }

  return (
    <nav className="bg-gray-800 text-white w-full p-3 flex justify-between items-center rounded-b-md">
      <Image src="images/logo.svg" alt="Logo" width={40} height={40} priority />
      <div className="flex justify-center items-center">
        <Popup
          title="Debit"
          description="Select the amount to debit"
          icon={<UploadCloud size={24} />}
          submitHandler={handleDebit}
        />

        <Popup
          title="Withdrawal"
          description="Select the amount to withdraw"
          icon={<DownloadCloud size={24} />}
          submitHandler={handleWithdrawal}
        />

        <LogOut
          className="cursor-pointer"
          size={24}
          onClick={() => signOut()}
        />
      </div>
    </nav>
  )
}

export default NavBar
