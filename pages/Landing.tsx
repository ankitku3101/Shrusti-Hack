import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-teal-500 via-purple-500 to-indigo-600 text-white min-h-screen">
      
      <header className="text-center py-16">
        <h1 className="text-5xl font-extrabold mb-4">
          Transform your School Data into Insights 🚀
        </h1>
        <p className="text-lg mb-6 font-light">
          Empower schools with real-time dashboards, actionable insights, and enhanced decision-making.
        </p>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full shadow-lg">
          Explore Insights
        </button>
      </header>

      
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

    
      <section className="py-16 bg-gradient-to-r from-blue-200 to-indigo-300 text-gray-900">
        <h2 className="text-center text-3xl font-bold mb-8">Live Dashboard Preview</h2>
        <div className="max-w-4xl mx-auto">
          <Image
            src="/dashboard-preview.png" 
            alt="Dashboard Preview"
            width={800}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>


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


      <footer className="text-center py-8 bg-gray-900 text-white">
        <p className="text-sm font-light">&copy; 2025 School Insights Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
