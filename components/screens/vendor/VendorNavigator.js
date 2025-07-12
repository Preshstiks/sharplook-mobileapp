import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import OnboardingScreen from "./OnboardingScreen";
import VendorBottomNav from "./VendorBottomNav";
import LoginScreen from "../shared/LoginScreen";
import VendorLoginScreen from "./auth/LoginScreen";
import RegisterScreen from "../shared/RegisterScreen";
import ForgotPasswordScreen from "../shared/ForgotPasswordScreen";
import ResetPasswordScreen from "../shared/ResetPasswordScreen";
import EmailVerificationScreen from "../shared/EmailVerificationScreen";
import SplashScreen from "../shared/SplashScreen";
import VendorRegisterScreen from "./auth/RegisterScreen";
import VendorEmailVerificationScreen from "./auth/EmailVerification";
import VendorBusinessInfoScreen from "./auth/VendorBusinessInfoScreen";
import AddLocationScreen from "./auth/AddLocationScreen";
import PhoneNumberVerificationScreen from "./auth/PhoneNumberVerificationScreen";
import OTPVerificationScreen from "./auth/OTPVerificationScreen";
import AddProductScreen from "./AddProductScreen";
import VendorBookingDetailScreen from "./VendorBookingDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import AnalyticsAndInsightScreen from "./AnalyticsAndInsightScreen";
import NotificationList from "./NotificationList";
import NotificationDetailScreen from "./NotificationDetailScreen";
import VendorChatListScreen from "./chatsection/VendorChatList";
import VendorChatDetail from "./chatsection/VendorChatDetails";
import StoreManagementScreen from "./StoreManagementScreen";
import VendorSettingsScreen from "./VendorSettingsScreen";
import VendorHelpSupportScreen from "./VendorHelpSupportScreen";
import VendorLegalScreen from "./VendorLegalScreen";
import VendorPrivacyPolicyScreen from "./VendorPrivacyPolicyScreen";
import VendorTermsOfUseScreen from "./VendorTermsOfUseScreen";
import TermsOfUseYourRelationshipWithUsScreen from "./vendortermsofuse/TermsOfUseYourRelationshipWithUsScreen";
import TermsOfUseAcceptingTheTermsScreen from "./vendortermsofuse/TermsOfUseAcceptingTheTermsScreen";
import TermsOfUseChangesToTheTermsScreen from "./vendortermsofuse/TermsOfUseChangesToTheTermsScreen";
import TermsOfUseYourAccountWithUsScreen from "./vendortermsofuse/TermsOfUseYourAccountWithUsScreen";
import TermsOfUseYourAccessToAndUseOfOurServicesScreen from "./vendortermsofuse/TermsOfUseYourAccessToAndUseOfOurServicesScreen";
import TermsOfUseIntellectualPropertyRightsScreen from "./vendortermsofuse/TermsOfUseIntellectualPropertyRightsScreen";
import TermsOfUseContentScreen from "./vendortermsofuse/TermsOfUseContentScreen";
import TermsOfUseIndemnityScreen from "./vendortermsofuse/TermsOfUseIndemnityScreen";
import TermsOfUseExclusionOfWarrantiesScreen from "./vendortermsofuse/TermsOfUseExclusionOfWarrantiesScreen";
import TermsOfUseLimitationOfLiabilityScreen from "./vendortermsofuse/TermsOfUseLimitationOfLiabilityScreen";
import TermsOfUseOtherTermsScreen from "./vendortermsofuse/TermsOfUseOtherTermsScreen";
import WhatInformationWeCollectScreen from "./vendorprivacypolicy/WhatInformationWeCollectScreen";
import HowWeUseYourInformationScreen from "./vendorprivacypolicy/HowWeUseYourInformationScreen";
import HowWeShareYourInformationScreen from "./vendorprivacypolicy/HowWeShareYourInformationScreen";
import WhereWeStoreYourInformationScreen from "./vendorprivacypolicy/WhereWeStoreYourInformationScreen";
import YourRightsAndChoicesScreen from "./vendorprivacypolicy/YourRightsAndChoicesScreen";
import TheSecurityOfYourInformationScreen from "./vendorprivacypolicy/TheSecurityOfYourInformationScreen";
import HowLongWeKeepYourInformationScreen from "./vendorprivacypolicy/HowLongWeKeepYourInformationScreen";
import InformationRelatingToChildrenAndTeensScreen from "./vendorprivacypolicy/InformationRelatingToChildrenAndTeensScreen";
import PrivacyPolicyUpdateScreen from "./vendorprivacypolicy/PrivacyPolicyUpdateScreen";
import ContactScreen from "./vendorprivacypolicy/ContactScreen";
import JurisdictionSpecificScreen from "./vendorprivacypolicy/JurisdictionSpecificScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function VendorDashboardDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "left",
        headerShown: false,
        drawerType: "front",
        overlayColor: "rgba(0,0,0,0.2)",
        drawerStyle: { width: 280 },
      }}
    >
      <Drawer.Screen name="Dashboard" component={VendorBottomNav} />
      <Drawer.Screen
        name="AnalyticsAndInsight"
        component={AnalyticsAndInsightScreen}
        options={{ title: "Analytics and Insight" }}
      />
    </Drawer.Navigator>
  );
}

