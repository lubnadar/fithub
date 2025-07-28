import React, { useState } from 'react';
import { Package, Eye, Truck, X, Check, Clock, MapPin, User, DollarSign, Calendar } from 'lucide-react';

// Mock data for orders
const mockOrders = [
    {
        id: 1,
        buyer: "Layla Hamdan",
        productName: "Resistance Band Set",
        productImage: "/api/placeholder/80/80",
        status: "Shipped",
        price: "$39.99",
        date: "2025-07-25T08:00:00Z",
        buyerEmail: "layla.hamdan@email.com",
        shippingAddress: "1234 Fitness St, San Francisco, CA 94102",
        timeline: [
            { stage: "Paid", completed: true, timestamp: "2025-07-25T08:00:00Z" },
            { stage: "Shipped", completed: true, timestamp: "2025-07-25T14:30:00Z" },
            { stage: "Delivered", completed: false, timestamp: null }
        ]
    },
    {
        id: 2,
        buyer: "Marcus Chen",
        productName: "Adjustable Dumbbells",
        productImage: "/api/placeholder/80/80",
        status: "Paid",
        price: "$129.99",
        date: "2025-07-26T10:15:00Z",
        buyerEmail: "marcus.chen@email.com",
        shippingAddress: "567 Muscle Ave, Los Angeles, CA 90210",
        timeline: [
            { stage: "Paid", completed: true, timestamp: "2025-07-26T10:15:00Z" },
            { stage: "Shipped", completed: false, timestamp: null },
            { stage: "Delivered", completed: false, timestamp: null }
        ]
    },
    {
        id: 3,
        buyer: "Sofia Rodriguez",
        productName: "Yoga Mat Premium",
        productImage: "/api/placeholder/80/80",
        status: "Delivered",
        price: "$59.99",
        date: "2025-07-20T16:45:00Z",
        buyerEmail: "sofia.rodriguez@email.com",
        shippingAddress: "890 Zen Blvd, Austin, TX 78701",
        timeline: [
            { stage: "Paid", completed: true, timestamp: "2025-07-20T16:45:00Z" },
            { stage: "Shipped", completed: true, timestamp: "2025-07-21T09:20:00Z" },
            { stage: "Delivered", completed: true, timestamp: "2025-07-23T11:30:00Z" }
        ]
    },
    {
        id: 4,
        buyer: "Alex Johnson",
        productName: "Protein Powder Vanilla",
        productImage: "/api/placeholder/80/80",
        status: "Cancelled",
        price: "$49.99",
        date: "2025-07-24T12:30:00Z",
        buyerEmail: "alex.johnson@email.com",
        shippingAddress: "432 Health Dr, Seattle, WA 98101",
        timeline: [
            { stage: "Paid", completed: true, timestamp: "2025-07-24T12:30:00Z" },
            { stage: "Cancelled", completed: true, timestamp: "2025-07-24T15:45:00Z" }
        ]
    },
    {
        id: 5,
        buyer: "Emma Wilson",
        productName: "Foam Roller",
        productImage: "/api/placeholder/80/80",
        status: "Paid",
        price: "$29.99",
        date: "2025-07-27T09:00:00Z",
        buyerEmail: "emma.wilson@email.com",
        shippingAddress: "123 Recovery Rd, Denver, CO 80202",
        timeline: [
            { stage: "Paid", completed: true, timestamp: "2025-07-27T09:00:00Z" },
            { stage: "Shipped", completed: false, timestamp: null },
            { stage: "Delivered", completed: false, timestamp: null }
        ]
    }
];

