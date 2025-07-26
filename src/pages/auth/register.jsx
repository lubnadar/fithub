// register.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Check,
    AlertCircle,
    Zap,
    ArrowLeft,
    Phone,
    MapPin,
    Globe,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        phoneNumber: "",
        country: "",
        city: "",
        region: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "trainee",
        acceptTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select your gender";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\+?[\d\s\-()]{8,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        if (!formData.country.trim()) {
            newErrors.country = "Country is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.region.trim()) {
            newErrors.region = "Region is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password =
                "Password must include uppercase, lowercase, and number";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = "You must accept the terms and privacy policy";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // محاكاة إرسال البيانات
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // حفظ البيانات في localStorage
            localStorage.setItem("registrationData", JSON.stringify(formData));

            // الانتقال إلى صفحة التحقق
            navigate("/verify-email");
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white font-['Inter',sans-serif] flex items-center justify-center p-4">
            {/* الخلفية التفاعلية */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-spin-slow"></div>
            </div>

            {/* رابط العودة */}
            <Link
                to="/login"
                className="absolute top-6 left-6 text-slate-400 hover:text-emerald-400 transition-colors duration-200 flex items-center space-x-2 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Login</span>
            </Link>

            {/* بطاقة التسجيل */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-2xl"
            >
                <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    {/* الشعار */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center justify-center space-x-3 mb-8"
                    >
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            FitHub
                        </span>
                    </motion.div>

                    {/* العنوان */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl font-bold text-white mb-2 text-center"
                    >
                        Create Your Account
                    </motion.h1>
                    <p className="text-slate-400 mb-8 text-center">
                        Join FitHub to start your fitness journey
                    </p>

                    {/* نموذج التسجيل */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* الاسم الأول والأخير */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* الاسم الأول */}
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300">
                                    First Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.firstName
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="First name"
                                    />
                                </div>
                                {errors.firstName && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.firstName}</span>
                                    </div>
                                )}
                            </div>

                            {/* الاسم الأخير */}
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.lastName
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="Last name"
                                    />
                                </div>
                                {errors.lastName && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.lastName}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* الجنس ورقم الهاتف */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* الجنس */}
                            <div className="space-y-2">
                                <label htmlFor="gender" className="block text-sm font-semibold text-gray-300">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${errors.gender
                                        ? "border-red-500 focus:ring-red-500/50"
                                        : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                        }`}
                                >
                                    <option value="" className="bg-slate-800">Select gender</option>
                                    <option value="male" className="bg-slate-800">Male</option>
                                    <option value="female" className="bg-slate-800">Female</option>
                                    <option value="other" className="bg-slate-800">Other</option>
                                </select>
                                {errors.gender && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.gender}</span>
                                    </div>
                                )}
                            </div>

                            {/* رقم الهاتف */}
                            <div className="space-y-2">
                                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-300">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.phoneNumber
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="+123 456 789"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.phoneNumber}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* الدولة والمدينة والمنطقة */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* الدولة */}
                            <div className="space-y-2">
                                <label htmlFor="country" className="block text-sm font-semibold text-gray-300">
                                    Country
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Globe className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.country
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="Country"
                                    />
                                </div>
                                {errors.country && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.country}</span>
                                    </div>
                                )}
                            </div>

                            {/* المدينة */}
                            <div className="space-y-2">
                                <label htmlFor="city" className="block text-sm font-semibold text-gray-300">
                                    City
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.city
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="City"
                                    />
                                </div>
                                {errors.city && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.city}</span>
                                    </div>
                                )}
                            </div>

                            {/* المنطقة */}
                            <div className="space-y-2">
                                <label htmlFor="region" className="block text-sm font-semibold text-gray-300">
                                    Region
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="region"
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.region
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="Region"
                                    />
                                </div>
                                {errors.region && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.region}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* البريد الإلكتروني */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email
                                        ? "border-red-500 focus:ring-red-500/50"
                                        : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                        }`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <div className="flex items-center space-x-1 text-red-400 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.email}</span>
                                </div>
                            )}
                        </div>

                        {/* كلمة المرور وتأكيدها */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* كلمة المرور */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-10 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.password}</span>
                                    </div>
                                )}
                            </div>

                            {/* تأكيد كلمة المرور */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-10 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.confirmPassword
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-white/20 focus:border-blue-500 focus:ring-blue-500/50"
                                            }`}
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <div className="flex items-center space-x-1 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.confirmPassword}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* شرط القبول */}
                        <div className="space-y-2">
                            <div className="flex items-start space-x-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            acceptTerms: !prev.acceptTerms,
                                        }))
                                    }
                                    className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${formData.acceptTerms
                                        ? "bg-blue-500 border-blue-500"
                                        : errors.acceptTerms
                                            ? "border-red-500"
                                            : "border-white/30 hover:border-white/50"
                                        }`}
                                >
                                    {formData.acceptTerms && <Check className="w-3 h-3 text-white" />}
                                </button>
                                <label className="text-sm text-gray-300">
                                    I accept the{" "}
                                    <a href="#" className="text-blue-400 hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-blue-400 hover:underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {errors.acceptTerms && (
                                <div className="flex items-center space-x-1 text-red-400 text-sm ml-8">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.acceptTerms}</span>
                                </div>
                            )}
                        </div>

                        {/* زر التسجيل */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                            className="group w-full bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* روابط المساعدة */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all duration-300"
                            >
                                Login
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}