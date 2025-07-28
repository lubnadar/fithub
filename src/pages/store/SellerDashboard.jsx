import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package,
    DollarSign,
    ShoppingCart,
    Clock,
    TrendingUp,
    Edit,
    Trash2,
    Eye,
    Plus,
    Bell,
    Calendar,
    Users,
    Star,
    AlertCircle,
    CheckCircle,
    XCircle
} from 'lucide-react';

// Reusable Components
const OverviewCard = ({ icon: Icon, title, value, label, color, trend, onClick }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(value);
        }, 300);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div
            className={`backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-${color}/50 transition-all duration-300 hover:transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${color}/20`}>
                    <Icon className={`w-6 h-6 text-${color}`} />
                </div>
                {trend && (
                    <div className={`flex items-center space-x-1 text-${trend > 0 ? 'emerald' : 'red'}-400 text-sm`}>
                        <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <div className={`text-3xl font-bold text-${color} transition-all duration-1000`}>
                    {typeof animatedValue === 'number' ? animatedValue.toLocaleString() : animatedValue}
                </div>
                <div className="text-white/70 text-sm">{label}</div>
            </div>
        </div>
    );
};

const ProductRow = ({ product, onEdit, onDelete }) => {
    const statusColors = {
        Active: 'emerald',
        Draft: 'yellow',
        'Out of Stock': 'red'
    };

    return (
        <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-white/70 text-sm">${product.price}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColors[product.status]}-400/20 text-${statusColors[product.status]}-400`}>
                        {product.status}
                    </span>
                    <span className="text-white/70 text-sm">{product.unitsSold} sold</span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(product)}
                            className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all duration-300"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(product)}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderItem = ({ order }) => {
    const statusIcons = {
        Paid: CheckCircle,
        Shipped: Package,
        Cancelled: XCircle
    };

    const statusColors = {
        Paid: 'emerald',
        Shipped: 'blue',
        Cancelled: 'red'
    };

    const StatusIcon = statusIcons[order.status];

    return (
        <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-${statusColors[order.status]}/20`}>
                        <StatusIcon className={`w-5 h-5 text-${statusColors[order.status]}-400`} />
                    </div>
                    <div>
                        <h3 className="text-white font-medium">{order.buyer}</h3>
                        <p className="text-white/70 text-sm">{order.product}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className={`text-${statusColors[order.status]}-400 font-medium`}>{order.status}</p>
                        <p className="text-white/70 text-sm">{order.date}</p>
                    </div>
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const SalesChart = () => {
    const [period, setPeriod] = useState('7days');

    const chartData = {
        '7days': [12, 19, 15, 25, 22, 30, 28],
        '30days': [450, 520, 480, 600, 580, 650, 720, 690, 750, 800]
    };

    return (
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Sales Analytics</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setPeriod('7days')}
                        className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${period === '7days' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                    >
                        7 Days
                    </button>
                    <button
                        onClick={() => setPeriod('30days')}
                        className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${period === '30days' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                    >
                        30 Days
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-white/70">Total Sales</span>
                    <span className="text-2xl font-bold text-emerald-400">
                        ${chartData[period].reduce((a, b) => a + b, 0).toLocaleString()}
                    </span>
                </div>

                <div className="h-32 flex items-end space-x-2">
                    {chartData[period].slice(0, period === '7days' ? 7 : 10).map((value, index) => {
                        const maxValue = Math.max(...chartData[period]);
                        const height = (value / maxValue) * 100;

                        return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div
                                    className="w-full bg-gradient-to-t from-emerald-400 to-blue-500 rounded-t-lg transition-all duration-1000 hover:opacity-80"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <span className="text-xs text-white/50 mt-2">
                                    {period === '7days' ? `Day ${index + 1}` : `${index + 1}`}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const NotificationPanel = () => {
    const notifications = [
        { id: 1, type: 'comment', message: 'New comment on "Premium Yoga Mat"', time: '2 hours ago', icon: Users },
        { id: 2, type: 'inventory', message: 'Low inventory: Resistance Bands', time: '4 hours ago', icon: AlertCircle },
        { id: 3, type: 'payout', message: 'Payout processed: $1,250.00', time: '1 day ago', icon: DollarSign },
        { id: 4, type: 'order', message: 'New order from Sarah Johnson', time: '2 days ago', icon: ShoppingCart }
    ];

    return (
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Updates</h3>
                <Bell className="w-5 h-5 text-white/70" />
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                        <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                                <Icon className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm">{notification.message}</p>
                                <p className="text-white/50 text-xs mt-1">{notification.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="backdrop-blur-xl bg-white/5 border-t border-white/20 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center text-white/70">
                <p>&copy; 2025 FitHub. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const SellerDashboard = () => {
    const navigate = useNavigate();

    // Navigation functions
    const handleNavigateToStore = () => {
        navigate('/store');
    };

    const handleNavigateToAddProduct = () => {
        navigate('/store/add-product');
    };

    // ✅ تعريف الدالة الجديدة للانتقال إلى صفحة الطلبات
    const handleNavigateToMyOrders = () => {
        navigate("/store/my-orders"); // ✅ التنقل الفعلي إلى المسار المعرف
    };

    // Mock data
    const overviewData = [
        {
            icon: Package,
            title: 'products',
            value: 24,
            label: 'Total Products',
            color: 'emerald-400',
            trend: 12,
            onClick: handleNavigateToStore
        },
        { icon: DollarSign, title: 'sales', value: 1847, label: 'Total Sales', color: 'blue-500', trend: 8 },
        { icon: TrendingUp, title: 'revenue', value: '$12,450', label: 'Monthly Revenue', color: 'emerald-400', trend: 15 },
        { icon: Clock, title: 'orders', value: 7, label: 'Pending Orders', color: 'yellow-500', trend: -3 }
    ];

    const products = [
        { id: 1, name: 'Premium Yoga Mat', price: 89.99, status: 'Active', unitsSold: 245, image: '/api/placeholder/48/48' },
        { id: 2, name: 'Resistance Bands Set', price: 34.99, status: 'Active', unitsSold: 189, image: '/api/placeholder/48/48' },
        { id: 3, name: 'Protein Powder', price: 49.99, status: 'Out of Stock', unitsSold: 312, image: '/api/placeholder/48/48' },
        { id: 4, name: 'Workout Journal', price: 19.99, status: 'Draft', unitsSold: 0, image: '/api/placeholder/48/48' }
    ];

    const orders = [
        { id: 1, buyer: 'Sarah Johnson', product: 'Premium Yoga Mat', status: 'Paid', date: '2025-07-25' },
        { id: 2, buyer: 'Michael Chen', product: 'Resistance Bands Set', status: 'Shipped', date: '2025-07-24' },
        { id: 3, buyer: 'Emma Wilson', product: 'Protein Powder', status: 'Cancelled', date: '2025-07-23' },
        { id: 4, buyer: 'David Brown', product: 'Premium Yoga Mat', status: 'Paid', date: '2025-07-22' }
    ];

    const handleEditProduct = (product) => {
        console.log('Edit product:', product);
        // يمكنك إضافة navigate('/store/edit-product/' + product.id) هنا
    };

    const handleDeleteProduct = (product) => {
        console.log('Delete product:', product);
        // إضافة منطق الحذف هنا
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {overviewData.map((item, index) => (
                        <OverviewCard key={index} {...item} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Product Management */}
                    <div className="lg:col-span-2">
                        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-white">Your Products</h2>
                                <button
                                    onClick={handleNavigateToAddProduct}
                                    className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                                >
                                    Add Product
                                </button>
                            </div>

                            <div className="space-y-4">
                                {products.map((product) => (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        onEdit={handleEditProduct}
                                        onDelete={handleDeleteProduct}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sales Analytics */}
                    <div>
                        <SalesChart />
                    </div>
                </div>
                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders and Notifications */}
                    <div className="lg:col-span-3 flex flex-col lg:flex-row gap-8">
                        {/* Recent Orders */}
                        <div className="flex-1 backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-white">Recent Orders</h2>
                                <button
                                    onClick={handleNavigateToMyOrders}
                                    className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                                >
                                    All Orders
                                </button>
                            </div>
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                        </div>

                        {/* Notifications (Recent Updates) */}
                        <div className="w-full lg:w-[30%] max-w-sm backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
                            <h2 className="text-2xl font-semibold text-white mb-6">Recent Updates</h2>
                            <NotificationPanel />
                        </div>
                    </div>
                </div>
            </main >
            {/* Floating Add Button */}
            < button
                onClick={handleNavigateToAddProduct}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
            >
                <Plus className="w-6 h-6 text-white" />
            </button >
            <Footer />
        </div >
    );
};


export default SellerDashboard;

