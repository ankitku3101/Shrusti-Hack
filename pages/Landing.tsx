"use client"; // Ensure that this component is rendered on the client-side

import Image from 'next/image';

export default function Home() {
  // Handling the Explore Insights button click using window.location.href
  const handleReviewForm = () => {
    window.location.href = "/add-review"; // Redirect to the form page
  };

  // Handling the Sign In button click using window.location.href
  const handleSignIn = () => {
    window.location.href = "auth/signin"; // Redirect to the sign-in page
  };

  return (
    <div className="bg-gradient-to-br from-teal-500 via-purple-500 to-indigo-600 text-white min-h-screen">
      {/* Header Section */}
      <header className="relative py-24 px-6 text-center">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-teal-500 to-indigo-600 opacity-50 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-white mb-6">
            Transform your School Data into Insights 🚀
          </h1>
          <p className="text-lg text-white font-light mb-6">
            Empower schools with real-time dashboards, actionable insights, and enhanced decision-making.
          </p>
          <div className="flex justify-center gap-6">
            {/* Explore Insights Button */}
            <button 
              onClick={handleReviewForm} 
              className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
              Review Form
            </button>
            {/* Sign In Button - Placed on the side */}
            <button 
              onClick={handleSignIn} 
              className="bg-transparent text-white border-2 border-white py-2 px-6 rounded-full hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="py-16 bg-gradient-to-r from-orange-200 to-yellow-200 text-gray-900">
        <h2 className="text-center text-3xl font-bold mb-8">Key Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-teal-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-teal-900">Real-Time Dashboards</h3>
            <p>
              Monitor school performance metrics and satisfaction levels in real-time with dynamic visualizations.
            </p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-900">Advanced Analytics</h3>
            <p>
              Leverage scripting tools for in-depth analysis of performance and satisfaction data.
            </p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-900">Survey Integration</h3>
            <p>
              Collect feedback with Batoi Insight surveys and turn it into actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* What They Say Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50 text-gray-800">
        <h2 className="text-center text-3xl font-bold mb-8">What They Say</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-teal-100 p-6 rounded-lg shadow-lg">
            <p>
              "This platform revolutionized the way we analyze student satisfaction and school performance!"
            </p>
            <p className="mt-4 font-bold">- Principal, XYZ School</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
            <p>
              "Real-time dashboards helped us focus on critical areas and improve overall infrastructure."
            </p>
            <p className="mt-4 font-bold">- Admin, ABC School</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-8 bg-gray-900 text-white">
        <p className="text-sm font-light">&copy; 2025 School Insights Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
