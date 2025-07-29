// نفس الاستيرادات بدون أي تغيير
import React, { useState, useEffect } from 'react';
import { Star, X, Trophy, Heart } from 'lucide-react';

const FinalCoachRatingModal = ({
    isOpen,
    onClose,
    coachName = "Sarah Wilson",
    onSubmit
}) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setHoveredRating(0);
            setFeedback('');
            setIsSubmitting(false);
            setShowThankYou(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            return () => document.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Rating submitted:', {
                rating,
                feedback,
                coachName,
                timestamp: new Date().toISOString()
            });

            setShowThankYou(true);

            setTimeout(() => {
                onClose();
                if (onSubmit) {
                    onSubmit({ rating, feedback });
                }
            }, 2000);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
                <div className="bg-blue-900/80 dark:bg-blue-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-blue-700/30">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 z-10"
                    >
                        <X size={20} className="text-white dark:text-gray-300" />
                    </button>

                    <div className="p-8">
                        {showThankYou ? (
                            <div className="text-center animate-pulse">
                                <div className="mb-6">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                                        <Trophy size={32} className="text-white" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Thank You! 🎉
                                </h2>
                                <p className="text-blue-100">
                                    Your feedback helps us improve FitHub for everyone
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="text-center mb-8">
                                    <div className="mb-4">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                                            <Heart size={32} className="text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        Rate Your Coach
                                    </h2>
                                    <p className="text-blue-100">
                                        Congratulations on completing 30 days with {coachName}!
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="flex justify-center space-x-2 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className={`p-2 rounded-full transition-all duration-200 transform hover:scale-125 ${(hoveredRating || rating) >= star
                                                        ? 'text-yellow-400 drop-shadow-lg'
                                                        : 'text-blue-300 hover:text-yellow-300'
                                                        }`}
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    onClick={() => handleStarClick(star)}
                                                    style={{
                                                        filter: (hoveredRating || rating) >= star ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' : 'none'
                                                    }}
                                                >
                                                    <Star
                                                        size={36}
                                                        className="transition-all duration-200"
                                                        fill={(hoveredRating || rating) >= star ? 'currentColor' : 'none'}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            {rating === 0 ? 'Select a rating' :
                                                rating === 1 ? 'Poor' :
                                                    rating === 2 ? 'Fair' :
                                                        rating === 3 ? 'Good' :
                                                            rating === 4 ? 'Very Good' : 'Excellent!'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Share your experience (optional)
                                        </label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-blue-800/70 backdrop-blur-sm text-white placeholder-blue-200 transition-all duration-200"
                                            placeholder="What did you enjoy most about working with your coach? Any suggestions for improvement?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={rating === 0 || isSubmitting}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform ${rating === 0
                                            ? 'bg-blue-400/50 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Submitting...</span>
                                            </div>
                                        ) : (
                                            'Submit Rating'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FinalCoachRatingModalExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRatingSubmit = (data) => {
        console.log('Rating data received:', data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-8">
                    FitHub Coach Rating Modal Demo
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                    Complete 30-Day Program ✨
                </button>

                <div className="mt-8 text-sm text-blue-200 space-y-2">
                    <p>• Click outside modal or press ESC to close</p>
                    <p>• Stars animate on hover and click</p>
                    <p>• Glassmorphism styling with backdrop blur</p>
                    <p>• Responsive design for mobile and desktop</p>
                    <p>• Thank you animation after submission</p>
                </div>
            </div>

            <FinalCoachRatingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                coachName="Sarah Wilson"
                onSubmit={handleRatingSubmit}
            />
        </div>
    );
};

export default FinalCoachRatingModalExample;
