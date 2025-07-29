import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Target, Activity, TrendingUp, ArrowLeft, Edit3, User, Clock, CheckCircle } from 'lucide-react';
//import { useNavigate } from 'react-router-dom';

const AssignPlan = () => {
    // Simulated router params - in real app would use useParams() from react-router-dom
    const traineeId = "123";

    // Simulated navigation function - in real app would use useNavigate() from react-router-dom
    const navigate = (path) => {
        console.log(`Navigating to: ${path}`);
        alert(`Would navigate to: ${path}`);
    };

    // Mock data - in real app would come from API/context
    const [trainee, setTrainee] = useState({
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        fitnessGoal: "Weight Loss",
        activityLevel: "Intermediate",
        subscriptionStart: "2024-01-15",
        subscriptionEnd: "2024-04-15",
        adherence: 85,
        completedWorkouts: 24,
        totalWorkouts: 30
    });

    const [availablePlans, setAvailablePlans] = useState([
        { id: 1, name: "Weight Loss Intensive", duration: "12 weeks", workoutsPerWeek: 4 },
        { id: 2, name: "Strength Building", duration: "8 weeks", workoutsPerWeek: 5 },
        { id: 3, name: "Cardio Blast", duration: "6 weeks", workoutsPerWeek: 3 },
        { id: 4, name: "Full Body Transformation", duration: "16 weeks", workoutsPerWeek: 4 }
    ]);

    const [selectedPlan, setSelectedPlan] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    const handleAssignPlan = () => {
        if (selectedPlan) {
            alert(`Plan "${availablePlans.find(p => p.id == selectedPlan)?.name}" assigned to ${trainee.name}!`);
            // In real app: make API call to assign plan
        }
    };

    const handleCustomizePlan = () => {
        if (selectedPlan) {
            navigate(`/plans/edit/${selectedPlan}?traineeId=${traineeId}`);
        } else {
            alert('Please select a plan first');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className={`max-w-7xl mx-auto transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Assign Training Plan</h1>
                    <p className="text-gray-600">Customize and assign a training plan to your trainee</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Trainee Info Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <img
                                        src={trainee.avatar}
                                        alt={trainee.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{trainee.name}</h2>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    <User className="w-4 h-4 mr-1" />
                                    Active Member
                                </span>
                            </div>

                            {/* Trainee Details */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center">
                                        <Target className="w-5 h-5 text-blue-500 mr-3" />
                                        <span className="text-gray-700 font-medium">Goal</span>
                                    </div>
                                    <span className="text-gray-900 font-semibold">{trainee.fitnessGoal}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center">
                                        <Activity className="w-5 h-5 text-green-500 mr-3" />
                                        <span className="text-gray-700 font-medium">Level</span>
                                    </div>
                                    <span className="text-gray-900 font-semibold">{trainee.activityLevel}</span>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <Calendar className="w-5 h-5 text-purple-500 mr-3" />
                                        <span className="text-gray-700 font-medium">Subscription</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <div>Start: {formatDate(trainee.subscriptionStart)}</div>
                                        <div>End: {formatDate(trainee.subscriptionEnd)}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Overview */}
                            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                                    Progress Overview
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Adherence Rate</span>
                                            <span className="text-sm font-bold text-gray-900">{trainee.adherence}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(trainee.adherence)}`}
                                                style={{ width: `${trainee.adherence}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Completed Workouts</span>
                                        <span className="font-semibold text-gray-900">
                                            {trainee.completedWorkouts}/{trainee.totalWorkouts}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Plan Assignment Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Assignment</h2>

                            {availablePlans.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Target className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Plans Available</h3>
                                    <p className="text-gray-600 mb-6">You haven't created any plans yet</p>
                                    <button
                                        onClick={() => navigate('/plans/create')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                                    >
                                        Create Your First Plan
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Plan Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Select a Plan to Assign
                                        </label>
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowDropdown(!showDropdown)}
                                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className={selectedPlan ? 'text-gray-900' : 'text-gray-500'}>
                                                        {selectedPlan
                                                            ? availablePlans.find(p => p.id == selectedPlan)?.name
                                                            : 'Choose a training plan...'
                                                        }
                                                    </span>
                                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                                                </div>
                                            </button>

                                            {showDropdown && (
                                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg">
                                                    {availablePlans.map((plan) => (
                                                        <button
                                                            key={plan.id}
                                                            onClick={() => {
                                                                setSelectedPlan(plan.id);
                                                                setShowDropdown(false);
                                                            }}
                                                            className="w-full px-4 py-4 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                                                        >
                                                            <div>
                                                                <div className="font-medium text-gray-900">{plan.name}</div>
                                                                <div className="text-sm text-gray-500">
                                                                    {plan.duration} • {plan.workoutsPerWeek} workouts/week
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Selected Plan Details */}
                                    {selectedPlan && (
                                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                            <h3 className="text-lg font-semibold text-blue-900 mb-3">Selected Plan Details</h3>
                                            {(() => {
                                                const plan = availablePlans.find(p => p.id == selectedPlan);
                                                return (
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-blue-600">{plan.duration}</div>
                                                            <div className="text-sm text-blue-700">Duration</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-blue-600">{plan.workoutsPerWeek}</div>
                                                            <div className="text-sm text-blue-700">Workouts/Week</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-blue-600">Custom</div>
                                                            <div className="text-sm text-blue-700">Adaptable</div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                        <button
                                            onClick={handleAssignPlan}
                                            disabled={!selectedPlan}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Assign Plan
                                        </button>

                                        <button
                                            onClick={handleCustomizePlan}
                                            disabled={!selectedPlan}
                                            className="flex-1 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 border border-gray-300 px-6 py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <Edit3 className="w-5 h-5 mr-2" />
                                            Customize Plan
                                        </button>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="bg-gray-50 rounded-xl p-4 mt-6">
                                        <div className="flex items-start">
                                            <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-1">Quick Tips</h4>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• You can customize any plan before assigning it</li>
                                                    <li>• Plans can be modified even after assignment</li>
                                                    <li>• Track progress through the trainee dashboard</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignPlan;