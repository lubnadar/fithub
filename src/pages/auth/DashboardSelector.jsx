import React, { useState } from 'react';
import { User, Users, Dumbbell, Target, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardSelector() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (isNavigating) return;
        setSelectedRole(role);
        setIsNavigating(true);

        // حفظ الدور في localStorage
        localStorage.setItem('userRole', role);

        // ✅ التوجيه الصحيح إلى صفحة إعداد الحساب
        if (role === 'trainee') {
            navigate('/trainee/setup');
        } else if (role === 'coach') {
            navigate('/coach/setup');
        } else if (role === 'vendor') {
            navigate('/seller/setup'); // ✅ التوجيه إلى صفحة SellerInfoSetup.jsx
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your Role
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Select how you'd like to use FitHub to get started with your personalized experience
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Trainee Card */}
                    <div
                        onClick={() => handleRoleSelection('trainee')}
                        className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedRole === 'trainee' ? 'scale-105' : ''
                            } ${isNavigating ? 'opacity-70 cursor-not-allowed' : ''}`}
                        style={{ pointerEvents: isNavigating ? 'none' : 'auto' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 h-full hover:border-blue-500 transition-colors duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-400 transition-colors duration-300">
                                    <User className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">I am a Trainee</h3>

                                <div className="space-y-3 text-slate-300 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-blue-400" />
                                        <span>Get personalized workout plans</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-blue-400" />
                                        <span>Track your fitness progress</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-blue-400" />
                                        <span>Connect with expert coaches</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-blue-400" />
                                        <span>Join fitness community</span>
                                    </div>
                                </div>

                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group">
                                    <span>Get Started as Trainee</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Coach Card */}
                    <div
                        onClick={() => handleRoleSelection('coach')}
                        className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedRole === 'coach' ? 'scale-105' : ''
                            } ${isNavigating ? 'opacity-70 cursor-not-allowed' : ''}`}
                        style={{ pointerEvents: isNavigating ? 'none' : 'auto' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 h-full hover:border-emerald-500 transition-colors duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-400 transition-colors duration-300">
                                    <Users className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">I am a Coach</h3>

                                <div className="space-y-3 text-slate-300 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-emerald-400" />
                                        <span>Create custom workout plans</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-emerald-400" />
                                        <span>Manage multiple clients</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-emerald-400" />
                                        <span>Track client progress</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-emerald-400" />
                                        <span>Grow your coaching business</span>
                                    </div>
                                </div>

                                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group">
                                    <span>Get Started as Coach</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Vendor Card */}
                    <div
                        onClick={() => handleRoleSelection('vendor')}
                        className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedRole === 'vendor' ? 'scale-105' : ''
                            } ${isNavigating ? 'opacity-70 cursor-not-allowed' : ''}`}
                        style={{ pointerEvents: isNavigating ? 'none' : 'auto' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 h-full hover:border-yellow-500 transition-colors duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-400 transition-colors duration-300">
                                    <ShoppingBag className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">I am a Vendor</h3>

                                <div className="space-y-3 text-slate-300 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-yellow-400" />
                                        <span>Sell fitness products</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-yellow-400" />
                                        <span>Manage your store easily</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-yellow-400" />
                                        <span>Reach FitHub users directly</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Target className="w-5 h-5 text-yellow-400" />
                                        <span>Grow your business fast</span>
                                    </div>
                                </div>

                                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group">
                                    <span>Get Started as Vendor</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-slate-400">
                        You can always change your role later in your profile settings
                    </p>
                </div>
            </div>

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
