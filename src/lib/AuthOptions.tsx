import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/lib/prismadb'

const getUserById = async (id: string) => {
  try {
    const user = await prisma.account.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}

const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { id: userId },
    })
    return account
  } catch {
    return null
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.account.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          return null
        } else {
          return user as any
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.id = token.id as string
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.id = existingUser.id

      return token
    },
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
