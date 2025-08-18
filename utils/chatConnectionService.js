import { io } from "socket.io-client";

class ChatConnectionService {
  constructor() {
    this.socket = null;
    this.connectionPromises = new Map();
    this.connectedRooms = new Set();
  }

  // Initialize connection for a specific room
  async establishConnection(userId, roomId) {
    const connectionKey = `${userId}_${roomId}`;

    // If already connected to this room, return existing promise
    if (this.connectionPromises.has(connectionKey)) {
      return this.connectionPromises.get(connectionKey);
    }

    // Create new connection promise
    const connectionPromise = new Promise((resolve, reject) => {
      try {
        // Check if we already have a socket and it's connected
        if (this.socket && this.socket.connected) {
          this.connectedRooms.add(roomId);
          this.socket.emit("join-room", roomId);
          resolve({
            socket: this.socket,
            roomId,
            status: "connected",
          });
          return;
        }

        // Initialize socket connection
        this.socket = io("https://sharplook-backend-zd8j.onrender.com", {
          query: { userId },
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: 10,
          reconnectionDelay: 2000,
          reconnectionDelayMax: 10000,
          timeout: 30000,
          forceNew: false,
          autoConnect: true,
        });

        // Handle connection events
        this.socket.on("connect", () => {
          this.connectedRooms.add(roomId);

          // Join the room
          this.socket.emit("join-room", roomId);

          resolve({
            socket: this.socket,
            roomId,
            status: "connected",
          });
        });

        this.socket.on("connect_error", (error) => {
          console.error("❌ Chat connection error:", error);
          reject({
            error: error.message || "Connection failed",
            roomId,
            status: "error",
          });
        });

        this.socket.on("disconnect", (reason) => {
          this.connectedRooms.delete(roomId);
        });

        this.socket.on("reconnect", (attemptNumber) => {
          this.socket.emit("join-room", roomId);
        });
      } catch (error) {
        console.error("❌ Error establishing chat connection:", error);
        reject({
          error: error.message || "Connection failed",
          roomId,
          status: "error",
        });
      }
    });

    // Store the promise
    this.connectionPromises.set(connectionKey, connectionPromise);

    // Clean up promise after resolution
    connectionPromise.finally(() => {
      setTimeout(() => {
        this.connectionPromises.delete(connectionKey);
      }, 5000); // Keep promise for 5 seconds after resolution
    });

    return connectionPromise;
  }

  // Check if already connected to a room
  isConnectedToRoom(roomId) {
    return this.connectedRooms.has(roomId);
  }

  // Get existing socket connection
  getSocket() {
    return this.socket;
  }

  // Check if socket is connected
  isSocketConnected() {
    return this.socket && this.socket.connected;
  }

  // Disconnect from a specific room
  disconnectFromRoom(roomId) {
    if (this.socket && this.connectedRooms.has(roomId)) {
      this.socket.emit("leave-room", roomId);
      this.connectedRooms.delete(roomId);
    }
  }

  // Disconnect completely
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connectedRooms.clear();
      this.connectionPromises.clear();
    }
  }

  // Clean up resources
  cleanup() {
    this.disconnect();
  }
}

// Export singleton instance
export const chatConnectionService = new ChatConnectionService();
