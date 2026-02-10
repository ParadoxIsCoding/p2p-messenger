import React, { useState } from 'react';
import { Copy, Users, Wifi } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { motion } from 'framer-motion';

export const ConnectionPanel = ({ myId, connectToPeer, connections }) => {
    const [targetId, setTargetId] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(myId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConnect = (e) => {
        e.preventDefault();
        if (targetId.trim()) {
            connectToPeer(targetId.trim());
            setTargetId('');
        }
    };

    return (
        <div className="p-6 border-b border-[var(--color-glass-border)] bg-[rgba(0,0,0,0.2)]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 neon-text">
                <Wifi className="w-5 h-5" />
                Connection Hub
            </h2>

            {/* My ID Section */}
            <div className="mb-6 p-4 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--color-glass-border)]">
                <p className="text-sm text-gray-400 mb-2">My Neural Link ID</p>
                <div className="flex items-center gap-2">
                    <code className="flex-1 font-mono bg-black/30 p-2 rounded text-[var(--color-neon-blue)] truncate">
                        {myId || 'Initializing...'}
                    </code>
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:text-white text-gray-400 transition-colors"
                        title="Copy ID"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
                {copied && <p className="text-xs text-green-400 mt-1">Copied to clipboard!</p>}
            </div>

            {/* Connect Form */}
            <form onSubmit={handleConnect} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    placeholder="Enter Peer ID..."
                    className="flex-1 bg-black/20 border border-[var(--color-glass-border)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors"
                />
                <NeonButton type="submit" variant="secondary" disabled={!targetId.trim()}>
                    Connect
                </NeonButton>
            </form>

            {/* Active Connections */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    Active Links ({Object.keys(connections).length})
                </h3>
                <div className="max-h-32 overflow-y-auto space-y-1 pr-2">
                    {Object.keys(connections).length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No active connections</p>
                    ) : (
                        Object.keys(connections).map((peerId) => (
                            <div key={peerId} className="flex items-center gap-2 text-xs p-2 rounded bg-green-500/10 border border-green-500/20 text-green-400">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="font-mono truncate">{peerId}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
