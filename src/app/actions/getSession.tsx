import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/AuthOptions'

export default async function getSession() {
  return await getServerSession(authOptions)
}
