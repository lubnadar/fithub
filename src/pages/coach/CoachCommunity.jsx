import React, { useState } from 'react';
import { X, Plus, Heart, MessageCircle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Mock data for posts
const mockPosts = [
    {
        id: 1,
        author: 'Alex Johnson',
        avatar: '/api/placeholder/40/40',
        content: 'Just completed my 30-day transformation challenge! Here are my results and tips for staying consistent.',
        image: '/api/placeholder/600/400',
        likes: 24,
        comments: 8,
        timestamp: '2 hours ago',
        isLiked: false
    },
    {
        id: 2,
        author: 'Sarah Williams',
        avatar: '/api/placeholder/40/40',
        content: 'Morning workout routine for busy professionals. Start your day with energy and focus!',
        image: '/api/placeholder/600/400',
        likes: 18,
        comments: 5,
        timestamp: '5 hours ago',
        isLiked: true
    },
    {
        id: 3,
        author: 'Mike Chen',
        avatar: '/api/placeholder/40/40',
        content: 'Nutrition tips for muscle gain. What\'s your favorite high-protein meal?',
        image: '/api/placeholder/600/400',
        likes: 32,
        comments: 12,
        timestamp: '1 day ago',
        isLiked: false
    }
];

const PostFormModal = ({ isOpen, onClose }) => {
    const [postContent, setPostContent] = useState('');
    const [hasImage, setHasImage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postContent.trim()) {
            console.log('Posting:', { content: postContent, hasImage });
            setPostContent('');
            setHasImage(false);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-lg w-full max-w-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-emerald-400">Create New Post</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="Share your fitness wisdom with the community..."
                            className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 resize-none"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={() => setHasImage(!hasImage)}
                            className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                            <Camera className="w-5 h-5" />
                            <span>Add Image</span>
                        </button>
                        {hasImage && (
                            <div className="flex items-center space-x-2 text-sm text-slate-400">
                                <div className="w-8 h-8 bg-slate-600 rounded"></div>
                                <span>Image attached</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="mr-4 px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!postContent.trim()}
                            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main CommunityFeed Component
const CommunityFeed = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const posts = mockPosts;


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans">
            {/* Navbar changes based on user role */}

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-4xl font-bold text-emerald-400 mb-2">Fitness Community</h1>
                        <p className="text-slate-300 text-lg">Connect, inspire, and grow together with fellow fitness enthusiasts</p>
                    </div>
                    <button
                        onClick={() => navigate('/coach/create-post')}
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create Post</span>
                    </button>

                </div>

                {/* Posts Grid */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white/10 border border-white/10 backdrop-blur-md rounded-lg p-6">
                            <div className="flex items-start space-x-4 mb-4">
                                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                                    <div className="w-6 h-6 bg-slate-400 rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-white">{post.author}</h3>
                                        <span className="text-slate-400 text-sm">{post.timestamp}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-slate-300 leading-relaxed">{post.content}</p>
                            </div>

                            {post.image && (
                                <div className="mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt="Post content"
                                        className="w-full h-auto"
                                    />
                                </div>
                            )}

                            <div className="flex items-center space-x-6">
                                <button
                                    onClick={() => console.log('Like')}
                                    className={`flex items-center space-x-2 transition-colors ${post.isLiked
                                        ? 'text-red-400 hover:text-red-300'
                                        : 'text-slate-400 hover:text-red-400'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                    <span className="font-medium">{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="font-medium">{post.comments}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="bg-white/10 border border-white/10 backdrop-blur-md text-slate-300 px-8 py-3 rounded-lg hover:bg-white/15 transition-all duration-200 font-medium">
                        Load More Posts
                    </button>
                </div>

                {/* Post Form Modal */}
                <PostFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default CommunityFeed;
