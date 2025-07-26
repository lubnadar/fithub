import React, { useState } from 'react';
import TraineeNavbar from '../../components/layout/TraineeNavbar';
import {
    Calendar,
    Play,
    Clock,
    Target,
    MessageCircle,
    CheckCircle,
    Star,
    ArrowLeft,
    Dumbbell,
    Timer,
    Zap
} from 'lucide-react';

const PrivatePlanView = () => {
    const [selectedDay, setSelectedDay] = useState(1);
    const [completedDays, setCompletedDays] = useState([1, 2, 3, 4, 5]); // Mock completed days
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Mock navigation functions
    const navigateToExercise = (workoutId) => {
        alert(`Navigating to exercise ${workoutId} - would route to /exercise/${workoutId}`);
    };

    const navigateToAITracker = () => {
        alert('Navigating to AI Tracker - would route to /ai-tracker');
    };

    const navigateToDashboard = () => {
        alert('Navigating to Dashboard - would route to /dashboard');
    };

    // Mock data for workouts - in real app this would come from API
    const workoutData = {
        1: [
            {
                id: 1,
                name: "Morning Cardio Blast",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
                type: "duration",
                value: "30 min",
                target: "Cardiovascular",
                equipment: "Treadmill",
                coachNotes: "Focus on maintaining steady pace. Don't push too hard on day 1!"
            },
            {
                id: 2,
                name: "Upper Body Strength",
                image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
                type: "reps",
                value: "3 sets x 12 reps",
                target: "Chest, Arms",
                equipment: "Dumbbells",
                coachNotes: "Keep form strict. Better to use lighter weight with perfect form."
            }
        ],
        2: [
            {
                id: 3,
                name: "Core Strengthening",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
                type: "duration",
                value: "25 min",
                target: "Core",
                equipment: "Mat",
                coachNotes: "Focus on controlled movements. Feel the burn!"
            }
        ],
        3: [
            {
                id: 4,
                name: "HIIT Training",
                image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop",
                type: "duration",
                value: "20 min",
                target: "Full Body",
                equipment: "Bodyweight",
                coachNotes: "Push yourself! This is where the magic happens."
            }
        ]
    };

    const getCurrentDate = () => {
        const today = new Date();
        return today.getDate();
    };

    const currentDay = getCurrentDate();
    const todayInPlan = Math.min(currentDay, 30); // Assuming plan started on day 1 of month

    const getDayStatus = (day) => {
        if (completedDays.includes(day)) return 'completed';
        if (day === todayInPlan) return 'today';
        if (day < todayInPlan) return 'missed';
        return 'upcoming';
    };

    const getDayButtonClass = (day) => {
        const status = getDayStatus(day);
        const baseClass = "w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 cursor-pointer";

        switch (status) {
            case 'completed':
                return `${baseClass} bg-emerald-500 text-white hover:bg-emerald-400`;
            case 'today':
                return `${baseClass} bg-blue-500 text-white shadow-lg shadow-blue-500/50 animate-pulse hover:bg-blue-400`;
            case 'missed':
                return `${baseClass} bg-red-500 text-white hover:bg-red-400`;
            case 'upcoming':
                return `${baseClass} bg-slate-600 text-slate-300 hover:bg-slate-500`;
            default:
                return `${baseClass} bg-slate-600 text-slate-300`;
        }
    };

    const handleWorkoutClick = (workoutId) => {
        navigateToExercise(workoutId);
    };

    const handleStartWorkout = () => {
        navigateToAITracker();
    };

    const handleDayComplete = (day) => {
        if (!completedDays.includes(day)) {
            setCompletedDays([...completedDays, day]);

            // If completing day 30, show rating modal
            if (day === 30) {
                setShowRatingModal(true);
            }
        }
    };

    const handleRatingSubmit = () => {
        // In real app, this would send to API
        console.log('Rating submitted:', { rating, comment });
        setShowRatingModal(false);
        // Show thank you message
        alert('Thank you for rating your coach! Your feedback helps us improve.');
    };

    const selectedWorkouts = workoutData[selectedDay] || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={navigateToDashboard}
                                className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">My 30-Day Plan</h1>
                                <p className="text-sm text-slate-400">Day {selectedDay} of 30</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-blue-400" />
                            <span className="text-sm text-slate-300">
                                {completedDays.length}/30 completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="bg-slate-800 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-300">Progress</span>
                        <span className="text-sm font-medium text-blue-400">
                            {Math.round((completedDays.length / 30) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(completedDays.length / 30) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Day Selector - Horizontal Calendar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="bg-slate-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">Select Day</h2>
                    <div className="overflow-x-auto">
                        <div className="flex space-x-3 pb-2 min-w-max">
                            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                                <div key={day} className="flex flex-col items-center space-y-2">
                                    <button
                                        onClick={() => setSelectedDay(day)}
                                        className={`${getDayButtonClass(day)} ${selectedDay === day ? 'ring-2 ring-blue-400' : ''
                                            }`}
                                    >
                                        {completedDays.includes(day) ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            day
                                        )}
                                    </button>
                                    <span className="text-xs text-slate-400">
                                        {day === todayInPlan ? 'Today' : `Day ${day}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Day Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Day {selectedDay} Workouts
                    </h2>
                    {selectedWorkouts.length > 0 && (
                        <button
                            onClick={handleStartWorkout}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                            <Play className="h-5 w-5" />
                            <span>Start Workout</span>
                        </button>
                    )}
                </div>

                {selectedWorkouts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedWorkouts.map((workout) => (
                            <div
                                key={workout.id}
                                onClick={() => handleWorkoutClick(workout.id)}
                                className="bg-slate-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700 hover:border-blue-500"
                            >
                                <div className="relative">
                                    <img
                                        src={workout.image}
                                        alt={workout.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            {workout.type === 'duration' ? 'Timed' : 'Reps'}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-white mb-2">{workout.name}</h3>

                                    <div className="flex items-center space-x-4 mb-3">
                                        <div className="flex items-center space-x-1">
                                            {workout.type === 'duration' ? (
                                                <Clock className="h-4 w-4 text-blue-400" />
                                            ) : (
                                                <Dumbbell className="h-4 w-4 text-emerald-400" />
                                            )}
                                            <span className="text-sm text-slate-300">{workout.value}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Target className="h-4 w-4 text-orange-400" />
                                            <span className="text-sm text-slate-300">{workout.target}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-1 mb-3">
                                        <Zap className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm text-slate-300">{workout.equipment}</span>
                                    </div>

                                    {workout.coachNotes && (
                                        <div className="bg-slate-700 rounded-lg p-3 mt-3">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <MessageCircle className="h-4 w-4 text-blue-400" />
                                                <span className="text-sm font-medium text-blue-400">Coach Notes</span>
                                            </div>
                                            <p className="text-sm text-slate-300">{workout.coachNotes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-400 mb-2">No workouts scheduled</h3>
                        <p className="text-slate-500">This day is a rest day or no workouts have been assigned yet.</p>
                    </div>
                )}

                {/* Mark Day Complete Button */}
                {selectedWorkouts.length > 0 && !completedDays.includes(selectedDay) && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => handleDayComplete(selectedDay)}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Mark Day {selectedDay} Complete
                        </button>
                    </div>
                )}
            </div>

            {/* Rating Modal */}
            {showRatingModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-white mb-4">Rate Your Coach</h3>
                        <p className="text-slate-300 mb-6">
                            Congratulations on completing your 30-day plan! How would you rate your coach?
                        </p>

                        <div className="flex justify-center space-x-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`p-1 transition-colors ${star <= rating ? 'text-yellow-400' : 'text-slate-600'
                                        }`}
                                >
                                    <Star className="h-8 w-8 fill-current" />
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about the training plan..."
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 resize-none"
                            rows="3"
                        />

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowRatingModal(false)}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors"
                            >
                                Skip
                            </button>
                            <button
                                onClick={handleRatingSubmit}
                                disabled={rating === 0}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 text-white py-2 px-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivatePlanView;
