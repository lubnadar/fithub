// src/pages/coach/coach-info-setup.jsx
import React, { useState, useRef } from 'react';
import { X, Upload, Trash2, Plus, Award, User, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ الإضافة الوحيدة

export default function CoachInfoSetup() {
    const [formData, setFormData] = useState({
        yearsOfExperience: '',
        age: '',
        shortBio: ''
    });
    const [certificates, setCertificates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        name: '',
        organization: '',
        image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate(); // ✅ تفعيل التوجيه

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setModalData(prev => ({ ...prev, image: file }));
        }
    };

    const openModal = () => {
        setModalData({ name: '', organization: '', image: null });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalData(prev => ({ ...prev, [name]: value }));
    };

    const addCertificate = () => {
        if (modalData.name && modalData.organization) {
            const newCert = {
                id: Date.now(),
                ...modalData,
                imageUrl: modalData.image ? URL.createObjectURL(modalData.image) : null
            };
            setCertificates(prev => [...prev, newCert]);
            closeModal();
        }
    };

    const removeCertificate = (id) => {
        setCertificates(prev => prev.filter(cert => cert.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            // محاكاة حفظ البيانات
            await new Promise(resolve => setTimeout(resolve, 2000));

            // جمع بيانات التسجيل
            const existingData = localStorage.getItem('registrationData');
            const registrationData = existingData ? JSON.parse(existingData) : {};

            const completeData = {
                ...registrationData,
                role: 'coach',
                coachInfo: formData,
                certificates,
                setupCompleted: true,
            };

            // حفظ البيانات
            localStorage.setItem('registrationData', JSON.stringify(completeData));

            // ✅ التوجيه إلى داشبورد المدرب
            navigate('/coach/dashboard');
        } catch (error) {
            console.error('Failed to save coach info:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // 🔽 الكود الأصلي بدون أي تغيير في الهيكل أو المحتوى
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Card */}
            <div className="relative w-full max-w-2xl">
                <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
                        <p className="text-slate-400">Step 2 of 2 - Final step!</p>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex justify-center items-center space-x-2 mb-8">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Age */}
                        <div className="space-y-2">
                            <label htmlFor="age" className="block text-sm font-semibold text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 text-emerald-400" />
                                    <span>Age</span>
                                </div>
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Enter your age"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            />
                        </div>

                        {/* Years of Experience */}
                        <div className="space-y-2">
                            <label htmlFor="yearsOfExperience" className="block text-sm font-semibold text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-emerald-400" />
                                    <span>Years of Experience</span>
                                </div>
                            </label>
                            <input
                                type="number"
                                id="yearsOfExperience"
                                name="yearsOfExperience"
                                value={formData.yearsOfExperience}
                                onChange={handleInputChange}
                                placeholder="How many years have you been coaching?"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            />
                        </div>

                        {/* Short Bio */}
                        <div className="space-y-2">
                            <label htmlFor="shortBio" className="block text-sm font-semibold text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-emerald-400" />
                                    <span>Short Bio</span>
                                </div>
                            </label>
                            <textarea
                                id="shortBio"
                                name="shortBio"
                                value={formData.shortBio}
                                onChange={handleInputChange}
                                placeholder="Tell us about yourself, your style, and what makes you unique..."
                                rows="3"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                            ></textarea>
                        </div>

                        {/* Certificates */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <Award className="w-4 h-4 text-emerald-400" />
                                    <span>Certifications</span>
                                </div>
                            </label>
                            <button
                                type="button"
                                onClick={openModal}
                                className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Certificate</span>
                            </button>

                            {/* List of Certificates */}
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {certificates.map((cert) => (
                                    <div key={cert.id} className="flex items-center space-x-3 p-2 bg-slate-700/30 rounded-lg">
                                        {cert.imageUrl && (
                                            <img src={cert.imageUrl} alt="Certificate" className="w-12 h-12 object-cover rounded" />
                                        )}
                                        <div className="flex-1 text-sm">
                                            <p className="text-white">{cert.name}</p>
                                            <p className="text-slate-400">{cert.organization}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeCertificate(cert.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Saving Profile...</span>
                                </>
                            ) : (
                                <>
                                    <span>Complete Setup</span>
                                    <Plus className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Add Certificate</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={modalData.name}
                                onChange={handleModalChange}
                                placeholder="Certificate Name"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400"
                            />
                            <input
                                type="text"
                                name="organization"
                                value={modalData.organization}
                                onChange={handleModalChange}
                                placeholder="Issuing Organization"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400"
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                    id="certImage"
                                />
                                <label
                                    htmlFor="certImage"
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span>Upload Image</span>
                                </label>
                                {modalData.image && (
                                    <span className="text-sm text-slate-400">{modalData.image.name}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addCertificate}
                                disabled={!modalData.name || !modalData.organization}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Save Certificate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}