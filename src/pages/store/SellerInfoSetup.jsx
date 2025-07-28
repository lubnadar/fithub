import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Store, Globe, MapPin, FileText, Link, Building2, Check } from 'lucide-react';

const SellerInfoSetup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        storeName: '',
        businessCategory: '',
        country: '',
        city: '',
        taxId: '',
        storeDescription: '',
        website: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});

    const sellerData = {
        name: 'John Smith',
        email: 'john.smith@example.com'
    };

    const businessCategories = [
        'Supplements',
        'Gear',
        'Apparel',
        'Wellness',
        'Other'
    ];

    const countries = [
        { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'FR', name: 'France', flag: '🇫🇷' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸' },
        { code: 'IT', name: 'Italy', flag: '🇮🇹' },
        { code: 'JP', name: 'Japan', flag: '🇯🇵' }
    ];

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'storeName':
                if (!value.trim()) {
                    newErrors.storeName = 'Store name is required';
                } else if (value.trim().length < 2) {
                    newErrors.storeName = 'Store name must be at least 2 characters';
                } else {
                    delete newErrors.storeName;
                }
                break;
            case 'businessCategory':
                if (!value) {
                    newErrors.businessCategory = 'Business category is required';
                } else {
                    delete newErrors.businessCategory;
                }
                break;
            case 'country':
                if (!value) {
                    newErrors.country = 'Country is required';
                } else {
                    delete newErrors.country;
                }
                break;
            case 'city':
                if (!value.trim()) {
                    newErrors.city = 'City is required';
                } else {
                    delete newErrors.city;
                }
                break;
            case 'website':
                if (value && !/^https?:\/\/.+\..+/.test(value)) {
                    newErrors.website = 'Please enter a valid URL (e.g., https://example.com)';
                } else {
                    delete newErrors.website;
                }
                break;
            case 'storeDescription':
                if (value.length > 500) {
                    newErrors.storeDescription = 'Description must be 500 characters or less';
                } else {
                    delete newErrors.storeDescription;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldsToValidate = ['storeName', 'businessCategory', 'country', 'city', 'website', 'storeDescription'];
        let isValid = true;

        fieldsToValidate.forEach(field => {
            if (!validateField(field, formData[field])) {
                isValid = false;
            }
            setTouchedFields(prev => ({ ...prev, [field]: true }));
        });

        if (!isValid) return;

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const sellerProfile = {
                ...sellerData,
                ...formData,
                profileComplete: true,
                createdAt: new Date().toISOString()
            };

            localStorage.setItem('sellerProfile', JSON.stringify(sellerProfile));
            navigate('/store/dashboard');
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent opacity-70 scale-125"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-70 scale-125"></div>
            </div>

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Complete Your <span className="text-emerald-400">Seller Profile</span>
                        </h1>
                        <p className="text-slate-300 text-lg">
                            Just one more step to start selling on FitHub
                        </p>
                    </div>

                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-slate-900" />
                                </div>
                                <span className="ml-2 text-emerald-400 font-medium">Email Verified</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">2</span>
                                </div>
                                <span className="ml-2 text-blue-400 font-medium">Profile Setup</span>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {sellerData.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">{sellerData.name}</h3>
                                <p className="text-slate-300 text-sm">{sellerData.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center text-white font-medium mb-2">
                                    <Store className="w-5 h-5 mr-2 text-emerald-400" />
                                    Store / Brand Name *
                                </label>
                                <input
                                    type="text"
                                    name="storeName"
                                    value={formData.storeName}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your store or brand name"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                                />
                                {touchedFields.storeName && errors.storeName && (
                                    <p className="text-red-400 text-sm mt-1">{errors.storeName}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center text-white font-medium mb-2">
                                    <Building2 className="w-5 h-5 mr-2 text-emerald-400" />
                                    Business Category *
                                </label>
                                <select
                                    name="businessCategory"
                                    value={formData.businessCategory}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                                >
                                    <option value="">Select Category</option>
                                    {businessCategories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {touchedFields.businessCategory && errors.businessCategory && (
                                    <p className="text-red-400 text-sm mt-1">{errors.businessCategory}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center text-white font-medium mb-2">
                                    <MapPin className="w-5 h-5 mr-2 text-emerald-400" />
                                    Location *
                                </label>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map(({ code, name, flag }) => (
                                                <option key={code} value={code}>
                                                    {flag} {name}
                                                </option>
                                            ))}
                                        </select>
                                        {touchedFields.country && errors.country && (
                                            <p className="text-red-400 text-sm mt-1">{errors.country}</p>
                                        )}
                                    </div>

                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="City"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                                        />
                                        {touchedFields.city && errors.city && (
                                            <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center text-white font-medium mb-2">
                                    <FileText className="w-5 h-5 mr-2 text-emerald-400" />
                                    Store Description
                                </label>
                                <textarea
                                    name="storeDescription"
                                    value={formData.storeDescription}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    placeholder="Describe your store"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                                />
                                {touchedFields.storeDescription && errors.storeDescription && (
                                    <p className="text-red-400 text-sm mt-1">{errors.storeDescription}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center text-white font-medium mb-2">
                                    <Link className="w-5 h-5 mr-2 text-emerald-400" />
                                    Website (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your store's website"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                                />
                                {touchedFields.website && errors.website && (
                                    <p className="text-red-400 text-sm mt-1">{errors.website}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white font-semibold py-4 rounded-xl hover:from-emerald-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <span>{isLoading ? 'Saving...' : 'Save and Continue'}</span>
                                {!isLoading && <ChevronRight className="w-5 h-5" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerInfoSetup;
