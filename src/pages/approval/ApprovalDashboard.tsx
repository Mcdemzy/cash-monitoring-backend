import { useState } from "react";

const ApprovalDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [decision, setDecision] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  // Mock data for pending approvals
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "CA-0460",
      employee: "Sarah Johnson",
      department: "Marketing",
      purpose: "Conference Attendance",
      amount: "$1,500.00",
      date: "2023-07-18",
      submittedDate: "2023-07-15",
      urgency: "High",
      description:
        "Attending Digital Marketing Summit in San Francisco. Registration fee, travel, and accommodation.",
      documents: ["conference_info.pdf", "travel_quotes.pdf"],
      status: "Pending Supervisor Approval",
      currentApprover: "You (Supervisor)",
    },
    {
      id: "CA-0459",
      employee: "Michael Chen",
      department: "Sales",
      purpose: "Client Entertainment",
      amount: "$800.00",
      date: "2023-07-20",
      submittedDate: "2023-07-14",
      urgency: "Medium",
      description:
        "Dinner meeting with potential enterprise client from TechCorp Inc.",
      documents: ["client_meeting_agenda.pdf"],
      status: "Pending Finance Approval",
      currentApprover: "You (Finance)",
    },
    {
      id: "CA-0458",
      employee: "Lisa Rodriguez",
      department: "Research & Development",
      purpose: "Lab Equipment",
      amount: "$2,300.00",
      date: "2023-07-25",
      submittedDate: "2023-07-13",
      urgency: "Medium",
      description:
        "Purchase of specialized testing equipment for ongoing project.",
      documents: ["equipment_quote.pdf", "project_budget.pdf"],
      status: "Pending Supervisor Approval",
      currentApprover: "You (Supervisor)",
    },
    {
      id: "CA-0457",
      employee: "David Wilson",
      department: "Operations",
      purpose: "Team Building Activity",
      amount: "$1,200.00",
      date: "2023-07-22",
      submittedDate: "2023-07-12",
      urgency: "Low",
      description:
        "Quarterly team building event at Adventure Park for 15 team members.",
      documents: ["venue_quotes.pdf", "activity_plan.pdf"],
      status: "Pending Finance Approval",
      currentApprover: "You (Finance)",
    },
  ]);

  const filteredRequests =
    filter === "all"
      ? pendingRequests
      : pendingRequests.filter((req) => req.status.includes(filter));

  const handleApprove = (requestId: string) => {
    setDecision("approve");
    const request = pendingRequests.find((req) => req.id === requestId);
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleReject = (requestId: string) => {
    setDecision("reject");
    const request = pendingRequests.find((req) => req.id === requestId);
    setSelectedRequest(request);
    setShowModal(true);
  };

  const confirmDecision = () => {
    if (decision === "approve") {
      // Update request status to approved
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== selectedRequest.id)
      );
      alert(`Request ${selectedRequest.id} has been approved successfully!`);
    } else if (decision === "reject" && rejectionReason) {
      // Update request status to rejected with reason
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== selectedRequest.id)
      );
      alert(
        `Request ${selectedRequest.id} has been rejected. Reason: ${rejectionReason}`
      );
    } else if (decision === "reject" && !rejectionReason) {
      alert("Please provide a reason for rejection.");
      return;
    }

    setShowModal(false);
    setRejectionReason("");
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Approval Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Review and take action on pending cash advance requests.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Requests</option>
              <option value="Supervisor">Supervisor Approval</option>
              <option value="Finance">Finance Approval</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <span className="text-white text-xl">📋</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Approval
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pendingRequests.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <span className="text-white text-xl">⏳</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Supervisor Level
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      pendingRequests.filter((r) =>
                        r.status.includes("Supervisor")
                      ).length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <span className="text-white text-xl">💰</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Finance Level
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      pendingRequests.filter((r) =>
                        r.status.includes("Finance")
                      ).length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <span className="text-white text-xl">⚠️</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    High Urgency
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pendingRequests.filter((r) => r.urgency === "High").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">✅</div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No pending approvals
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                All requests have been processed.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <li key={request.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {request.id} - {request.purpose}
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="truncate">
                              {request.employee} • {request.department}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-medium text-gray-900">
                            {request.amount}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Needed by: {request.date}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(
                            request.urgency
                          )}`}
                        >
                          {request.urgency} Priority
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {request.currentApprover}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          {request.description}
                        </p>
                      </div>
                      {request.documents && request.documents.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Attachments: </p>
                          <div className="flex space-x-2 mt-1">
                            {request.documents.map((doc, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      onClick={() => handleReject(request.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Approve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Approval/Rejection Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    {decision === "approve" ? (
                      <span className="text-indigo-600 text-xl">✅</span>
                    ) : (
                      <span className="text-indigo-600 text-xl">❌</span>
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {decision === "approve"
                        ? "Approve Request"
                        : "Reject Request"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {decision === "approve"
                          ? `Are you sure you want to approve request ${selectedRequest.id} for ${selectedRequest.amount}?`
                          : `Are you sure you want to reject request ${selectedRequest.id}? Please provide a reason.`}
                      </p>

                      {decision === "reject" && (
                        <div className="mt-4">
                          <label
                            htmlFor="rejectionReason"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Reason for rejection
                          </label>
                          <textarea
                            id="rejectionReason"
                            name="rejectionReason"
                            rows={3}
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Provide specific reason for rejecting this request..."
                          ></textarea>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDecision}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    decision === "approve"
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {decision === "approve"
                    ? "Confirm Approval"
                    : "Confirm Rejection"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalDashboard;
