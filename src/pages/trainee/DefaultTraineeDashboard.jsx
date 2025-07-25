// src/pages/trainee/DefaultTraineeDashboard.jsx
import React from 'react';
import { Users, MessageCircle, HelpCircle, Star, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ الإضافة: لتفعيل التنقل

const DefaultTraineeDashboard = () => {
  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    // In actual implementation, use your router navigation method
  };

  // Mock user data - replace with actual user context
  const userName = "Alex Johnson";

  return (
    <>
      {/* ✅ الإضافة: شريط التنقل */}


      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Welcome back, {userName}!
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready to start your fitness journey? Explore our amazing coaches and join our vibrant community.
            </p>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Explore Coaches Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Explore Coaches</h2>
                </div>

                <p className="text-gray-300 mb-6">
                  Find the perfect coach to guide your fitness journey. Browse through our certified trainers and find your ideal match.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">50+ Coaches</p>
                    <p className="text-gray-400 text-sm">Expert trainers</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Personalized</p>
                    <p className="text-gray-400 text-sm">Training plans</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Flexible</p>
                    <p className="text-gray-400 text-sm">Scheduling</p>
                  </div>
                </div>

                <Link
                  to="/trainee/explore-coaches"
                  className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-blue-500/25 inline-block text-center"
                >
                  Find a Coach
                </Link>
              </div>
            </div>

            {/* Your Activity Section */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Your Activity</h2>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 text-center border border-purple-500/30">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Let's Training For Today</h3>
                  <p className="text-gray-300 text-sm">
                    Let's doing your Exercises For Today.. training and track your progress and workouts here!
                  </p>

                  {/* ✅ تحذير: تأكد من تعريف المسار في App.jsx */}
                  <Link
                    to="/workout-library"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-pink-500/25 inline-block text-center mt-4"
                  >
                    Explore All Exercises
                  </Link>
                </div>
              </div>

              {/* Community Section */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Community</h2>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  Connect with fellow fitness enthusiasts, share your journey, and get motivated.
                </p>

                <Link
                  to="/community"
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 inline-block text-center"
                >
                  Visit Community Feed
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-gray-400 text-sm">Workouts Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-gray-400 text-sm">Days Active</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-gray-400 text-sm">Goals Achieved</div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Need Help?</h2>
            </div>

            <p className="text-gray-300 mb-4">
              Have questions about getting started? Our support team is here to help you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                Contact Support
              </button>
              <button className="px-6 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                View FAQ
              </button>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-8 text-center">
            <blockquote className="text-lg text-gray-300 italic max-w-2xl mx-auto">
              "The journey of a thousand miles begins with a single step. Start your fitness journey today."
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultTraineeDashboard;