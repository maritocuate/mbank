'use client'

import Image from 'next/image'
import { UserNav } from './UserNav'

const NavBar = () => {
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
        <div className="capitalize text-sm">Welcome</div>
        <UserNav />
      </div>
    </nav>
  )
}

export default NavBar
