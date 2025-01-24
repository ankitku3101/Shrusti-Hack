import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white min-h-screen">
      {/* Hero Section */}
      <header className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">
          Transform School Data into Insights 🚀
        </h1>
        <p className="text-lg mb-6">
          Analyze performance, improve infrastructure, and enhance student satisfaction with real-time dashboards and insights.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full shadow-lg">
          Explore Insights
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white text-gray-800">
        <h2 className="text-center text-3xl font-bold mb-8">Key Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Real-Time Dashboards</h3>
            <p>
              Monitor school performance metrics and satisfaction levels in real-time with dynamic visualizations.
            </p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
            <p>
              Leverage scripting tools for in-depth analysis of performance and satisfaction data.
            </p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Survey Integration</h3>
            <p>
              Collect feedback with Batoi Insight surveys and turn it into actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-8">Live Dashboard Preview</h2>
        <div className="max-w-4xl mx-auto">
          <Image
            src="/dashboard-preview.png" // Replace with your dashboard image
            alt="Dashboard Preview"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white text-gray-800">
        <h2 className="text-center text-3xl font-bold mb-8">What They Say</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <p>
              "This platform revolutionized the way we analyze student satisfaction and school performance!"
            </p>
            <p className="mt-4 font-bold">- Principal, XYZ School</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <p>
              "Real-time dashboards helped us focus on critical areas and improve overall infrastructure."
            </p>
            <p className="mt-4 font-bold">- Admin, ABC School</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-gray-800 text-white">
        <p>&copy; 2025 School Insights Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
