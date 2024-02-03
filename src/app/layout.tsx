import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import AuthContext from './context/AuthContext'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MBank App',
  description: 'MBank next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-sans antialiased grainy',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContext>{children}</AuthContext>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
