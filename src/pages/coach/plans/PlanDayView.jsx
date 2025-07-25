import React, { useState } from 'react';
import { ArrowLeft, Edit3, Plus, GripVertical, Dumbbell, Clock, Target, Settings } from 'lucide-react';

const PlanDayView = () => {
    const [planName] = useState("Full Body Strength");
    const [dayNumber] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState(null);
    const [workouts, setWorkouts] = useState([
        {
            id: 1,
            name: "Push-ups",
            muscleGroup: "Chest, Shoulders",
            equipment: "Bodyweight",
            thumbnail: "💪",
            reps: 12,
            sets: 3,
            weight: "Bodyweight",
            duration: "45 sec",
            notes: "Keep core tight throughout movement"
        },
        {
            id: 2,
            name: "Squats",
            muscleGroup: "Legs, Glutes",
            equipment: "Bodyweight",
            thumbnail: "🏋️",
            reps: 15,
            sets: 3,
            weight: "Bodyweight",
            duration: "60 sec",
            notes: "Focus on depth and form"
        },
        {
            id: 3,
            name: "Plank",
            muscleGroup: "Core",
            equipment: "Bodyweight",
            thumbnail: "🧘",
            reps: 1,
            sets: 3,
            weight: "Bodyweight",
            duration: "30 sec",
            notes: "Hold steady position"
        }
    ]);

    const [draggedItem, setDraggedItem] = useState(null);
    const [dragOverItem, setDragOverItem] = useState(null);

    const handleDragStart = (e, workout) => {
        setDraggedItem(workout);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, workout) => {
        e.preventDefault();
        setDragOverItem(workout);
    };

    const handleDragEnd = () => {
        if (draggedItem && dragOverItem && draggedItem.id !== dragOverItem.id) {
            const draggedIndex = workouts.findIndex(w => w.id === draggedItem.id);
            const dragOverIndex = workouts.findIndex(w => w.id === dragOverItem.id);

            const newWorkouts = [...workouts];
            const [removed] = newWorkouts.splice(draggedIndex, 1);
            newWorkouts.splice(dragOverIndex, 0, removed);

            setWorkouts(newWorkouts);
        }
        setDraggedItem(null);
        setDragOverItem(null);
    };

    const handleEditWorkout = (workout) => {
        setEditingWorkout(workout);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedWorkout) => {
        setWorkouts(workouts.map(w =>
            w.id === updatedWorkout.id ? updatedWorkout : w
        ));
        setIsEditModalOpen(false);
        setEditingWorkout(null);
    };

    const handleAddWorkout = () => {
        // In a real app, this would open the workout library
        const newWorkout = {
            id: Date.now(),
            name: "New Exercise",
            muscleGroup: "Various",
            equipment: "Bodyweight",
            thumbnail: "✨",
            reps: 10,
            sets: 3,
            weight: "Bodyweight",
            duration: "60 sec",
            notes: "Add your notes here"
        };
        setWorkouts([...workouts, newWorkout]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Day {dayNumber} of "{planName}"
                            </h1>
                            <p className="text-gray-600 text-sm">Manage exercises for this training day</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Workouts List */}
                <div className="space-y-4 mb-8">
                    {workouts.map((workout, index) => (
                        <div
                            key={workout.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, workout)}
                            onDragOver={(e) => handleDragOver(e, workout)}
                            onDragEnd={handleDragEnd}
                            className={`bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move ${dragOverItem?.id === workout.id ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Drag Handle */}
                                <div className="flex-shrink-0">
                                    <GripVertical className="w-5 h-5 text-gray-400" />
                                </div>

                                {/* Workout Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="text-3xl">{workout.thumbnail}</div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-800">{workout.name}</h3>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-sm text-gray-600 flex items-center gap-1">
                                                    <Target className="w-4 h-4" />
                                                    {workout.muscleGroup}
                                                </span>
                                                <span className="text-sm text-gray-600 flex items-center gap-1">
                                                    <Dumbbell className="w-4 h-4" />
                                                    {workout.equipment}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Exercise Details */}
                                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                        <div className="bg-blue-50 px-3 py-1 rounded-full">
                                            <span className="text-blue-700">{workout.sets} sets × {workout.reps} reps</span>
                                        </div>
                                        <div className="bg-green-50 px-3 py-1 rounded-full">
                                            <span className="text-green-700 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {workout.duration}
                                            </span>
                                        </div>
                                        <div className="bg-purple-50 px-3 py-1 rounded-full">
                                            <span className="text-purple-700">{workout.weight}</span>
                                        </div>
                                    </div>

                                    {workout.notes && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-700">{workout.notes}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Edit Button */}
                                <button
                                    onClick={() => handleEditWorkout(workout)}
                                    className="flex-shrink-0 p-2 hover:bg-white/50 rounded-xl transition-all duration-200"
                                >
                                    <Edit3 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Workout Button */}
                <div className="mb-8">
                    <button
                        onClick={handleAddWorkout}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Another Workout
                    </button>
                </div>

                {/* Save Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-gray-800">Ready to save your changes?</h3>
                            <p className="text-sm text-gray-600">Your workout plan will be updated</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                                Cancel
                            </button>
                            <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingWorkout && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Edit Exercise</h2>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Name</label>
                                    <input
                                        type="text"
                                        value={editingWorkout.name}
                                        onChange={(e) => setEditingWorkout({ ...editingWorkout, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sets</label>
                                        <input
                                            type="number"
                                            value={editingWorkout.sets}
                                            onChange={(e) => setEditingWorkout({ ...editingWorkout, sets: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Reps</label>
                                        <input
                                            type="number"
                                            value={editingWorkout.reps}
                                            onChange={(e) => setEditingWorkout({ ...editingWorkout, reps: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                                    <input
                                        type="text"
                                        value={editingWorkout.weight}
                                        onChange={(e) => setEditingWorkout({ ...editingWorkout, weight: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={editingWorkout.duration}
                                        onChange={(e) => setEditingWorkout({ ...editingWorkout, duration: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Coach Notes</label>
                                    <textarea
                                        value={editingWorkout.notes}
                                        onChange={(e) => setEditingWorkout({ ...editingWorkout, notes: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSaveEdit(editingWorkout)}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanDayView;
