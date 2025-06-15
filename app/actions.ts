// app/actions/patient.ts
'use server'

import { getAuthToken, getUserFromToken } from '@/lib/auth/auth-utils'
import { db } from '@/app/db/db'
import { users } from '@/app/db/schema'
import { eq } from 'drizzle-orm'

export async function updatePatientProfile(data: any) {
  const token = await getAuthToken()
  if (!token) throw new Error('Unauthorized')
  
  const user = await getUserFromToken(token)
  if (!user || user.role !== 'patient') throw new Error('Unauthorized')

  await db.update(users)
    .set(data)
    .where(eq(users.id, user.id))
}