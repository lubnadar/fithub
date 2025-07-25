// src/components/layout/TraineeSidebarItems.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Search,
  FileText,
  History,
  User,
  MessageCircle
} from 'lucide-react';

const TraineeSidebarItems = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 p-3 rounded-md transition ${location.pathname === path
      ? 'bg-emerald-600 text-white'
      : 'hover:bg-emerald-100 text-gray-700'
    }`;

  return (
    <nav className="flex flex-col gap-2 px-4">
      <Link to="/trainee/dashboard" className={linkClass('/trainee/dashboard')}>
        <Home className="w-5 h-5" /> Dashboard
      </Link>
      <Link to="/trainee/ExploreCoaches" className={linkClass('/trainee/ExploreCoaches')}>
        <Search className="w-5 h-5" /> Explore Coaches
      </Link>
      <Link to="/trainee/PrivatePlanView" className={linkClass('/trainee/PrivatePlanView')}>
        <FileText className="w-5 h-5" /> My Plan
      </Link>
      <Link to="/trainee/RequestHistory" className={linkClass('/trainee/RequestHistory')}>
        <History className="w-5 h-5" /> Request History
      </Link>
      <Link to="/chat" className={linkClass('/chat')}>
        <MessageCircle className="w-5 h-5" /> Chat
      </Link>
      <Link to="/trainee/Profile" className={linkClass('/trainee/Profile')}>
        <User className="w-5 h-5" /> Profile
      </Link>
    </nav>
  );
};

export default TraineeSidebarItems;