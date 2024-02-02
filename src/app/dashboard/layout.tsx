'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavBar from './components/NavBar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
      <NavBar />
      {children}
    </MaxWidthWrapper>
  )
}
