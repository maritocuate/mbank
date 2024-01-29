import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accountId = params.id

  const balance = await prisma.account.findUnique({
    where: { id: accountId },
    select: { balance: true },
  })

  if (!balance) {
    return new NextResponse('Balance not found', { status: 404 })
  }

  return NextResponse.json(balance)
}
