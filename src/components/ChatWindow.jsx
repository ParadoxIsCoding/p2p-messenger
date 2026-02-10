import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from './Button';
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
        <div className="flex-1 flex flex-col h-full min-h-0 bg-[var(--color-bg-primary)]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-secondary)] opacity-50">
                        <MessageSquare className="w-12 h-12 mb-2" />
                        <p>No messages yet</p>
                    </div>
                )}
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`
                                    max-w-[75%] rounded-2xl px-5 py-3 shadow-sm text-sm leading-relaxed
                                    ${msg.isSelf
                                        ? 'bg-[var(--color-accent)] text-white'
                                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
                                    }
                                `}
                            >
                                <div className={`text-[10px] mb-1 flex justify-between gap-4 ${msg.isSelf ? 'text-blue-200' : 'text-[var(--color-text-secondary)]'}`}>
                                    <span className="font-medium">{msg.isSelf ? 'You' : 'Peer'}</span>
                                    <span className="opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="break-words font-normal whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex gap-3 items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={disabled ? "Connect to a peer to start chatting..." : "Type a message..."}
                    disabled={disabled}
                    className="flex-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full px-5 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Button
                    type="submit"
                    variant="primary"
                    disabled={disabled || !input.trim()}
                    className="!rounded-full w-12 h-12 !min-w-[48px] !p-0 bg-[var(--color-text-primary)] hover:bg-white text-black border-none shadow-lg shadow-white/5"
                >
                    <Send className="w-5 h-5 ml-[-2px] mt-[1px]" />
                </Button>
            </form>
        </div>
    );
};
