import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      balance: number
    } & DefaultSession['user']
  }
  interface User {
    id: string
    name: string
    balance: number
  }
}
