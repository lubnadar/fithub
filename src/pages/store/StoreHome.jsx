import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product, onBuyClick }) => {
    return (
        <div
            className="bg-slate-800 rounded-lg overflow-hidden hover:scale-105 hover:shadow-lg transition-transform duration-200 cursor-pointer"
            onClick={() => onBuyClick(product.id)}
        >
            <div className="aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-sm mb-2 text-white line-clamp-2 h-10">
                    {product.name}
                </h3>
                <p className="text-emerald-400 font-bold text-lg mb-1">
                    ${product.price}
                </p>
                <p className="text-gray-400 text-xs mb-3">
                    by {product.seller}
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBuyClick(product.id);
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded px-3 py-1.5 transition-colors duration-200 font-medium text-sm"
                >
                    Buy
                </button>
            </div>
        </div>
    );
};

const StoreHome = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const navigate = useNavigate();

    // Mock user data - في التطبيق الحقيقي ستأتي من context أو API
    const [user, setUser] = useState({
        isVendor: false, // تغيير هذا إلى true لإخفاء الزر
        name: 'John Doe'
    });

    const handleBuyClick = (productId) => {
        navigate(`/store/product/${productId}`);
    };

    const handleMyOrdersClick = () => {
        navigate('/trainee/my-orders');
    };

    // Mock data - Extended to show more products
    const mockProducts = [
        { id: 1, name: 'Whey Protein Powder', price: 49.99, seller: 'NutraFit', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 2, name: 'Adjustable Dumbbells', price: 299.99, seller: 'PowerGym', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 3, name: 'Yoga Mat Premium', price: 39.99, seller: 'ZenFit', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 4, name: 'Creatine Monohydrate', price: 24.99, seller: 'SupplementPro', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 5, name: 'Resistance Bands Set', price: 19.99, seller: 'FlexFit', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 6, name: 'Protein Shaker Bottle', price: 12.99, seller: 'ShakeIt', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 7, name: 'Pre-Workout Formula', price: 34.99, seller: 'EnergyMax', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 8, name: 'Olympic Barbell', price: 199.99, seller: 'IronCore', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 9, name: 'Workout Gloves', price: 16.99, seller: 'GripPro', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 10, name: 'BCAA Powder', price: 29.99, seller: 'RecoverFast', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 11, name: 'Kettlebell 20kg', price: 89.99, seller: 'StrongCore', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 12, name: 'Foam Roller', price: 24.99, seller: 'RecoveryPlus', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 13, name: 'Mass Gainer', price: 59.99, seller: 'BulkUp', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 14, name: 'Pull-up Bar', price: 49.99, seller: 'HomeGym', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 15, name: 'Lifting Belt', price: 34.99, seller: 'SafeLift', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 16, name: 'Fish Oil Capsules', price: 19.99, seller: 'OmegaHealth', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 17, name: 'Treadmill Compact', price: 799.99, seller: 'CardioMax', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 18, name: 'Water Bottle Insulated', price: 22.99, seller: 'HydratePro', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 19, name: 'Multivitamin Complex', price: 27.99, seller: 'VitalHealth', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 20, name: 'Exercise Ball', price: 18.99, seller: 'FlexCore', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 21, name: 'Wrist Wraps', price: 14.99, seller: 'SupportMax', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 22, name: 'Casein Protein', price: 54.99, seller: 'NightFuel', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 23, name: 'Cable Machine', price: 1299.99, seller: 'ProGym', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 24, name: 'Gym Towel Set', price: 16.99, seller: 'CleanFit', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 25, name: 'L-Carnitine Liquid', price: 32.99, seller: 'BurnFat', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 26, name: 'Smith Machine', price: 1599.99, seller: 'PowerLift', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 27, name: 'Knee Sleeves', price: 29.99, seller: 'JointCare', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 28, name: 'Glutamine Powder', price: 26.99, seller: 'RecoverMax', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 29, name: 'Rowing Machine', price: 899.99, seller: 'CardioPro', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 30, name: 'Gym Bag Premium', price: 45.99, seller: 'CarryFit', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 31, name: 'Testosterone Booster', price: 39.99, seller: 'AlphaMax', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 32, name: 'Battle Ropes', price: 79.99, seller: 'FunctionalFit', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 33, name: 'Elbow Sleeves', price: 19.99, seller: 'SupportPro', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 34, name: 'Fat Burner Pills', price: 44.99, seller: 'LeanBody', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 35, name: 'Leg Press Machine', price: 2199.99, seller: 'QuadMax', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 36, name: 'Ankle Weights', price: 24.99, seller: 'WeightPlus', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 37, name: 'Nitric Oxide Booster', price: 36.99, seller: 'PumpMax', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' },
        { id: 38, name: 'Hex Dumbbells Set', price: 599.99, seller: 'HexFit', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', category: 'Equipment' },
        { id: 39, name: 'Compression Shirt', price: 32.99, seller: 'ComfortFit', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', category: 'Accessories' },
        { id: 40, name: 'Joint Support Formula', price: 29.99, seller: 'JointHealth', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', category: 'Supplements' }
    ];

    useEffect(() => {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
    }, []);

    useEffect(() => {
        let filtered = products;
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (category !== 'All') {
            filtered = filtered.filter(product => product.category === category);
        }
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [searchTerm, category, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header with My Shopping Cart Button */}
                <div className="text-center mb-8 relative">
                    <h1 className="text-2xl font-semibold mb-2">FitHub Store</h1>
                    <p className="text-gray-300">Explore top supplements, gear, and tools for your fitness journey</p>

                    {/* My Shopping Cart Button - يظهر فقط للمستخدمين غير البائعين */}
                    {!user.isVendor && (
                        <button
                            onClick={handleMyOrdersClick}
                            className="absolute top-0 right-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
                        >
                            <ShoppingBag size={18} />
                            My Shopping Cart
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-slate-800 rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search products…"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="All">All</option>
                                <option value="Supplements">Supplements</option>
                                <option value="Equipment">Equipment</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-8">
                    {currentProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onBuyClick={handleBuyClick}
                        />
                    ))}
                </div>

                {/* Empty state */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${currentPage === 1
                                ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg transition-colors ${currentPage === i + 1
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${currentPage === totalPages
                                ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            Next
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Page Info */}
                <div className="text-center mt-4 text-gray-400 text-sm">
                    Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                </div>
            </div>
        </div>
    );
};

export default StoreHome;