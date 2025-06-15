// app/(dashboard)/admin/services/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth/auth-utils";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInactiveServices, setShowInactiveServices] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchServices() {
      const token = await getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [router]);

  const filteredServices = services
    .filter((service) => showInactiveServices || service.isActive)
    .filter((service) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        service.name.toLowerCase().includes(searchLower) ||
        (service.description && service.description.toLowerCase().includes(searchLower))
      );
    });

  async function handleToggleServiceStatus(serviceId: number, currentStatus: boolean) {
    try {
      const token = await getAuthToken();
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update service status");
      }

      // Update local state
      setServices(
        services.map((service) =>
          service.id === serviceId
            ? { ...service, isActive: !currentStatus }
            : service
        )
      );
    } catch (error) {
      console.error("Error updating service:", error);
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Link
          href="/admin/services/new"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          + New Service
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInactiveServices}
                onChange={() => setShowInactiveServices(!showInactiveServices)}
                className="rounded"
              />
              <span>Show inactive services</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              className="border rounded-md py-2 px-4 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No services matching your search" : "No services found"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b py-3 px-4 text-left">Name</th>
                  <th className="border-b py-3 px-4 text-left">Description</th>
                  <th className="border-b py-3 px-4 text-left">Duration</th>
                  <th className="border-b py-3 px-4 text-left">Price</th>
                  <th className="border-b py-3 px-4 text-left">Status</th>
                  <th className="border-b py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{service.name}</td>
                    <td className="py-3 px-4 max-w-xs truncate">
                      {service.description || "—"}
                    </td>
                    <td className="py-3 px-4">{service.duration} min</td>
                    <td className="py-3 px-4">
                      {service.price ? `$${service.price.toFixed(2)}` : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          service.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleToggleServiceStatus(service.id, service.isActive)}
                          className={`text-sm ${
                            service.isActive ? "text-red-500" : "text-green-500"
                          }`}
                        >
                          {service.isActive ? "Deactivate" : "Activate"}
                        </button>
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