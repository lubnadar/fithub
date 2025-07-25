import React, { useState } from 'react';
import { Star, ShoppingCart, User, Calendar, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';


const ProductDetail = () => {
    const { id } = useParams();
    console.log("Product ID from URL:", id);

    // باقي الكود مثل useState للمنتج والمراجعات...

    // Mock product data
    const [product] = useState({
        id: 1,
        name: "Premium Whey Protein Isolate",
        seller: {
            name: "FitPro Nutrition",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
            logo: "🏋️"
        },
        price: 49.99,
        originalPrice: 59.99,
        images: [
            "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop"
        ],
        description: "Our premium whey protein isolate is designed for serious athletes and fitness enthusiasts. With 25g of high-quality protein per serving, this fast-absorbing formula supports muscle growth and recovery. Made from grass-fed cows and free from artificial fillers, it's the perfect post-workout supplement to fuel your fitness journey.",
        rating: 4.6,
        totalReviews: 148
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviews, setReviews] = useState([
        {
            id: 1,
            user: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            rating: 5,
            comment: "Amazing taste and quality! I've been using this for 3 months now and the results are incredible. Mixes well and no chalky aftertaste.",
            timestamp: "2024-01-15"
        },
        {
            id: 2,
            user: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            rating: 4,
            comment: "Great protein powder. The vanilla flavor is smooth and not too sweet. Perfect for post-workout recovery.",
            timestamp: "2024-01-12"
        },
        {
            id: 3,
            user: "Emma Davis",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
            rating: 5,
            comment: "Best protein I've tried! Clean ingredients and amazing mixability. Will definitely reorder.",
            timestamp: "2024-01-10"
        }
    ]);

    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: ""
    });

    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    const handleImageChange = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prev) =>
                prev === product.images.length - 1 ? 0 : prev + 1
            );
        } else {
            setCurrentImageIndex((prev) =>
                prev === 0 ? product.images.length - 1 : prev - 1
            );
        }
    };

    const handleSubmitReview = () => {
        if (newReview.comment.trim()) {
            const review = {
                id: reviews.length + 1,
                user: "You",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                rating: newReview.rating,
                comment: newReview.comment,
                timestamp: new Date().toISOString().split('T')[0]
            };
            setReviews([review, ...reviews]);
            setNewReview({ rating: 5, comment: "" });
        }
    };

    const renderStars = (rating, interactive = false, onRatingChange = null) => {
        return [...Array(5)].map((_, i) => (
            <button
                key={i}
                className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
            >
                <Star className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
            </button>
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700/50">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-xl"
                            />
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => handleImageChange('prev')}
                                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleImageChange('next')}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail selector */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3 justify-center">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                            ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                                            : 'border-slate-600 hover:border-slate-500'
                                            }`}
                                    >
                                        <img src={image} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center text-xl">
                                        {product.seller.logo}
                                    </div>
                                    <span className="text-slate-300 font-medium">{product.seller.name}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {renderStars(Math.floor(product.rating))}
                                </div>
                                <span className="text-emerald-400 font-semibold">{product.rating}</span>
                                <span className="text-slate-400">({product.totalReviews} reviews)</span>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-bold text-emerald-400">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-slate-400 line-through">${product.originalPrice}</span>
                                )}
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-8">{product.description}</p>

                            <button
                                onClick={() => setShowCheckoutModal(true)}
                                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Buy Now - ${product.price}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
                    <h2 className="text-2xl font-bold text-white mb-8">Reviews & Ratings</h2>

                    {/* Review Form */}
                    <div onSubmit={handleSubmitReview} className="mb-12 bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                        <h3 className="text-xl font-semibold text-white mb-4">Write a Review</h3>

                        <div className="mb-4">
                            <label className="block text-slate-300 mb-2">Rating</label>
                            <div className="flex gap-1">
                                {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-slate-300 mb-2">Your Review</label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                className="w-full bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none resize-none"
                                rows="4"
                                placeholder="Share your experience with this product..."
                                required
                            />
                        </div>

                        <button
                            onClick={handleSubmitReview}
                            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                        >
                            Submit Review
                        </button>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div
                                key={review.id}
                                className={`bg-slate-700/30 rounded-xl p-6 border border-slate-600/50 transition-all duration-500 ${index === 0 && review.user === "You" ? 'animate-pulse' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <img
                                        src={review.avatar}
                                        alt={review.user}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="font-semibold text-white">{review.user}</h4>
                                                <div className="flex gap-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <span className="text-slate-400 text-sm">{review.timestamp}</span>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Buy Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50 p-4 z-50">
                <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now - ${product.price}
                </button>
            </div>

            {/* Checkout Modal */}
            {showCheckoutModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700/50 shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Checkout Preview</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-300">
                                <span>{product.name}</span>
                                <span>${product.price}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <hr className="border-slate-600" />
                            <div className="flex justify-between text-white font-bold text-lg">
                                <span>Total</span>
                                <span>${product.price}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowCheckoutModal(false)}
                                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-3 px-6 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowCheckoutModal(false);
                                    alert('Checkout feature coming soon!');
                                }}
                                className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;