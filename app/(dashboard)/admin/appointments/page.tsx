// app/(dashboard)/admin/appointments/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth/auth-utils";
import Link from "next/link";

interface User {
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
  patientId: number;
  serviceId: number;
  staffId: number | null;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  patient: User;
  service: Service;
  staff: User | null;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchAppointments() {
      const token = await getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [router]);

  const filteredAppointments = appointments
    .filter((appointment) => {
      if (filter === "all") return true;
      return appointment.status === filter;
    })
    .filter((appointment) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      const patientName = `${appointment.patient.firstName} ${appointment.patient.lastName}`.toLowerCase();
      return (
        patientName.includes(searchLower) ||
        appointment.service.name.toLowerCase().includes(searchLower) ||
        new Date(appointment.date).toLocaleDateString().includes(searchTerm)
      );
    });

  async function handleStatusChange(appointmentId: number, newStatus: string) {
    try {
      const token = await getAuthToken();
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment status");
      }

      // Update local state
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments Management</h1>
        <Link
          href="/admin/appointments/new"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          + New Appointment
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md ${
                filter === "pending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("confirmed")}
              className={`px-4 py-2 rounded-md ${
                filter === "confirmed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-md ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 rounded-md ${
                filter === "cancelled"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Cancelled
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search appointments..."
              className="border rounded-md py-2 px-4 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Patient</th>
                  <th className="px-4 py-2 text-left">Service</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Staff</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/patients/${appointment.patientId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {appointment.patient.firstName} {appointment.patient.lastName}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{appointment.service.name}</td>
                    <td className="px-4 py-3">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(appointment.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      {appointment.staff 
                        ? `${appointment.staff.firstName} ${appointment.staff.lastName}` 
                        : "Not assigned"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          appointment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : appointment.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : appointment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/appointments/${appointment.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          View
                        </Link>
                        {appointment.status === "pending" && (
                          <button
                            onClick={() => handleStatusChange(appointment.id, "confirmed")}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Confirm
                          </button>
                        )}
                        {(appointment.status === "pending" || appointment.status === "confirmed") && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appointment.id, "completed")}
                              className="text-green-500 hover:text-green-700"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, "cancelled")}
                              className="text-red-500 hover:text-red-700"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}