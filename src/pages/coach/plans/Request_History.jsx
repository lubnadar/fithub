import React, { useState, useMemo } from 'react';
import {
    User,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Ban,
    X,
    Send,
    Filter,
    ArrowLeft
} from 'lucide-react';
//import { useNavigate } from 'react-router-dom';


const RequestHistory = () => {
    // Mock data for subscription requests
    const [requests, setRequests] = useState([
        {
            id: 1,
            coachName: "Sarah Johnson",
            coachImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            requestDate: "2025-01-15",
            status: "Active",
            specialty: "Weight Training"
        },
        {
            id: 2,
            coachName: "Mike Chen",
            coachImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            requestDate: "2025-01-10",
            status: "Pending",
            specialty: "CrossFit"
        },
        {
            id: 3,
            coachName: "Emily Rodriguez",
            coachImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            requestDate: "2025-01-08",
            status: "Accepted",
            specialty: "Yoga & Flexibility"
        },
        {
            id: 4,
            coachName: "David Kim",
            coachImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            requestDate: "2025-01-05",
            status: "Rejected",
            specialty: "HIIT Training"
        },
        {
            id: 5,
            coachName: "Lisa Thompson",
            coachImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
            requestDate: "2025-01-03",
            status: "Canceled",
            specialty: "Pilates"
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [cancellationMessage, setCancellationMessage] = useState('');

    const filters = ['All', 'Pending', 'Accepted', 'Rejected', 'Active', 'Canceled'];

    // Filter requests based on active filter
    const filteredRequests = useMemo(() => {
        if (activeFilter === 'All') return requests;
        return requests.filter(request => request.status === activeFilter);
    }, [requests, activeFilter]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Active':
                return <CheckCircle className="w-5 h-5 text-emerald-400" />;
            case 'Accepted':
                return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'Pending':
                return <Clock className="w-5 h-5 text-yellow-400" />;
            case 'Rejected':
                return <XCircle className="w-5 h-5 text-red-400" />;
            case 'Canceled':
                return <Ban className="w-5 h-5 text-gray-400" />;
            default:
                return <AlertCircle className="w-5 h-5 text-blue-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'Accepted':
                return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'Pending':
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'Rejected':
                return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'Canceled':
                return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
            default:
                return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        }
    };

    const handleCancelRequest = (requestId) => {
        setRequests(prev => prev.filter(req => req.id !== requestId));
    };

    const handleRequestCancellation = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleSubmitCancellation = () => {
        if (selectedRequest) {
            // Update status to show cancellation requested
            setRequests(prev =>
                prev.map(req =>
                    req.id === selectedRequest.id
                        ? { ...req, status: 'Canceled' }
                        : req
                )
            );
        }
        setShowModal(false);
        setCancellationMessage('');
        setSelectedRequest(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            {/* Header */}
            <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Request History</h1>
                    </div>
                    <p className="text-slate-400">Track all your coach subscription requests and manage your connections</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filter Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className="w-5 h-5 text-slate-400" />
                        <span className="text-lg font-semibold text-white">Filter by Status</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeFilter === filter
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Requests Grid */}
                <div className="grid gap-6">
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((request) => (
                            <div
                                key={request.id}
                                className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        {/* Coach Image */}
                                        <div className="relative">
                                            <img
                                                src={request.coachImage}
                                                alt={request.coachName}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
                                            />
                                            <div className="absolute -top-1 -right-1">
                                                {getStatusIcon(request.status)}
                                            </div>
                                        </div>

                                        {/* Coach Info */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-1">
                                                {request.coachName}
                                            </h3>
                                            <p className="text-slate-400 mb-2">{request.specialty}</p>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>Requested on {formatDate(request.requestDate)}</span>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </div>

                                        {/* Action Button */}
                                        <div className="ml-4">
                                            {request.status === 'Pending' && (
                                                <button
                                                    onClick={() => handleCancelRequest(request.id)}
                                                    className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all duration-200 font-medium"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {request.status === 'Active' && (
                                                <button
                                                    onClick={() => handleRequestCancellation(request)}
                                                    className="px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-all duration-200 font-medium"
                                                >
                                                    Request Cancellation
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Requests Found</h3>
                            <p className="text-slate-400">
                                {activeFilter === 'All'
                                    ? "You haven't made any coach subscription requests yet."
                                    : `No ${activeFilter.toLowerCase()} requests found.`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Cancellation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md transform animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Request Subscription Cancellation</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-slate-300 mb-2">
                                You're about to request cancellation of your subscription with{' '}
                                <span className="font-semibold text-white">{selectedRequest?.coachName}</span>
                            </p>
                            <p className="text-sm text-slate-400">
                                Please provide an optional reason for cancellation:
                            </p>
                        </div>

                        <textarea
                            value={cancellationMessage}
                            onChange={(e) => setCancellationMessage(e.target.value)}
                            placeholder="Optional: Share your reason for cancellation..."
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        />

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-all duration-200 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitCancellation}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestHistory;