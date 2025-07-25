import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoachNavbar from '../../components/layout/CoachNavbar';

const RequestNewExercise = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        exerciseName: '',
        targetMuscleGroup: '',
        requiredEquipment: '',
        customEquipment: '',
        exerciseType: '',
        description: '',
        mediaFile: null
    });
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const muscleGroups = [
        'Chest',
        'Legs',
        'Back',
        'Shoulders',
        'Arms',
        'Core'
    ];

    const equipmentOptions = [
        'No Equipment',
        'Dumbbells',
        'Barbell',
        'Resistance Bands',
        'Pull-up Bar',
        'Kettlebell',
        'Medicine Ball',
        'Cable Machine',
        'Custom (specify below)'
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
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];
            if (validTypes.includes(file.type)) {
                setFormData(prev => ({
                    ...prev,
                    mediaFile: file
                }));
                if (errors.mediaFile) {
                    setErrors(prev => ({
                        ...prev,
                        mediaFile: ''
                    }));
                }
            } else {
                setErrors(prev => ({
                    ...prev,
                    mediaFile: 'Please upload a valid file (.jpg, .png, .mp4)'
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.exerciseName.trim()) {
            newErrors.exerciseName = 'Exercise name is required';
        }

        if (!formData.targetMuscleGroup) {
            newErrors.targetMuscleGroup = 'Please select a target muscle group';
        }

        if (!formData.requiredEquipment) {
            newErrors.requiredEquipment = 'Please select required equipment';
        }

        if (formData.requiredEquipment === 'Custom (specify below)' && !formData.customEquipment.trim()) {
            newErrors.customEquipment = 'Please specify the custom equipment';
        }

        if (!formData.exerciseType) {
            newErrors.exerciseType = 'Please select an exercise type';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description/Instructions are required';
        } else if (formData.description.trim().length < 20) {
            newErrors.description = 'Please provide at least 20 characters for the description';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            setShowSuccess(true);

            // Reset form
            setFormData({
                exerciseName: '',
                targetMuscleGroup: '',
                requiredEquipment: '',
                customEquipment: '',
                exerciseType: '',
                description: '',
                mediaFile: null
            });

            // Clear file input
            const fileInput = document.getElementById('mediaFile');
            if (fileInput) fileInput.value = '';

        } catch (error) {
            console.error('Error submitting request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeSuccessModal = () => {
        setShowSuccess(false);
        navigate('/coach/dashboard'); // Navigate back to coach dashboard
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Request New Exercise</h1>
                    <p className="text-gray-600 mt-2">
                        Submit a request to add a new exercise to the FitHub workout library.
                        All requests are reviewed by our admin team before being added.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Exercise Name */}
                                <div>
                                    <label htmlFor="exerciseName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Exercise Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="exerciseName"
                                        name="exerciseName"
                                        value={formData.exerciseName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Bulgarian Split Squat"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.exerciseName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.exerciseName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.exerciseName}</p>
                                    )}
                                </div>

                                {/* Target Muscle Group */}
                                <div>
                                    <label htmlFor="targetMuscleGroup" className="block text-sm font-medium text-gray-700 mb-2">
                                        Target Muscle Group *
                                    </label>
                                    <select
                                        id="targetMuscleGroup"
                                        name="targetMuscleGroup"
                                        value={formData.targetMuscleGroup}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.targetMuscleGroup ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select muscle group</option>
                                        {muscleGroups.map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                    {errors.targetMuscleGroup && (
                                        <p className="text-red-500 text-sm mt-1">{errors.targetMuscleGroup}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Equipment & Type Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                                Equipment & Type
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Required Equipment */}
                                <div>
                                    <label htmlFor="requiredEquipment" className="block text-sm font-medium text-gray-700 mb-2">
                                        Required Equipment *
                                    </label>
                                    <select
                                        id="requiredEquipment"
                                        name="requiredEquipment"
                                        value={formData.requiredEquipment}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.requiredEquipment ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select equipment</option>
                                        {equipmentOptions.map(equipment => (
                                            <option key={equipment} value={equipment}>{equipment}</option>
                                        ))}
                                    </select>
                                    {errors.requiredEquipment && (
                                        <p className="text-red-500 text-sm mt-1">{errors.requiredEquipment}</p>
                                    )}
                                </div>

                                {/* Custom Equipment (conditional) */}
                                {formData.requiredEquipment === 'Custom (specify below)' && (
                                    <div>
                                        <label htmlFor="customEquipment" className="block text-sm font-medium text-gray-700 mb-2">
                                            Specify Custom Equipment *
                                        </label>
                                        <input
                                            type="text"
                                            id="customEquipment"
                                            name="customEquipment"
                                            value={formData.customEquipment}
                                            onChange={handleInputChange}
                                            placeholder="e.g., TRX Suspension Trainer"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.customEquipment ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.customEquipment && (
                                            <p className="text-red-500 text-sm mt-1">{errors.customEquipment}</p>
                                        )}
                                    </div>
                                )}

                                {/* Exercise Type */}
                                <div className={formData.requiredEquipment === 'Custom (specify below)' ? 'md:col-span-2' : ''}>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Exercise Type *
                                    </label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="exerciseType"
                                                value="reps-based"
                                                checked={formData.exerciseType === 'reps-based'}
                                                onChange={handleInputChange}
                                                className="mr-2 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">Reps-based</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="exerciseType"
                                                value="time-based"
                                                checked={formData.exerciseType === 'time-based'}
                                                onChange={handleInputChange}
                                                className="mr-2 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">Time-based</span>
                                        </label>
                                    </div>
                                    {errors.exerciseType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.exerciseType}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                                Instructions & Media
                            </h2>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description / Instructions *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={6}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Provide detailed instructions for performing this exercise. Include:&#10;• Starting position&#10;• Step-by-step movement&#10;• Breathing technique&#10;• Common mistakes to avoid&#10;• Safety considerations"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${errors.description ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {errors.description && (
                                        <p className="text-red-500 text-sm">{errors.description}</p>
                                    )}
                                    <p className="text-gray-500 text-sm ml-auto">
                                        {formData.description.length}/500 characters
                                    </p>
                                </div>
                            </div>

                            {/* Media Upload */}
                            <div>
                                <label htmlFor="mediaFile" className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Media (Optional)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <input
                                        type="file"
                                        id="mediaFile"
                                        accept=".mp4,.jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label htmlFor="mediaFile" className="cursor-pointer">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-gray-600 mb-1">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            MP4, JPG, PNG up to 10MB
                                        </p>
                                    </label>
                                </div>

                                {formData.mediaFile && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="h-8 w-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{formData.mediaFile.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {(formData.mediaFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, mediaFile: null }));
                                                document.getElementById('mediaFile').value = '';
                                            }}
                                            className="text-red-600 hover:text-red-700 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                                {errors.mediaFile && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mediaFile}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${isSubmitting
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Submitting...
                                    </div>
                                ) : (
                                    'Submit Request'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Request Submitted Successfully!
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Your exercise request has been submitted for admin review.
                                You'll be notified once it's approved and added to the library.
                            </p>
                            <button
                                onClick={closeSuccessModal}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestNewExercise;