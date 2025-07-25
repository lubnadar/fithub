// ✅ Full Notifications Component (Modified as requested)
import React, { useState, useEffect } from 'react';
import {
    Bell,
    User,
    MessageCircle,
    CheckCircle,
    UserPlus,
    Calendar,
    Activity,
    Heart,
    Award,
    Clock,
    FileText
} from 'lucide-react';

// Mock notification data
const mockNotifications = [
    {
        id: 1,
        type: 'subscription',
        title: 'New subscription request from Sarah Johnson',
        message: 'Sarah Johnson wants to subscribe to your coaching program',
        timestamp: '2 minutes ago',
        isNew: true,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        icon: UserPlus,
        iconColor: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        action: { label: 'View Request', path: '/coach/requests' },
        userRole: 'coach'
    },
    {
        id: 2,
        type: 'plan_update',
        title: 'Your private plan has been updated',
        message: 'Coach Alex added 3 new exercises to your strength training routine',
        timestamp: '15 minutes ago',
        isNew: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        icon: FileText,
        iconColor: 'text-green-400',
        bgColor: 'bg-green-500/10',
        action: { label: 'View Plan', path: '/trainee/plan' },
        userRole: 'trainee'
    },
    {
        id: 3,
        type: 'message',
        title: 'New message from Alex Thompson',
        message: 'Great progress on your workouts this week! Keep it up 💪',
        timestamp: '1 hour ago',
        isNew: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        icon: MessageCircle,
        iconColor: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        action: { label: 'Open Chat', path: '/chat' },
        userRole: 'both'
    },
    {
        id: 4,
        type: 'workout_completed',
        title: 'Workout completed by Mike Davis',
        message: 'Upper Body Strength - Week 3 Day 2 has been marked as complete',
        timestamp: '2 hours ago',
        isNew: false,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        icon: CheckCircle,
        iconColor: 'text-green-400',
        bgColor: 'bg-green-500/10',
        action: { label: 'View Progress', path: '/coach/progress' },
        userRole: 'coach'
    },
    {
        id: 5,
        type: 'comment',
        title: 'New comment on your post',
        message: 'Emma liked your transformation post and left a comment',
        timestamp: '3 hours ago',
        isNew: false,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        icon: Heart,
        iconColor: 'text-pink-400',
        bgColor: 'bg-pink-500/10',
        action: { label: 'View Post', path: '/social' },
        userRole: 'both'
    },
    {
        id: 6,
        type: 'achievement',
        title: 'New achievement unlocked!',
        message: "You've completed 30 workouts this month. Amazing dedication!",
        timestamp: '1 day ago',
        isNew: false,
        avatar: null,
        icon: Award,
        iconColor: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        action: { label: 'View Achievements', path: '/achievements' },
        userRole: 'trainee'
    },
    {
        id: 7,
        type: 'schedule',
        title: 'Upcoming session reminder',
        message: 'Your 1-on-1 session with Coach Alex is scheduled for tomorrow at 2:00 PM',
        timestamp: '1 day ago',
        isNew: false,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        icon: Calendar,
        iconColor: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        action: { label: 'View Schedule', path: '/schedule' },
        userRole: 'trainee'
    },
    {
        id: 8,
        type: 'activity',
        title: 'Weekly activity summary',
        message: 'Your trainees completed 45 workouts this week (+12% from last week)',
        timestamp: '2 days ago',
        isNew: false,
        avatar: null,
        icon: Activity,
        iconColor: 'text-indigo-400',
        bgColor: 'bg-indigo-500/10',
        action: { label: 'View Analytics', path: '/coach/analytics' },
        userRole: 'coach'
    }
];

const Notifications = () => {
    const [notifications, setNotifications] = useState(mockNotifications);

    const handleNotificationClick = (notification) => {
        setNotifications(prev =>
            prev.map(n => n.id === notification.id ? { ...n, isNew: false } : n)
        );
        if (notification.action?.path) {
            alert(`Would navigate to: ${notification.action.path}`);
        }
    };

    const newCount = notifications.filter(n => n.isNew).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
            <div className="relative z-10 p-6 lg:p-8 max-w-3xl mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <div className="p-2 bg-blue-900 rounded-xl">
                        <Bell className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Notifications</h1>
                    {newCount > 0 && (
                        <span className="text-xs text-blue-300 bg-blue-500/20 rounded-full px-2 py-1">
                            {newCount} new
                        </span>
                    )}
                </div>

                {/* Notification List */}
                <div className="space-y-3">
                    {notifications.map(notification => {
                        const Icon = notification.icon;
                        return (
                            <div
                                key={notification.id}
                                className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition cursor-pointer"
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    {notification.avatar ? (
                                        <img src={notification.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center rounded-full ${notification.bgColor}`}>
                                            <Icon size={18} className={notification.iconColor} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-white leading-snug">
                                        {notification.title}
                                    </h3>
                                    <p className="text-xs text-white/70 mt-0.5 leading-tight">
                                        {notification.message}
                                    </p>
                                    <div className="text-[10px] text-white/40 mt-1 flex items-center gap-1">
                                        <Clock size={12} />
                                        <span>{notification.timestamp}</span>
                                    </div>
                                </div>
                                {notification.action && (
                                    <button className="text-[10px] text-blue-300 bg-blue-900 px-2 py-1 rounded-md hover:bg-blue-800">
                                        {notification.action.label}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
