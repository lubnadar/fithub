import React, { useState, useEffect } from 'react';
import { User, Calendar, CheckCircle, XCircle, Eye, Clock, UserCheck, UserX } from 'lucide-react';

const Requests = () => {
    // Mock data for requests
    const [requests, setRequests] = useState([
        {
            id: 1,
            traineeId: 'tr001',
            traineeName: 'Sarah Johnson',
            traineeAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
            requestDate: '2024-07-18',
            status: 'pending',
            plan: 'Premium Personal Training',
            message: 'Looking for help with strength training and weight loss goals.'
        },
        {
            id: 2,
            traineeId: 'tr002',
            traineeName: 'Mike Chen',
            traineeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            requestDate: '2024-07-17',
            status: 'pending',
            plan: 'Athletic Performance',
            message: 'Preparing for marathon training, need specialized coaching.'
        },
        {
            id: 3,
            traineeId: 'tr003',
            traineeName: 'Emily Rodriguez',
            traineeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            requestDate: '2024-07-16',
            status: 'accepted',
            plan: 'Beginner Fitness',
            message: 'Complete beginner looking to start my fitness journey.'
        },
        {
            id: 4,
            traineeId: 'tr004',
            traineeName: 'David Park',
            traineeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            requestDate: '2024-07-15',
            status: 'rejected',
            plan: 'Rehabilitation Training',
            message: 'Post-injury recovery, need specialized attention.',
            rejectionReason: 'Outside of my expertise area'
        },
        {
            id: 5,
            traineeId: 'tr005',
            traineeName: 'Lisa Thompson',
            traineeAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
            requestDate: '2024-07-14',
            status: 'accepted',
            plan: 'Weight Loss Program',
            message: 'Need guidance on nutrition and workout plans.'
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('all');
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const filters = [
        { key: 'all', label: 'All', icon: User },
        { key: 'pending', label: 'Pending', icon: Clock },
        { key: 'accepted', label: 'Accepted', icon: UserCheck },
        { key: 'rejected', label: 'Rejected', icon: UserX }
    ];

    const filteredRequests = requests.filter(request => {
        if (activeFilter === 'all') return true;
        return request.status === activeFilter;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: {
                bg: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                darkBg: 'dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700',
                icon: Clock
            },
            accepted: {
                bg: 'bg-green-100 text-green-800 border-green-200',
                darkBg: 'dark:bg-green-900/20 dark:text-green-300 dark:border-green-700',
                icon: CheckCircle
            },
            rejected: {
                bg: 'bg-red-100 text-red-800 border-red-200',
                darkBg: 'dark:bg-red-900/20 dark:text-red-300 dark:border-red-700',
                icon: XCircle
            }
        };

        const config = statusConfig[status];
        const Icon = config.icon;

        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.darkBg}`}>
                <Icon size={14} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        );
    };

    const handleAccept = (request) => {
        setSelectedRequest(request);
        setShowAcceptModal(true);
    };

    const handleReject = (request) => {
        setSelectedRequest(request);
        setShowRejectModal(true);
    };

    const confirmAccept = () => {
        setRequests(prev =>
            prev.map(req =>
                req.id === selectedRequest.id
                    ? { ...req, status: 'accepted' }
                    : req
            )
        );
        setShowAcceptModal(false);
        setSelectedRequest(null);
    };

    const confirmReject = () => {
        setRequests(prev =>
            prev.map(req =>
                req.id === selectedRequest.id
                    ? { ...req, status: 'rejected', rejectionReason }
                    : req
            )
        );
        setShowRejectModal(false);
        setSelectedRequest(null);
        setRejectionReason('');
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                        Private Requests
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Manage trainee requests for private coaching plans
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8 shadow-lg">
                    <div className="flex flex-wrap gap-3">
                        {filters.map((filter) => {
                            const Icon = filter.icon;
                            const isActive = activeFilter === filter.key;
                            const count = filter.key === 'all'
                                ? requests.length
                                : requests.filter(r => r.status === filter.key).length;

                            return (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg transform scale-105'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {filter.label}
                                    <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-600'
                                        }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Requests List */}
                <div className="space-y-4">
                    {filteredRequests.length === 0 ? (
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-white/20 p-12 text-center shadow-lg">
                            <div className="text-slate-400 mb-4">
                                <User size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                No {activeFilter !== 'all' ? activeFilter : ''} requests found
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                {activeFilter === 'all'
                                    ? "You haven't received any training requests yet."
                                    : `No ${activeFilter} requests at the moment.`
                                }
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50/80 dark:bg-slate-700/80 border-b border-slate-200 dark:border-slate-600">
                                            <tr>
                                                <th className="text-left py-4 px-6 font-semibold text-slate-700 dark:text-slate-200">Trainee</th>
                                                <th className="text-left py-4 px-6 font-semibold text-slate-700 dark:text-slate-200">Plan</th>
                                                <th className="text-left py-4 px-6 font-semibold text-slate-700 dark:text-slate-200">Date</th>
                                                <th className="text-left py-4 px-6 font-semibold text-slate-700 dark:text-slate-200">Status</th>
                                                <th className="text-left py-4 px-6 font-semibold text-slate-700 dark:text-slate-200">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                                            {filteredRequests.map((request) => (
                                                <tr key={request.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={request.traineeAvatar}
                                                                alt={request.traineeName}
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-600"
                                                            />
                                                            <div>
                                                                <div className="font-medium text-slate-900 dark:text-slate-100">
                                                                    {request.traineeName}
                                                                </div>
                                                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                                                    ID: {request.traineeId}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="font-medium text-slate-700 dark:text-slate-200">
                                                            {request.plan}
                                                        </div>
                                                        <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs truncate">
                                                            {request.message}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                            <Calendar size={16} />
                                                            {formatDate(request.requestDate)}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {getStatusBadge(request.status)}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2">
                                                            {request.status === 'pending' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleAccept(request)}
                                                                        className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                                                    >
                                                                        <CheckCircle size={14} />
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleReject(request)}
                                                                        className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                                                                    >
                                                                        <XCircle size={14} />
                                                                        Reject
                                                                    </button>
                                                                </>
                                                            )}
                                                            <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                                                                <Eye size={14} />
                                                                Profile
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {filteredRequests.map((request) => (
                                    <div key={request.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-lg">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={request.traineeAvatar}
                                                    alt={request.traineeName}
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-600"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                                        {request.traineeName}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        {request.plan}
                                                    </p>
                                                </div>
                                            </div>
                                            {getStatusBadge(request.status)}
                                        </div>

                                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                                            {request.message}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                                            <Calendar size={14} />
                                            {formatDate(request.requestDate)}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {request.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAccept(request)}
                                                        className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex-1 justify-center"
                                                    >
                                                        <CheckCircle size={14} />
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(request)}
                                                        className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex-1 justify-center"
                                                    >
                                                        <XCircle size={14} />
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex-1 justify-center">
                                                <Eye size={14} />
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Accept Confirmation Modal */}
            {showAcceptModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Accept Request
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Are you sure you want to accept <span className="font-medium">{selectedRequest?.traineeName}</span>'s request for <span className="font-medium">{selectedRequest?.plan}</span>?
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAcceptModal(false)}
                                className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAccept}
                                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                            >
                                Accept Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Confirmation Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <XCircle size={32} className="text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Reject Request
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                Reject <span className="font-medium">{selectedRequest?.traineeName}</span>'s request for <span className="font-medium">{selectedRequest?.plan}</span>?
                            </p>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Optional: Provide a reason for rejection..."
                                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                            >
                                Reject Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Requests;
