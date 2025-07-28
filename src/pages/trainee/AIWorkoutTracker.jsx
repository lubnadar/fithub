import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, X, Share2, SkipForward, Settings, Activity, CheckCircle } from 'lucide-react';

const aiTips = [
    "Keep your core engaged throughout the movement",
    "Maintain neutral spine alignment",
    "Control the movement, don't rush",
    "Focus on proper breathing technique",
    "Keep your shoulders back and down"
];

const mockPostureIssues = [
    { joint: 'shoulder', x: 45, y: 25, issue: 'Shoulder too forward' },
    { joint: 'knee', x: 35, y: 75, issue: 'Knee alignment off' }
];

const AIWorkoutTracker = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const videoRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [shareWithCoach, setShareWithCoach] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [workoutDuration, setWorkoutDuration] = useState(0);
    const [currentTip, setCurrentTip] = useState(0);
    const [postureCorrection, setPostureCorrection] = useState({
        showOverlay: false,
        issues: []
    });

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
        }
    };

    useEffect(() => {
        if (isStreaming) {
            const interval = setInterval(() => {
                const shouldShow = Math.random() > 0.7;
                setPostureCorrection({
                    showOverlay: shouldShow,
                    issues: shouldShow ? mockPostureIssues : []
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isStreaming]);

    useEffect(() => {
        if (isStreaming) {
            const timer = setInterval(() => {
                setWorkoutDuration(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isStreaming]);

    useEffect(() => {
        const tipInterval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % aiTips.length);
        }, 4000);
        return () => clearInterval(tipInterval);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleFinishAndShare = () => {
        stopCamera();
        if (shareWithCoach) {
            setTimeout(() => {
                setShowSuccessModal(true);
            }, 1000);
        } else {
            console.log('Navigating to next workout...');
        }
    };

    const handleSkipAI = () => {
        stopCamera();
        if (id) {
            navigate(`/trainee/exercise/${id}`);
        } else {
            navigate(-1);
        }
        console.log('Navigating back to Exercise Detail Page...');
    };

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800"></div>

            <div className="relative z-10 flex flex-col flex-1">

                {/* Top bar */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm border-b border-emerald-500/30 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-emerald-400" />
                            <span className="font-semibold text-emerald-400">AI Form Correction Active</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-white/70">Duration: {formatTime(workoutDuration)}</div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-lg font-bold mb-1">Push-up Form Check</h2>
                        <p className="text-white/80 text-sm">Keep your body in a straight line from head to heels</p>
                    </div>

                    <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((workoutDuration / 180) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Camera view */}
                <div className="flex-1 relative">
                    <div className="relative w-full max-h-[75vh] overflow-hidden bg-black">

                        {isStreaming && (
                            <button
                                onClick={stopCamera}
                                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 border border-white/20 rounded-full p-2 backdrop-blur-sm"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        )}

                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full object-contain bg-black"
                        />

                        {postureCorrection.showOverlay && (
                            <div className="absolute inset-0 pointer-events-none z-10">
                                <div className="absolute inset-0 border-4 border-red-500/60 animate-pulse rounded-lg m-4"></div>
                                {postureCorrection.issues.map((issue, index) => (
                                    <div
                                        key={index}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ left: `${issue.x}%`, top: `${issue.y}%` }}
                                    >
                                        <div className="w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                                        <div className="w-3 h-3 bg-red-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                            {issue.issue}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* AI Tips overlay */}
                    <div className="absolute top-4 left-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                            <div className="flex items-center space-x-2 mb-1">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="text-blue-400 text-xs font-semibold">AI TIP</span>
                            </div>
                            <p className="text-white/90 text-sm">{aiTips[currentTip]}</p>
                        </div>
                    </div>

                    {!isStreaming && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center">
                                <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
                                <p className="text-white/70 text-lg">Initializing camera...</p>
                                <div className="mt-4">
                                    <button
                                        onClick={startCamera}
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full transition-colors"
                                    >
                                        Retry Camera Access
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom controls */}
                <div className="bg-gradient-to-t from-black via-black/90 to-transparent p-6">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <span className="text-white/70 text-sm">Share with coach</span>
                        <button
                            onClick={() => setShareWithCoach(!shareWithCoach)}
                            className={`w-12 h-6 rounded-full transition-colors ${shareWithCoach ? 'bg-emerald-500' : 'bg-white/20'}`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full transition-transform ${shareWithCoach ? 'translate-x-6' : 'translate-x-0.5'}`}
                            ></div>
                        </button>
                        <Share2 className={`w-4 h-4 ${shareWithCoach ? 'text-emerald-400' : 'text-white/50'}`} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleSkipAI}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center space-x-2"
                        >
                            <SkipForward className="w-5 h-5" />
                            <span>Skip AI</span>
                        </button>

                        <button
                            onClick={handleFinishAndShare}
                            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25"
                        >
                            <CheckCircle className="w-5 h-5" />
                            <span>Finish & Share</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-sm w-full border border-emerald-500/30 shadow-2xl">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Session Complete!</h3>
                            <p className="text-white/70 mb-6">
                                Your workout session has been shared with your coach. They'll provide feedback within 24 hours.
                            </p>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 px-8 rounded-full font-semibold transition-all w-full"
                            >
                                Continue Training
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIWorkoutTracker;