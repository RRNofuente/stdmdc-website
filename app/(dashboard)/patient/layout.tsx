// app/(dashboard)/patient/layout.tsx
import { getAuthToken, getUserFromToken } from '@/lib/auth/auth-utils'
import { redirect } from 'next/navigation'

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = await getAuthToken()
  if (!token) redirect('/login')

  const user = await getUserFromToken(token)
  if (user?.role !== 'patient') redirect('/login')

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <nav className="space-y-2">
          <h2 className="text-xl font-bold">Patient Dashboard</h2>
          <a href="/dashboard/patient" className="block hover:bg-gray-200 p-2 rounded">Dashboard</a>
          <a href="/dashboard/patient/appointments" className="block hover:bg-gray-200 p-2 rounded">Appointments</a>
          <a href="/dashboard/patient/profile" className="block hover:bg-gray-200 p-2 rounded">Profile</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}