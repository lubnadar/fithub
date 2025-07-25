import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Activity,
    Brain,
    Users,
    Dumbbell,
    Heart,
    Star,
    Play,
    ArrowRight,
    Instagram,
    Twitter,
    Facebook,
    Menu,
    X,
    MessageCircle,
    ThumbsUp,
    CheckCircle
} from 'lucide-react';

const Landing = () => {
    const [isVisible, setIsVisible] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            const elements = document.querySelectorAll('[data-animate]');
            elements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight * 0.8;
                if (isInView && !isVisible[index]) {
                    setIsVisible(prev => ({ ...prev, [index]: true }));
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Form Correction",
            description: "Real-time analysis of your workout form with instant feedback and corrections."
        },
        {
            icon: Users,
            title: "Private Coaching Plans",
            description: "Connect with certified trainers for personalized workout and nutrition plans."
        },
        {
            icon: Dumbbell,
            title: "Interactive Workout Library",
            description: "Access thousands of workouts with video demonstrations and progress tracking."
        },
        {
            icon: Heart,
            title: "Fitness Social Feed",
            description: "Share progress, get motivated, and connect with a supportive fitness community."
        }
    ];
    const coaches = [
        {
            name: "Sarah Johnson",
            specialty: "Strength & Conditioning",
            avatar: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face",
            followers: "12.5K"
        },
        {
            name: "Mike Chen",
            specialty: "HIIT & Cardio",
            avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
            followers: "8.3K"
        },
        {
            name: "Emma Rodriguez",
            specialty: "Yoga & Flexibility",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            followers: "15.7K"
        }
    ];
    const testimonials = [
        {
            name: "Alex Thompson",
            rating: 5,
            text: "FitHub transformed my fitness journey completely. The AI form correction helped me avoid injuries and maximize results.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
        },
        {
            name: "Jessica Lee",
            rating: 5,
            text: "The community support and expert coaching made all the difference. I've never been more motivated!",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
        },
        {
            name: "David Martinez",
            rating: 5,
            text: "Best fitness platform I've ever used. The personalized workouts and real-time feedback are game-changers.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
        }
    ];
    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
            <style>
                {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient {
            background: linear-gradient(-45deg, #10b981, #3b82f6, #8b5cf6, #06b6d4);
            background-size: 400% 400%;
            animation: gradientShift 4s ease infinite;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out both;
          }
        `}
            </style>
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2 group cursor-pointer">
                            {/* ✅ تغيير الأيقونة من Activity إلى Dumbbell */}
                            <Dumbbell className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                FitHub
                            </span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            {['Home', 'Trainers', 'Workouts', 'Community', 'Store'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="relative group text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                        </div>
                        <div className="hidden md:flex space-x-4">
                            {/* ✅ ربط زر Login */}
                            <Link
                                to="/login"
                                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-300"
                            >
                                Sign Up
                            </Link>
                        </div>
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-gray-800 border-t border-gray-700">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {['Home', 'Trainers', 'Workouts', 'Community', 'Store', 'Login', 'Sign Up'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-300"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                </div>
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="space-y-8 animate-fade-in-up">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="block animate-gradient mb-2">
                                Train Smarter.
                            </span>
                            <span className="block text-white mb-2">
                                Connect with Experts.
                            </span>
                            <span className="block bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent">
                                Get AI-Powered Results.
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            A fitness platform that personalizes your workouts, connects you with coaches,
                            and tracks your form in real-time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                            <Link
                                to="/register"
                                className="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                Get Started
                            </Link>
                            <button className="group border-2 border-gray-600 hover:border-emerald-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                                <Play className="w-5 h-5 group-hover:text-emerald-400 transition-colors duration-300" />
                                <span className="group-hover:text-emerald-400 transition-colors duration-300">Explore Features</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section className="py-20 bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="text-center mb-16"
                        data-animate
                        style={{
                            opacity: isVisible[0] ? 1 : 0,
                            transform: `translateY(${isVisible[0] ? 0 : 50}px)`,
                            transition: 'all 0.8s ease-out'
                        }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                Revolutionary Features
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Experience the future of fitness with our cutting-edge technology and expert guidance.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                data-animate
                                className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer"
                                style={{
                                    opacity: isVisible[index + 1] ? 1 : 0,
                                    transform: `translateY(${isVisible[index + 1] ? 0 : 50}px)`,
                                    transition: `all 0.8s ease-out ${index * 0.2}s`
                                }}
                            >
                                <div className="mb-6">
                                    <feature.icon className="w-12 h-12 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-all duration-300" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Featured Coaches Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="text-center mb-16"
                        data-animate
                        style={{
                            opacity: isVisible[5] ? 1 : 0,
                            transform: `translateY(${isVisible[5] ? 0 : 50}px)`,
                            transition: 'all 0.8s ease-out'
                        }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Meet Our Expert Coaches
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Learn from certified professionals who are passionate about helping you achieve your goals.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coaches.map((coach, index) => (
                            <div
                                key={index}
                                data-animate
                                className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
                                style={{
                                    opacity: isVisible[index + 6] ? 1 : 0,
                                    transform: `translateY(${isVisible[index + 6] ? 0 : 50}px)`,
                                    transition: `all 0.8s ease-out ${index * 0.2}s`
                                }}
                            >
                                <div className="text-center">
                                    <div className="relative inline-block mb-6">
                                        <img
                                            src={coach.avatar}
                                            alt={coach.name}
                                            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500/50 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        {coach.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4">{coach.specialty}</p>
                                    <p className="text-sm text-gray-500 mb-6">{coach.followers} followers</p>
                                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-full font-semibold transition-all duration-300 transform group-hover:scale-105">
                                        Follow Coach
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Testimonials Section */}
            <section className="py-20 bg-gray-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="text-center mb-16"
                        data-animate
                        style={{
                            opacity: isVisible[9] ? 1 : 0,
                            transform: `translateY(${isVisible[9] ? 0 : 50}px)`,
                            transition: 'all 0.8s ease-out'
                        }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                What Our Members Say
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Join thousands of satisfied members who have transformed their fitness journey with FitHub.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                data-animate
                                className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                                style={{
                                    opacity: isVisible[index + 10] ? 1 : 0,
                                    transform: `translateY(${isVisible[index + 10] ? 0 : 50}px)`,
                                    transition: `all 0.8s ease-out ${index * 0.2}s`
                                }}
                            >
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 italic group-hover:text-white transition-colors duration-300">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full border-2 border-emerald-500/50 group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                            {testimonial.name}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                {/* ✅ تغيير الأيقونة من Activity إلى Dumbbell */}
                                <Dumbbell className="w-8 h-8 text-emerald-400" />
                                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                    FitHub
                                </span>
                            </div>
                            <p className="text-gray-400 max-w-md">
                                Revolutionizing fitness through AI-powered coaching, community support, and personalized training programs.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {['About Us', 'Trainers', 'Pricing', 'Support'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 FitHub. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            {[Instagram, Twitter, Facebook].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-110"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Landing;
