// EmailVerification.jsx
import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ أضف useNavigate

const EmailVerification = () => {
    const navigate = useNavigate(); // ✅ تفعيل التوجيه
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // استخدم localStorage للحصول على البريد (إذا كان محفوظًا من التسجيل)
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const registrationData = localStorage.getItem('registrationData');
        if (registrationData) {
            const data = JSON.parse(registrationData);
            setUserEmail(data.email || 'your email');
        }
    }, []);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 6) {
            setCode(value);
            setError('');
        }
    };

    const handleVerify = async () => {
        if (code.length !== 6) {
            setError('Please enter a 6-digit verification code');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // محاكاة استدعاء API
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (code === '123456') {
                setSuccess(true);
                // ✅ التوجيه الصحيح إلى DashboardSelector
                setTimeout(() => {
                    navigate('/dashboard-selector');
                }, 1500);
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!canResend) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setResendTimer(60);
            setCanResend(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        // ✅ توجيه صحيح للعودة
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={handleBackToLogin}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Verify Your Email
                        </h1>
                        <p className="text-gray-600">
                            We've sent a verification code to
                        </p>
                        <p className="text-blue-600 font-medium">
                            {userEmail}
                        </p>
                    </div>

                    {/* Success State */}
                    {success && !error && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                            <span className="text-green-800">
                                {code === '123456'
                                    ? 'Email verified successfully! Redirecting...'
                                    : 'Verification code sent successfully!'}
                            </span>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                            <span className="text-red-800">{error}</span>
                        </div>
                    )}

                    {/* Verification Form */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter verification code
                            </label>
                            <input
                                id="code"
                                type="text"
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="000000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                                maxLength="6"
                                disabled={isLoading || success}
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Enter the 6-digit code sent to your email
                            </p>
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={isLoading || code.length !== 6 || success}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Verifying...
                                </div>
                            ) : success && code === '123456' ? (
                                'Verified! Redirecting...'
                            ) : (
                                'Verify Email'
                            )}
                        </button>
                    </div>

                    {/* Resend Section */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Didn't receive the code?
                        </p>
                        {canResend ? (
                            <button
                                onClick={handleResendCode}
                                disabled={isLoading}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 disabled:opacity-50"
                            >
                                Resend code
                            </button>
                        ) : (
                            <span className="text-gray-500 text-sm">
                                Resend code in {resendTimer}s
                            </span>
                        )}
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Check your spam folder if you don't see the email
                        </p>
                    </div>
                </div>

                {/* Demo Note */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-800 text-center">
                        <strong>Demo:</strong> Use code <span className="font-mono">123456</span> to proceed
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;