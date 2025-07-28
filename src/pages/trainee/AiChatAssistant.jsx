import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Trash2, Bot, User } from 'lucide-react';

// Mock AI responses for demo purposes
const aiResponses = [
    "Great question! Based on your fitness goals, I'd recommend starting with 3-4 strength training sessions per week, focusing on compound movements like squats, deadlifts, and bench press.",
    "For optimal muscle recovery, aim for 7-9 hours of sleep and include rest days between intense workouts. Proper nutrition with adequate protein is also crucial!",
    "I'd suggest trying a progressive overload approach - gradually increase weight, reps, or sets each week. This ensures continuous improvement and prevents plateaus.",
    "Cardio and strength training complement each other perfectly! Try alternating days or doing light cardio after strength sessions to improve overall fitness.",
    "Absolutely! Bodyweight exercises like push-ups, squats, lunges, and planks can be incredibly effective. I can create a custom routine for you.",
    "For weight loss, focus on creating a sustainable caloric deficit through both diet and exercise. Aim for 1-2 pounds per week for healthy, lasting results.",
    "Pre-workout nutrition matters! Try having a small snack with carbs and protein 30-60 minutes before training. Banana with peanut butter works great!",
    "Form is more important than weight! Start with lighter weights to master proper technique, then gradually increase. This prevents injury and ensures better results."
];



const Footer = () => (
    <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center text-gray-400">
                <p>&copy; 2024 FitHub. Your AI-powered fitness companion.</p>
            </div>
        </div>
    </footer>
);

const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-blue-500/80 backdrop-blur-lg rounded-2xl max-w-xs">
        <Bot className="w-5 h-5 text-white flex-shrink-0" />
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
    </div>
);

const MessageBubble = ({ message, isAi, timestamp, isAnimating }) => {
    return (
        <div className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4 ${isAnimating ? 'animate-fade-in-up' : ''}`}>
            <div className={`flex items-start space-x-3 max-w-xs md:max-w-md lg:max-w-lg ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isAi ? 'bg-blue-500' : 'bg-emerald-500'
                    }`}>
                    {isAi ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
                </div>
                <div className={`rounded-2xl p-4 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-200 ${isAi
                    ? 'bg-blue-500/80 text-white rounded-tl-md'
                    : 'bg-emerald-500/80 text-white rounded-tr-md'
                    }`}>
                    <p className="text-sm leading-relaxed break-words">{message}</p>
                    <p className="text-xs text-white/70 mt-2">{timestamp}</p>
                </div>
            </div>
        </div>
    );
};

export default function AiChatAssistant() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI fitness assistant. I'm here to help you with workout plans, nutrition advice, form tips, and answer any fitness-related questions you might have. How can I assist your fitness journey today? 💪",
            isAi: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [animatingMessageId, setAnimatingMessageId] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: inputMessage,
            isAi: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setAnimatingMessageId(userMessage.id);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
                isAi: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, aiResponse]);
            setAnimatingMessageId(aiResponse.id);
            setIsTyping(false);

            // Clear animation after it completes
            setTimeout(() => setAnimatingMessageId(null), 500);
        }, 1500 + Math.random() * 1000);

        // Clear user message animation
        setTimeout(() => setAnimatingMessageId(null), 500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                id: 1,
                text: "Hello! I'm your AI fitness assistant. I'm here to help you with workout plans, nutrition advice, form tips, and answer any fitness-related questions you might have. How can I assist your fitness journey today? 💪",
                isAi: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">

            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">💬 AI Fitness Assistant</h1>
                    <p className="text-gray-300 text-lg">Ask your AI assistant anything about your fitness journey. Available 24/7.</p>
                </div>

                {/* Chat Container */}
                <div className="flex-1 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="flex justify-between items-center p-4 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">AI Assistant</h3>
                                <p className="text-green-400 text-sm">● Online</p>
                            </div>
                        </div>
                        <button
                            onClick={clearChat}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            title="Clear chat"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                message={message.text}
                                isAi={message.isAi}
                                timestamp={message.timestamp}
                                isAnimating={animatingMessageId === message.id}
                            />
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <TypingIndicator />
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-slate-900/60 backdrop-blur-lg">
                        <div className="flex items-center space-x-3">
                            <div className="flex-1 relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="w-full bg-slate-800/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                    disabled={isTyping}
                                />
                            </div>

                            <button
                                className="p-3 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200"
                                title="Voice input (coming soon)"
                            >
                                <Mic className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isTyping}
                                className="p-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 flex items-center justify-center"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}