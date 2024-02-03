import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { id } = body

  if (!id) return new NextResponse('Missing id', { status: 400 })

  const transactions = await prisma.transaction.findMany({
    where: { accountId: id },
    select: {
      id: true,
      amount: true,
      type: true,
    },
  })

  if (!transactions) {
    throw new Error('Transactions not found!')
  }

  return NextResponse.json(transactions)
}
