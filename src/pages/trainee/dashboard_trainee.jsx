
// src/pages/trainee/TraineeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Home, Dumbbell, Calendar, Users, ShoppingBag, User, Play, Star, ChevronRight, Heart, MessageCircle, Share2, Filter, Search, Menu, X } from 'lucide-react';
import TraineeSidebar from '../../components/layout/TraineeSidebar';
import { Link } from 'react-router-dom'; // ✅ الإضافة: لتفعيل التنقل
import TraineeNavbar from '../../components/layout/TraineeNavbar';

const TraineeDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    // Mock data
    const recentWorkouts = [
        { id: 1, name: 'Upper Body Strength', duration: '45 min', date: 'Today, 10:00 AM', coach: 'Alex Johnson' },
        { id: 2, name: 'Cardio Blast', duration: '30 min', date: 'Yesterday, 6:00 PM', coach: 'Sarah Williams' },
        { id: 3, name: 'Core & Abs', duration: '25 min', date: 'Yesterday, 8:00 AM', coach: 'Mike Chen' },
    ];

    const featuredCoaches = [
        { id: 1, name: 'Alex Johnson', specialty: 'Strength Training', rating: 4.9, image: '/api/placeholder/80/80' },
        { id: 2, name: 'Sarah Williams', specialty: 'HIIT & Cardio', rating: 4.8, image: '/api/placeholder/80/80' },
        { id: 3, name: 'Mike Chen', specialty: 'Flexibility & Mobility', rating: 4.7, image: '/api/placeholder/80/80' },
        { id: 4, name: 'Emma Davis', specialty: 'Nutrition Coach', rating: 4.9, image: '/api/placeholder/80/80' },
    ];

    const progressStats = [
        { label: 'Workouts Completed', value: '18', icon: Play, color: 'text-blue-400' },
        { label: 'Calories Burned', value: '2,450', icon: Heart, color: 'text-red-400' },
        { label: 'Training Days', value: '12', icon: Calendar, color: 'text-emerald-400' },
        { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-yellow-400' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans">
            {/* ✅ الإضافة: TraineeSidebar */}
            <TraineeSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex">
                {/* Mobile Header */}
                <div className="md:hidden bg-slate-800 p-4 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Dashboard</h2>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-slate-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                {/* Desktop Sidebar */}
                <div className="hidden md:block w-20 bg-slate-800 border-r border-slate-700">
                    <div className="flex flex-col items-center py-6 space-y-8">
                        <Home className="w-6 h-6 text-emerald-400" />
                        <Dumbbell className="w-6 h-6 text-slate-400 hover:text-emerald-400 cursor-pointer" />
                        <Calendar className="w-6 h-6 text-slate-400 hover:text-emerald-400 cursor-pointer" />
                        <Users className="w-6 h-6 text-slate-400 hover:text-emerald-400 cursor-pointer" />
                        <ShoppingBag className="w-6 h-6 text-slate-400 hover:text-emerald-400 cursor-pointer" />
                        <User className="w-6 h-6 text-slate-400 hover:text-emerald-400 cursor-pointer" />
                    </div>
                </div>
                {/* Main Content */}
                <div className="flex-1">
                    {/* Desktop Header */}
                    <header className="hidden md:block bg-slate-800 p-6 border-b border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                                <p className="text-slate-400 mt-1">Welcome back! Ready to crush your fitness goals?</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="p-6">
                        {/* Progress Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {progressStats.map((stat, index) => (
                                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-400 text-sm">{stat.label}</p>
                                            <p className={`text - 3xl font - bold ${stat.color} `}>{stat.value}</p>
                                        </div>
                                        <stat.icon className={`w - 10 h - 10 ${stat.color} bg - slate - 700 rounded - lg p - 2`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Workouts */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">Recent Workouts</h2>
                                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">View All</button>
                            </div>
                            <div className="space-y-4">
                                {recentWorkouts.map((workout) => (
                                    <div key={workout.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-white">{workout.name}</h3>
                                            <p className="text-slate-400 text-sm">{workout.duration} • {workout.date}</p>
                                            <p className="text-slate-500 text-sm">with {workout.coach}</p>
                                        </div>
                                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                            Start
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Featured Coaches */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">Featured Coaches</h2>
                                <button className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2">
                                    Browse All
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                                {featuredCoaches.map((coach) => (
                                    <div key={coach.id} className="flex-shrink-0 bg-slate-700/30 backdrop-blur-sm border border-slate-600 rounded-xl p-4 text-center hover:bg-slate-700/50 transition-all duration-300">
                                        <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                                            <img src={coach.image} alt={coach.name} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="font-medium text-white">{coach.name}</h3>
                                        <p className="text-slate-400 text-sm">{coach.specialty}</p>
                                        <div className="flex items-center justify-center space-x-1 mt-2">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-slate-300 text-sm">{coach.rating}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* ✅ Track with AI - ربط الزر بصفحة AIWorkoutTracker */}
                            <Link
                                to="/trainee/ai-tracker"
                                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white p-6 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                            >
                                Track with AI
                            </Link>
                            {/* ✅ View Full Plan - ربط الزر بصفحة YourDailyPlan */}
                            <Link
                                to="/trainee/daily-plan"
                                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white p-6 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                            >
                                View Full Plan
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
            <style jsx>{`
    .scrollbar - hide {
    -ms - overflow - style: none;
    scrollbar - width: none;
}
        .scrollbar - hide:: -webkit - scrollbar {
    display: none;
}
`}</style>
        </div>
    );
};

export default TraineeDashboard;
