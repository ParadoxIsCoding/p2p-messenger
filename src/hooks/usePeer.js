import { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';

export const usePeer = () => {
    const [myId, setMyId] = useState('');
    const [peer, setPeer] = useState(null);
    const [connections, setConnections] = useState({}); // Map of peerId -> DataConnection
    const [messages, setMessages] = useState([]);

    const peerRef = useRef(null);
    const connectionsRef = useRef({}); // Ref to keep track of connections without dependency cycles

    useEffect(() => {
        // Initialize PeerJS
        const newPeer = new Peer();
        peerRef.current = newPeer;
        setPeer(newPeer);

        newPeer.on('open', (id) => {
            console.log('My Peer ID is: ' + id);
            setMyId(id);
        });

        newPeer.on('connection', (conn) => {
            console.log('Incoming connection from:', conn.peer);
            handleConnection(conn);
        });

        newPeer.on('error', (err) => {
            console.error('PeerJS error:', err);
        });

        return () => {
            newPeer.destroy();
        };
    }, []);

    const handleConnection = useCallback((conn) => {
        // Store connection
        connectionsRef.current = { ...connectionsRef.current, [conn.peer]: conn };
        setConnections((prev) => ({ ...prev, [conn.peer]: conn }));

        conn.on('open', () => {
            console.log('Connection opened with:', conn.peer);
            // Optional: Send a greeting or handshake
        });

        conn.on('data', (data) => {
            console.log('Received data:', data);
            setMessages((prev) => [...prev, { ...data, isSelf: false, timestamp: Date.now() }]);
        });

        conn.on('close', () => {
            console.log('Connection closed:', conn.peer);
            const { [conn.peer]: _, ...rest } = connectionsRef.current;
            connectionsRef.current = rest;
            setConnections((prev) => {
                const newConns = { ...prev };
                delete newConns[conn.peer];
                return newConns;
            });
        });

        conn.on('error', (err) => {
            console.error('Connection error:', err);
        });
    }, []);

    const connectToPeer = useCallback((peerId) => {
        if (!peer || !peerId) return;
        if (connectionsRef.current[peerId]) {
            console.log('Already connected to', peerId);
            return;
        }

        console.log('Connecting to:', peerId);
        const conn = peer.connect(peerId);
        handleConnection(conn);
    }, [peer, handleConnection]);

    const sendMessage = useCallback((text) => {
        const msg = {
            text,
            sender: myId,
            type: 'chat'
        };

        // Send to all connected peers
        Object.values(connectionsRef.current).forEach((conn) => {
            if (conn.open) {
                conn.send(msg);
            }
        });

        // Add to local message list
        setMessages((prev) => [...prev, { ...msg, isSelf: true, timestamp: Date.now() }]);
    }, [myId]);

    return {
        myId,
        peer,
        connections,
        messages,
        connectToPeer,
        sendMessage
    };
};
