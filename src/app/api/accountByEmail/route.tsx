import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { email } = body

  if (!email) return new NextResponse('Missing email', { status: 400 })

  const updatedAccount = await prisma.account.findUnique({
    where: { email: email },
  })

  return NextResponse.json(updatedAccount)
}
