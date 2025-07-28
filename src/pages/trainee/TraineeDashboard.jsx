import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate(); // أضف هذا السطر هنا
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
            case 'strength': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
            case 'cardio': return 'bg-red-400/20 text-red-400 border border-red-400/30';
            case 'core': return 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30';
            default: return 'bg-white/10 text-white/70 border border-white/20';
        }
    };

    const getSubscriptionStatusBadge = () => {
        switch (traineeData.subscriptionStatus) {
            case 'active':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-400/20 text-green-400 border border-green-400/30">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Active Subscription
                    </div>
                );
            case 'pending':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                        <Clock className="w-4 h-4 mr-1" />
                        Pending Approval
                    </div>
                );
            default:
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/70 border border-white/20">
                        No Active Plan
                    </div>
                );
        }
    };


    // بهذه الدالة:
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Welcome back, {traineeData.name}! 👋
                            </h1>
                            <p className="text-white/70">Ready to crush your fitness goals today?</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            {getSubscriptionStatusBadge()}
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                                <Calendar className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">7</div>
                                <div className="text-sm text-white/70">Days this week</div>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center border border-emerald-400/30">
                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">24</div>
                                <div className="text-sm text-white/70">Workouts completed</div>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                                <TrendingUp className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">18h</div>
                                <div className="text-sm text-white/70">Total training time</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Progress Overview */}
                <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Today's Workout</h2>
                        <div className="flex items-center space-x-2">
                            <div className="text-sm text-white/70">Progress</div>
                            <div className="text-lg font-bold text-blue-400">{completedCount}/{totalCount}</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-white/70 mb-2">
                            <span>Completion</span>
                            <span>{completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 border border-white/20">
                            <div
                                className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-500"
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
                                    ? 'border-green-400/50 bg-green-400/10 backdrop-blur-sm'
                                    : 'border-white/20 bg-white/5 hover:border-blue-500/50 hover:bg-white/10 backdrop-blur-sm'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-white">{exercise.name}</h3>
                                    {exercise.completed ? (
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-white/70 mb-2">
                                    <span>{exercise.sets} sets</span>
                                    <span>•</span>
                                    <span>{exercise.reps ? `${exercise.reps} reps` : exercise.duration}</span>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${getExerciseTypeColor(exercise.type)}`}>
                                    {exercise.type}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => handleNavigation("/trainee/daily-plan")}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25"
                        >
                            <Target className="w-5 h-5" />
                            <span>View Full Plan</span>
                        </button>
                        <button
                            onClick={() => handleNavigation("/trainee/ai-tracker")}
                            className="flex-1 bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-400/25"
                        >
                            <Zap className="w-5 h-5" />
                            <span>Track with AI</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Coach Info Card */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-3">Your Coach</h3>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                                <User className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-white">{traineeData.coachName}</h4>
                                <p className="text-sm text-white/70">{traineeData.planName}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium text-white/70">4.9</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Workouts */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Workouts</h3>
                            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center space-x-1 transition-colors">
                                <span>View All</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentWorkouts.map((workout, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                                            <Dumbbell className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{workout.date}</div>
                                            <div className="text-sm text-white/70">
                                                {workout.exercises} exercises • {workout.duration}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-sm font-medium ${workout.completion === 100 ? 'text-green-400' : 'text-yellow-500'
                                            }`}>
                                            {workout.completion}%
                                        </div>
                                        <div className="text-xs text-white/50">completed</div>
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