# Call Functionality Implementation Guide

## Overview

This implementation provides an in-app audio call feature using Expo's audio capabilities and Socket.IO for real-time communication. The call functionality is designed to work with Expo Go and doesn't require native WebRTC dependencies.

## Features Implemented

### 1. Call Icon in Chat Screen

- Added a call icon in the chat header next to the user's name
- Clicking the call icon initiates an outgoing call to the chat partner

### 2. Call Screen

- **Outgoing Calls**: Shows "Connecting..." and then "Call in progress" with duration
- **Incoming Calls**: Shows "Incoming call..." with answer/reject options
- **Call Controls**:
  - Mute button (toggles microphone)
  - End call button (red button)
  - Answer call button (green button, only for incoming calls)

### 3. Incoming Call Notifications

- Modal notification appears when receiving an incoming call
- Shows caller's name and avatar
- Answer and reject buttons
- Integrates with the global call context

### 4. Audio Permissions

- Requests microphone permissions before starting calls
- Configures audio mode for optimal call experience
- Handles permission denial gracefully

## File Structure

```
components/
├── screens/client/GlobalScreens/
│   ├── ChatDetailScreen.js (updated with call icon)
│   └── CallScreen.js (new call screen)
├── reusuableComponents/
│   └── IncomingCallNotification.js (incoming call modal)
context/
├── CallContext.js (call state management)
utils/
└── callService.js (call API service)
```

## Socket Events

The implementation uses these Socket.IO events:

- `call:offer` - Send call offer to receiver
- `call:answer` - Send call answer back to caller
- `call:end` - End call and notify peer
- `call:reject` - Reject incoming call

## Usage

### Starting a Call

1. Navigate to a chat with another user
2. Tap the call icon in the header
3. The call screen will open and attempt to connect

### Receiving a Call

1. When an incoming call is received, a modal notification appears
2. Tap the green button to answer or red button to reject
3. If answered, the call screen opens

### During a Call

- Use the mute button to toggle microphone
- Use the red end call button to hang up
- Call duration is displayed during active calls

## Backend Requirements

The backend should handle these endpoints:

- `POST /calls/initiate` - Initialize a new call
- `POST /calls/{callId}/end` - End an active call
- `GET /calls/history` - Get call history
- `POST /notifications/call` - Send call notifications

## Socket Server Events

The backend should listen for and emit these events:

- `call:offer` - Forward call offers to receivers
- `call:answer` - Forward call answers to callers
- `call:end` - Notify both parties when call ends
- `call:reject` - Notify caller when call is rejected

## Expo Compatibility

This implementation is fully compatible with Expo Go and uses:

- `expo-av` for audio permissions and configuration
- Socket.IO for real-time communication
- React Navigation for screen management
- No native WebRTC dependencies required

## Future Enhancements

1. **Video Calls**: Could be added using Expo's camera capabilities
2. **Call Recording**: Implement call recording functionality
3. **Call Quality**: Add call quality indicators
4. **Background Calls**: Handle calls when app is in background
5. **Push Notifications**: Add push notifications for missed calls

## Notes

- This is a simplified implementation that simulates call functionality
- For production use, you would need to implement actual audio streaming
- The backend needs to be configured to handle the socket events
- Call quality and reliability depend on the backend implementation
