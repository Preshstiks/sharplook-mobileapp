import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const CallContext = createContext();

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};

export const CallProvider = ({ children }) => {
  const { userId } = useAuth();
  const [incomingCall, setIncomingCall] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    // Initialize call socket
    socketRef.current = io("https://sharplook-backend-2l7j.onrender.com", {
      query: { userId, type: "call" },
      transports: ["websocket"],
    });

    // Listen for incoming calls
    socketRef.current.on("call:offer", (data) => {
      setIncomingCall({
        callerId: data.callerId,
        callerName: data.callerName,
        roomId: data.roomId,
      });
    });

    // Listen for call end notifications
    socketRef.current.on("call:end", (data) => {
      setIncomingCall(null);
      setIsInCall(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  const answerCall = () => {
    if (incomingCall) {
      setIsInCall(true);
      setIncomingCall(null);
      return incomingCall;
    }
    return null;
  };

  const rejectCall = () => {
    if (incomingCall) {
      // Send reject signal
      socketRef.current.emit("call:reject", {
        receiverId: incomingCall.callerId,
        roomId: incomingCall.roomId,
      });
      setIncomingCall(null);
    }
  };

  const endCall = () => {
    setIsInCall(false);
    setIncomingCall(null);
  };

  const value = {
    incomingCall,
    isInCall,
    answerCall,
    rejectCall,
    endCall,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};
