'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { buttonVariants } from '@/components/ui/button'
import { DownloadCloud, UploadCloud } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import Popup from '@/components/ui/popup'

const NavBar = () => {
  const router = useRouter()

  const handleDebit = () => {
    console.log('handleDebit')
  }

  const handleWithdrawal = () => {
    console.log('handleWithdrawal')
  }

  return (
    <nav className="bg-gray-800 text-white w-full p-3 flex justify-between items-center rounded-b-md">
      <Image src="images/logo.svg" alt="Logo" width={40} height={40} />
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
