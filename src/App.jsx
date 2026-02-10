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
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0f] text-[var(--color-neon-blue)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="text-xl font-mono animate-pulse">Initializing Neural Link...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex h-full min-h-[600px]">
        {/* Sidebar - Connection Panel */}
        <div className="w-1/3 min-w-[300px] border-r border-[var(--color-glass-border)] bg-[rgba(0,0,0,0.2)]">
          <ConnectionPanel
            myId={myId}
            connectToPeer={connectToPeer}
            connections={connections}
          />

          {/* Status Footer in Sidebar */}
          <div className="p-4 mt-auto">
            <div className="text-xs text-center text-gray-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
              System Online
            </div>
          </div>
        </div>

        {/* Main Content - Chat Window */}
        <div className="flex-1 bg-[rgba(0,0,0,0.1)]">
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
