import React, { useState } from 'react';
import { Search, Eye, Check, X, User, Calendar, Target, Ruler, Weight, Activity, Clock, MessageSquare } from 'lucide-react';

const ManageRequests = () => {
    // Mock data for subscription requests
    const initialRequests = [
        {
            id: 1,
            trainee: {
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
                email: "sarah.j@email.com",
                age: 28,
                height: "5'6\"",
                weight: "140 lbs",
                fitnessLevel: "Intermediate",
                goal: "Weight Loss & Toning",
                experience: "2 years",
                medicalConditions: "None",
                preferredWorkoutTime: "Morning (6-8 AM)",
                notes: "Looking to lose 15 lbs and build lean muscle. Available Mon-Fri mornings."
            },
            requestDate: "2025-07-24",
            status: "pending",
            message: "Hi! I'm looking for a personal trainer to help me achieve my weight loss goals. I have some experience but need guidance on proper form and nutrition."
        },
        {
            id: 2,
            trainee: {
                name: "Mike Chen",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
                email: "mike.chen@email.com",
                age: 35,
                height: "5'10\"",
                weight: "185 lbs",
                fitnessLevel: "Beginner",
                goal: "Muscle Building",
                experience: "6 months",
                medicalConditions: "Previous knee injury (recovered)",
                preferredWorkoutTime: "Evening (6-8 PM)",
                notes: "Former athlete looking to get back in shape. Need to work around old knee injury."
            },
            requestDate: "2025-07-23",
            status: "accepted",
            message: "I'm a former college athlete looking to get back into serious training. Can you help me build a program that works around my old knee injury?"
        },
        {
            id: 3,
            trainee: {
                name: "Emma Rodriguez",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
                email: "emma.r@email.com",
                age: 24,
                height: "5'4\"",
                weight: "125 lbs",
                fitnessLevel: "Advanced",
                goal: "Competition Prep",
                experience: "5 years",
                medicalConditions: "None",
                preferredWorkoutTime: "Flexible",
                notes: "Preparing for fitness competition in 6 months. Need specialized training and nutrition guidance."
            },
            requestDate: "2025-07-22",
            status: "pending",
            message: "I'm preparing for my first fitness competition and need an experienced coach to guide me through the final 6 months of prep."
        },
        {
            id: 4,
            trainee: {
                name: "David Wilson",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
                email: "david.w@email.com",
                age: 42,
                height: "6'1\"",
                weight: "200 lbs",
                fitnessLevel: "Intermediate",
                goal: "General Fitness",
                experience: "3 years",
                medicalConditions: "High blood pressure (controlled)",
                preferredWorkoutTime: "Morning (5-7 AM)",
                notes: "Busy executive looking to maintain fitness and reduce stress through exercise."
            },
            requestDate: "2025-07-21",
            status: "rejected",
            message: "Looking for early morning training sessions to fit my busy executive schedule. Need help with stress management through fitness."
        },
        {
            id: 5,
            trainee: {
                name: "Lisa Park",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
                email: "lisa.park@email.com",
                age: 31,
                height: "5'7\"",
                weight: "155 lbs",
                fitnessLevel: "Beginner",
                goal: "Postpartum Recovery",
                experience: "New to fitness",
                medicalConditions: "Recent childbirth (6 months ago)",
                preferredWorkoutTime: "Afternoon (1-3 PM)",
                notes: "New mom looking to regain strength and energy. Need gentle but effective program."
            },
            requestDate: "2025-07-20",
            status: "cancelled",
            message: "I'm a new mom looking to get back into shape safely. I need guidance on postpartum fitness and rebuilding my core strength."
        }
    ];

    const [requests, setRequests] = useState(initialRequests);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [coachNotes, setCoachNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const tabs = [
        { id: 'all', label: 'All', count: requests.length },
        { id: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
        { id: 'accepted', label: 'Accepted', count: requests.filter(r => r.status === 'accepted').length },
        { id: 'rejected', label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length },
        { id: 'cancelled', label: 'Cancelled', count: requests.filter(r => r.status === 'cancelled').length }
    ];

    const filteredRequests = requests.filter(request => {
        const matchesTab = activeTab === 'all' || request.status === activeTab;
        const matchesSearch = request.trainee.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleAcceptRequest = async (requestId) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setRequests(prev => prev.map(req =>
                req.id === requestId ? { ...req, status: 'accepted' } : req
            ));
            setLoading(false);
        }, 1000);
    };

    const handleRejectRequest = async (requestId) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setRequests(prev => prev.map(req =>
                req.id === requestId ? { ...req, status: 'rejected' } : req
            ));
            setShowRejectModal(false);
            setRejectReason('');
            setLoading(false);
        }, 1000);
    };

    const openDetailModal = (request) => {
        setSelectedRequest(request);
        setCoachNotes('');
        setShowDetailModal(true);
    };

    const openRejectModal = (request) => {
        setSelectedRequest(request);
        setShowRejectModal(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'accepted': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
            case 'cancelled': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        Manage Subscription Requests
                    </h1>
                    <p className="text-slate-400">
                        Review and respond to incoming training requests from potential trainees
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by trainee name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                    : 'bg-white/10 backdrop-blur-sm text-slate-300 hover:bg-white/20 border border-white/10'
                                    }`}
                            >
                                {tab.label}
                                <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-700 text-slate-300'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Request Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRequests.map((request, index) => (
                        <div
                            key={request.id}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Trainee Info */}
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={request.trainee.avatar}
                                    alt={request.trainee.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">
                                        {request.trainee.name}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        {request.trainee.email}
                                    </p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </div>
                            </div>

                            {/* Request Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Target className="w-4 h-4 text-blue-400" />
                                    <span>{request.trainee.goal}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Calendar className="w-4 h-4 text-green-400" />
                                    <span>Requested on {formatDate(request.requestDate)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Activity className="w-4 h-4 text-purple-400" />
                                    <span>{request.trainee.fitnessLevel} Level</span>
                                </div>
                            </div>

                            {/* Message Preview */}
                            <div className="mb-4">
                                <p className="text-sm text-slate-400 line-clamp-2">
                                    "{request.message}"
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openDetailModal(request)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors duration-200"
                                >
                                    <Eye className="w-4 h-4" />
                                    Details
                                </button>

                                {request.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleAcceptRequest(request.id)}
                                            disabled={loading}
                                            className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openRejectModal(request)}
                                            disabled={loading}
                                            className="flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <User className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">
                            No requests found
                        </h3>
                        <p className="text-slate-500">
                            {searchTerm
                                ? `No requests match "${searchTerm}"`
                                : `No ${activeTab === 'all' ? '' : activeTab} requests at the moment`
                            }
                        </p>
                    </div>
                )}

                {/* Detail Modal */}
                {showDetailModal && selectedRequest && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-slate-800 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Trainee Profile</h2>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={selectedRequest.trainee.avatar}
                                        alt={selectedRequest.trainee.name}
                                        className="w-20 h-20 rounded-full object-cover ring-2 ring-white/20"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {selectedRequest.trainee.name}
                                        </h3>
                                        <p className="text-slate-400">{selectedRequest.trainee.email}</p>
                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getStatusColor(selectedRequest.status)}`}>
                                            {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="w-4 h-4 text-blue-400" />
                                            <span className="font-medium text-white">Age</span>
                                        </div>
                                        <p className="text-slate-300">{selectedRequest.trainee.age} years old</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Ruler className="w-4 h-4 text-green-400" />
                                            <span className="font-medium text-white">Height</span>
                                        </div>
                                        <p className="text-slate-300">{selectedRequest.trainee.height}</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Weight className="w-4 h-4 text-purple-400" />
                                            <span className="font-medium text-white">Weight</span>
                                        </div>
                                        <p className="text-slate-300">{selectedRequest.trainee.weight}</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Activity className="w-4 h-4 text-orange-400" />
                                            <span className="font-medium text-white">Fitness Level</span>
                                        </div>
                                        <p className="text-slate-300">{selectedRequest.trainee.fitnessLevel}</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="w-4 h-4 text-red-400" />
                                            <span className="font-medium text-white">Goal</span>
                                        </div>
                                        <p className="text-slate-300">{selectedRequest.trainee.goal}</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-4 h-4 text-yellow-400" />
                                            <span className="font-medium text-white">Preferred Time</span>
                                        </div>
                                        <p className="text-slate-300">{selectedRequest.trainee.preferredWorkoutTime}</p>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h4 className="font-medium text-white mb-2">Experience</h4>
                                        <p className="text-slate-300">{selectedRequest.trainee.experience}</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h4 className="font-medium text-white mb-2">Medical Conditions</h4>
                                        <p className="text-slate-300">{selectedRequest.trainee.medicalConditions}</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h4 className="font-medium text-white mb-2">Initial Message</h4>
                                        <p className="text-slate-300">"{selectedRequest.message}"</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h4 className="font-medium text-white mb-2">Additional Notes</h4>
                                        <p className="text-slate-300">{selectedRequest.trainee.notes}</p>
                                    </div>
                                </div>

                                {/* Coach Notes */}
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MessageSquare className="w-4 h-4 text-blue-400" />
                                        <span className="font-medium text-white">Coach Notes</span>
                                    </div>
                                    <textarea
                                        value={coachNotes}
                                        onChange={(e) => setCoachNotes(e.target.value)}
                                        placeholder="Add your notes about this trainee..."
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                                        rows="3"
                                    />
                                </div>

                                {/* Action Buttons */}
                                {selectedRequest.status === 'pending' && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                handleAcceptRequest(selectedRequest.id);
                                                setShowDetailModal(false);
                                            }}
                                            disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
                                        >
                                            <Check className="w-5 h-5" />
                                            Accept Request
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowDetailModal(false);
                                                openRejectModal(selectedRequest);
                                            }}
                                            disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
                                        >
                                            <X className="w-5 h-5" />
                                            Reject Request
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Reject Modal */}
                {showRejectModal && selectedRequest && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-slate-800 border border-white/20 rounded-2xl p-6 max-w-md w-full">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Reject Request</h2>
                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <p className="text-slate-300 mb-4">
                                Are you sure you want to reject the request from {selectedRequest.trainee.name}?
                            </p>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-white mb-2">
                                    Reason for rejection (optional)
                                </label>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Provide a reason for rejection..."
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                                    rows="3"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleRejectRequest(selectedRequest.id)}
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
                                >
                                    {loading ? 'Rejecting...' : 'Reject'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {loading && (
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                <span className="text-white">Processing request...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default ManageRequests;