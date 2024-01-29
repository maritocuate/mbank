'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { buttonVariants } from '@/components/ui/button'
import { DownloadCloud, UploadCloud } from 'lucide-react'

const NavBar = () => {
  const router = useRouter()

  return (
    <nav className="bg-gray-800 text-white w-full p-3 flex justify-between items-center rounded-b-md">
      <Image src="images/logo.svg" alt="Logo" width={40} height={40} />
      <div className="flex justify-center items-center">
        <Link
          className={buttonVariants({
            size: 'sm',
            className: 'mr-5',
          })}
          href="/dashboard"
          target="_blank"
        >
          <UploadCloud size={20} />
        </Link>
        <Link
          className={buttonVariants({
            size: 'sm',
            className: 'mr-5',
          })}
          href="/dashboard"
          target="_blank"
        >
          <DownloadCloud size={20} />
        </Link>
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
