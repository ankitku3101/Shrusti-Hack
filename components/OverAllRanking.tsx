"use client"
import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface OverallRanking {
  _id: string
  schoolname: string
  performanceRate: number
  satisfactionRate: number
  infrastructureRate: number
  overallRanking: number
}

export default function OverAllRanking() {
  const [rankings, setRankings] = useState<OverallRanking[]>([])

  useEffect(() => {
    async function fetchRankings() {
      const response = await fetch("/api/survey/analytics/overallranking/")
      const data = await response.json()
      setRankings(data.data)
    }
    fetchRankings()
  }, [])

  // Prepare chart data
  const chartData = {
    labels: rankings.map((school) => school.schoolname),
    datasets: [
      {
        label: "Performance Rate",
        data: rankings.map((school) => school.performanceRate),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Satisfaction Rate",
        data: rankings.map((school) => school.satisfactionRate),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Infrastructure Rate",
        data: rankings.map((school) => school.infrastructureRate),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Adjust chart size dynamically
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "School Rankings Analysis",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Schools",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ratings",
        },
        min: 0,
        max: 10, // Adjusted maximum to 10
      },
    },
  }

  return (
    <div style={{ margin: "2rem", padding: "2rem", backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ height: "500px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
