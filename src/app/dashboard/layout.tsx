'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavBar from './components/NavBar'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.status != 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])

  return (
    session?.status === 'authenticated' && (
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <NavBar />
        {children}
      </MaxWidthWrapper>
    )
  )
}
