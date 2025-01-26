"use client"


import React from 'react'

import { ClipboardList, MessageCircle, BarChart3, Users } from "lucide-react"
import { useRouter } from 'next/navigation';

const features = [
  {
    title: "Comprehensive Surveys",
    description: "Gather in-depth data on school infrastructure, teaching quality, and resources.",
    icon: ClipboardList,
  },
  {
    title: "Student & Parent Feedback",
    description: "Collect valuable insights directly from those most impacted by the education system.",
    icon: MessageCircle,
  },
  {
    title: "Data-Driven Decisions",
    description: "Analyze trends and patterns to make informed improvements in education.",
    icon: BarChart3,
  },
  {
    title: "Community Engagement",
    description: "Involve local communities in the process of enhancing rural education.",
    icon: Users,
  },
]

function Landing() {

  const router = useRouter();
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${'/landing.jpg'})`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
        }}
        className="bg-center h-screen w-full flex flex-col items-center justify-center bg-[#140932] antialiased bg-grid-white/[0.02] relative overflow-hidden"
      >
        <h1 className='text-center text-6xl text-white font-semibold p-2'>
          Empowering Rural Education
        </h1>
        <p className='text-center tracking-wider text-xl text-white p-4'>
          Analyze, Improve, and Transform Schools in Rural India
        </p>
        <div className="flex gap-4 p-6">
          <button 
            onClick={() => {
              router.push("/auth/signin");
            }}
            className="w-64 px-8 py-2 rounded-md bg-blue-600 text-white font-bold transition duration-200 hover:bg-blue-300 hover:text-black border-2 border-transparent hover:border-blue-500">
            Sign In (For Schools)
          </button>
          <button
            onClick={() => {
              router.push("/add-review");
            }} 
            className="w-64 px-8 py-2 rounded-md bg-blue-600 text-white font-bold transition duration-200 hover:bg-blue-300 hover:text-black border-2 border-transparent hover:border-blue-500">
            Submit Review
          </button>
          <button 
            onClick={() => {
              router.push("/satisfaction");
            }}
            className="w-64 px-8 py-2 rounded-md bg-blue-600 text-white font-bold transition duration-200 hover:bg-blue-300 hover:text-black border-2 border-transparent hover:border-blue-500">
            Submit School Feedback
          </button>
        </div>
      </div>
      <div className='bg-blue-50/20'>
        <section className="p-12 text-gray-900">
          <h2 className="text-center text-5xl font-bold mb-8">What We Do ?</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-teal-100 p-16 rounded-lg shadow-lg ">
              <h3 className="text-xl font-semibold mb-4 text-teal-900 ">Real-Time Dashboards</h3>
              <p>
                Monitor school performance metrics and satisfaction levels in real-time with dynamic visualizations.
              </p>
            </div>
            <div className="bg-indigo-100 p-16 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-indigo-900">Advanced Analytics</h3>
              <p>
                Leverage scripting tools for in-depth analysis of performance and satisfaction data.
              </p>
            </div>
            <div className="bg-purple-100 p-16 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-900">Survey Integration</h3>
              <p>
                Collect feedback with Batoi Insight surveys and turn it into actionable insights.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className='h-screen bg-blue-100 p-16'>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Why Surveys and Feedback Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-16 rounded-lg shadow-md">
                <div className='flex items-center gap-6'>
                  <feature.icon className="h-12 w-12 mb-4 text-blue-600 " />
                  <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-center py-4 bg-blue-600 text-white">
         <p className="text-sm font-light">&copy; 2025 School Insights Platform. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default Landing