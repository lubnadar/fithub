import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Dumbbell, Target, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockExercises = [
    {
        id: 1,
        name: "Barbell Squat",
        targetMuscle: "Legs",
        equipment: "Barbell",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 2,
        name: "Push-Up",
        targetMuscle: "Chest",
        equipment: "Bodyweight",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 3,
        name: "Deadlift",
        targetMuscle: "Back",
        equipment: "Barbell",
        duration: "3-5 sets",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Advanced"
    },
    {
        id: 4,
        name: "Dumbbell Bicep Curl",
        targetMuscle: "Arms",
        equipment: "Dumbbell",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 5,
        name: "Plank",
        targetMuscle: "Core",
        equipment: "Bodyweight",
        duration: "30-60 sec",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 6,
        name: "Bench Press",
        targetMuscle: "Chest",
        equipment: "Barbell",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 7,
        name: "Pull-Up",
        targetMuscle: "Back",
        equipment: "Pull-up Bar",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Advanced"
    },
    {
        id: 8,
        name: "Shoulder Press",
        targetMuscle: "Shoulders",
        equipment: "Dumbbell",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 9,
        name: "Russian Twists",
        targetMuscle: "Core",
        equipment: "Bodyweight",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 10,
        name: "Leg Press",
        targetMuscle: "Legs",
        equipment: "Machine",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 11,
        name: "Tricep Dips",
        targetMuscle: "Arms",
        equipment: "Bodyweight",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 12,
        name: "Mountain Climbers",
        targetMuscle: "Core",
        equipment: "Bodyweight",
        duration: "30-45 sec",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 13,
        name: "Lat Pulldown",
        targetMuscle: "Back",
        equipment: "Machine",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 14,
        name: "Leg Curls",
        targetMuscle: "Legs",
        equipment: "Machine",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 15,
        name: "Incline Dumbbell Press",
        targetMuscle: "Chest",
        equipment: "Dumbbell",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 16,
        name: "Burpees",
        targetMuscle: "Core",
        equipment: "Bodyweight",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Advanced"
    },
    {
        id: 17,
        name: "Hammer Curls",
        targetMuscle: "Arms",
        equipment: "Dumbbell",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 18,
        name: "Calf Raises",
        targetMuscle: "Legs",
        equipment: "Bodyweight",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 19,
        name: "Lateral Raises",
        targetMuscle: "Shoulders",
        equipment: "Dumbbell",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 20,
        name: "Romanian Deadlift",
        targetMuscle: "Back",
        equipment: "Barbell",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 21,
        name: "Chest Flyes",
        targetMuscle: "Chest",
        equipment: "Dumbbell",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 22,
        name: "Leg Extensions",
        targetMuscle: "Legs",
        equipment: "Machine",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Beginner"
    },
    {
        id: 23,
        name: "Face Pulls",
        targetMuscle: "Shoulders",
        equipment: "Cable",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 24,
        name: "Hip Thrusts",
        targetMuscle: "Legs",
        equipment: "Barbell",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 25,
        name: "Cable Rows",
        targetMuscle: "Back",
        equipment: "Cable",
        duration: "3-4 sets",
        image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=300&h=200&fit=crop&crop=center",
        difficulty: "Intermediate"
    },
    {
        id: 26,
        name: "Jump Squats",
        targetMuscle: "Legs",
        equipment: "Bodyweight",
        duration: "3 sets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
        difficulty: "Advanced"
    },
];

const muscleGroups = ["All", "Chest", "Back", "Legs", "Arms", "Shoulders", "Core"];
const equipmentTypes = ["All", "Bodyweight", "Dumbbell", "Barbell", "Machine", "Pull-up Bar", "Cable"];

const EXERCISES_PER_PAGE = 12;

