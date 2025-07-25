import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Save, Trash2 } from 'lucide-react';

const AddEditProduct = () => {
    // Mock navigation and params
    const navigate = (path) => {
        console.log(`Navigating to: ${path}`);
        // In a real app, this would be handled by React Router
    };

    // Mock product ID for demo - set to null for Add mode, or a value for Edit mode
    const productId = "demo-product-123"; // Change to null to test Add mode
    const isEditMode = Boolean(productId);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        manufacturer: '',
        images: []
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Categories options
    const categories = [
        'Supplements',
        'Equipment',
        'Clothing',
        'Accessories',
        'Pre-Workout',
        'Protein',
        'Recovery'
    ];

    // Mock data for edit mode
    useEffect(() => {
        if (isEditMode) {
            // Simulate loading existing product data
            const mockProduct = {
                name: 'Whey Protein Isolate',
                description: 'Premium whey protein isolate with 25g protein per serving. Perfect for muscle building and recovery.',
                category: 'Supplements',
                price: '49.99',
                manufacturer: 'FitHub Nutrition',
                images: [
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
                    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'
                ]
            };
            setFormData(mockProduct);
        }
    }, [isEditMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);

        // Create preview URLs
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, event.target.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (!formData.name || !formData.price || !formData.category) {
            alert('Please fill in all required fields');
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setShowSuccess(true);
            setTimeout(() => {
                navigate('/store');
            }, 2000);
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                navigate('/store');
            } catch (error) {
                console.error('Error deleting product:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-blue-900 px-4 py-8">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/store')}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back to Store
                    </button>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isEditMode ? 'Edit Product' : 'Add New Product'}
                    </h1>
                    <p className="text-white/70">
                        {isEditMode ? 'Update your product information' : 'Add a new product to the FitHub store'}
                    </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 bg-emerald-500/20 backdrop-blur-xl border border-emerald-400/30 text-emerald-300 px-4 py-3 rounded-xl">
                        Product {isEditMode ? 'updated' : 'added'} successfully! Redirecting...
                    </div>
                )}

                {/* Main Form */}
                <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Product Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all resize-none"
                                    placeholder="Describe your product..."
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                    required
                                >
                                    <option value="" className="bg-slate-800">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category} className="bg-slate-800">
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price and Manufacturer */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">
                                        Price <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-white/70">$</span>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            step="0.01"
                                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-8 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">
                                        Manufacturer
                                    </label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                        placeholder="Brand name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Image Upload */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Product Images
                                </label>

                                {/* Upload Area */}
                                <div className="border-2 border-dashed border-emerald-400/50 rounded-xl p-8 text-center bg-white/5 backdrop-blur-sm hover:border-emerald-400 transition-colors">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer flex flex-col items-center space-y-2"
                                    >
                                        <Upload size={32} className="text-emerald-400" />
                                        <span className="text-white font-medium">Upload Images</span>
                                        <span className="text-white/60 text-sm">PNG, JPG up to 10MB each</span>
                                    </label>
                                </div>

                                {/* Image Previews */}
                                {formData.images.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        {formData.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border border-white/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Save size={20} />
                            )}
                            {isLoading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Save Product')}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/store')}
                            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>

                        {isEditMode && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 size={20} />
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditProduct;