'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const NavBar = () => {
  const router = useRouter()

  const handleLogout = () => {
    console.log('logout')
    signOut()
    router.push('/')
  }

  return (
    <nav className="bg-gray-800 text-white w-full p-3 flex justify-between items-center rounded-b-md">
      <Image src="images/logo.svg" alt="Logo" width={40} height={40} />
      <span className="text-xl">Dashboard</span>
      <LogOut className="cursor-pointer" size={24} onClick={handleLogout} />
    </nav>
  )
}

export default NavBar