// Order Status Badge Component
const OrderStatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Paid':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'Shipped':
                return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
            case 'Delivered':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'Cancelled':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(status)} transition-all`}>
            {status}
        </span>
    );
};

// Timeline Component
const OrderTimeline = ({ timeline }) => {
    return (
        <div className="space-y-4">
            {timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${item.completed
                        ? 'bg-green-500/20 border-green-500 text-green-300'
                        : 'bg-gray-500/20 border-gray-500 text-gray-400'
                        }`}>
                        {item.completed ? (
                            <Check className="w-4 h-4" />
                        ) : item.stage === 'Cancelled' ? (
                            <X className="w-4 h-4" />
                        ) : (
                            <Clock className="w-4 h-4" />
                        )}
                    </div>
                    <div className="flex-1">
                        <p className={`font-medium ${item.completed ? 'text-white' : 'text-gray-400'}`}>
                            {item.stage}
                        </p>
                        {item.timestamp && (
                            <p className="text-sm text-gray-400">
                                {new Date(item.timestamp).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Order Item Component
const OrderItem = ({ order, onViewDetails, onMarkAsShipped, onCancelOrder }) => {
    return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Product Info */}
                <div className="flex items-center space-x-4 flex-1">
                    <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-16 h-16 rounded-lg object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate">{order.productName}</h3>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {order.buyer}
                        </p>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Price and Status */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                        <p className="text-white font-bold flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {order.price}
                        </p>
                        <OrderStatusBadge status={order.status} />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
                <button
                    onClick={() => onViewDetails(order)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-300 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 transition-all"
                >
                    <Eye className="w-4 h-4" />
                    View Details
                </button>

                {order.status === 'Paid' && (
                    <button
                        onClick={() => onMarkAsShipped(order.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600/20 text-orange-300 border border-orange-600/30 rounded-lg hover:bg-orange-600/30 transition-all"
                    >
                        <Truck className="w-4 h-4" />
                        Mark as Shipped
                    </button>
                )}

                {(order.status === 'Paid' || order.status === 'Shipped') && (
                    <button
                        onClick={() => onCancelOrder(order.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-300 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-all"
                    >
                        <X className="w-4 h-4" />
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
};

// Main Component
const MyOrders = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState(mockOrders);
    const [isLoading, setIsLoading] = useState(false);

    const tabs = ['All', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'All') return true;
        return order.status === activeTab;
    });

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleMarkAsShipped = (orderId) => {
        setIsLoading(true);
        setTimeout(() => {
            setOrders(orders.map(order =>
                order.id === orderId
                    ? {
                        ...order,
                        status: 'Shipped',
                        timeline: order.timeline.map(t =>
                            t.stage === 'Shipped'
                                ? { ...t, completed: true, timestamp: new Date().toISOString() }
                                : t
                        )
                    }
                    : order
            ));
            setIsLoading(false);
        }, 1000);
    };

    const handleCancelOrder = (orderId) => {
        setIsLoading(true);
        setTimeout(() => {
            setOrders(orders.map(order =>
                order.id === orderId
                    ? {
                        ...order,
                        status: 'Cancelled',
                        timeline: [
                            ...order.timeline.filter(t => t.completed),
                            { stage: 'Cancelled', completed: true, timestamp: new Date().toISOString() }
                        ]
                    }
                    : order
            ));
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">My Orders</h1>
                    <p className="text-gray-400 text-lg">Track and manage your product orders across the platform.</p>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {tab}
                                <span className="ml-2 text-xs opacity-75">
                                    ({tab === 'All' ? orders.length : orders.filter(o => o.status === tab).length})
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-white text-center">Updating order...</p>
                        </div>
                    </div>
                )}

                {/* Orders List */}
                <div className="space-y-6">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-16">
                            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
                            <p className="text-gray-400">
                                {activeTab === 'All'
                                    ? "You haven't received any orders yet."
                                    : `No orders with status "${activeTab}".`
                                }
                            </p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <OrderItem
                                key={order.id}
                                order={order}
                                onViewDetails={handleViewDetails}
                                onMarkAsShipped={handleMarkAsShipped}
                                onCancelOrder={handleCancelOrder}
                            />
                        ))
                    )}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Product Info */}
                                <div className="bg-white/5 rounded-xl p-4">
                                    <h3 className="text-white font-semibold mb-3">Product Information</h3>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={selectedOrder.productImage}
                                            alt={selectedOrder.productName}
                                            className="w-20 h-20 rounded-lg object-cover border border-white/10"
                                        />
                                        <div>
                                            <p className="text-white font-medium">{selectedOrder.productName}</p>
                                            <p className="text-gray-400">Order #{selectedOrder.id}</p>
                                            <p className="text-white font-bold">{selectedOrder.price}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Buyer Info */}
                                <div className="bg-white/5 rounded-xl p-4">
                                    <h3 className="text-white font-semibold mb-3">Buyer Information</h3>
                                    <div className="space-y-2">
                                        <p className="text-white flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            {selectedOrder.buyer}
                                        </p>
                                        <p className="text-gray-400">{selectedOrder.buyerEmail}</p>
                                        <p className="text-gray-400 flex items-start gap-2">
                                            <MapPin className="w-4 h-4 mt-0.5" />
                                            {selectedOrder.shippingAddress}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Timeline */}
                                <div className="bg-white/5 rounded-xl p-4">
                                    <h3 className="text-white font-semibold mb-4">Order Timeline</h3>
                                    <OrderTimeline timeline={selectedOrder.timeline} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;