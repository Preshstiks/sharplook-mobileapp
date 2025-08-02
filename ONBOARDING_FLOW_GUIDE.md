# Onboarding Flow Implementation Guide

## Overview

This implementation ensures that first-time users see onboarding pages before authentication, while returning users go directly to the login page.

## Flow Logic

### First-Time Users

1. App starts with splash screen
2. AuthContext checks if user has seen onboarding (`onboardingCompleted` in AsyncStorage)
3. If `onboardingCompleted` is not "true", user is directed to onboarding screens
4. After completing onboarding, `onboardingCompleted` is set to "true"
5. User is then directed to appropriate login screen (Client or Vendor)

### Returning Users

1. App starts with splash screen
2. AuthContext checks if user has seen onboarding
3. If `onboardingCompleted` is "true", user is directed directly to login screen
4. No onboarding screens are shown

## Key Components Modified

### 1. AuthContext (`context/AuthContext.js`)

- Added `hasSeenOnboarding` state
- Added `markOnboardingAsCompleted()` method
- Added `resetOnboardingStatus()` method for testing
- Added `checkOnboardingStatus()` method

### 2. SplashScreen (`components/screens/shared/SplashScreen.js`)

- Now checks `hasSeenOnboarding` status
- Navigates to onboarding or login based on status
- Includes debug functionality (long press in dev mode to reset onboarding)

### 3. OnboardingScreen (`components/screens/shared/OnboardingScreen.js`)

- Calls `markOnboardingAsCompleted()` when user completes onboarding
- Ensures onboarding status is saved before navigation

### 4. AppNavigator (`AppNavigator.js`)

- Shows loading screen while auth context is initializing
- Ensures proper loading states

## Testing

### Development Testing

- Long press on splash screen in development mode to reset onboarding status
- This allows testing both flows without uninstalling the app

### Production Testing

- First install: Should see onboarding → login
- Subsequent launches: Should see login directly
- Uninstall and reinstall: Should see onboarding again

## AsyncStorage Keys Used

- `onboardingCompleted`: Boolean string ("true"/"false") indicating if user has completed onboarding
- `token`: Existing authentication token

## Implementation Details

### State Management

The onboarding status is managed in the AuthContext and persisted in AsyncStorage. This ensures:

- Consistent state across app restarts
- Proper loading states during initialization
- Clean separation of concerns

### Navigation Flow

```
Splash Screen (4s delay)
    ↓
Check onboarding status
    ↓
┌─────────────────┬─────────────────┐
│ First Time      │ Returning User  │
│ User            │                 │
│ ↓               │ ↓               │
│ Onboarding      │ Login Screen    │
│ ↓               │                 │
│ Login Screen    │                 │
└─────────────────┴─────────────────┘
```

### Error Handling

- If AsyncStorage fails, onboarding status defaults to `false` (shows onboarding)
- Loading states prevent premature navigation
- Debug functions only work in development mode

## Future Enhancements

- Add onboarding version tracking for future updates
- Implement partial onboarding completion tracking
- Add analytics for onboarding completion rates
