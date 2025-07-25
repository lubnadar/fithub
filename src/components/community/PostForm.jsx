import React, { useState, useEffect } from 'react';
import { X, Upload, Send } from 'lucide-react';

const PostFormModal = ({ isOpen, onClose, onSubmit, post = null }) => {
    const [formData, setFormData] = useState({
        text: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Reset form when modal opens/closes or when editing different post
    useEffect(() => {
        if (isOpen) {
            if (post) {
                // Editing mode - prefill form
                setFormData({
                    text: post.text || '',
                    image: post.image || null
                });
                setImagePreview(post.image || null);
            } else {
                // Creating mode - clear form
                setFormData({ text: '', image: null });
                setImagePreview(null);
            }
            setErrors({});
        }
    }, [isOpen, post]);

    const handleTextChange = (e) => {
        setFormData(prev => ({ ...prev, text: e.target.value }));
        if (errors.text) {
            setErrors(prev => ({ ...prev, text: '' }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, image: 'Please select a valid image file (.jpg, .png, .webp)' }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
                return;
            }

            setFormData(prev => ({ ...prev, image: file }));

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);

            if (errors.image) {
                setErrors(prev => ({ ...prev, image: '' }));
            }
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
        setImagePreview(null);
        // Clear the file input
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.text.trim()) {
            newErrors.text = 'Post content cannot be empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault?.();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await onSubmit({
                text: formData.text.trim(),
                image: formData.image
            });

            // Clear form and close modal
            setFormData({ text: '', image: null });
            setImagePreview(null);
            onClose();
        } catch (error) {
            console.error('Error submitting post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData({ text: '', image: null });
        setImagePreview(null);
        setErrors({});
        onClose();
    };

    // Don't render if modal is not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleCancel}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-lg transform transition-all duration-300 scale-100">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            {post ? 'Edit Post' : 'Create New Post'}
                        </h2>
                        <button
                            onClick={handleCancel}
                            className="p-2 text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Text Area */}
                        <div>
                            <textarea
                                value={formData.text}
                                onChange={handleTextChange}
                                placeholder="What's on your mind? Share your fitness journey, tips, or motivation..."
                                className={`w-full h-32 p-3 bg-white/90 border rounded-lg text-slate-800 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${errors.text ? 'border-red-500' : 'border-slate-300'
                                    }`}
                                maxLength={500}
                            />
                            {errors.text && (
                                <p className="mt-1 text-sm text-red-400">{errors.text}</p>
                            )}
                            <div className="mt-1 text-right text-sm text-slate-400">
                                {formData.text.length}/500
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image-upload" className="block text-sm font-medium text-slate-300 mb-2">
                                Add Image (optional)
                            </label>

                            {!imagePreview ? (
                                <label
                                    htmlFor="image-upload"
                                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-400 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors duration-200 bg-white/5 hover:bg-white/10"
                                >
                                    <div className="text-center">
                                        <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                                        <p className="text-sm text-slate-400">
                                            Click to upload an image
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            JPG, PNG, WEBP (max 5MB)
                                        </p>
                                    </div>
                                </label>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            <input
                                id="image-upload"
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            {errors.image && (
                                <p className="mt-1 text-sm text-red-400">{errors.image}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="px-6 py-2 text-slate-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.text.trim()}
                                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Publishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>{post ? 'Update Post' : 'Publish Post'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostFormModal;