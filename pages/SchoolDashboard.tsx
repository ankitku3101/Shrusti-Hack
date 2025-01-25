"use client"

import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Dashboard: React.FC = () => {
  // Sample data for charts
  const infrastructureData = {
    labels: ["Classrooms", "Libraries", "Labs", "Playgrounds"],
    datasets: [
      {
        label: "Infrastructure Quality",
        data: [80, 70, 90, 60],
        backgroundColor: "rgba(0, 183, 255, 0.6)",
        borderColor: "rgba(0, 183, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const academicsData = {
    labels: ["Math", "Science", "English", "History"],
    datasets: [
      {
        label: "Academic Performance",
        data: [85, 88, 80, 75],
        borderColor: "#00c3ff",
        backgroundColor: "rgba(0, 195, 255, 0.3)",
        fill: true,
      },
    ],
  };

  const studentPerformanceData = {
    labels: ["2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Average Scores",
        data: [72, 75, 78, 80],
        backgroundColor: "#00e5ff",
        borderColor: "#00e5ff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Rural Education Insights Dashboard</h1>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Infrastructure Section */}
        <section className="bg-white rounded-2xl shadow-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Infrastructure</h2>
          <Bar data={infrastructureData} />
        </section>

        {/* Academics Section */}
        <section className="bg-white rounded-2xl shadow-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Academics</h2>
          <Line data={academicsData} />
        </section>

        {/* Student Performance Section */}
        <section className="bg-white rounded-2xl shadow-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Student Performance</h2>
          <Bar data={studentPerformanceData} />
        </section>

        {/* Additional Section */}
        <section className="bg-white rounded-2xl shadow-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Additional Insights</h2>
          <p className="text-gray-600">Placeholder for future insights or metrics.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2025 Rural Education Insights. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
