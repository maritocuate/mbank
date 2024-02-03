import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { accountId, amount, type } = body

  if (!accountId || !amount || !type)
    return new NextResponse('Missing fields', { status: 400 })

  const updatedAccount = await prisma.account.update({
    where: { id: accountId },
    data: {
      balance: {
        [type === 'withdrawal' ? 'decrement' : 'increment']: amount,
      },
    },
  })

  const newTransaction = await prisma.transaction.create({
    data: {
      accountId,
      amount,
      type,
    },
  })

  return NextResponse.json(updatedAccount && newTransaction)
}
