import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Store, Globe, MapPin, FileText, Link, Building2, Check } from 'lucide-react';

const SellerInfoSetup = () => {
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
    const navigate = useNavigate();

    // Mock seller data (would come from previous step)
    const sellerData = {
        name: 'John Smith',
        email: 'john.smith@example.com'
    };

    const businessCategories = ['Supplements', 'Gear', 'Apparel', 'Wellness', 'Other'];

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

            // ✅ Redirect to SellerDashboard.jsx route
            navigate('/store/dashboard');

        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Content skipped for brevity in this snippet */}
            <form onSubmit={handleSubmit}>
                {/* ... your form fields here ... */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save and Continue'}
                </button>
            </form>
        </div>
    );
};

export default SellerInfoSetup;
