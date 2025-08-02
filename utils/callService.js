// WebRTC call service - no API endpoints needed
// All call functionality is handled through WebRTC and socket.io events

export const callService = {
  // Generate a unique room ID for calls
  generateRoomId() {
    return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Validate call parameters
  validateCallParams(receiverId, roomId) {
    if (!receiverId) {
      throw new Error("Receiver ID is required");
    }
    if (!roomId) {
      throw new Error("Room ID is required");
    }
    return true;
  },

  // Format call duration
  formatCallDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  },

  // Get call status text
  getCallStatusText(status) {
    switch (status) {
      case "connecting":
        return "Connecting...";
      case "connected":
        return "Call in progress";
      case "incoming":
        return "Incoming call...";
      case "ended":
        return "Call ended";
      default:
        return "Unknown status";
    }
  },

  // WebRTC configuration
  getRTCConfiguration() {
    return {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    };
  },
};
