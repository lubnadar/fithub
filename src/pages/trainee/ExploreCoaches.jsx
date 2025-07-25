import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Trophy, Clock } from 'lucide-react';
import TraineeNavbar from '../../components/layout/TraineeNavbar';

const ExploreCoaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const mockCoaches = [
        {
            id: 1,
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1594824020593-a27ab0dfe96d?w=150&h=150&fit=crop&crop=face",
            rating: 4.9,
            reviews: 127,
            specialties: ["Strength Training", "CrossFit"],
            clients: 89,
            experience: "5 years"
        },
        {
            id: 2,
            name: "Marcus Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            rating: 4.8,
            reviews: 203,
            specialties: ["Yoga", "Flexibility"],
            clients: 156,
            experience: "7 years"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 4.7,
            reviews: 98,
            specialties: ["Cardio", "Weight Loss"],
            clients: 73,
            experience: "4 years"
        },
        {
            id: 4,
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            rating: 4.9,
            reviews: 156,
            specialties: ["Bodybuilding", "Nutrition"],
            clients: 112,
            experience: "8 years"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
            rating: 4.6,
            reviews: 89,
            specialties: ["Pilates", "Rehabilitation"],
            clients: 67,
            experience: "6 years"
        },
        {
            id: 6,
            name: "Alex Martinez",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            rating: 4.8,
            reviews: 134,
            specialties: ["HIIT", "Functional Training"],
            clients: 94,
            experience: "5 years"
        }
    ];

    useEffect(() => {
        setTimeout(() => {
            setCoaches(mockCoaches);
            setLoading(false);
        }, 1000);
    }, []);

    const handleCoachClick = (coachId) => {
        navigate(`/coach/${coachId}`);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : index < rating
                        ? 'fill-yellow-400/50 text-yellow-400/50'
                        : 'text-slate-600'
                    }`}
            />
        ));
    };

    const CoachCard = ({ coach }) => (
        <div
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 cursor-pointer group"
            onClick={() => handleCoachClick(coach.id)}
        >
            <div className="relative mb-4 flex justify-center">
                <div className="relative">
                    <img
                        src={coach.avatar}
                        alt={coach.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-slate-600 group-hover:border-blue-500 transition-colors duration-300"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {coach.name}
                </h3>

                <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars(coach.rating)}
                    <span className="text-sm text-slate-300 ml-1">
                        {coach.rating} ({coach.reviews})
                    </span>
                </div>

                <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {coach.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-slate-700/50 text-xs text-slate-300 rounded-full"
                        >
                            {specialty}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">{coach.clients}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-slate-300">{coach.experience}</span>
                </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5">
                View Profile
            </button>
        </div>
    );

    const LoadingSkeleton = () => (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 animate-pulse">
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-slate-700 rounded-full"></div>
            </div>
            <div className="text-center mb-4">
                <div className="h-6 bg-slate-700 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-slate-700 rounded mb-2 w-1/2 mx-auto"></div>
                <div className="flex gap-1 justify-center mb-3">
                    <div className="h-6 bg-slate-700 rounded-full w-16"></div>
                    <div className="h-6 bg-slate-700 rounded-full w-12"></div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
            </div>
            <div className="h-12 bg-slate-700 rounded-xl"></div>
        </div>
    );

    const EmptyState = () => (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Users className="w-16 h-16 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No coaches found</h3>
            <p className="text-slate-400 text-center max-w-md">
                We're working on bringing amazing fitness coaches to our platform. Check back soon!
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Explore Our{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                Expert Coaches
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Connect with certified fitness professionals who will guide you on your fitness journey
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                            {coaches.length}
                        </div>
                        <div className="text-slate-300">Expert Coaches</div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                        <div className="text-3xl font-bold text-emerald-400 mb-2">
                            {coaches.reduce((acc, coach) => acc + coach.clients, 0)}
                        </div>
                        <div className="text-slate-300">Happy Clients</div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">
                            {coaches.length > 0 ? (coaches.reduce((acc, coach) => acc + coach.rating, 0) / coaches.length).toFixed(1) : '0.0'}
                        </div>
                        <div className="text-slate-300">Average Rating</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 8 }, (_, index) => (
                            <LoadingSkeleton key={index} />
                        ))
                        : coaches.length > 0
                            ? coaches.map((coach) => (
                                <CoachCard key={coach.id} coach={coach} />
                            ))
                            : <EmptyState />
                    }
                </div>
            </div>
        </div>
    );
};

export default ExploreCoaches;
