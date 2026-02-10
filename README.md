# P2P Messenger

A cyberpunk-themed P2P messaging app using React and PeerJS.

## Setup Instructions

If you are seeing `vite: command not found`, it usually means dependencies are not installed.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## Troubleshooting

### "vite: command not found" or "sh: line 1: vite: command not found"
This error means the project dependencies are missing.
- **Fix**: Run `npm install` in the project root directory.
- If it still fails, try deleting `node_modules` and running `npm install` again.

### Network Access
The app runs on `0.0.0.0`, so you can access it from other devices on your network using the IP address shown in the terminal (e.g., `http://192.168.1.x:5173`).
