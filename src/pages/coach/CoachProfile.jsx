import React, { useState, useEffect } from 'react';
import {
    Star,
    Users,
    Award,
    MapPin,
    Calendar,
    ChevronDown,
    ChevronUp,
    Heart,
    MessageCircle,
    DollarSign,
    Shield,
    ArrowLeft,
    Clock
} from 'lucide-react';



const mockCoachData = {
    1: {
        id: 1,
        name: "Marcus Weber",
        country: "🇩🇪 Germany",
        rating: 4.8,
        totalRatings: 127,
        bio: "Professional fitness coach with 8+ years of experience helping clients achieve their fitness goals through personalized training programs.",
        experience: 8,
        followers: 2847,
        planPrice: 49,
        isSubscribed: false,
        hasPendingRequest: false,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        banner: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=300&fit=crop",
        certificates: [
            {
                id: 1,
                name: "Certified Personal Trainer",
                institution: "NASM",
                issueDate: "2018-03-15",
                expiryDate: "2025-03-15"
            }
        ],
        posts: []
    }
};

const CertificateCard = ({ certificate }) => {
    const isExpired = new Date(certificate.expiryDate) < new Date();

    return (
        <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-4 hover:bg-slate-700/70 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">{certificate.name}</h4>
                    <p className="text-slate-400 text-xs mt-1">{certificate.institution}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="text-slate-500">
                            Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                        </span>
                        <span className={`${isExpired ? 'text-red-400' : 'text-emerald-400'}`}>
                            Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className={`p-2 rounded-lg ${isExpired ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
                    {isExpired ? (
                        <Shield className="w-4 h-4 text-red-400" />
                    ) : (
                        <Award className="w-4 h-4 text-emerald-400" />
                    )}
                </div>
            </div>
        </div>
    );
};

const CoachProfile = () => {
    const [coachId] = useState('1');
    const [coach, setCoach] = useState(null);
    const [showAllCertificates, setShowAllCertificates] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoach = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            const coachData = mockCoachData[coachId];
            if (coachData) setCoach(coachData);
            setLoading(false);
        };
        fetchCoach();
    }, [coachId]);

    const handleSubscribe = () => {
        if (coach.hasPendingRequest || coach.isSubscribed) {
            return;
        }
        window.location.href = `/trainee/private-request/${coach.id}`;
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-slate-500" />);
        }

        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    if (!coach) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-white text-2xl font-bold mb-2">Coach Not Found</h2>
                    <p className="text-slate-400">The coach profile you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const certificatesToShow = showAllCertificates ? coach.certificates : coach.certificates.slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            <div className="container mx-auto px-4 pt-16 pb-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{coach.name}</h1>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-300 text-lg">{coach.country}</span>
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="flex items-center gap-1">{renderStars(coach.rating)}</div>
                            <span className="text-slate-300 text-sm">
                                {coach.rating} ({coach.totalRatings} reviews)
                            </span>
                        </div>

                        <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">{coach.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-center">
                            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-white mb-1">{coach.experience}+</h3>
                            <p className="text-slate-400 text-sm">Years Experience</p>
                        </div>

                        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-center">
                            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-white mb-1">{coach.followers.toLocaleString()}</h3>
                            <p className="text-slate-400 text-sm">Followers</p>
                        </div>

                        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-center">
                            <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-white mb-1">${coach.planPrice}</h3>
                            <p className="text-slate-400 text-sm mb-4">per month</p>

                            {coach.hasPendingRequest ? (
                                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-3 mb-2">
                                    <p className="text-yellow-400 text-sm">You already sent a subscription request.</p>
                                </div>
                            ) : coach.isSubscribed ? (
                                <button
                                    disabled
                                    className="w-full bg-slate-600 text-slate-400 px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
                                    title="You are already subscribed to this coach"
                                >
                                    Already Subscribed
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubscribe}
                                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    Subscribe Now
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Award className="w-6 h-6 text-blue-400" />
                                Certifications
                            </h2>

                            {coach.certificates.length === 0 ? (
                                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-8 text-center">
                                    <Award className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                                    <p className="text-slate-400">No certificates provided</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {certificatesToShow.map((cert) => (
                                        <CertificateCard key={cert.id} certificate={cert} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachProfile;
