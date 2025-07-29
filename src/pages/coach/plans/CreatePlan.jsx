import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, X, GripVertical, Save, ArrowLeft, Calendar, Clock, Target, User } from 'lucide-react';

const CreatePlan = () => {
    const navigate = useNavigate();
    const [planName, setPlanName] = useState('');
    const [expandedDay, setExpandedDay] = useState(1);
    const [planDays, setPlanDays] = useState(() => {
        const days = {};
        for (let i = 1; i <= 30; i++) {
            days[i] = [];
        }
        return days;
    });
    const [showWorkoutPicker, setShowWorkoutPicker] = useState(false);
    const [currentDay, setCurrentDay] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    // Mock workout library data
    const workoutLibrary = [
        {
            id: 1,
            name: 'Full Body HIIT',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop',
            muscleGroup: 'Full Body',
            duration: '45 min',
            difficulty: 'Intermediate'
        },
        {
            id: 2,
            name: 'Upper Body Strength',
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=150&fit=crop',
            muscleGroup: 'Upper Body',
            duration: '30 min',
            difficulty: 'Advanced'
        },
        {
            id: 3,
            name: 'Core Blast',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop',
            muscleGroup: 'Core',
            duration: '20 min',
            difficulty: 'Beginner'
        },
        {
            id: 4,
            name: 'Leg Day Power',
            image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=200&h=150&fit=crop',
            muscleGroup: 'Legs',
            duration: '40 min',
            difficulty: 'Advanced'
        },
        {
            id: 5,
            name: 'Cardio Burn',
            image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=200&h=150&fit=crop',
            muscleGroup: 'Cardio',
            duration: '25 min',
            difficulty: 'Intermediate'
        },
        {
            id: 6,
            name: 'Yoga Flow',
            image: 'https://images.unsplash.com/photo-1506629905607-0b1f6bc19b62?w=200&h=150&fit=crop',
            muscleGroup: 'Flexibility',
            duration: '35 min',
            difficulty: 'Beginner'
        }
    ];

    const handleAddWorkout = (day) => {
        setCurrentDay(day);
        setShowWorkoutPicker(true);
    };

    const handleSelectWorkout = (workout) => {
        setPlanDays(prev => ({
            ...prev,
            [currentDay]: [...prev[currentDay], { ...workout, id: Date.now() + Math.random() }]
        }));
    };

    const handleRemoveWorkout = (day, workoutId) => {
        setPlanDays(prev => ({
            ...prev,
            [day]: prev[day].filter(workout => workout.id !== workoutId)
        }));
    };

    const handleDragStart = (e, workout, day) => {
        setDraggedItem({ workout, day, index: planDays[day].indexOf(workout) });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e, day, targetIndex) => {
        e.preventDefault();
        if (!draggedItem || draggedItem.day !== day) return;

        const newWorkouts = [...planDays[day]];
        const draggedWorkout = newWorkouts[draggedItem.index];
        newWorkouts.splice(draggedItem.index, 1);
        newWorkouts.splice(targetIndex, 0, draggedWorkout);

        setPlanDays(prev => ({
            ...prev,
            [day]: newWorkouts
        }));

        setDraggedItem(null);
        setDragOverIndex(null);
    };

    const handleSavePlan = () => {
        const plan = {
            name: planName,
            days: planDays,
            createdAt: new Date().toISOString()
        };
        console.log('Saving plan:', plan);
        // In a real app, this would save to backend
        alert('Training plan saved successfully!');
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'text-green-400';
            case 'Intermediate': return 'text-yellow-400';
            case 'Advanced': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const WorkoutPicker = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-white/20">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Select Workouts for Day {currentDay}</h3>
                    <button
                        onClick={() => setShowWorkoutPicker(false)}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workoutLibrary.map(workout => (
                        <div
                            key={workout.id}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-pointer hover:scale-105"
                            onClick={() => handleSelectWorkout(workout)}
                        >
                            <img
                                src={workout.image}
                                alt={workout.name}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="text-white font-semibold mb-2">{workout.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                                <Target size={16} />
                                <span>{workout.muscleGroup}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                                <Clock size={16} />
                                <span>{workout.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <User size={16} />
                                <span className={getDifficultyColor(workout.difficulty)}>{workout.difficulty}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => setShowWorkoutPicker(false)}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-medium"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/coach/dashboard')}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                            <Calendar className="text-blue-400" />
                            Create New Training Plan
                        </h1>
                        <input
                            type="text"
                            placeholder="Enter Plan Name (e.g., 30-Day Weight Loss)"
                            value={planName}
                            onChange={(e) => setPlanName(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Days Container */}
                <div className="space-y-4">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                        <div key={day} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                            <button
                                onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                                        {day}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">Day {day}</h3>
                                    {planDays[day].length > 0 && (
                                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                            {planDays[day].length} workout{planDays[day].length !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                                {expandedDay === day ? <ChevronUp className="text-white/60" /> : <ChevronDown className="text-white/60" />}
                            </button>

                            {expandedDay === day && (
                                <div className="px-6 pb-6 space-y-4">
                                    {/* Add Workout Button */}
                                    <button
                                        onClick={() => handleAddWorkout(day)}
                                        className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-white/60 hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Plus size={20} />
                                        Add Workout
                                    </button>

                                    {/* Workout List */}
                                    {planDays[day].length > 0 && (
                                        <div className="space-y-3">
                                            {planDays[day].map((workout, index) => (
                                                <div
                                                    key={workout.id}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, workout, day)}
                                                    onDragOver={(e) => handleDragOver(e, index)}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={(e) => handleDrop(e, day, index)}
                                                    className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-move ${dragOverIndex === index ? 'border-blue-400 bg-blue-400/10' : ''
                                                        }`}
                                                >
                                                    <GripVertical className="text-white/40 flex-shrink-0" size={16} />
                                                    <img
                                                        src={workout.image}
                                                        alt={workout.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="text-white font-semibold">{workout.name}</h4>
                                                        <div className="flex items-center gap-4 text-sm text-white/70">
                                                            <span>{workout.muscleGroup}</span>
                                                            <span>{workout.duration}</span>
                                                            <span className={getDifficultyColor(workout.difficulty)}>{workout.difficulty}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveWorkout(day, workout.id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Day Actions */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => setExpandedDay(day < 30 ? day + 1 : null)}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-medium"
                                        >
                                            {day < 30 ? 'Next Day' : 'Complete'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Save Actions */}
                <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="flex gap-4 justify-end">
                        <button className="px-6 py-3 text-white/60 hover:text-white transition-colors">
                            Discard Plan
                        </button>
                        <button
                            onClick={handleSavePlan}
                            disabled={!planName.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Save size={20} />
                            Save Training Plan
                        </button>
                    </div>
                </div>
            </div>

            {/* Workout Picker Modal */}
            {showWorkoutPicker && <WorkoutPicker />}
        </div>
    );
};

export default CreatePlan;