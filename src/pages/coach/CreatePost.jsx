import React, { useState } from 'react';
import { Camera, X, Save, Send, Trash2, Upload, User } from 'lucide-react';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        image: null,
        imagePreview: null
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Mock coach data
    const coach = {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=150&h=150&fit=crop&crop=face',
        title: 'Certified Personal Trainer'
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: null
        }));
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setMessage({ type: 'error', text: 'Post title is required' });
            return false;
        }
        if (!formData.body.trim()) {
            setMessage({ type: 'error', text: 'Post content is required' });
            return false;
        }
        return true;
    };

    const handlePublish = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setMessage({ type: 'success', text: 'Post published successfully!' });
            // Reset form after success
            setTimeout(() => {
                setFormData({ title: '', body: '', image: null, imagePreview: null });
                setMessage({ type: '', text: '' });
            }, 3000);
        }, 1500);
    };

    const handleSaveDraft = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setMessage({ type: 'success', text: 'Draft saved successfully!' });
            setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 3000);
        }, 1000);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setFormData({ title: '', body: '', image: null, imagePreview: null });
                setMessage({ type: 'success', text: 'Post deleted successfully!' });
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isEditing ? 'Edit Post' : 'Create New Post'}
                    </h1>
                    <p className="text-slate-300">Share your fitness knowledge with the community</p>
                </div>

                {/* Message Display */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${message.type === 'success'
                            ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                            : 'bg-red-500/20 border border-red-500/30 text-red-200'
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Coach Info Header */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src={coach.avatar}
                                        alt={coach.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <User className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{coach.name}</h3>
                                    <p className="text-slate-300 text-sm">{coach.title}</p>
                                </div>
                            </div>
                        </div>

                        {/* Post Title */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                Post Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter an engaging title for your post..."
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Post Body */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                Post Content
                            </label>
                            <textarea
                                name="body"
                                value={formData.body}
                                onChange={handleInputChange}
                                placeholder="Share your fitness tips, motivation, or insights with the community..."
                                rows={8}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                Add Image (Optional)
                            </label>

                            {!formData.imagePreview ? (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors duration-200">
                                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-slate-300 mb-2">Click to upload or drag and drop</p>
                                        <p className="text-slate-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={formData.imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors duration-200"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 sticky top-4">
                            <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>

                            <div className="space-y-3">
                                <button
                                    onClick={handlePublish}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white rounded-lg transition-colors duration-200 font-medium"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isLoading ? 'Publishing...' : 'Publish Post'}</span>
                                </button>

                                <button
                                    onClick={handleSaveDraft}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors duration-200 font-medium"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{isLoading ? 'Saving...' : 'Save Draft'}</span>
                                </button>

                                {isEditing && (
                                    <button
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg transition-colors duration-200 font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete Post</span>
                                    </button>
                                )}
                            </div>

                            {/* Tips */}
                            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                                <h4 className="text-sm font-medium text-slate-300 mb-2">💡 Tips for Great Posts</h4>
                                <ul className="text-xs text-slate-400 space-y-1">
                                    <li>• Use clear, actionable titles</li>
                                    <li>• Add relevant images to engage readers</li>
                                    <li>• Share personal experiences and insights</li>
                                    <li>• Keep content helpful and motivating</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Actions */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 p-4">
                    <div className="flex space-x-3">
                        <button
                            onClick={handlePublish}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            <Send className="w-4 h-4" />
                            <span>{isLoading ? 'Publishing...' : 'Publish'}</span>
                        </button>

                        <button
                            onClick={handleSaveDraft}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            <Save className="w-4 h-4" />
                            <span>{isLoading ? 'Draft' : 'Save'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
