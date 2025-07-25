import React, { useState, useEffect } from 'react';
import { Users, FileText, BookOpen, Plus, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ الاستيراد اللازم للتنقل

// بيانات وهمية للمدرب
const mockCoachData = {
    name: "Sarah Johnson",
    stats: {
        privateClients: { value: 24, change: +3 },
        customPlans: { value: 18, change: +2 },
        postsPublished: { value: 47, change: +5 }
    }
};

const CoachDashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate(); // ✅ من أجل التنقل

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <main className="flex-1">
                <div className="p-6 space-y-8">
                    {/* Welcome Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {getGreeting()}, {mockCoachData.name}! 👋
                                </h2>
                                <p className="text-slate-300 text-lg">
                                    Here's a quick overview of your coaching activity today.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-center space-x-2 text-slate-400">
                                    <Calendar size={20} />
                                    <span>
                                        {currentTime.toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">Private Clients</p>
                                    <p className="text-3xl font-bold text-emerald-400">{mockCoachData.stats.privateClients.value}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                    <Users size={24} className="text-emerald-400" />
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs mt-2">+{mockCoachData.stats.privateClients.change} this month</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">Custom Plans</p>
                                    <p className="text-3xl font-bold text-blue-400">{mockCoachData.stats.customPlans.value}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                    <FileText size={24} className="text-blue-400" />
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs mt-2">+{mockCoachData.stats.customPlans.change} this week</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">Posts Published</p>
                                    <p className="text-3xl font-bold text-purple-400">{mockCoachData.stats.postsPublished.value}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                    <BookOpen size={24} className="text-purple-400" />
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs mt-2">+{mockCoachData.stats.postsPublished.change} this week</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate('/coach/plans/create')}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 hover:shadow-lg"
                        >
                            <Plus size={20} />
                            <span>Create New Plan</span>
                        </button>
                        <button
                            onClick={() => navigate('/coach/plans')}
                            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/10 hover:border-white/20"
                        >
                            View All Plans
                        </button>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                        <h3 className="text-lg font-semibold mb-4 text-white">Recent Activity</h3>
                        <ul className="space-y-3">
                            <li className="text-slate-300">• New request from Sarah M.</li>
                            <li className="text-slate-300">• Plan "Summer Shred" updated</li>
                            <li className="text-slate-300">• Post received 12 likes</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CoachDashboard;
