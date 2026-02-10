import React, { useState } from 'react';
import { Copy, Users, Wifi } from 'lucide-react';
import { Button } from './Button';

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
        <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-[var(--color-text-primary)]">
                <Wifi className="w-5 h-5 text-blue-500" />
                Connectivity
            </h2>

            {/* My ID Section */}
            <div className="mb-8">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Your Peer ID</p>
                <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center gap-3 group transition-colors hover:border-[var(--color-accent)]">
                    <code className="flex-1 font-mono text-sm text-[var(--color-text-primary)] truncate select-all">
                        {myId || 'Generating...'}
                    </code>
                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md hover:bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:text-white transition-colors"
                        title="Copy ID"
                    >
                        {copied ? <span className="text-green-500 text-xs font-bold">✓</span> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Connect Form */}
            <div className="mb-8">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Connect to Peer</p>
                <form onSubmit={handleConnect} className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        placeholder="Paste Peer ID..."
                        className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder:text-zinc-600"
                    />
                    <Button type="submit" variant="primary" disabled={!targetId.trim()} className="w-full justify-center">
                        Connect
                    </Button>
                </form>
            </div>

            {/* Active Connections */}
            <div className="flex-1 min-h-0 flex flex-col">
                <h3 className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Active Sessions</span>
                    <span className="bg-[var(--color-bg-tertiary)] px-2 py-0.5 rounded-full text-[10px]">{Object.keys(connections).length}</span>
                </h3>

                <div className="overflow-y-auto flex-1 -mr-2 pr-2 space-y-2">
                    {Object.keys(connections).length === 0 ? (
                        <div className="text-center py-8 text-[var(--color-text-secondary)] text-sm border border-dashed border-[var(--color-border)] rounded-lg bg-[var(--color-bg-primary)]/50">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p>No active connections</p>
                        </div>
                    ) : (
                        Object.keys(connections).map((peerId) => (
                            <div key={peerId} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] hover:border-zinc-500 transition-colors group">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Connected to</p>
                                    <p className="font-mono text-sm text-[var(--color-text-primary)] truncate">{peerId}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
