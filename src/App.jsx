import React from 'react';
import { Layout } from './components/Layout';
import { ConnectionPanel } from './components/ConnectionPanel';
import { ChatWindow } from './components/ChatWindow';
import { usePeer } from './hooks/usePeer';
import { Loader2 } from 'lucide-react';

function App() {
  const {
    myId,
    connections,
    messages,
    connectToPeer,
    sendMessage
  } = usePeer();

  // Loading state if Peer ID is not yet assigned
  if (!myId) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          <p className="text-sm font-medium text-zinc-500 animate-pulse">Connecting to network...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex h-full min-h-[600px] bg-[var(--color-bg-secondary)]">
        {/* Sidebar - Connection Panel */}
        <div className="w-1/3 min-w-[320px] border-r border-[var(--color-border)]">
          <ConnectionPanel
            myId={myId}
            connectToPeer={connectToPeer}
            connections={connections}
          />

          {/* Status Footer in Sidebar */}
          <div className="p-4 mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
            <div className="text-xs flex items-center justify-center text-[var(--color-text-secondary)] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
              Network Online
            </div>
          </div>
        </div>

        {/* Main Content - Chat Window */}
        <div className="flex-1 min-w-0">
          <ChatWindow
            messages={messages}
            sendMessage={sendMessage}
            disabled={Object.keys(connections).length === 0}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
