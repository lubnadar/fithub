// src/pages/trainee/TraineeInfoSetup.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Ruler, Weight, Target, TrendingUp, Activity, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function TraineeInfoSetup() {
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        fitnessGoal: '',
        activityLevel: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const fitnessGoals = [
        'Lose Weight',
        'Build Muscle',
        'Maintain Weight',
        'Increase Endurance',
        'Improve Flexibility'
    ];

    const activityLevels = [
        'Sedentary (little or no exercise)',
        'Lightly Active (light exercise 1-3 days/week)',
        'Moderately Active (moderate exercise 3-5 days/week)',
        'Very Active (hard exercise 6-7 days/week)',
        'Extra Active (very hard exercise & physical job)'
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.height) newErrors.height = 'Height is required';
        if (!formData.weight) newErrors.weight = 'Weight is required';
        if (!formData.fitnessGoal) newErrors.fitnessGoal = 'Fitness goal is required';
        if (!formData.activityLevel) newErrors.activityLevel = 'Activity level is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            // محاكاة حفظ البيانات
            await new Promise(resolve => setTimeout(resolve, 2000));

            // جمع بيانات المستخدم من localStorage
            const existingData = localStorage.getItem('registrationData');
            const registrationData = existingData ? JSON.parse(existingData) : {};

            const completeData = {
                ...registrationData,
                role: 'trainee',
                traineeInfo: formData,
                setupCompleted: true,
            };

            // حفظ البيانات
            localStorage.setItem('registrationData', JSON.stringify(completeData));

            // ✅ التوجيه إلى DefaultTraineeDashboard
            navigate('/trainee/default-dashboard');
        } catch (error) {
            console.error('Setup error:', error);
            setErrors({ submit: 'Failed to complete setup. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 w-full max-w-2xl border border-slate-700"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
                    <p className="text-slate-300">Tell us about your fitness journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Height (cm)
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                    className={`w-full pl-10 pr-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.height ? 'border-red-500' : 'border-slate-600'
                                        }`}
                                    placeholder="170"
                                />
                            </div>
                            {errors.height && <p className="text-red-400 text-sm mt-1">{errors.height}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Weight (kg)
                            </label>
                            <div className="relative">
                                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    className={`w-full pl-10 pr-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.weight ? 'border-red-500' : 'border-slate-600'
                                        }`}
                                    placeholder="70"
                                />
                            </div>
                            {errors.weight && <p className="text-red-400 text-sm mt-1">{errors.weight}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Fitness Goal
                        </label>
                        <div className="relative">
                            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                name="fitnessGoal"
                                value={formData.fitnessGoal}
                                onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                                className={`w-full pl-10 pr-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fitnessGoal ? 'border-red-500' : 'border-slate-600'
                                    }`}
                            >
                                <option value="">Select your goal</option>
                                {fitnessGoals.map((goal) => (
                                    <option key={goal} value={goal}>
                                        {goal}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.fitnessGoal && <p className="text-red-400 text-sm mt-1">{errors.fitnessGoal}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Activity Level
                        </label>
                        <div className="relative">
                            <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                                className={`w-full pl-10 pr-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.activityLevel ? 'border-red-500' : 'border-slate-600'
                                    }`}
                            >
                                <option value="">Select your level</option>
                                {activityLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.activityLevel && <p className="text-red-400 text-sm mt-1">{errors.activityLevel}</p>}
                    </div>

                    {errors.submit && (
                        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">
                            {errors.submit}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                            disabled={isSubmitting}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Complete Setup</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}