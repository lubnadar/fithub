import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Share2, ArrowLeft, Trophy, Zap, Target } from 'lucide-react';

const WorkoutDone = () => {
    const navigate = useNavigate();
    const [shareWithCoach, setShareWithCoach] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const handleReturnToPlan = () => {
        navigate('/trainee/dashboard');
    };

    const handleShareToggle = () => {
        const newShareState = !shareWithCoach;
        setShareWithCoach(newShareState);

        if (newShareState) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const confettiPieces = Array.from({ length: 50 }, (_, i) => (
        <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${i % 4 === 0 ? 'from-purple-400 to-pink-400' :
                i % 4 === 1 ? 'from-blue-400 to-cyan-400' :
                    i % 4 === 2 ? 'from-green-400 to-emerald-400' :
                        'from-yellow-400 to-orange-400'
                } rounded-full animate-bounce`}
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
            }}
        />
    ));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none">
                {confettiPieces}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center">

                    {/* Success Icon */}
                    <div className={`mb-8 transform transition-all duration-1000 ${animate ? 'scale-100 rotate-0' : 'scale-50 rotate-180'}`}>
                        <div className="relative inline-block">
                            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                                <Check className="w-16 h-16 text-white animate-pulse" />
                            </div>
                            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto animate-ping opacity-20" />
                        </div>
                    </div>

                    {/* Congratulations Text */}
                    <div className={`mb-8 transform transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                                Well Done!
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-2">
                            You've completed today's workout 🏋️‍♀️
                        </p>
                        <p className="text-gray-400 text-lg">
                            Another step closer to your goals! 🔥
                        </p>
                    </div>

                    {/* Achievement Stats */}
                    <div className={`mb-8 transform transition-all duration-1000 delay-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="flex justify-center gap-6 mb-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                <p className="text-white font-semibold">Workout</p>
                                <p className="text-gray-300 text-sm">Completed</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                <p className="text-white font-semibold">Energy</p>
                                <p className="text-gray-300 text-sm">100%</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                <p className="text-white font-semibold">Goals</p>
                                <p className="text-gray-300 text-sm">Smashed</p>
                            </div>
                        </div>
                    </div>

                    {/* Share Toggle */}
                    <div className={`mb-8 transform transition-all duration-1000 delay-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Share2 className="w-6 h-6 text-blue-400" />
                                    <span className="text-white font-medium">Share progress with coach</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={shareWithCoach}
                                        onChange={handleShareToggle}
                                        className="sr-only"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${shareWithCoach ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-600'
                                        }`}>
                                        <div className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${shareWithCoach ? 'translate-x-5' : 'translate-x-0'
                                            } mt-0.5 ml-0.5`} />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Return Button */}
                    <div className={`transform transition-all duration-1000 delay-900 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <button
                            onClick={handleReturnToPlan}
                            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 mx-auto"
                        >
                            <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
                            Done
                        </button>
                    </div>

                    {/* Motivational Quote */}
                    <div className={`mt-8 transform transition-all duration-1000 delay-1100 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <p className="text-gray-400 text-lg italic">
                            "Success isn't just about what you accomplish, but what you inspire others to do." ✨
                        </p>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 transform transition-all duration-300">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-green-400/30">
                        <Check className="w-6 h-6" />
                        <span className="font-medium">Progress shared with your coach! 🎉</span>
                    </div>
                </div>
            )}

            {/* Background Decorations */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute top-1/2 left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse" />
        </div>
    );
};

export default WorkoutDone;