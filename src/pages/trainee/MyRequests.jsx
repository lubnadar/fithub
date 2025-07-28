import React, { useState } from 'react';
import { Calendar, Filter, X, Clock, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react';
import TraineeNavbar from '../../components/layout/TraineeNavbar';

const RequestHistory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [requests, setRequests] = useState([
    {
      id: 1,
      coachName: 'Sarah Johnson',
      coachAvatar: '/api/placeholder/40/40',
      requestDate: '2024-07-18',
      status: 'Pending',
      planType: 'Weight Loss Program'
    },
    {
      id: 2,
      coachName: 'Mike Chen',
      coachAvatar: '/api/placeholder/40/40',
      requestDate: '2024-07-15',
      status: 'Accepted',
      planType: 'Muscle Building'
    },
    {
      id: 3,
      coachName: 'Emma Rodriguez',
      coachAvatar: '/api/placeholder/40/40',
      requestDate: '2024-07-12',
      status: 'Rejected',
      planType: 'Cardio Training'
    },
    {
      id: 4,
      coachName: 'David Kim',
      coachAvatar: '/api/placeholder/40/40',
      requestDate: '2024-07-10',
      status: 'Canceled',
      planType: 'Strength Training'
    }
  ]);

  const filterOptions = ['All', 'Pending', 'Accepted', 'Rejected', 'Canceled'];
  const filteredRequests = requests.filter(request =>
    activeFilter === 'All' || request.status === activeFilter
  );

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-800 text-yellow-100 border-yellow-600',
      'Accepted': 'bg-green-800 text-green-100 border-green-600',
      'Rejected': 'bg-red-800 text-red-100 border-red-600',
      'Canceled': 'bg-gray-700 text-gray-200 border-gray-500'
    };
    return colors[status] || 'bg-gray-700 text-gray-200 border-gray-500';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <Clock className="w-4 h-4" />,
      'Accepted': <CheckCircle className="w-4 h-4" />,
      'Rejected': <XCircle className="w-4 h-4" />,
      'Canceled': <AlertCircle className="w-4 h-4" />
    };
    return icons[status];
  };

  const handleCancelRequest = (request) => {
    setSelectedRequest(request);
    setShowCancellationModal(true);
  };

  const submitCancellation = () => {
    if (selectedRequest) {
      setRequests(prev => prev.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: 'Canceled' }
          : req
      ));
      setShowCancellationModal(false);
      setCancellationReason('');
      setSelectedRequest(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6"> {/* تم تغيير bg-gray-50 إلى bg-gray-900 */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2"> {/* نص أبيض */}
            Subscription Request History
          </h1>
          <p className="text-gray-300"> {/* نص رمادي فاتح */}
            Track all your private training plan subscription requests
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 mb-6"> {/* خلفية داكنة + حدود */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-200">Filter by status:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {filterOptions.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Request List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No requests found</h3>
            <p className="text-gray-400 mb-6">
              {activeFilter === 'All'
                ? "You haven't made any subscription requests yet."
                : `No ${activeFilter.toLowerCase()} requests found.`
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Browse Coaches
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden"> {/* تم تغيير bg-white إلى bg-gray-800 */}
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Coach
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Plan Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredRequests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{request.coachName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-200">
                        {request.planType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                          {formatDate(request.requestDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'Pending' && (
                          <button
                            onClick={() => handleCancelRequest(request)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        {request.status === 'Accepted' && (
                          <button
                            onClick={() => handleCancelRequest(request)}
                            className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                          >
                            Request Cancellation
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {filteredRequests.map(request => (
                <div key={request.id} className="border-b border-gray-700 p-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{request.coachName}</p>
                        <p className="text-sm text-gray-300">{request.planType}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(request.requestDate)}
                    </div>
                    {request.status === 'Pending' && (
                      <button
                        onClick={() => handleCancelRequest(request)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    {request.status === 'Accepted' && (
                      <button
                        onClick={() => handleCancelRequest(request)}
                        className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                      >
                        Request Cancellation
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancellation Modal */}
        {showCancellationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 backdrop-blur-lg bg-opacity-95 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-200 scale-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedRequest?.status === 'Pending' ? 'Cancel Request' : 'Request Cancellation'}
                  </h3>
                  <button
                    onClick={() => setShowCancellationModal(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-300 mb-4">
                  {selectedRequest?.status === 'Pending'
                    ? `Are you sure you want to cancel your subscription request to ${selectedRequest?.coachName}?`
                    : `Please provide a reason for requesting cancellation of your subscription with ${selectedRequest?.coachName}.`
                  }
                </p>
                {selectedRequest?.status === 'Accepted' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Reason for cancellation
                    </label>
                    <textarea
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 resize-none"
                      rows="4"
                      placeholder="Please explain why you want to cancel..."
                    />
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCancellationModal(false)}
                    className="flex-1 py-2 px-4 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitCancellation}
                    className="flex-1 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {selectedRequest?.status === 'Pending' ? 'Cancel Request' : 'Send Cancellation Request'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestHistory;