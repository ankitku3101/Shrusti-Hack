"use client"
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const SystemAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSchools: 0,
    activeAgents: 0,
    pendingIssues: 0,
    performanceData: []
  });

  useEffect(() => {
    // Fetch data from MongoDB using an API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/system-admin-dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      }
    };
    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Admin Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          Notifications
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Schools</h2>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.totalSchools}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Active Survey Agents</h2>
          <p className="text-2xl font-bold text-green-600">{dashboardData.activeAgents}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Pending Issues</h2>
          <p className="text-2xl font-bold text-red-600">{dashboardData.pendingIssues}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">School Performance Overview</h2>
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

      <div className="flex justify-end mt-6">
        <button className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
