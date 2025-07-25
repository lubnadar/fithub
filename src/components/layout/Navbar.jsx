// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react'; // ✅ أيقونة الدمبل

export default function Navbar() {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
                {/* الشعار */}
                <div className="flex items-center space-x-3">
                    {/* أيقونة الدمبل */}
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                        <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    {/* اسم الموقع بألوان البليت */}
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
                        FitHub
                    </h1>
                </div>

                {/* زر Login و Sign Up */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/login"
                        className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
}