// src/components/layout/CoachNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Home,
    User,
    MessageCircle,
    Users,
    ShoppingBag,
    LogOut,
    Menu,
    X,
    Dumbbell,
    Bell,
    Calendar,
    BarChart3,
    Settings
} from 'lucide-react';


export default function CoachNavbar() {
    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo & Title */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-white">FitHub Coach</h1>
                </div>

                {/* Navigation Links */}


                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/coach/dashboard" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <Home size={20} />
                            <span>Dashboard</span>
                        </div>
                    </Link>


                    <Link to="/coach/plans" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <Dumbbell size={20} />
                            <span> Plans </span>
                        </div>
                    </Link>

                    <Link to="/workout-library" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <Dumbbell size={20} />
                            <span>Workouts</span>
                        </div>
                    </Link>

                    <Link to="/coach/manage-requests" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <Users size={20} />
                            <span>Requests</span>
                        </div>
                    </Link>


                    <Link to="/community" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <Users size={20} />
                            <span>Community</span>
                        </div>
                    </Link>

                    <Link to="/chat" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <MessageCircle size={20} />
                            <span>Chat</span>
                        </div>
                    </Link>

                    <Link to="/store" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <ShoppingBag size={20} />
                            <span>Store</span>
                        </div>
                    </Link>

                    <Link to="/coach/:id" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <User size={20} />
                            <span>Profile</span>
                        </div>
                    </Link>

                    <Link to="/notifications" className="text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center space-x-2">
                            <Bell size={20} />
                            <span></span>
                        </div>
                    </Link>

                </div>
            </div>
        </nav>
    );
}
