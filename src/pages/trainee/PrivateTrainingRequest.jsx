// src/pages/trainee/PrivateTrainingRequest.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ الإضافة: لتفعيل التوجيه
import { ChevronLeft, User, DollarSign, Send, CheckCircle, AlertCircle } from 'lucide-react';

const PrivateTrainingRequest = ({ coach }) => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [hasExistingRequest, setHasExistingRequest] = useState(false);
    const navigate = useNavigate(); // ✅ تفعيل التوجيه

    const handleSubmit = async () => {
        if (!message.trim()) {
            alert('Please enter a message');
            return;
        }

        setIsSubmitting(true);

        try {
            // محاكاة إرسال الطلب
            await new Promise(resolve => setTimeout(resolve, 2000));

            // ✅ بعد الإرسال الناجح، نُظهر النجاح ثم نوجّه
            setShowSuccess(true);

            // إذا كنت تريد توجيه المستخدم تلقائيًا بعد 3 ثواني
            // setTimeout(() => {
            //   navigate('/trainee/request-history');
            // }, 3000);

        } catch (error) {
            alert('Failed to send request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContinue = () => {
        setShowSuccess(false);
        navigate('/trainee/request-history'); // ✅ التوجيه إلى صفحة "طلباتي"
    };

    return (
        <>


            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-6 group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Coach Profile</span>
                    </button>

                    {/* Main Card */}
                    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Request Private Training</h1>
                            <p className="text-slate-300">Send a message to start your personalized training journey</p>
                        </div>

                        {/* Success State */}
                        {showSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Request Sent Successfully!</h3>
                                <p className="text-slate-300 mb-6">
                                    Your training request has been sent to {coach?.name}. They will review your message and respond within 24 hours.
                                </p>
                                <button
                                    onClick={handleContinue}
                                    className="bg-gradient-to-r from-blue-500 to-emerald-400 hover:from-blue-600 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                                >
                                    Continue
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Coach Summary */}
                                <div className="bg-slate-700/50 rounded-xl p-6 mb-8 border border-slate-600">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {coach?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{coach?.name}</h3>
                                            <p className="text-slate-300">{coach?.country}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-white">{coach?.rating}</p>
                                            <p className="text-slate-400 text-sm">Rating</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">{coach?.followers.toLocaleString()}</p>
                                            <p className="text-slate-400 text-sm">Followers</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">${coach?.planPrice}</p>
                                            <p className="text-slate-400 text-sm">Monthly</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-emerald-400">Open</p>
                                            <p className="text-slate-400 text-sm">Availability</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Request Form */}
                                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Your Message to {coach?.name}
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Hi [Coach Name], I'm interested in your training program. I'm looking to [your goal] and have [your experience level]. I'd love to discuss how we can work together..."
                                            className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Additional Info */}
                                    <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                                        <h3 className="font-semibold text-white mb-4">What Happens Next?</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-blue-400 text-sm font-semibold">1</span>
                                                </div>
                                                <p>Your request will be sent directly to {coach?.name}</p>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-blue-400 text-sm font-semibold">2</span>
                                                </div>
                                                <p>You'll receive a response within 24 hours</p>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-blue-400 text-sm font-semibold">3</span>
                                                </div>
                                                <p>Once approved, your personalized training plan will be created</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || hasExistingRequest}
                                        className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending Request...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Send Request</span>
                                            </>
                                        )}
                                    </button>

                                    {hasExistingRequest && (
                                        <p className="text-center text-sm text-orange-400 mt-3">
                                            Request already sent to this coach
                                        </p>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateTrainingRequest;