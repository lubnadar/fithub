import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Target, Dumbbell, Clock, Timer, MessageSquare, CheckCircle, Camera, ChevronRight } from 'lucide-react';

const ExerciseDetail = () => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();

    const exerciseData = {
        id: 1,
        name: "Barbell Bench Press",
        description: "Lie flat on a bench with your feet firmly planted on the ground. Grip the barbell with hands slightly wider than shoulder-width apart. Lower the bar to your chest with control, then press it back up to the starting position. Keep your core engaged and maintain a slight arch in your back.",
        targetMuscle: "Chest, Triceps, Shoulders",
        equipment: "Barbell, Bench",
        sets: 4,
        reps: "8-10",
        weight: "135 lbs",
        duration: 45,
        restTime: "2-3 minutes",
        coachNotes: "Focus on controlled movement. Don't bounce the bar off your chest. Keep your shoulder blades retracted throughout the movement.",
        currentExercise: 3,
        totalExercises: 8,
        gifUrl: "https://via.placeholder.com/400x300/1e293b/00E6A0?text=Exercise+Animation"
    };

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    const handleDone = () => {
        setIsCompleted(true);
        setTimeout(() => {
            console.log("Moving to next exercise...");
        }, 1000);
    };

    const handleAITracker = () => {
        navigate('/trainee/ai-tracker');
    };

    const progressPercentage = (exerciseData.currentExercise / exerciseData.totalExercises) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700">
                <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-300" />
                    </button>
                    <div className="flex-1 text-center">
                        <div className="text-sm text-slate-400">Exercise {exerciseData.currentExercise} of {exerciseData.totalExercises}</div>
                    </div>
                    <div className="w-10" />
                </div>
                <div className="px-4 pb-3">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
                <div className={`mb-8 transform transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{exerciseData.name}</h1>
                    <div className="flex items-center text-emerald-400 text-sm">
                        <Target className="w-4 h-4 mr-2" />
                        {exerciseData.targetMuscle}
                    </div>
                </div>

                <div className={`mb-8 transform transition-all duration-700 delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-600">
                        <img
                            src={exerciseData.gifUrl}
                            alt={exerciseData.name}
                            className="w-full h-64 md:h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                        <button className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-full transition-colors shadow-lg">
                            <Play className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transform transition-all duration-700 delay-400 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                                <CheckCircle className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-white">Sets & Reps</h3>
                        </div>
                        <p className="text-2xl font-bold text-emerald-400">{exerciseData.sets} × {exerciseData.reps}</p>
                        <p className="text-sm text-slate-400 mt-1">Suggested Weight: {exerciseData.weight}</p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                                <Clock className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="font-semibold text-white">Duration</h3>
                        </div>
                        <p className="text-2xl font-bold text-emerald-400">{exerciseData.duration}s</p>
                        <p className="text-sm text-slate-400 mt-1">Rest: {exerciseData.restTime}</p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                                <Dumbbell className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="font-semibold text-white">Equipment</h3>
                        </div>
                        <p className="text-slate-300">{exerciseData.equipment}</p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                                <Timer className="w-5 h-5 text-orange-400" />
                            </div>
                            <h3 className="font-semibold text-white">Rest Between Sets</h3>
                        </div>
                        <p className="text-slate-300">{exerciseData.restTime}</p>
                    </div>
                </div>

                <div className={`mb-8 transform transition-all duration-700 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                        <h3 className="font-semibold text-white mb-4 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
                            How to Perform
                        </h3>
                        <p className="text-slate-300 leading-relaxed">{exerciseData.description}</p>
                    </div>
                </div>

                {exerciseData.coachNotes && (
                    <div className={`mb-8 transform transition-all duration-700 delay-600 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-6 border border-emerald-500/30">
                            <h3 className="font-semibold text-white mb-3 flex items-center">
                                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                                    C
                                </div>
                                Coach Notes
                            </h3>
                            <p className="text-slate-300 leading-relaxed italic">{exerciseData.coachNotes}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                            onClick={handleDone}
                            disabled={isCompleted}
                            className={`flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${isCompleted
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105'
                                }`}
                        >
                            {isCompleted ? (
                                <>
                                    <CheckCircle className="w-6 h-6 mr-2" />
                                    Completed!
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-6 h-6 mr-2" />
                                    Mark as Done
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleAITracker}
                            className="flex items-center justify-center px-6 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                        >
                            <Camera className="w-6 h-6 mr-2" />
                            Track with AI
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>

                    {isCompleted && (
                        <div className="text-center mt-3 text-emerald-400 text-sm">
                            Great job! Moving to next exercise...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetail;
