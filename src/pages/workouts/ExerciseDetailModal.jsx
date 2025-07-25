import React from 'react';
import { ArrowLeft, Clock, Target, Dumbbell, Users, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExerciseDetail = () => {
    const exerciseData = {
        name: "Barbell Squat",
        description: "A compound exercise that targets multiple muscle groups, primarily focusing on the quadriceps, glutes, and hamstrings. Essential for building lower body strength and power.",
        targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
        equipment: "Barbell",
        duration: "3 sets × 8-12 reps",
        restTime: "2-3 minutes",
        difficulty: "Intermediate",
        coachNotes: "Keep your core tight throughout the movement and ensure your knees track over your toes. Start with bodyweight if you're new to squats."
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            {/* Navigation Header */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Exercise Details
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="mb-8">
                    <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-emerald-400/20 rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            {/* Exercise Info */}
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                    {exerciseData.name}
                                </h2>
                                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                    {exerciseData.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {exerciseData.targetMuscles.map((muscle, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-blue-500/30 rounded-full text-sm font-medium border border-blue-400/30"
                                        >
                                            {muscle}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Exercise Preview */}
                            <div className="relative">
                                <div className="aspect-square bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full flex items-center justify-center">
                                            <Dumbbell className="w-12 h-12 text-white" />
                                        </div>
                                        <p className="text-slate-400">Exercise Animation</p>
                                        <p className="text-xs text-slate-500 mt-1">3D Preview Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Equipment */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                                <Dumbbell className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="font-semibold text-slate-300">Equipment</h3>
                        </div>
                        <p className="text-white font-bold">{exerciseData.equipment}</p>
                    </div>

                    {/* Target */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                <Target className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-slate-300">Sets × Reps</h3>
                        </div>
                        <p className="text-white font-bold">{exerciseData.duration}</p>
                    </div>

                    {/* Rest Time */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                                <Clock className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="font-semibold text-slate-300">Rest Time</h3>
                        </div>
                        <p className="text-white font-bold">{exerciseData.restTime}</p>
                    </div>

                    {/* Difficulty */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                                <Users className="w-5 h-5 text-orange-400" />
                            </div>
                            <h3 className="font-semibold text-slate-300">Difficulty</h3>
                        </div>
                        <p className="text-white font-bold">{exerciseData.difficulty}</p>
                    </div>
                </div>

                {/* Coach Notes */}
                {exerciseData.coachNotes && (
                    <div className="mb-8">
                        <div className="backdrop-blur-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-400/20">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-amber-500/20 rounded-lg flex-shrink-0">
                                    <AlertCircle className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-400 mb-2">Coach Notes</h3>
                                    <p className="text-slate-300 leading-relaxed">{exerciseData.coachNotes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        Add to Workout
                    </button>
                    <button className="flex-1 backdrop-blur-xl bg-white/10 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                        Start Exercise
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetail;