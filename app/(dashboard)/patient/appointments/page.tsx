// app/(dashboard)/patient/appointments/page.tsx
import { getAuthToken, getUserFromToken } from '@/lib/auth/auth-utils'
import { db } from '@/app/db/db'
import { appointments } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function PatientAppointments() {
  const token = await getAuthToken()
  if (!token) redirect('/login')
  
  const user = await getUserFromToken(token)
  if (!user || user.role !== 'patient') redirect('/login')

  const patientAppointments = await db.query.appointments.findMany({
    where: eq(appointments.patientId, user.id),
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
      <div className="space-y-4">
        {patientAppointments.map(appointment => (
          <div key={appointment.id} className="p-4 border rounded-lg">
            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Status: {appointment.status}</p>
            <p>Service: {appointment.serviceId}</p>
          </div>
        ))}
      </div>
    </div>
  )
}