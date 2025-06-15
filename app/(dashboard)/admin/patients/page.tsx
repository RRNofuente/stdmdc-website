// app/(dashboard)/admin/patients/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth/auth-utils";
import Link from "next/link";

interface Patient {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  dateOfBirth: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  totalAppointments?: number;
  lastAppointment?: string | null;
}

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    async function fetchPatients() {
      const token = await getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/users?role=patient", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, [router]);

  const filteredPatients = patients.filter((patient) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      (patient.phone && patient.phone.includes(searchTerm))
    );
  });

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients Management</h1>
        <Link
          href="/admin/patients/new"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          + New Patient
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              className="border rounded-md py-2 px-4 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {currentPatients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No patients found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Date of Birth</th>
                    <th className="px-4 py-2 text-left">Last Appointment</th>
                    <th className="px-4 py-2 text-left">Total Appointments</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPatients.map((patient) => (
                    <tr key={patient.id} className="border-b">
                      <td className="px-4 py-3 font-medium">
                        {patient.firstName} {patient.lastName}
                      </td>
                      <td className="px-4 py-3">{patient.email}</td>
                      <td className="px-4 py-3">{patient.phone || "N/A"}</td>
                      <td className="px-4 py-3">
                        {patient.dateOfBirth 
                          ? new Date(patient.dateOfBirth).toLocaleDateString() 
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {patient.lastAppointment 
                          ? new Date(patient.lastAppointment).toLocaleDateString() 
                          : "No appointments yet"}
                      </td>
                      <td className="px-4 py-3">{patient.totalAppointments || 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/patients/${patient.id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/patients/${patient.id}/edit`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/admin/appointments/new?patientId=${patient.id}`}
                            className="text-purple-500 hover:text-purple-700"
                          >
                            Schedule
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav>
                  <ul className="flex space-x-2">
                    <li>
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        &laquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <li key={number}>
                        <button
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === number
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}