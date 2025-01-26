"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SystemAdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    totalSchools: 0,
    activeAgents: 0,
    pendingIssues: 0,
    performanceData: [],
  });

  // Check if the user is an admin
  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (status === "unauthenticated") {
      signIn(); // Redirect to login if not authenticated
    } else if (session?.user?.role !== "admin") {
      router.push("/"); // Redirect to an unauthorized page
    }
  }, [session, status, router]);

  // Fetch data from MongoDB using an API endpoint
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/system-admin-dashboard");
  //       setDashboardData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching dashboard data: ", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const COLORS = ["#FF8A00", "#FF7043", "#FF5722", "#6200EA"];

  if (status === "loading") {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-8 shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-4">System Admin Dashboard</h1>
            <div className="flex gap-6">
              <button className="bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors">
                Notifications
              </button>
              <button 
                onClick={() => {
                  router.push("/admin/add-school");
                }}
                className="bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors">
                Add School
              </button>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Schools */}
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700">Total Schools</h2>
            <p className="text-2xl font-bold text-blue-600">{dashboardData.totalSchools}</p>
          </div>

          {/* Active Survey Agents */}
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700">Active Survey Agents</h2>
            <p className="text-2xl font-bold text-green-600">{dashboardData.activeAgents}</p>
          </div>

          {/* Pending Issues */}
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700">Pending Issues</h2>
            <p className="text-2xl font-bold text-red-600">{dashboardData.pendingIssues}</p>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">School Performance Overview</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={dashboardData.performanceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {dashboardData.performanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Export Report Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors">
            Export Report
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-4 mt-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SystemAdminDashboard;