export default function VendorNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ title: "Onboarding", headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={VendorDashboardDrawer}
        options={{ title: "Home", headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
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
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorBusinessInfo"
        component={VendorBusinessInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneNumberVerificationScreen"
        component={PhoneNumberVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorBookingDetailScreen"
        component={VendorBookingDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorChatListScreen"
        component={VendorChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorChatDetailScreen"
        component={VendorChatDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorNotificationDetailScreen"
        component={NotificationDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StoreManagement"
        component={StoreManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorSettingsScreen"
        component={VendorSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorHelpSupportScreen"
        component={VendorHelpSupportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorLegalScreen"
        component={VendorLegalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorPrivacyPolicyScreen"
        component={VendorPrivacyPolicyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorTermsOfUseScreen"
        component={VendorTermsOfUseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseYourRelationshipWithUsScreen"
        component={TermsOfUseYourRelationshipWithUsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseAcceptingTheTermsScreen"
        component={TermsOfUseAcceptingTheTermsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseChangesToTheTermsScreen"
        component={TermsOfUseChangesToTheTermsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseYourAccountWithUsScreen"
        component={TermsOfUseYourAccountWithUsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseYourAccessToAndUseOfOurServicesScreen"
        component={TermsOfUseYourAccessToAndUseOfOurServicesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseIntellectualPropertyRightsScreen"
        component={TermsOfUseIntellectualPropertyRightsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseContentScreen"
        component={TermsOfUseContentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseIndemnityScreen"
        component={TermsOfUseIndemnityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseExclusionOfWarrantiesScreen"
        component={TermsOfUseExclusionOfWarrantiesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseLimitationOfLiabilityScreen"
        component={TermsOfUseLimitationOfLiabilityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseOtherTermsScreen"
        component={TermsOfUseOtherTermsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WhatInformationWeCollectScreen"
        component={WhatInformationWeCollectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowWeUseYourInformationScreen"
        component={HowWeUseYourInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowWeShareYourInformationScreen"
        component={HowWeShareYourInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WhereWeStoreYourInformationScreen"
        component={WhereWeStoreYourInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="YourRightsAndChoicesScreen"
        component={YourRightsAndChoicesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TheSecurityOfYourInformationScreen"
        component={TheSecurityOfYourInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowLongWeKeepYourInformationScreen"
        component={HowLongWeKeepYourInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InformationRelatingToChildrenAndTeensScreen"
        component={InformationRelatingToChildrenAndTeensScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicyUpdateScreen"
        component={PrivacyPolicyUpdateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JurisdictionSpecificScreen"
        component={JurisdictionSpecificScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
