import { useState, useEffect } from 'react';
import { X, Info, Clock, Weight, FileText, Repeat } from 'lucide-react';

const EditExerciseModal = ({
    isOpen,
    onClose,
    onSave,
    exercise = {},
    initialData = {}
}) => {
    const [formData, setFormData] = useState({
        duration: initialData.duration || '',
        weight: initialData.weight || '',
        restTime: initialData.restTime || 60,
        notes: initialData.notes || ''
    });

    const [errors, setErrors] = useState({});
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                duration: initialData.duration || '',
                weight: initialData.weight || '',
                restTime: initialData.restTime || 60,
                notes: initialData.notes || ''
            });
            setErrors({});
        }
    }, [isOpen, initialData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.duration || formData.duration <= 0) {
            newErrors.duration = 'Duration/reps must be greater than 0';
        }

        if (!formData.restTime || formData.restTime < 0) {
            newErrors.restTime = 'Rest time must be 0 or greater';
        }

        if (formData.weight && formData.weight < 0) {
            newErrors.weight = 'Weight must be positive';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave({
                ...formData,
                duration: Number(formData.duration),
                weight: formData.weight ? Number(formData.weight) : null,
                restTime: Number(formData.restTime)
            });
            onClose();
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md mx-auto transform animate-in zoom-in-95 duration-300 ease-out">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                    <div>
                        <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                            Edit Exercise
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {exercise.name || 'Custom Exercise'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100/80 rounded-full transition-colors duration-200"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-6">
                    {/* Duration/Reps Field */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Repeat size={16} className="text-emerald-600" />
                            <label className="text-sm font-medium text-gray-700">
                                Duration or Repetitions
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Info size={14} className="text-gray-400" />
                                </button>
                                {showTooltip && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-10">
                                        Enter reps (e.g., 12) or seconds (e.g., 30)
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <input
                            type="number"
                            value={formData.duration}
                            onChange={(e) => handleInputChange('duration', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-0 ${errors.duration
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-emerald-400'
                                }`}
                            placeholder="Enter reps or seconds"
                            min="1"
                        />
                        {errors.duration && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.duration}
                            </p>
                        )}
                    </div>

                    {/* Weight Field */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Weight size={16} className="text-blue-600" />
                            <label className="text-sm font-medium text-gray-700">
                                Weight (optional)
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.weight}
                                onChange={(e) => handleInputChange('weight', e.target.value)}
                                className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-0 ${errors.weight
                                    ? 'border-red-300 focus:border-red-500'
                                    : 'border-gray-200 focus:border-blue-400'
                                    }`}
                                placeholder="Enter weight"
                                min="0"
                                step="0.5"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                lbs
                            </span>
                        </div>
                        {errors.weight && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.weight}
                            </p>
                        )}
                    </div>

                    {/* Rest Time Field */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-purple-600" />
                            <label className="text-sm font-medium text-gray-700">
                                Rest Time (seconds)
                            </label>
                        </div>
                        <input
                            type="number"
                            value={formData.restTime}
                            onChange={(e) => handleInputChange('restTime', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-0 ${errors.restTime
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-purple-400'
                                }`}
                            placeholder="Enter rest time"
                            min="0"
                        />
                        {errors.restTime && (
                            <p className="text-red-500 text-xs flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {errors.restTime}
                            </p>
                        )}
                    </div>

                    {/* Notes Field */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-indigo-600" />
                            <label className="text-sm font-medium text-gray-700">
                                Coach Notes (optional)
                            </label>
                        </div>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-0 focus:border-indigo-400 resize-none"
                            placeholder="Add coaching notes for this exercise..."
                            rows="3"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-medium transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium transition-all duration-200 hover:from-emerald-600 hover:to-blue-600 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Demo component to show the modal in action
const EditExerciseModalDemo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exerciseData, setExerciseData] = useState({
        duration: 12,
        weight: 135,
        restTime: 90,
        notes: 'Focus on controlled movements'
    });

    const handleSave = (data) => {
        setExerciseData(data);
        console.log('Exercise data saved:', data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-emerald-900 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        FitHub - Edit Exercise Modal
                    </h1>
                    <p className="text-gray-300">
                        Coaches can customize exercise settings for their training plans
                    </p>
                </div>

                {/* Exercise Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Barbell Squat
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-gray-300">
                                    <span className="text-emerald-400">Duration:</span> {exerciseData.duration} reps
                                </div>
                                <div className="text-gray-300">
                                    <span className="text-blue-400">Weight:</span> {exerciseData.weight || 'Bodyweight'} {exerciseData.weight && 'lbs'}
                                </div>
                                <div className="text-gray-300">
                                    <span className="text-purple-400">Rest:</span> {exerciseData.restTime}s
                                </div>
                                <div className="text-gray-300">
                                    <span className="text-indigo-400">Notes:</span> {exerciseData.notes || 'None'}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div className="text-center text-gray-400 text-sm">
                    Click "Edit" to open the modal and customize exercise settings
                </div>
            </div>

            <EditExerciseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                exercise={{ name: 'Barbell Squat' }}
                initialData={exerciseData}
            />
        </div>
    );
};

export default EditExerciseModalDemo;