// app/(dashboard)/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth/auth-utils";
import Link from "next/link";

interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  upcomingAppointments: number;
  servicesOffered: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
    servicesOffered: 0,
  });
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const token = await getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Fetch dashboard stats
        const response = await fetch("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Patients" 
          value={stats.totalPatients} 
          link="/admin/patients"
          color="bg-blue-500" 
        />
        <DashboardCard 
          title="Total Appointments" 
          value={stats.totalAppointments} 
          link="/admin/appointments"
          color="bg-green-500" 
        />
        <DashboardCard 
          title="Upcoming Appointments" 
          value={stats.upcomingAppointments} 
          link="/admin/appointments"
          color="bg-purple-500" 
        />
        <DashboardCard 
          title="Services Offered" 
          value={stats.servicesOffered} 
          link="/admin/services"
          color="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivityPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
  link: string;
  color: string;
}

function DashboardCard({ title, value, link, color }: DashboardCardProps) {
  return (
    <Link href={link}>
      <div className={`${color} text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </Link>
  );
}

interface Activity {
  id: number;
  description: string;
  timestamp: string;
}

function RecentActivityPanel() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const token = await getAuthToken();
        const response = await fetch("/api/admin/activities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch activities");
        
        const data = await response.json();
        setActivities(data.slice(0, 5)); // Show only 5 most recent activities
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchActivities();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      {loading ? (
        <p>Loading activities...</p>
      ) : activities.length > 0 ? (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent activities</p>
      )}
      <Link href="/admin/activities" className="text-blue-500 mt-4 inline-block">
        View all activities
      </Link>
    </div>
  );
}

function QuickActionsPanel() {
  const actions = [
    { title: "Add New Patient", link: "/admin/patients/new", icon: "👤" },
    { title: "Schedule Appointment", link: "/admin/appointments/new", icon: "📅" },
    { title: "Add New Service", link: "/admin/services/new", icon: "🏥" },
    { title: "Export Reports", link: "/admin/reports", icon: "📊" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link 
            key={index} 
            href={action.link}
            className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors duration-300"
          >
            <span className="text-2xl mr-3">{action.icon}</span>
            <span>{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}