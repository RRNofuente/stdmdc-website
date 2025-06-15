// app/(dashboard)/patient/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, getUserFromToken } from "@/lib/auth/auth-utils";

// Define TypeScript interfaces for your data
interface User {
  id: number;
  email: string;
  phone: string | null;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: "admin" | "staff" | "patient";
  dateOfBirth: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
}

interface Service {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  date: string;
  startTime: string;
  service: Service;
  staff: Staff | null;
}

export default function PatientDashboard() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndAppointments() {
      try {
        // Get current user
        const token = await getAuthToken();
        if (!token) {
          router.push('/login');
          return;
        }
        
        const userData = await getUserFromToken(token);
        if (!userData || userData.role !== 'patient') {
          router.push('/login');
          return;
        }
        
        setUser(userData as User);
        
        // Fetch upcoming appointments
        const response = await fetch(`/api/appointments?patientId=${userData.id}&upcoming=true`);
        if (response.ok) {
          const data = await response.json();
          setUpcomingAppointments(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserAndAppointments();
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
      
      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.firstName} {user.lastName}</h2>
          <p className="text-gray-600">What would you like to do today?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div 
              className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer"
              onClick={() => router.push('/book')}
            >
              <h3 className="font-semibold text-blue-700">Book New Appointment</h3>
              <p className="text-sm text-gray-600">Schedule a visit with one of our healthcare providers</p>
            </div>
            
            <div 
              className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:bg-purple-100 cursor-pointer"
              onClick={() => router.push('/patient/appointments')}
            >
              <h3 className="font-semibold text-purple-700">Manage Appointments</h3>
              <p className="text-sm text-gray-600">View or reschedule your upcoming appointments</p>
            </div>
            
            <div 
              className="bg-green-50 p-4 rounded-lg border border-green-200 hover:bg-green-100 cursor-pointer"
              onClick={() => router.push('/patient/profile')}
            >
              <h3 className="font-semibold text-green-700">Update Profile</h3>
              <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{appointment.service.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.date).toLocaleDateString()} at {' '}
                      {new Date(appointment.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    {appointment.staff && (
                      <p className="text-sm text-gray-600">
                        with Dr. {appointment.staff.firstName} {appointment.staff.lastName}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      onClick={() => router.push(`/patient/appointments?id=${appointment.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>You have no upcoming appointments.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => router.push('/book')}
            >
              Book an Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}