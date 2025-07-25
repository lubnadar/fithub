import React, { useState } from 'react';
import { User, Upload, X, Save, Trash2, Eye, EyeOff, MapPin, Activity, Target, TrendingUp } from 'lucide-react';
import TraineeNavbar from '../../components/layout/TraineeNavbar';
const Profile = () => {
    const [profileData, setProfileData] = useState({
        avatar: null,
        fullName: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        showEmailPublic: false,
        country: 'United States',
        city: 'New York',
        gender: 'prefer-not-to-say',
        height: '175',
        weight: '70',
        fitnessGoal: 'stay-fit',
        activityLevel: 'intermediate'
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
        setHasChanges(true);
    };

    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileData(prev => ({
                    ...prev,
                    avatar: e.target.result
                }));
                setHasChanges(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setProfileData(prev => ({
            ...prev,
            avatar: null
        }));
        setHasChanges(true);
    };

    const handleSave = () => {
        // Simulate saving
        console.log('Saving profile data:', profileData);
        setHasChanges(false);

        // Show success feedback
        const button = document.querySelector('.save-button');
        button.textContent = 'Saved!';
        button.classList.add('bg-emerald-600');
        setTimeout(() => {
            button.textContent = 'Save Changes';
            button.classList.remove('bg-emerald-600');
        }, 2000);
    };

    const handleDeleteAccount = () => {
        console.log('Account deleted');
        setShowDeleteModal(false);
        // In a real app, this would redirect to login or home
    };

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
    ];

    const fitnessGoalOptions = [
        { value: 'lose-weight', label: 'Lose Weight' },
        { value: 'gain-muscle', label: 'Gain Muscle' },
        { value: 'stay-fit', label: 'Stay Fit' }
    ];

    const activityLevelOptions = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-slate-800">Profile Settings</h1>
                    <p className="text-slate-600 mt-1">Manage your account and health information</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column - Profile Info */}
                    <div className="space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-emerald-500" />
                                Profile Information
                            </h2>

                            {/* Avatar Section */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden hover:scale-105 transition-transform duration-200">
                                        {profileData.avatar ? (
                                            <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            profileData.fullName.split(' ').map(name => name[0]).join('')
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                                    <label className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200">
                                        <Upload className="w-4 h-4" />
                                        Upload Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    {profileData.avatar && (
                                        <button
                                            onClick={handleRemoveAvatar}
                                            className="inline-flex items-center gap-2 bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                            Remove Image
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
                                        <button
                                            onClick={() => handleInputChange('showEmailPublic', !profileData.showEmailPublic)}
                                            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            {profileData.showEmailPublic ? (
                                                <><Eye className="w-4 h-4" /> Public</>
                                            ) : (
                                                <><EyeOff className="w-4 h-4" /> Private</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Editable Sections */}
                    <div className="space-y-6">

                        {/* Personal Info Section */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                Personal Information
                            </h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        value={profileData.gender}
                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    >
                                        {genderOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Health Info Section */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                Health Information
                            </h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Height (cm)
                                        </label>
                                        <input
                                            type="number"
                                            value={profileData.height}
                                            onChange={(e) => handleInputChange('height', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            value={profileData.weight}
                                            onChange={(e) => handleInputChange('weight', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        Fitness Goal
                                    </label>
                                    <select
                                        value={profileData.fitnessGoal}
                                        onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    >
                                        {fitnessGoalOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Activity Level
                                    </label>
                                    <select
                                        value={profileData.activityLevel}
                                        onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    >
                                        {activityLevelOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className="flex flex-col sm:flex-row gap-4 order-2 sm:order-1">
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`save-button flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 order-1 sm:order-2 ${hasChanges
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                Delete Account
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Are you sure you want to delete your account? This action cannot be undone and you will lose all your data.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
