// src/pages/workouts/WorkoutLibrary.jsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, ArrowLeft, Target, Dumbbell, Play, Clock, BarChart3 } from 'lucide-react';
import CoachSidebar from '../../components/layout/CoachNavbar';
import TraineeSidebar from '../../components/layout/TraineeSidebar';
//import { useNavigate } from 'react-router-dom';

// Mock workout data
const generateWorkouts = () => {
    //const navigate = useNavigate();
    const workouts = [];
    const names = ['Push-Up Challenge', 'Squat Progression', 'Deadlift Mastery', 'Bench Press Power',
        'Pull-Up Strength', 'Plank Endurance', 'Burpee Blast', 'Tricep Dips',
        'Shoulder Press', 'Bicep Curls', 'Leg Press', 'Calf Raises',
        'Lateral Raises', 'Chest Flyes', 'Rows Power', 'Hip Thrusts',
        'Mountain Climbers', 'Jump Squats', 'Russian Twists', 'Wall Sit',
        'Lunges', 'Push Press', 'Clean and Jerk', 'Kettlebell Swings',
        'Box Jumps', 'Battle Ropes', 'Farmer\'s Walk', 'Plyo Push-Ups',
        'Snatch', 'Thrusters', 'Goblet Squats', 'Single-Leg Deadlifts',
        'Face Pulls', 'Lat Pulldowns', 'Cable Rows', 'Leg Curls',
        'Leg Extensions', 'Chest Press', 'Shoulder Flyes', 'Hip Abductors',
        'Hip Adductors', 'Seated Rows', 'Incline Press', 'Decline Press',
        'Front Squats', 'Back Squats', 'Overhead Press', 'Bench Dips',
        'Close-Grip Push-Ups', 'Wide-Grip Pull-Ups', 'Neutral-Grip Rows', 'Hammer Curls'];

    const muscles = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Glutes', 'Cardio'];
    const equipment = ['Bodyweight', 'Dumbbells', 'Barbell', 'Kettlebell', 'Resistance Bands', 'Cable Machine'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

    for (let i = 0; i < 40; i++) {
        workouts.push({
            id: i + 1,
            name: names[i],
            muscle: muscles[Math.floor(Math.random() * muscles.length)],
            equipment: equipment[Math.floor(Math.random() * equipment.length)],
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            duration: Math.floor(Math.random() * 45) + 15,
            sets: Math.floor(Math.random() * 4) + 2,
            image: `https://images.unsplash.com/photo-${1570000000000 + i}?w=400&h=300&fit=crop&crop=center`
        });
    }
    return workouts;
};

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
    const muscles = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Glutes', 'Cardio'];
    const equipment = ['Bodyweight', 'Dumbbells', 'Barbell', 'Kettlebell', 'Resistance Bands', 'Cable Machine'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

    const FilterSection = ({ title, items, filterKey }) => (
        <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">{title}</h3>
            <div className="space-y-2">
                {items.map((item) => (
                    <label key={item} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters[filterKey].includes(item)}
                            onChange={(e) => {
                                const newValues = e.target.checked
                                    ? [...filters[filterKey], item]
                                    : filters[filterKey].filter((f) => f !== item);
                                onFilterChange(filterKey, newValues);
                            }}
                            className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-slate-300">{item}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-emerald-400">Filters</h2>
                <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
                <FilterSection title="Muscle Groups" items={muscles} filterKey="muscles" />
                <FilterSection title="Equipment" items={equipment} filterKey="equipment" />
                <FilterSection title="Difficulty" items={difficulties} filterKey="difficulty" />
                <button
                    onClick={() => onFilterChange('clear')}
                    className="w-full mt-4 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${page === '...' ? 'cursor-default' : 'cursor-pointer'
                        } ${page === currentPage
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-blue-500'
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

const WorkoutCard = ({ workout, onClick }) => {
    return (
        <div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
            onClick={() => onClick(workout)}
        >
            <div className="relative overflow-hidden">
                <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-slate-300">
                    {workout.difficulty}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-3 border border-blue-500/30">
                        <Play className="w-6 h-6 text-blue-400" />
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {workout.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{workout.muscle}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration}min</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                        <Dumbbell className="w-4 h-4" />
                        <span>{workout.equipment}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                        <BarChart3 className="w-4 h-4" />
                        <span>{workout.sets} sets</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WorkoutLibrary = () => {
    const [workouts] = useState(generateWorkouts());
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        muscles: [],
        equipment: [],
        difficulty: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ الإضافة: حالة الـ Sidebar

    // ✅ جلب الدور من localStorage
    const userRole = localStorage.getItem('userRole') || 'trainee';
    // ✅ اختيار الـ Sidebar حسب الدور
    const SidebarComponent = userRole === 'coach' ? CoachSidebar : TraineeSidebar;

    const workoutsPerPage = 12;
    const filteredWorkouts = useMemo(() => {
        return workouts.filter(workout => {
            const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                workout.muscle.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesMuscle = filters.muscles.length === 0 || filters.muscles.includes(workout.muscle);
            const matchesEquipment = filters.equipment.length === 0 || filters.equipment.includes(workout.equipment);
            const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(workout.difficulty);

            return matchesSearch && matchesMuscle && matchesEquipment && matchesDifficulty;
        });
    }, [workouts, searchTerm, filters]);

    const totalPages = Math.ceil(filteredWorkouts.length / workoutsPerPage);
    const currentWorkouts = filteredWorkouts.slice(
        (currentPage - 1) * workoutsPerPage,
        currentPage * workoutsPerPage
    );

    const handleFilterChange = (filterType, values) => {
        if (filterType === 'clear') {
            setFilters({ muscles: [], equipment: [], difficulty: [] });
        } else {
            setFilters(prev => ({ ...prev, [filterType]: values }));
        }
        setCurrentPage(1);
    };

    const handleWorkoutClick = (workout) => {
        setSelectedWorkout(workout);
        console.log('Navigate to workout:', workout.id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            {/* ✅ الإضافة: Sidebar حسب الدور */}
            <SidebarComponent isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex">
                {/* Sidebar */}
                <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            {/* Back Button */}
                            <button
                                onClick={() => navigate('/your/target/path')}
                                className="text-white/60 hover:text-white transition-colors mb-1"
                            >
                                <ArrowLeft size={24} />
                            </button>

                            <h1 className="text-3xl font-bold text-white">Workout Library</h1>

                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="md:hidden bg-slate-800 text-slate-400 hover:text-white px-4 py-2 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors flex items-center gap-2"
                            >
                                <Filter className="w-4 h-4" /> Filters
                            </button>
                        </div>


                        {/* Search Bar */}
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search workouts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="mb-6">
                        <p className="text-slate-400">
                            Showing {currentWorkouts.length} of {filteredWorkouts.length} workouts
                        </p>
                    </div>

                    {/* Workout Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentWorkouts.map(workout => (
                            <WorkoutCard
                                key={workout.id}
                                workout={workout}
                                onClick={handleWorkoutClick}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>

            {/* Workout Detail Modal (placeholder) */}
            {selectedWorkout && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">{selectedWorkout.name}</h2>
                            <button
                                onClick={() => setSelectedWorkout(null)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-slate-300 mb-4">
                            This would show detailed workout information, instructions, and video demonstrations.
                        </p>
                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                                Start Workout
                            </button>
                            <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors">
                                Add to Plan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutLibrary;