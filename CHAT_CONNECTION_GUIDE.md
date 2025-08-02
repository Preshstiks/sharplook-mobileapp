# Chat Connection System Guide

## Overview

This system establishes WebSocket connections before navigating to chat screens, ensuring that users can immediately see and continue their conversations without waiting for connection establishment.

## Key Components

### 1. ChatConnectionService (`utils/chatConnectionService.js`)

- Singleton service that manages WebSocket connections
- Handles connection establishment, room joining, and cleanup
- Prevents duplicate connections to the same room
- Provides connection status tracking

### 2. useChatNavigation Hook (`hooks/useChatNavigation.js`)

- Custom hook that handles chat navigation with pre-connection
- Manages loading states during connection establishment
- Provides a clean API for navigating to chat screens
- Handles different chat scenarios (vendor chats, existing chats, etc.)

### 3. ChatConnectionLoader (`components/reusuableComponents/ChatConnectionLoader.js`)

- Loading component that shows during connection establishment
- Provides visual feedback to users
- Can be customized with different messages

## How to Use

### Basic Usage

```javascript
import { useChatNavigation } from "../../hooks/useChatNavigation";
import { ChatConnectionLoader } from "../../components/reusuableComponents/ChatConnectionLoader";

export default function MyComponent() {
  const { navigateToChat, isConnecting } = useChatNavigation();

  const handleChatPress = () => {
    navigateToChat(navigation, {
      vendorId: vendorData?.id,
      receiverName: vendorData?.name,
      chat: {
        id: vendorData?.id,
        name: vendorData?.name,
        vendorId: vendorData?.id,
      },
    });
  };

  return (
    <View>
      <ChatConnectionLoader visible={isConnecting} />
      <TouchableOpacity onPress={handleChatPress}>
        <Text>Chat with Vendor</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Different Chat Scenarios

#### 1. Chat with Vendor (from vendor profile)

```javascript
navigateToChat(navigation, {
  vendorId: vendorData?.id,
  receiverName: vendorData?.vendorOnboarding?.businessName,
  chat: {
    id: vendorData?.id,
    name: vendorData?.vendorOnboarding?.businessName,
    vendorId: vendorData?.id,
  },
});
```

#### 2. Existing Chat (from chat list)

```javascript
navigateToChat(navigation, {
  roomId: item.roomId,
  receiverName: item?.receiver?.name,
  receiverId: item?.receiver?.id,
});
```

#### 3. Chat List Navigation

```javascript
const { navigateToChatList } = useChatNavigation();
navigateToChatList(navigation);
```

### Advanced Usage with Callbacks

```javascript
navigateToChat(navigation, {
  vendorId: vendorData?.id,
  receiverName: vendorData?.name,
  onConnectionStart: () => {
    console.log("Starting connection...");
  },
  onConnectionSuccess: (result) => {
    console.log("Connection established:", result);
  },
  onConnectionError: (error) => {
    console.log("Connection failed:", error);
  },
});
```

## Updated Components

The following components have been updated to use the new chat navigation system:

1. **VendorProfileScreen** - Chat with vendor from profile
2. **ChatListScreen** - Navigate to existing chats
3. **HomeScreen** - Chat list navigation
4. **Search** - Chat list navigation
5. **ChatDetailScreen** - Uses pre-established connections

## Benefits

1. **Faster Chat Loading**: Connections are established before navigation
2. **Better UX**: Users see loading indicators during connection
3. **Reliable Connections**: Fallback to in-screen connection if pre-connection fails
4. **Consistent API**: Single hook for all chat navigation scenarios
5. **Connection Reuse**: Prevents duplicate connections to the same room

## Connection Flow

1. User taps chat icon
2. `navigateToChat` is called with chat parameters
3. `ChatConnectionService` establishes WebSocket connection
4. Loading indicator shows during connection
5. Once connected, navigation occurs with established socket
6. `ChatDetailScreen` uses pre-established connection
7. If connection fails, navigation still occurs but connection is established in screen

## Error Handling

- If pre-connection fails, the app still navigates to the chat screen
- Connection will be established within the ChatDetailScreen as fallback
- Loading states are properly managed and cleaned up
- Connection errors are logged for debugging

## Performance Considerations

- Connections are cached and reused for the same room
- Duplicate connection attempts are prevented
- Connections are properly cleaned up when screens unmount
- Timeout handling prevents hanging connections
