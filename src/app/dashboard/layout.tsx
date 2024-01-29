'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavBar from './components/NavBar'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/store/userStore'
import axios from 'axios'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = useSession()
  const router = useRouter()
  const { user, setUser } = useUserStore()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (session?.status === 'authenticated' && !user) {
          const response = await axios.post('/api/accountByEmail', {
            email: session?.data?.user?.email,
          })
          const { name, email, balance, id } = response.data
          setUser({ name, email, balance, id })
        }
      } catch (error) {
        console.error('Error al llamar al endpoint:', error)
      }
    }

    if (session?.status != 'authenticated') {
      router.push('/')
    } else {
      fetchUserData()
    }
  }, [session?.status, router, user, setUser, session?.data?.user?.email])

  return (
    session?.status === 'authenticated' && (
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <NavBar />
        {children}
      </MaxWidthWrapper>
    )
  )
}
