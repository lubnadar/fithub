import { useState } from 'react';
import { Upload, Dumbbell, ArrowLeft, CheckCircle, X } from 'lucide-react';
//import { useNavigate } from 'react-router-dom';

export default function RequestNewExercise() {
    const [formData, setFormData] = useState({
        exerciseName: '',
        targetMuscle: '',
        equipment: '',
        type: '',
        description: '',
        file: null
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const muscleGroups = [
        'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core',
        'Glutes', 'Calves', 'Full Body', 'Cardio'
    ];

    const equipmentOptions = [
        'Bodyweight', 'Dumbbell', 'Barbell', 'Resistance Band',
        'Kettlebell', 'Cable Machine', 'Pull-up Bar', 'Medicine Ball',
        'Suspension Trainer', 'Other'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    file: 'File size must be less than 10MB'
                }));
                return;
            }
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    file: 'Please upload a valid image or video file'
                }));
                return;
            }
            setFormData(prev => ({
                ...prev,
                file
            }));
            if (errors.file) {
                setErrors(prev => ({
                    ...prev,
                    file: ''
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.exerciseName.trim()) {
            newErrors.exerciseName = 'Exercise name is required';
        }
        if (!formData.targetMuscle) {
            newErrors.targetMuscle = 'Please select a target muscle group';
        }
        if (!formData.equipment) {
            newErrors.equipment = 'Please select required equipment';
        }
        if (!formData.type) {
            newErrors.type = 'Please select exercise type';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description and instructions are required';
        } else if (formData.description.trim().length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Exercise request submitted:', formData);
        setIsSubmitting(false);
        setShowSuccess(true);

        // Reset form
        setFormData({
            exerciseName: '',
            targetMuscle: '',
            equipment: '',
            type: '',
            description: '',
            file: null
        });

        // Reset file input
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = '';
    };

    const closeSuccessModal = () => {
        setShowSuccess(false);
    };

    return (
        <div className="min-h-screen bg-slate-800 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full mb-4">
                        <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Request New Exercise
                    </h1>
                    <p className="text-slate-300 text-lg">
                        Help expand our workout library by suggesting new exercises
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-slate-700 backdrop-blur-lg border border-slate-600 rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="space-y-6">
                        {/* Exercise Name */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Exercise Name *
                            </label>
                            <input
                                type="text"
                                name="exerciseName"
                                value={formData.exerciseName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-slate-600 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                                placeholder="e.g., Diamond Push-ups"
                            />
                            {errors.exerciseName && (
                                <p className="text-red-400 text-sm mt-1">{errors.exerciseName}</p>
                            )}
                        </div>

                        {/* Target Muscle Group */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Target Muscle Group *
                            </label>
                            <select
                                name="targetMuscle"
                                value={formData.targetMuscle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-slate-600 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                            >
                                <option value="" className="bg-slate-700">Select muscle group</option>
                                {muscleGroups.map(muscle => (
                                    <option key={muscle} value={muscle} className="bg-slate-700">
                                        {muscle}
                                    </option>
                                ))}
                            </select>
                            {errors.targetMuscle && (
                                <p className="text-red-400 text-sm mt-1">{errors.targetMuscle}</p>
                            )}
                        </div>

                        {/* Required Equipment */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Required Equipment *
                            </label>
                            <select
                                name="equipment"
                                value={formData.equipment}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-slate-600 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                            >
                                <option value="" className="bg-slate-700">Select equipment</option>
                                {equipmentOptions.map(equipment => (
                                    <option key={equipment} value={equipment} className="bg-slate-700">
                                        {equipment}
                                    </option>
                                ))}
                            </select>
                            {errors.equipment && (
                                <p className="text-red-400 text-sm mt-1">{errors.equipment}</p>
                            )}
                        </div>

                        {/* Exercise Type */}
                        <div>
                            <label className="block text-white font-semibold mb-3">
                                Exercise Type *
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="reps"
                                        checked={formData.type === 'reps'}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-emerald-400 bg-slate-600 border-slate-600 focus:ring-emerald-400 focus:ring-2"
                                    />
                                    <span className="ml-3 text-white">Reps-based (e.g., 10 reps, 3 sets)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="time"
                                        checked={formData.type === 'time'}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-emerald-400 bg-slate-600 border-slate-600 focus:ring-emerald-400 focus:ring-2"
                                    />
                                    <span className="ml-3 text-white">Time-based (e.g., 30 seconds, 2 minutes)</span>
                                </label>
                            </div>
                            {errors.type && (
                                <p className="text-red-400 text-sm mt-1">{errors.type}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Description & Instructions *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="5"
                                className="w-full px-4 py-3 bg-slate-600 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 resize-none"
                                placeholder="Provide detailed instructions on how to perform this exercise, including starting position, movement, and key form cues..."
                            />
                            <div className="flex justify-between items-center mt-1">
                                {errors.description && (
                                    <p className="text-red-400 text-sm">{errors.description}</p>
                                )}
                                <p className="text-slate-400 text-sm ml-auto">
                                    {formData.description.length} characters
                                </p>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Upload Media (Optional)
                            </label>
                            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center bg-slate-600 hover:bg-slate-500 transition-all duration-300">
                                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-slate-300 mb-2">
                                    Upload an image or video to demonstrate the exercise
                                </p>
                                <input
                                    type="file"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                    accept="image/*,video/*"
                                    className="hidden"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-400 text-white rounded-lg cursor-pointer hover:from-blue-600 hover:to-emerald-500 transition-all duration-300"
                                >
                                    Choose File
                                </label>
                                {formData.file && (
                                    <p className="text-emerald-400 text-sm mt-2">
                                        Selected: {formData.file.name}
                                    </p>
                                )}
                            </div>
                            {errors.file && (
                                <p className="text-red-400 text-sm mt-1">{errors.file}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Submitting Request...
                                </div>
                            ) : (
                                'Submit Exercise Request'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-700 backdrop-blur-lg border border-slate-600 rounded-2xl p-8 max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Request Submitted!
                        </h3>
                        <p className="text-slate-300 mb-6">
                            Your exercise request has been submitted to the admin for review. You'll be notified once it's approved and published to the library.
                        </p>
                        <button
                            onClick={closeSuccessModal}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-emerald-500 transition-all duration-300"
                        >
                            Got it!
                        </button>
                        <button
                            onClick={closeSuccessModal}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}