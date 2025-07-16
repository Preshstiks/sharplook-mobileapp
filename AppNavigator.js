import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./components/screens/shared/SplashScreen";
import LoginScreen from "./components/screens/shared/LoginScreen";
import RegisterScreen from "./components/screens/shared/RegisterScreen";
import ClientNavigator from "./components/screens/client/ClientNavigator";
import VendorNavigator from "./components/screens/vendor/VendorNavigator";
import AdminNavigator from "./components/screens/admin/AdminNavigator";
import OnboardingScreen from "./components/screens/shared/OnboardingScreen";
import VendorLoginScreen from "./components/screens/vendor/auth/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useCustomFonts } from "./hooks/useFonts";
import { View, ActivityIndicator } from "react-native";
import ForgotPasswordScreen from "./components/screens/shared/ForgotPasswordScreen";
import EmailVerificationScreen from "./components/screens/shared/EmailVerificationScreen";
import ResetPasswordScreen from "./components/screens/shared/ResetPasswordScreen";
import VendorRegisterScreen from "./components/screens/vendor/auth/RegisterScreen";
import VendorEmailVerificationScreen from "./components/screens/vendor/auth/EmailVerification";
import VendorBusinessInfoScreen from "./components/screens/vendor/auth/VendorBusinessInfoScreen";
import ClientAddLocationScreen from "./components/screens/shared/AddLocationScreen";
import ClientVerifyPhoneNumber from "./components/screens/shared/VerifyPhoneNumber";
import VerifyWithPhoneOTP from "./components/screens/shared/VerifyWithPhoneOTP";
import EmailVerificationForgotPassword from "./components/screens/shared/EmailVerificationForgotPassword";
import CategoriesScreen from "./components/screens/client/CategoriesScreen";
import EmailVerificationScreenSignup from "./components/screens/shared/EmailVerificationScreenSIgnup";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#EB278D" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="ClientAddLocation"
          component={ClientAddLocationScreen}
          options={{ title: "ClientAddLocation", headerShown: false }}
        />
        <Stack.Screen
          name="ClientVerifyPhoneNumber"
          component={ClientVerifyPhoneNumber}
          options={{ title: "ClientVerifyPhoneNumber", headerShown: false }}
        />
        <Stack.Screen
          name="VerifyWithPhoneOTP"
          component={VerifyWithPhoneOTP}
          options={{ title: "VerifyWithPhoneOTP", headerShown: false }}
        />
        <Stack.Screen
          name="ClientEmailVerificationForgotPassword"
          component={EmailVerificationForgotPassword}
          options={{ title: "VerifyWithPhoneOTP", headerShown: false }}
        />

        <Stack.Screen
          name="VendorLogin"
          component={VendorLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorRegister"
          component={VendorRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorEmailVerification"
          component={VendorEmailVerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorBusinessInfo"
          component={VendorBusinessInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerificationSignup"
          component={EmailVerificationScreenSignup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Client"
          component={ClientNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vendor"
          component={VendorNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