const ExerciseCard = ({ exercise, onViewDetails }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'text-green-400 bg-green-400/10';
            case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
            case 'Advanced': return 'text-red-400 bg-red-400/10';
            default: return 'text-slate-400 bg-slate-400/10';
        }
    };

    return (

        <div
            className="group cursor-pointer backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
        >
            <div className="relative overflow-hidden">
                <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300 truncate">
                    {exercise.name}
                </h3>

                <div className="space-y-1 mb-3">
                    <div className="flex items-center text-slate-300 text-sm">
                        <Target className="w-3 h-3 mr-2" />
                        <span className="truncate">{exercise.targetMuscle}</span>
                    </div>
                    <div className="flex items-center text-slate-300 text-sm">
                        <Dumbbell className="w-3 h-3 mr-2" />
                        <span className="truncate">{exercise.equipment}</span>
                    </div>
                    <div className="flex items-center text-slate-300 text-sm">
                        <Clock className="w-3 h-3 mr-2" />
                        <span className="truncate">{exercise.duration}</span>
                    </div>
                </div>
                <button
                    onClick={() => onViewDetails(exercise.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

const WorkoutLibrary = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('All');
    const [selectedEquipment, setSelectedEquipment] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Handle navigate to exercise detail page
    const handleExerciseClick = (exerciseId) => {
        navigate(`/trainee/exercise/${exerciseId}`);
    };

    const filteredExercises = useMemo(() => {
        return mockExercises.filter(exercise => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMuscle = selectedMuscle === 'All' || exercise.targetMuscle === selectedMuscle;
            const matchesEquipment = selectedEquipment === 'All' || exercise.equipment === selectedEquipment;
            return matchesSearch && matchesMuscle && matchesEquipment;
        });
    }, [searchTerm, selectedMuscle, selectedEquipment]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedMuscle, selectedEquipment]);

    const totalPages = Math.ceil(filteredExercises.length / EXERCISES_PER_PAGE);
    const startIndex = (currentPage - 1) * EXERCISES_PER_PAGE;
    const endIndex = startIndex + EXERCISES_PER_PAGE;
    const currentExercises = filteredExercises.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = start + maxVisiblePages - 1;

            if (end > totalPages) {
                end = totalPages;
                start = end - maxVisiblePages + 1;
            }

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };


    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 backdrop-blur-3xl" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                            Workout Library
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Browse all available exercises curated by FitHub trainers. Perfect form, maximum results.
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by exercise name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Muscle Group Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                value={selectedMuscle}
                                onChange={(e) => setSelectedMuscle(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                            >
                                {muscleGroups.map(muscle => (
                                    <option key={muscle} value={muscle} className="bg-slate-800">
                                        {muscle === 'All' ? 'All Muscle Groups' : muscle}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Equipment Filter */}
                        <div className="relative">
                            <Dumbbell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                value={selectedEquipment}
                                onChange={(e) => setSelectedEquipment(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                            >
                                {equipmentTypes.map(equipment => (
                                    <option key={equipment} value={equipment} className="bg-slate-800">
                                        {equipment === 'All' ? 'All Equipment' : equipment}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Counter and Pagination Info */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-slate-300">
                        Showing <span className="text-white font-semibold">{startIndex + 1}-{Math.min(endIndex, filteredExercises.length)}</span> of <span className="text-white font-semibold">{filteredExercises.length}</span> exercise{filteredExercises.length !== 1 ? 's' : ''}
                    </p>
                    <p className="text-slate-400 text-sm">
                        Page {currentPage} of {totalPages}
                    </p>
                </div>


                {/* Exercise Grid */}
                {currentExercises.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                            <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No exercises found</h3>
                            <p className="text-slate-300">Try adjusting your search criteria or filters.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {currentExercises.map(exercise => (
                                <ExerciseCard
                                    key={exercise.id}
                                    exercise={exercise}
                                    onViewDetails={handleExerciseClick}
                                />
                            ))}
                        </div>
                    </>
                )}
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 space-x-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === 1
                                ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                                : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                                }`}
                        >
                            pre
                        </button>

                        {/* Page Numbers */}
                        {getPageNumbers().map(pageNum => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === pageNum
                                    ? 'bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg'
                                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === totalPages
                                ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                                : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                                }`}
                        >
                            next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutLibrary;
