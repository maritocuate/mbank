import bcrypt from 'bcrypt'

import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  console.log(body)
  if (!name || !email || !password)
    return new NextResponse('Missing fields', { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.account.create({
    data: {
      name,
      balance: 0,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
