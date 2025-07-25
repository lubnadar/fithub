import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Calendar, Building2, Award } from 'lucide-react';

const AddCertificationModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        issuedBy: '',
        issueDate: '',
        file: null
    });
    const [errors, setErrors] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileUpload = (file) => {
        if (file) {
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
                setFormData(prev => ({ ...prev, file }));
                setErrors(prev => ({ ...prev, file: '' }));
            } else {
                setErrors(prev => ({ ...prev, file: 'Please upload a PDF, JPG, or PNG file' }));
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Certificate title is required';
        if (!formData.issuedBy.trim()) newErrors.issuedBy = 'Issuing organization is required';
        if (!formData.issueDate) newErrors.issueDate = 'Issue date is required';
        if (!formData.file) newErrors.file = 'Certificate file is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Certificate added:', formData);
            // Reset form and close modal
            setFormData({ title: '', issuedBy: '', issueDate: '', file: null });
            setIsOpen(false);
        }
    };

    const resetAndClose = () => {
        setFormData({ title: '', issuedBy: '', issueDate: '', file: null });
        setErrors({});
        setIsOpen(false);
    };

    const getFileIcon = (file) => {
        if (file?.type === 'application/pdf') return <FileText className="w-8 h-8 text-red-500" />;
        if (file?.type.startsWith('image/')) return <img src={URL.createObjectURL(file)} alt="Preview" className="w-8 h-8 object-cover rounded" />;
        return <FileText className="w-8 h-8 text-gray-400" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 flex items-center justify-center">
            {/* Demo Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
                Open Add Certification Modal
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={(e) => e.target === e.currentTarget && resetAndClose()}
                >
                    {/* Modal Container */}
                    <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl animate-in zoom-in-95 duration-300">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg">
                                    <Award className="w-6 h-6 text-blue-400" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Add Certification</h2>
                            </div>
                            <button
                                onClick={resetAndClose}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">

                            {/* Certificate Title */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Certificate Title *
                                </label>
                                <div className="relative">
                                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="e.g., Certified Personal Trainer"
                                        className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.title ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-200`}
                                    />
                                </div>
                                {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
                            </div>

                            {/* Issued By */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Issued By *
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.issuedBy}
                                        onChange={(e) => handleInputChange('issuedBy', e.target.value)}
                                        placeholder="e.g., NASM, ACE, ACSM"
                                        className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.issuedBy ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-200`}
                                    />
                                </div>
                                {errors.issuedBy && <p className="text-red-400 text-sm">{errors.issuedBy}</p>}
                            </div>

                            {/* Issue Date */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Issue Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={formData.issueDate}
                                        onChange={(e) => handleInputChange('issueDate', e.target.value)}
                                        className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.issueDate ? 'border-red-400' : 'border-white/20'} rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-200`}
                                    />
                                </div>
                                {errors.issueDate && <p className="text-red-400 text-sm">{errors.issueDate}</p>}
                            </div>

                            {/* File Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Upload Certificate *
                                </label>

                                {formData.file ? (
                                    /* File Preview */
                                    <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(formData.file)}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium truncate">{formData.file.name}</p>
                                                <p className="text-gray-400 text-sm">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                                                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Upload Dropzone */
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`relative p-8 border-2 border-dashed ${isDragging ? 'border-blue-400 bg-blue-500/10' : errors.file ? 'border-red-400' : 'border-white/30'} rounded-xl cursor-pointer hover:border-blue-400 hover:bg-white/5 transition-all duration-200 group`}
                                    >
                                        <div className="text-center">
                                            <Upload className={`mx-auto w-12 h-12 mb-3 ${isDragging ? 'text-blue-400' : 'text-gray-400'} group-hover:text-blue-400 transition-colors`} />
                                            <p className="text-white font-medium mb-1">
                                                {isDragging ? 'Drop your file here' : 'Upload Certificate'}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                Click to browse or drag and drop<br />
                                                PDF, JPG, PNG up to 10MB
                                            </p>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => handleFileUpload(e.target.files[0])}
                                            className="hidden"
                                        />
                                    </div>
                                )}
                                {errors.file && <p className="text-red-400 text-sm">{errors.file}</p>}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={resetAndClose}
                                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-gray-200 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                                >
                                    Add Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCertificationModal;