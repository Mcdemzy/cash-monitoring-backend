const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      name: "Pending Requests",
      value: 3,
      change: "+2",
      changeType: "positive",
    },
    {
      name: "Approved Requests",
      value: 12,
      change: "+4",
      changeType: "positive",
    },
    {
      name: "Rejected Requests",
      value: 2,
      change: "+0",
      changeType: "neutral",
    },
    {
      name: "Awaiting Retirement",
      value: 5,
      change: "-1",
      changeType: "negative",
    },
  ];

  const recentRequests = [
    {
      id: "CA-0452",
      purpose: "Conference Travel",
      amount: "$1,200.00",
      status: "Approved",
      date: "2023-07-15",
    },
    {
      id: "CA-0451",
      purpose: "Office Supplies",
      amount: "$350.00",
      status: "Pending",
      date: "2023-07-14",
    },
    {
      id: "CA-0450",
      purpose: "Client Meeting",
      amount: "$500.00",
      status: "Rejected",
      date: "2023-07-12",
    },
    {
      id: "CA-0449",
      purpose: "Team Lunch",
      amount: "$200.00",
      status: "Retired",
      date: "2023-07-10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Retired":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </dd>
              <div
                className={`mt-1 text-sm ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {stat.change} from last week
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent requests */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">
          Recent Cash Advances
        </h2>
        <div className="mt-4 shadow-sm overflow-hidden border-b border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Request ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Purpose
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.purpose}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        <div className="mt-4 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            New Cash Advance Request
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit Retirement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
