// src/pages/trainee/ExploreCoaches.jsx
import React, { useState, useEffect } from 'react';
import { Star, Users, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TraineeNavbar from '../../components/layout/TraineeNavbar';

const ExploreCoaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data for coaches
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
            reviews: 98,
            specialties: ["HIIT", "Cardio"],
            clients: 76,
            experience: "4 years"
        },
        {
            id: 3,
            name: "Emma Davis",
            avatar: "https://images.unsplash.com/photo-1494790108744-662257ec6ab7?w=150&h=150&fit=crop&crop=face",
            rating: 4.9,
            reviews: 156,
            specialties: ["Yoga", "Flexibility"],
            clients: 102,
            experience: "6 years"
        },
        {
            id: 4,
            name: "Alex Rodriguez",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
            rating: 4.7,
            reviews: 89,
            specialties: ["Weight Loss", "Nutrition"],
            clients: 67,
            experience: "3 years"
        },
        {
            id: 5,
            name: "Lisa Wang",
            avatar: "https://images.unsplash.com/photo-1573496359143-50088f2967f6?w=150&h=150&fit=crop&crop=face",
            rating: 4.9,
            reviews: 142,
            specialties: ["Pilates", "Core Training"],
            clients: 95,
            experience: "5 years"
        },
        {
            id: 6,
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
            rating: 4.8,
            reviews: 110,
            specialties: ["Powerlifting", "Strength"],
            clients: 83,
            experience: "4 years"
        },
        {
            id: 7,
            name: "Maria Garcia",
            avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
            rating: 4.9,
            reviews: 135,
            specialties: ["Functional Training", "Mobility"],
            clients: 91,
            experience: "5 years"
        },
        {
            id: 8,
            name: "James Wilson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            rating: 4.6,
            reviews: 78,
            specialties: ["Boxing", "Conditioning"],
            clients: 72,
            experience: "3 years"
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCoaches(mockCoaches);
            setLoading(false);
        }, 1000);
    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : index < rating
                        ? 'fill-yellow-400/50 text-yellow-400/50'
                        : 'text-slate-400'
                    }`}
            />
        ));
    };

    const CoachCard = ({ coach }) => (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-center">
                <div className="relative inline-block mb-4">
                    <img
                        src={coach.avatar}
                        alt={coach.name}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500/50 group-hover:border-blue-400 transition-all duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Trophy className="w-3 h-3" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{coach.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{coach.specialties.join(', ')}</p>

                <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center">
                        {renderStars(coach.rating)}
                        <span className="ml-2 text-sm text-slate-300">{coach.rating}</span>
                    </div>
                    <div className="flex items-center text-slate-400">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{coach.clients}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>{coach.experience}</span>
                </div>

                <Link
                    to={`/trainee/coach/${coach.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 block text-center"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );

    const EmptyState = () => (
        <div className="col-span-full text-center py-16">
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Coaches Available</h3>
            <p className="text-slate-400">We're working on bringing amazing fitness coaches to our platform. Check back soon!</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Explore Our{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Expert Coaches</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Meet our certified fitness professionals who will guide you to achieve your goals and transform your lifestyle.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-white">{coaches.length}</div>
                            <div className="text-slate-400">Expert Coaches</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">
                                {coaches.length > 0
                                    ? (coaches.reduce((acc, coach) => acc + coach.rating, 0) / coaches.length).toFixed(1)
                                    : '0.0'}
                            </div>
                            <div className="text-slate-300">Average Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">
                                {coaches.reduce((acc, coach) => acc + coach.clients, 0)}
                            </div>
                            <div className="text-slate-300">Total Clients</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">
                                {coaches.reduce((acc, coach) => acc + parseInt(coach.experience), 0)}+
                            </div>
                            <div className="text-slate-300">Years of Experience</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 8 }, (_, index) => (
                            <LoadingSkeleton key={index} />
                        ))
                        : coaches.length > 0
                            ? coaches.map((coach) => <CoachCard key={coach.id} coach={coach} />)
                            : <EmptyState />}
                </div>
            </div>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-pulse">
        <div className="text-center">
            <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-slate-600 rounded mb-4"></div>
            <div className="h-4 bg-slate-600 rounded mb-4"></div>
            <div className="flex justify-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
                <div className="w-4 h-4 bg-slate-600 rounded-full"></div>
            </div>
            <div className="h-10 bg-slate-600 rounded"></div>
        </div>
    </div>
);

export default ExploreCoaches;
