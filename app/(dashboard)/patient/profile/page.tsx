// app/(dashboard)/patient/profile/page.tsx
import { getAuthToken, getUserFromToken } from '@/lib/auth/auth-utils'
import { db } from '@/app/db/db'
import { users } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import ProfileForm from '@/app/components/ProfileForm'
import { redirect } from 'next/navigation'

export default async function PatientProfile() {
  const token = await getAuthToken()
  if (!token) redirect('/login')
  
  const user = await getUserFromToken(token)
  if (!user || user.role !== 'patient') redirect('/login')

  const patientData = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <ProfileForm  />
    </div>
  )
}