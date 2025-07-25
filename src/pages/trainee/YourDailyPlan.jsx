import React, { useState, useEffect } from 'react';
import TraineeNavbar from '../../components/layout/TraineeNavbar';
import { useNavigate } from 'react-router-dom';  // إضافة useNavigate هنا
import {
    Play,
    CheckCircle2,
    Circle,
    Calendar,
    User,
    Zap,
    Target,
    Clock,
    Trophy,
    ArrowRight
} from 'lucide-react';

const TraineeDashboard = () => {
    const [exercises, setExercises] = useState([
        {
            id: 1,
            name: "Push-ups",
            targetMuscle: "Chest & Triceps",
            duration: "3 sets × 12 reps",
            image: "💪",
            completed: false,
            difficulty: "Intermediate"
        },
        {
            id: 2,
            name: "Squats",
            targetMuscle: "Legs & Glutes",
            duration: "4 sets × 15 reps",
            image: "🦵",
            completed: true,
            difficulty: "Beginner"
        },
        {
            id: 3,
            name: "Plank Hold",
            targetMuscle: "Core",
            duration: "3 sets × 45s",
            image: "🏋️",
            completed: false,
            difficulty: "Intermediate"
        },
        {
            id: 4,
            name: "Burpees",
            targetMuscle: "Full Body",
            duration: "3 sets × 10 reps",
            image: "🔥",
            completed: false,
            difficulty: "Advanced"
        },
        {
            id: 5,
            name: "Mountain Climbers",
            targetMuscle: "Core & Cardio",
            duration: "3 sets × 30s",
            image: "⛰️",
            completed: true,
            difficulty: "Intermediate"
        }
    ]);

    const [currentDate, setCurrentDate] = useState(new Date());
    const coachName = "Sarah Johnson"; // This would come from user context/API
    const navigate = useNavigate();  // استخدام useNavigate

    const completedCount = exercises.filter(ex => ex.completed).length;
    const totalCount = exercises.length;
    const allCompleted = completedCount === totalCount;

    const toggleExerciseStatus = (id) => {
        setExercises(prev => prev.map(ex =>
            ex.id === id ? { ...ex, completed: !ex.completed } : ex
        ));
    };

    const handleExerciseClick = (exerciseId) => {
        // Navigate to exercise detail page
        navigate(`/trainee/exercise-detail/${exerciseId}`);  // التنقل إلى صفحة التمرين
    };

    const handleStartWithAI = () => {
        // Navigate to AI workout tracker
        navigate('/trainee/AIWorkoutTracker');  // التنقل إلى AI Tracker
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'text-green-400 bg-green-400/10';
            case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
            case 'advanced': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-emerald-400" />
                            <span className="text-white font-medium">{formatDate(currentDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-gray-300">Coach: {coachName}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Main Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Your Daily Plan</h1>
                    <p className="text-gray-300">Stay consistent, stay strong</p>
                </div>

                {/* Progress Overview */}
                <div className="mb-8">
                    <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Today's Progress</h2>
                            <Trophy className="w-6 h-6 text-yellow-400" />
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex-1 bg-gray-700/50 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-white font-medium">{completedCount}/{totalCount}</span>
                        </div>

                        {allCompleted ? (
                            <div className="flex items-center space-x-2 text-emerald-400">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-medium">Well done! You've completed today's workout</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 text-yellow-400">
                                <Clock className="w-5 h-5" />
                                <span className="font-medium">Please complete all exercises to finish your session</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Exercise Cards */}
                <div className="space-y-4 mb-8">
                    {exercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            className={`backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 transition-all duration-300 hover:bg-white/15 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/20 cursor-pointer ${exercise.completed ? 'ring-2 ring-emerald-400/30' : ''
                                }`}
                            onClick={() => handleExerciseClick(exercise.id)}  // استخدام التنقل هنا
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-start space-x-4 flex-1">
                                    {/* Exercise Icon/Image */}
                                    <div className="text-4xl bg-white/10 rounded-xl p-3 flex items-center justify-center">
                                        {exercise.image}
                                    </div>

                                    {/* Exercise Details */}
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-semibold text-white">{exercise.name}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                                {exercise.difficulty}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-4 text-gray-300 mb-3">
                                            <div className="flex items-center space-x-1">
                                                <Target className="w-4 h-4" />
                                                <span className="text-sm">{exercise.targetMuscle}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm">{exercise.duration}</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExerciseStatus(exercise.id);
                                                }}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${exercise.completed
                                                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                                    : 'bg-gray-600/30 text-gray-300 hover:bg-gray-600/50'
                                                    }`}
                                            >
                                                {exercise.completed ? (
                                                    <CheckCircle2 className="w-4 h-4" />
                                                ) : (
                                                    <Circle className="w-4 h-4" />
                                                )}
                                                <span className="text-sm font-medium">
                                                    {exercise.completed ? 'Completed' : 'Mark as Complete'}
                                                </span>
                                            </button>

                                            {exercise.completed && (
                                                <button
                                                    onClick={handleStartWithAI}  // التنقل إلى AI هنا
                                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30"
                                                >
                                                    <Zap className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Start with AI</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <TraineeNavbar />
        </div>
    );
};

export default TraineeDashboard;
