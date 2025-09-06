import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CA</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">
            CashAdvance
          </span>
        </div>
        <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Your{" "}
            <span className="text-indigo-600">Cash Advance</span> Process
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            A modern web-based system for requesting, approving, and monitoring
            cash advances with transparency and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Get Started
            </Link>
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Feature Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} CashAdvance Monitoring System. Final
            Year Project.
          </p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: "📋",
    title: "Digital Requests",
    description:
      "Submit cash advance requests digitally with all necessary details.",
  },
  {
    icon: "✅",
    title: "Approval Workflow",
    description: "Multi-level approval process with clear accountability.",
  },
  {
    icon: "📊",
    title: "Real-time Tracking",
    description: "Monitor advances, balances, and retirements in real-time.",
  },
];

export default LandingPage;
