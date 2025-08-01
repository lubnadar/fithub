import React, { useState } from 'react';
import { User, Calendar, Target, TrendingUp, X, Check, AlertTriangle } from 'lucide-react';

// Mock data for active subscriptions
const mockSubscriptions = [
    {
        id: 1,
        trainee: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b9d96a87?w=150&h=150&fit=crop&crop=face"
        },
        plan: "Weight Loss Program",
        startDate: "2025-07-01",
        duration: 30,
        progress: 75,
        status: "Active"
    },
    {
        id: 2,
        trainee: {
            name: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        plan: "Muscle Building",
        startDate: "2025-07-15",
        duration: 30,
        progress: 45,
        status: "Active"
    },
    {
        id: 3,
        trainee: {
            name: "Emma Wilson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        plan: "Endurance Training",
        startDate: "2025-06-20",
        duration: 30,
        progress: 90,
        status: "Active"
    }
];

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, traineeName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            End Subscription
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to end the subscription for <strong>{traineeName}</strong>? This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Yes, End
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Subscription Card Component
const SubscriptionCard = ({ subscription, onEndSubscription, onOpenPlan }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 60) return 'bg-blue-500';
        if (progress >= 40) return 'bg-yellow-500';
        return 'bg-orange-500';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={subscription.trainee.avatar}
                        alt={subscription.trainee.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-900">{subscription.trainee.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="w-3 h-3 mr-1" />
                            Active
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Target className="w-4 h-4" />
                    <span>{subscription.plan}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Started {formatDate(subscription.startDate)} • {subscription.duration} days</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Progress: {subscription.progress}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(subscription.progress)}`}
                        style={{ width: `${subscription.progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex space-x-3">
                <button
                    onClick={() => onOpenPlan(subscription.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                    Open Plan
                </button>
                <button
                    onClick={() => onEndSubscription(subscription)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm border border-gray-300"
                >
                    End Subscription
                </button>
            </div>
        </div>
    );
};

// Main Active Subscriptions Component
const ActiveSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

    const handleEndSubscription = (subscription) => {
        setSelectedSubscription(subscription);
        setModalOpen(true);
    };

    const confirmEndSubscription = () => {
        if (selectedSubscription) {
            setSubscriptions(prev =>
                prev.filter(sub => sub.id !== selectedSubscription.id)
            );
        }
        setModalOpen(false);
        setSelectedSubscription(null);
    };

    const handleOpenPlan = (subscriptionId) => {
        // Navigate to trainee's plan - would use React Router in real implementation
        console.log(`Opening plan for subscription ${subscriptionId}`);
        // Example: navigate(`/coach/plans/${subscriptionId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Active Subscriptions</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your current trainee subscriptions and track their progress
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{subscriptions.length} Active Subscriptions</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {subscriptions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subscriptions.map((subscription) => (
                            <SubscriptionCard
                                key={subscription.id}
                                subscription={subscription}
                                onEndSubscription={handleEndSubscription}
                                onOpenPlan={handleOpenPlan}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <User className="h-24 w-24" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscriptions</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            You don't have any active subscriptions at the moment. New subscription requests will appear here once accepted.
                        </p>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmEndSubscription}
                traineeName={selectedSubscription?.trainee.name}
            />
        </div>
    );
};

export default ActiveSubscriptions;