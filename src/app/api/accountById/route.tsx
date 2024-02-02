import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { id } = body

  if (!id) return new NextResponse('Missing id', { status: 400 })

  const updatedAccount = await prisma.account.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      balance: true,
    },
  })

  return NextResponse.json(updatedAccount)
}
