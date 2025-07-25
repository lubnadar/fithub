import React, { useState } from 'react';
import TraineeNavbar from '../../components/layout/TraineeNavbar';
import {
    Calendar,
    Play,
    CheckCircle,
    Clock,
    Target,
    TrendingUp,
    User,
    Star,
    ArrowRight,
    Dumbbell,
    Zap
} from 'lucide-react';

const TraineeDashboard = () => {
    const [traineeData] = useState({
        name: 'Alex Johnson',
        subscriptionStatus: 'active', // active, pending, none
        coachName: 'Sarah Martinez',
        planName: 'Strength & Conditioning Program'
    });

    const [todaysWorkout] = useState([
        {
            id: 1,
            name: 'Push-ups',
            sets: 3,
            reps: 12,
            completed: true,
            type: 'strength'
        },
        {
            id: 2,
            name: 'Squats',
            sets: 4,
            reps: 15,
            completed: false,
            type: 'strength'
        },
        {
            id: 3,
            name: 'Plank',
            sets: 1,
            duration: '60s',
            completed: false,
            type: 'core'
        },
        {
            id: 4,
            name: 'Jumping Jacks',
            sets: 3,
            reps: 20,
            completed: true,
            type: 'cardio'
        }
    ]);

    const [recentWorkouts] = useState([
        { date: '2024-07-20', exercises: 5, duration: '45 min', completion: 100 },
        { date: '2024-07-18', exercises: 6, duration: '52 min', completion: 85 },
        { date: '2024-07-16', exercises: 4, duration: '38 min', completion: 100 }
    ]);

    const completedCount = todaysWorkout.filter(exercise => exercise.completed).length;
    const totalCount = todaysWorkout.length;
    const completionPercentage = Math.round((completedCount / totalCount) * 100);

    const getExerciseTypeColor = (type) => {
        switch (type) {
            case 'strength': return 'bg-blue-100 text-blue-800';
            case 'cardio': return 'bg-red-100 text-red-800';
            case 'core': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSubscriptionStatusBadge = () => {
        switch (traineeData.subscriptionStatus) {
            case 'active':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Active Subscription
                    </div>
                );
            case 'pending':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-4 h-4 mr-1" />
                        Pending Approval
                    </div>
                );
            default:
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        No Active Plan
                    </div>
                );
        }
    };

    const handleNavigation = (path) => {
        console.log(`Navigating to: ${path}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, {traineeData.name}! 👋
                            </h1>
                            <p className="text-gray-600">Ready to crush your fitness goals today?</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            {getSubscriptionStatusBadge()}
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">7</div>
                                <div className="text-sm text-gray-600">Days this week</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">24</div>
                                <div className="text-sm text-gray-600">Workouts completed</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">18h</div>
                                <div className="text-sm text-gray-600">Total training time</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Progress Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Today's Workout</h2>
                        <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-600">Progress</div>
                            <div className="text-lg font-bold text-blue-600">{completedCount}/{totalCount}</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Completion</span>
                            <span>{completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Exercise Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {todaysWorkout.map((exercise) => (
                            <div
                                key={exercise.id}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${exercise.completed
                                    ? 'border-green-200 bg-green-50'
                                    : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                                    {exercise.completed ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <span>{exercise.sets} sets</span>
                                    <span>•</span>
                                    <span>{exercise.reps ? `${exercise.reps} reps` : exercise.duration}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getExerciseTypeColor(exercise.type)}`}>
                                        {exercise.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => handleNavigation('/trainee/private-plan')}
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Target className="w-5 h-5" />
                            <span>View Full Plan</span>
                        </button>
                        <button
                            onClick={() => handleNavigation('/trainee/ai-tracker')}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
                        >
                            <Zap className="w-5 h-5" />
                            <span>Track with AI</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Coach Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Coach</h3>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{traineeData.coachName}</h4>
                                <p className="text-sm text-gray-600">{traineeData.planName}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium text-gray-700">4.9</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Workouts */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Workouts</h3>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                                <span>View All</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentWorkouts.map((workout, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Dumbbell className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{workout.date}</div>
                                            <div className="text-sm text-gray-600">
                                                {workout.exercises} exercises • {workout.duration}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-sm font-medium ${workout.completion === 100 ? 'text-green-600' : 'text-yellow-600'
                                            }`}>
                                            {workout.completion}%
                                        </div>
                                        <div className="text-xs text-gray-500">completed</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TraineeDashboard;
