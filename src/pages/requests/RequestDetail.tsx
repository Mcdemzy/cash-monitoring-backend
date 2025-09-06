// pages/requests/RequestDetail.tsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

// Mock data for request details
const mockRequestDetails = {
  "CA-0452": {
    id: "CA-0452",
    employee: "John Doe",
    department: "Marketing",
    purpose: "Conference Travel",
    amount: "$1,200.00",
    date: "2023-07-15",
    submittedDate: "2023-07-10",
    approvedDate: "2023-07-12",
    approvedBy: "Jane Smith (Finance)",
    status: "Approved",
    description:
      "Attending Digital Marketing Summit in San Francisco. Registration fee, travel, and accommodation.",
    documents: ["conference_info.pdf", "travel_quotes.pdf"],
    expenses: [
      {
        category: "Registration",
        amount: "$400.00",
        description: "Conference ticket",
      },
      {
        category: "Flight",
        amount: "$450.00",
        description: "Round trip flight to SFO",
      },
      {
        category: "Accommodation",
        amount: "$350.00",
        description: "3 nights hotel stay",
      },
    ],
  },
  "CA-0451": {
    id: "CA-0451",
    employee: "John Doe",
    department: "Marketing",
    purpose: "Office Supplies",
    amount: "$350.00",
    date: "2023-07-14",
    submittedDate: "2023-07-14",
    status: "Pending",
    description: "Purchase of office supplies for the marketing department",
    documents: ["supply_list.pdf"],
    expenses: [
      {
        category: "Stationery",
        amount: "$150.00",
        description: "Pens, notebooks, etc.",
      },
      {
        category: "Printing",
        amount: "$200.00",
        description: "Marketing materials printing",
      },
    ],
  },
};

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [request, setRequest] = useState<any>(null);

  useEffect(() => {
    if (id && mockRequestDetails[id as keyof typeof mockRequestDetails]) {
      setRequest(mockRequestDetails[id as keyof typeof mockRequestDetails]);
    }
  }, [id]);

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Request not found.</p>
          <Link
            to="/dashboard/requests"
            className="text-indigo-600 hover:text-indigo-900 mt-4 inline-block"
          >
            Back to requests
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  to="/dashboard/requests"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  My Requests
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {request.id}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="text-2xl font-semibold text-gray-900 mt-2">
            Request Details
          </h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => navigate("/dashboard/requests")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {request.purpose}
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                request.status
              )}`}
            >
              {request.status}
            </span>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details and expenses for this cash advance request.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Request ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Employee</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.employee} ({request.department})
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Amount</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.amount}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Submitted on
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.submittedDate}
              </dd>
            </div>
            {request.approvedDate && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Approved on
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {request.approvedDate} by {request.approvedBy}
                </dd>
              </div>
            )}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {request.documents.map((doc: string, index: number) => (
                    <li
                      key={index}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">{doc}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button className="font-medium text-indigo-600 hover:text-indigo-500">
                          Download
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Expense Breakdown
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {request.expenses.map((expense: any, index: number) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {expense.category}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {expense.amount}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500">
                          {expense.description}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        Total
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.amount}
                      </td>
                      <td className="px-3 py-2"></td>
                    </tr>
                  </tbody>
                </table>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Action buttons based on status and user role */}
      <div className="mt-6 flex justify-end space-x-3">
        {request.status === "Approved" && user?.role === "Regular Staff" && (
          <button
            onClick={() => navigate("/dashboard/retirement")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Retirement
          </button>
        )}
        {request.status === "Pending" &&
          (user?.role === "Line Manager" ||
            user?.role === "Finance Officer") && (
            <>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Reject
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Approve
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default RequestDetail;
