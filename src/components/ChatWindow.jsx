import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWindow = ({ messages, sendMessage, disabled }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            sendMessage(input.trim());
            setInput('');
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full min-h-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`
                                    max-w-[70%] rounded-2xl px-4 py-2 
                                    ${msg.isSelf
                                        ? 'bg-[var(--color-neon-blue)] text-black rounded-tr-none'
                                        : 'bg-[rgba(255,255,255,0.1)] text-white rounded-tl-none border border-[var(--color-glass-border)]'
                                    }
                                `}
                            >
                                <div className="text-xs opacity-50 mb-1 flex justify-between gap-4">
                                    <span>{msg.isSelf ? 'You' : msg.sender?.slice(0, 5)}</span>
                                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="break-words">{msg.text}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-[var(--color-glass-border)] flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={disabled ? "Connect to a peer to chat..." : "Type a message..."}
                    disabled={disabled}
                    className="flex-1 bg-black/20 border border-[var(--color-glass-border)] rounded-full px-6 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <NeonButton
                    type="submit"
                    disabled={disabled || !input.trim()}
                    className="!rounded-full w-12 h-12 flex items-center justify-center p-0"
                >
                    <Send className="w-5 h-5" />
                </NeonButton>
            </form>
        </div>
    );
};
