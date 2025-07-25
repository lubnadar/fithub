// src/components/layout/Footer.jsx
import React from 'react';
import { Dumbbell, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    const footerLinks = {
        Product: ["Features", "Pricing", "Coaches", "Workouts"],
        Company: ["About", "Careers", "Press", "Contact"],
        Resources: ["Blog", "Help Center", "Community", "API"],
        Legal: ["Privacy", "Terms", "Security", "Cookies"],
    };

    const socialLinks = [
        { Icon: Facebook, href: "#", color: "hover:text-blue-500" },
        { Icon: Twitter, href: "#", color: "hover:text-blue-400" },
        { Icon: Instagram, href: "#", color: "hover:text-pink-400" },
        { Icon: Youtube, href: "#", color: "hover:text-red-600" },
    ];

    return (
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700/50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
                    {/* Logo and Description */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                                <Dumbbell className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                FitHub
                            </span>
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Transform your fitness journey with AI-powered workouts, expert coaching, and a supportive community.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map(({ Icon, href, color }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className={`text-slate-400 ${color} transition-colors duration-300 transform hover:scale-110`}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-white font-semibold mb-4">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 text-sm">© {new Date().getFullYear()} FitHub. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                            Terms of Service
                        </a>
                        <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}



/*
import React from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const FooterPreview = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            {/* Page content simulation 
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-4">صفحة المحتوى</h1>
                    <p className="text-slate-600 mb-8">هذا مثال على كيف سيظهر الـ Footer في أسفل الصفحة</p>
                    <div className="h-64 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <p className="text-slate-500">محتوى الصفحة هنا...</p>
                    </div>
                </div>
            </div>

            {/* Footer Component 
            <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl">
                {/* Glassmorphism overlay 
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

               
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                FitHub
                            </h3>
                            <p className="text-slate-300 mt-2 text-sm">
                                Your fitness journey starts here
                            </p>
                        </div>

                        
                        <div className="text-center">
                            <nav className="flex flex-wrap justify-center space-x-6">
                                <a
                                    href="#"
                                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105 transform"
                                >
                                    About
                                </a>
                                <a
                                    href="#"
                                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105 transform"
                                >
                                    Contact
                                </a>
                                <a
                                    href="#"
                                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105 transform"
                                >
                                    Terms
                                </a>
                                <a
                                    href="#"
                                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105 transform"
                                >
                                    Privacy
                                </a>
                            </nav>
                        </div>

                
                        <div className="text-center md:text-right">
                            <div className="flex justify-center md:justify-end space-x-4">
                                <a
                                    href="#"
                                    className="group"
                                >
                                    <div className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 transform">
                                        <Instagram className="h-5 w-5 text-slate-300 group-hover:text-pink-400 transition-colors duration-300" />
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="group"
                                >
                                    <div className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 transform">
                                        <Twitter className="h-5 w-5 text-slate-300 group-hover:text-blue-400 transition-colors duration-300" />
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="group"
                                >
                                    <div className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 transform">
                                        <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-blue-500 transition-colors duration-300" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                   
                    <div className="border-t border-white/10 mt-8 pt-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                         
                            <p className="text-slate-400 text-sm">
                                © 2025 FitHub. All rights reserved.
                            </p>

                          
                            <div className="flex space-x-6 text-sm">
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-white transition-colors duration-300"
                                >
                                    Support
                                </a>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-white transition-colors duration-300"
                                >
                                    Careers
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
            </footer>
        </div>
    );
};

export default FooterPreview;*/