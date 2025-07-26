import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get product data from navigation state or use default
    const { product, quantity = 1 } = location.state || {};

    // If no product data, redirect back or use mock data
    React.useEffect(() => {
        if (!product) {
            console.log('No product data found, using mock data');
        }
    }, [product]);

    // Mock product data as fallback
    const mockProduct = {
        id: 1,
        name: "Premium Whey Protein Isolate",
        price: 49.99,
        originalPrice: 59.99,
        images: ["https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&h=600&fit=crop"],
        seller: {
            name: "FitPro Nutrition",
            logo: "🏋️"
        }
    };

    // Use actual product data or fallback to mock data
    const currentProduct = product || mockProduct;
    const currentQuantity = quantity || 1;

    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'US'
    });

    const [errors, setErrors] = useState({});
    const [cardType, setCardType] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Card type detection
    const detectCardType = (number) => {
        const cleanNumber = number.replace(/\s/g, '');
        if (cleanNumber.match(/^4/)) return 'visa';
        if (cleanNumber.match(/^5[1-5]/)) return 'mastercard';
        if (cleanNumber.match(/^3[47]/)) return 'amex';
        if (cleanNumber.match(/^6/)) return 'discover';
        return '';
    };

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const cleanValue = value.replace(/\s/g, '');
        const match = cleanValue.match(/.{1,4}/g);
        return match ? match.join(' ') : cleanValue;
    };

    // Format expiry date
    const formatExpiryDate = (value) => {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length >= 2) {
            return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
        }
        return cleanValue;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
            if (formattedValue.length <= 19) {
                setCardType(detectCardType(formattedValue));
            }
        } else if (name === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        } else if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').substring(0, 4);
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.cardholderName.trim()) {
            newErrors.cardholderName = 'Cardholder name is required';
        }

        const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
        if (!cleanCardNumber) {
            newErrors.cardNumber = 'Card number is required';
        } else if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
            newErrors.cardNumber = 'Invalid card number';
        }

        if (!formData.expiryDate) {
            newErrors.expiryDate = 'Expiry date is required';
        } else {
            const [month, year] = formData.expiryDate.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;

            if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                newErrors.expiryDate = 'Card has expired';
            }
        }

        if (!formData.cvc) {
            newErrors.cvc = 'CVC is required';
        } else if (formData.cvc.length < 3) {
            newErrors.cvc = 'Invalid CVC';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'ZIP code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Shake animation for errors
            const errorElements = document.querySelectorAll('.error-shake');
            errorElements.forEach(el => {
                el.classList.add('animate-pulse');
                setTimeout(() => el.classList.remove('animate-pulse'), 500);
            });
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setShowSuccess(true);

            // Redirect after success animation
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 2000);
    };

    const countries = [
        { code: 'US', name: 'United States' },
        { code: 'CA', name: 'Canada' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'AU', name: 'Australia' },
        { code: 'NL', name: 'Netherlands' }
    ];

    const subtotal = currentProduct.price * currentQuantity;
    const shipping = 0; // Free shipping
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + shipping + tax;

    const CardIcon = ({ type }) => {
        const icons = {
            visa: (
                <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
            ),
            mastercard: (
                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">MC</div>
            ),
            amex: (
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">AMEX</div>
            ),
            discover: (
                <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">DISC</div>
            )
        };

        return icons[type] || null;
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 text-center text-white max-w-md mx-auto">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                    <p className="text-slate-300 mb-4">Your order has been confirmed. Redirecting to home...</p>
                    <div className="animate-spin w-6 h-6 border-2 border-slate-600 border-t-emerald-400 rounded-full mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Complete Your Order</h1>
                    <p className="text-slate-300">Secure checkout powered by industry-standard encryption</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-slate-700/50">
                            <div className="space-y-6">
                                {/* Cardholder Name */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        name="cardholderName"
                                        value={formData.cardholderName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 ${errors.cardholderName ? 'border-red-500 error-shake' : 'border-slate-600'
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.cardholderName && (
                                        <p className="text-red-400 text-sm mt-1">{errors.cardholderName}</p>
                                    )}
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Card Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            maxLength="19"
                                            className={`w-full px-4 py-3 pr-16 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 ${errors.cardNumber ? 'border-red-500 error-shake' : 'border-slate-600'
                                                }`}
                                            placeholder="1234 5678 9012 3456"
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <CardIcon type={cardType} />
                                        </div>
                                    </div>
                                    {errors.cardNumber && (
                                        <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                                    )}
                                </div>

                                {/* Expiry and CVC */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            maxLength="5"
                                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 ${errors.expiryDate ? 'border-red-500 error-shake' : 'border-slate-600'
                                                }`}
                                            placeholder="MM/YY"
                                        />
                                        {errors.expiryDate && (
                                            <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            CVC
                                        </label>
                                        <input
                                            type="text"
                                            name="cvc"
                                            value={formData.cvc}
                                            onChange={handleInputChange}
                                            maxLength="4"
                                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 ${errors.cvc ? 'border-red-500 error-shake' : 'border-slate-600'
                                                }`}
                                            placeholder="123"
                                        />
                                        {errors.cvc && (
                                            <p className="text-red-400 text-sm mt-1">{errors.cvc}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white">Billing Address</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 ${errors.address ? 'border-red-500 error-shake' : 'border-slate-600'
                                                }`}
                                            placeholder="123 Main Street"
                                        />
                                        {errors.address && (
                                            <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 ${errors.city ? 'border-red-500 error-shake' : 'border-slate-600'
                                                    }`}
                                                placeholder="New York"
                                            />
                                            {errors.city && (
                                                <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                ZIP Code
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 ${errors.zipCode ? 'border-red-500 error-shake' : 'border-slate-600'
                                                    }`}
                                                placeholder="10001"
                                            />
                                            {errors.zipCode && (
                                                <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Country
                                        </label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white"
                                        >
                                            {countries.map(country => (
                                                <option key={country.code} value={country.code} className="bg-slate-700">
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="flex items-center space-x-2 text-sm text-slate-300 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>All payments are securely encrypted with 256-bit SSL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Summary & Payment Summary */}
                    <div className="space-y-6">
                        {/* Product Summary */}
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-white">
                            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={currentProduct.images[0]}
                                    alt={currentProduct.name}
                                    className="w-16 h-16 rounded-lg object-cover border border-slate-600"
                                />
                                <div>
                                    <h4 className="font-semibold text-sm">{currentProduct.name}</h4>
                                    <p className="text-slate-400 text-xs">{currentProduct.seller.name}</p>
                                    <p className="text-slate-400 text-xs">Quantity: {currentQuantity}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4">Payment Summary</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Subtotal:</span>
                                    <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Shipping:</span>
                                    <span className="font-medium text-emerald-400">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Estimated Tax:</span>
                                    <span className="font-medium text-white">${tax.toFixed(2)}</span>
                                </div>
                                <hr className="border-slate-600" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span className="text-white">Total:</span>
                                    <span className="text-emerald-400">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isProcessing}
                                className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-4 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isProcessing ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    `Pay $${total.toFixed(2)}`
                                )}
                            </button>

                            <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-slate-400">
                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;