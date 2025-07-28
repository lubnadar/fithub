import React, { useState, useMemo } from 'react';
import { Package, Eye, AlertCircle, X, Calendar, CreditCard, MapPin, Truck, CheckCircle, Clock, Upload, FileText } from 'lucide-react';

const MyOrders = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportOrder, setReportOrder] = useState(null);
    const [reportDescription, setReportDescription] = useState('');

    // Mock orders data
    const mockOrders = [
        {
            id: 1,
            productName: "Yoga Mat Pro",
            productImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
            price: "$49.99",
            date: "2025-07-20T08:00:00Z",
            status: "Delivered",
            orderId: "ORD-001",
            buyerAddress: "123 Fitness Street, Wellness City, WC 12345",
            paymentMethod: "Credit Card ending in ****4532"
        },
        {
            id: 2,
            productName: "Resistance Bands Set",
            productImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
            price: "$29.99",
            date: "2025-07-22T10:30:00Z",
            status: "Shipped",
            orderId: "ORD-002",
            buyerAddress: "456 Health Ave, Fitness Town, FT 67890",
            paymentMethod: "PayPal"
        },
        {
            id: 3,
            productName: "Protein Powder - Vanilla",
            productImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
            price: "$59.99",
            date: "2025-07-24T14:15:00Z",
            status: "Paid",
            orderId: "ORD-003",
            buyerAddress: "789 Strength Blvd, Power City, PC 13579",
            paymentMethod: "Credit Card ending in ****7821"
        },
        {
            id: 4,
            productName: "Smart Water Bottle",
            productImage: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop",
            price: "$39.99",
            date: "2025-07-15T16:45:00Z",
            status: "Cancelled",
            orderId: "ORD-004",
            buyerAddress: "321 Hydration Way, Water City, WC 24680",
            paymentMethod: "Credit Card ending in ****9876"
        },
        {
            id: 5,
            productName: "Adjustable Dumbbells",
            productImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
            price: "$199.99",
            date: "2025-07-25T09:20:00Z",
            status: "Shipped",
            orderId: "ORD-005",
            buyerAddress: "654 Muscle Drive, Strength City, SC 97531",
            paymentMethod: "Credit Card ending in ****5432"
        }
    ];

    const tabs = ['All', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Paid':
                return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'Shipped':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Delivered':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Cancelled':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredOrders = useMemo(() => {
        if (activeTab === 'All') return mockOrders;
        return mockOrders.filter(order => order.status === activeTab);
    }, [activeTab]);

    const getTrackingSteps = (status) => {
        const steps = [
            { name: 'Paid', icon: CreditCard, completed: true },
            { name: 'Shipped', icon: Truck, completed: status === 'Shipped' || status === 'Delivered' },
            { name: 'Delivered', icon: CheckCircle, completed: status === 'Delivered' }
        ];
        return steps;
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    const handleReportProblem = (order) => {
        setReportOrder(order);
        setShowReportModal(true);
    };

    const handleSubmitReport = () => {
        // Here you would normally send the report to your backend
        console.log('Report submitted for order:', reportOrder.id, 'Description:', reportDescription);
        setShowReportModal(false);
        setReportOrder(null);
        setReportDescription('');
    };

    const canReportProblem = (status) => {
        return status === 'Paid' || status === 'Shipped';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">My Orders</h1>
                    <p className="text-gray-400 text-lg">Track the status of your orders and manage your purchases with confidence.</p>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === tab
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="grid gap-6">
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
                            <p className="text-gray-400">You don't have any orders with the selected status.</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/15 transition-all duration-200"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={order.productImage}
                                            alt={order.productName}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-1">{order.productName}</h3>
                                            <p className="text-2xl font-bold text-blue-400 mb-2">{order.price}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(order.date)}
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(order.status)}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                        {canReportProblem(order.status) && (
                                            <button
                                                onClick={() => handleReportProblem(order)}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-all duration-200"
                                            >
                                                <AlertCircle className="w-4 h-4" />
                                                Report Problem
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Order Detail Modal */}
            {showOrderModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                                <button
                                    onClick={() => setShowOrderModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Product Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={selectedOrder.productImage}
                                    alt={selectedOrder.productName}
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">{selectedOrder.productName}</h3>
                                    <p className="text-2xl font-bold text-blue-400">{selectedOrder.price}</p>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Order ID</label>
                                        <p className="text-white font-mono">{selectedOrder.orderId}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Order Date</label>
                                        <p className="text-white">{formatDate(selectedOrder.date)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(selectedOrder.status)}`}
                                        >
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Payment Method</label>
                                        <p className="text-white">{selectedOrder.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Delivery Address</label>
                                        <p className="text-white">{selectedOrder.buyerAddress}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tracking Timeline */}
                            {selectedOrder.status !== 'Cancelled' && (
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4">Order Tracking</h4>
                                    <div className="space-y-4">
                                        {getTrackingSteps(selectedOrder.status).map((step, index) => (
                                            <div key={step.name} className="flex items-center gap-4">
                                                <div
                                                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step.completed
                                                        ? 'bg-green-500 border-green-500 text-white'
                                                        : 'bg-gray-700 border-gray-600 text-gray-400'
                                                        }`}
                                                >
                                                    <step.icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`font-medium ${step.completed ? 'text-white' : 'text-gray-400'}`}>
                                                        {step.name}
                                                    </p>
                                                </div>
                                                {step.completed && (
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Report Issue Modal */}
            {showReportModal && reportOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full">
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Report a Problem</h2>
                                <button
                                    onClick={() => setShowReportModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">Order: {reportOrder.productName}</p>
                                <p className="text-sm text-gray-400">Order ID: {reportOrder.orderId}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Describe the issue *
                                    </label>
                                    <textarea
                                        value={reportDescription}
                                        onChange={(e) => setReportDescription(e.target.value)}
                                        placeholder="Please describe the problem you're experiencing with this order..."
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Upload proof (optional)
                                    </label>
                                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/30 transition-all duration-200">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-400 mb-1">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowReportModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitReport}
                                    disabled={!reportDescription.trim()}
                                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200"
                                >
                                    Submit Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;