// src/pages/shared/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, User, X, Menu } from 'lucide-react';

const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const conversations = [
        {
            id: 1,
            name: 'Sarah Johnson',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Great workout today! Let\'s schedule our next session.',
            timestamp: '11:45 AM',
            isCoach: true,
            messages: [
                { id: 1, content: 'Hey Sarah! How\'s your training going?', timestamp: '9:15 AM', sender: 'me' },
                { id: 2, content: 'Going well! But I have some questions about my form.', timestamp: '9:20 AM', sender: 'other' },
                { id: 3, content: 'Can you help me with my form on squats?', timestamp: '9:22 AM', sender: 'other' },
                { id: 4, content: 'Sure! Send me a video and I\'ll give you feedback.', timestamp: '9:25 AM', sender: 'me' },
                { id: 5, content: 'Great workout today! Let\'s schedule our next session.', timestamp: '11:45 AM', sender: 'other' }
            ]
        },
        {
            id: 2,
            name: 'Mike Chen',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Can you help me with my form on squats?',
            timestamp: '1h ago',
            isCoach: false,
            messages: [
                { id: 1, content: 'Hey Mike! How\'s your training going?', timestamp: '9:15 AM', sender: 'me' },
                { id: 2, content: 'Going well! But I have some questions about my form.', timestamp: '9:20 AM', sender: 'other' },
                { id: 3, content: 'Can you help me with my form on squats?', timestamp: '9:22 AM', sender: 'other' }
            ]
        },
        {
            id: 3,
            name: 'Emma Davis',
            avatar: '/api/placeholder/40/40',
            lastMessage: 'Thanks for the nutrition plan!',
            timestamp: '2h ago',
            isCoach: true,
            messages: [
                { id: 1, content: 'Hi Emma! How are you finding the nutrition plan?', timestamp: '8:30 AM', sender: 'me' },
                { id: 2, content: 'Thanks for the nutrition plan! It\'s been really helpful.', timestamp: '8:35 AM', sender: 'other' }
            ]
        }
    ];

    const handleSendMessage = () => {
        if (!newMessage.trim() && !uploadedImage) return;

        const message = {
            id: Date.now(),
            content: newMessage,
            image: uploadedImage,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            sender: 'me'
        };

        const updatedConversations = conversations.map(conv => {
            if (conv.id === selectedChat.id) {
                return { ...conv, messages: [...conv.messages, message], lastMessage: newMessage || '📷 Photo' };
            }
            return conv;
        });

        setNewMessage('');
        setUploadedImage(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setUploadedImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedChat?.messages]);

    const currentChat = selectedChat ? conversations.find(c => c.id === selectedChat.id) : null;

    return (
        <div className="min-h-screen bg-slate-900 text-white flex">
            {/* Mobile Header */}
            <div className="md:hidden bg-slate-800 p-4 border-b border-slate-700">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Chat</h2>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-slate-400 hover:text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Desktop Sidebar - قائمة المحادثات */}
            <div className={`hidden md:block w-80 bg-slate-800 border-r border-slate-700 h-screen fixed right-0 top-0 z-10 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-300`}>
                <div className="p-4 border-b border-slate-700">
                    <h2 className="text-xl font-semibold">Conversations</h2>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-65px)]">
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => {
                                setSelectedChat(conv);
                                setIsSidebarOpen(false); // إغلاق القائمة على الجوال بعد النقر
                            }}
                            className={`p-4 border-b border-slate-700 cursor-pointer transition-all duration-200 hover:bg-slate-700 ${selectedChat?.id === conv.id ? 'bg-slate-700 border-l-4 border-blue-500' : ''}`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                                        <User size={20} className="text-slate-400" />
                                    </div>
                                    {conv.isCoach && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold truncate">{conv.name}</h3>
                                        <span className="text-xs text-slate-400">{conv.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-slate-400 truncate mt-1">{conv.lastMessage}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay خلفي (للجوال فقط) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Chat Area - بدون CoachSidebar */}
            <div className="flex-1 flex flex-col md:mr-80"> {/* ✅ إضافة md:mr-80 لتعويض عرض قائمة المحادثات */}
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-slate-800 p-4 border-b border-slate-700">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                                        <User size={16} className="text-slate-400" />
                                    </div>
                                    {selectedChat.isCoach && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{selectedChat.name}</h3>
                                    <p className="text-sm text-slate-400">{selectedChat.isCoach ? 'Coach' : 'Trainee'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {currentChat?.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-700 text-white'
                                            }`}
                                    >
                                        {message.image && (
                                            <img
                                                src={message.image}
                                                alt="Shared"
                                                className="mb-2 rounded-lg max-h-48"
                                            />
                                        )}
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm">{message.content}</span>
                                            <span className="text-xs opacity-70">{message.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-800 border-t border-slate-700">
                            <div className="flex items-center space-x-3">
                                <div className="flex-1 relative">
                                    {uploadedImage && (
                                        <div className="absolute top-0 left-0 right-0 bg-slate-700 p-2 rounded-lg mb-2 flex items-center justify-between">
                                            <span className="text-sm truncate">Image selected</span>
                                            <button
                                                onClick={() => setUploadedImage(null)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={handleImageUpload}
                                    className="p-2 text-slate-400 hover:text-white"
                                >
                                    <Paperclip size={20} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim() && !uploadedImage}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* No Chat Selected */
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                            <p className="text-slate-400">Select a chat from the sidebar to begin messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;