import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, Plus, Search, Filter, ChevronDown, Calendar, Clock, Target,
    Dumbbell, Users, AlertCircle, TrendingUp, Star, Check, X, Menu
} from 'lucide-react';
import { motion } from 'framer-motion';
//import { useNavigate } from 'react-router-dom';


export default function PlansOverview() {
    const plans = [
        {
            id: 1,
            title: "Summer Shred Program",
            coach: "Alex Johnson",
            duration: "8 weeks",
            level: "Intermediate",
            clients: 24,
            status: "Active",
            progress: 65,
            lastUpdated: "2 days ago"
        },
        {
            id: 2,
            title: "Strength Foundation",
            coach: "Alex Johnson",
            duration: "12 weeks",
            level: "Beginner",
            clients: 18,
            status: "Active",
            progress: 42,
            lastUpdated: "1 week ago"
        },
        {
            id: 3,
            title: "Endurance Master",
            coach: "Alex Johnson",
            duration: "10 weeks",
            level: "Advanced",
            clients: 12,
            status: "Draft",
            progress: 0,
            lastUpdated: "3 days ago"
        }
    ];

    const stats = [
        { label: "Active Plans", value: "12", icon: TrendingUp, change: "+2 this month", color: "text-blue-400" },
        { label: "Total Clients", value: "89", icon: Users, change: "+5 this week", color: "text-emerald-400" },
        { label: "Completed", value: "24", icon: Check, change: "87% completion", color: "text-purple-400" },
        { label: "Pending Reviews", value: "3", icon: AlertCircle, change: "Due today", color: "text-orange-400" }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            <main className="flex-1">
                {/* Header */}


                <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">{stat.label}</p>
                                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <p className="text-slate-500 text-xs mt-2">{stat.change}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Plans List */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Your Workout Plans</h3>
                                <Link
                                    to="/coach/plans/create"
                                    className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Create Plan</span>
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-800 border-b border-slate-700">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-slate-300">Plan</th>
                                        <th className="text-left p-4 font-semibold text-slate-300">Duration</th>
                                        <th className="text-left p-4 font-semibold text-slate-300">Level</th>
                                        <th className="text-left p-4 font-semibold text-slate-300">Clients</th>
                                        <th className="text-left p-4 font-semibold text-slate-300">Status</th>
                                        <th className="text-left p-4 font-semibold text-slate-300">Progress</th>
                                        <th className="text-left p-4 font-semibold text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {plans.map((plan) => (
                                        <tr key={plan.id} className="hover:bg-slate-800/30 transition-colors duration-200">
                                            <td className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                                        <Dumbbell className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{plan.title}</p>
                                                        <p className="text-slate-400 text-sm">by {plan.coach}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-300">{plan.duration}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
                                                    {plan.level}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-300">{plan.clients}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${plan.status === 'Active'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-orange-500/20 text-orange-400'
                                                    }`}>
                                                    {plan.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-20 bg-slate-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                                                            style={{ width: `${plan.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-slate-300">{plan.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        to={`/coach/plans/day/${plan.id}`}
                                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                    >
                                                        <Calendar className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        to="/coach/plans/create"
                                                        className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </Link>
                                                    <button className="text-slate-400 hover:text-slate-300 transition-colors duration-200">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { user: "Sarah M.", action: "completed Day 12 of Summer Shred Program", time: "2 hours ago" },
                                { user: "Mike T.", action: "sent feedback on Strength Foundation", time: "5 hours ago" },
                                { user: "Emma L.", action: "started Endurance Master program", time: "1 day ago" }
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <Star className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-medium text-white">{activity.user}</span>{' '}
                                            <span className="text-slate-300">{activity.action}</span>
                                        </p>
                                        <p className="text-xs text-slate-400">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
