import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./OnboardingScreen";
import VendorBottomNav from "./VendorBottomNav";
import LoginScreen from "../shared/LoginScreen";
import VendorLoginScreen from "./auth/LoginScreen";
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
import AddProductScreen from "./ProductAndServices/AddProductScreen";
import AddServicesScreen from "./ProductAndServices/AddServicesScreen";
import EditProductScreen from "./ProductAndServices/EditProduct";
import WithdrawScreen from "./WithdrawScreen";
import EditServicesScreen from "./ProductAndServices/EditService";
import FundVendorWalletScreen from "./FundVendorWallet";
import VendorTransactionHistory from "./VendorTransactionHistory";

// import ProtectedRoute from "../../reusuableComponents/ProtectedRoute";

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
        name="AddServices"
        component={AddServicesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditService"
        component={EditServicesScreen}
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
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={VendorSettingsScreen}
          //   requiredRole="VENDOR"
          // />
          <VendorSettingsScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorHelpSupportScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={VendorHelpSupportScreen}
          //   requiredRole="VENDOR"
          // />
          <VendorHelpSupportScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorLegalScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={VendorLegalScreen}
          //   requiredRole="VENDOR"
          // />
          <VendorLegalScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorPrivacyPolicyScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={VendorPrivacyPolicyScreen}
          //   requiredRole="VENDOR"
          // />
          <VendorPrivacyPolicyScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorTermsOfUseScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={VendorTermsOfUseScreen}
          //   requiredRole="VENDOR"
          // />
          <VendorTermsOfUseScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseYourRelationshipWithUsScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseYourRelationshipWithUsScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseYourRelationshipWithUsScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseAcceptingTheTermsScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseAcceptingTheTermsScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseAcceptingTheTermsScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseChangesToTheTermsScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseChangesToTheTermsScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseChangesToTheTermsScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseYourAccountWithUsScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseYourAccountWithUsScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseYourAccountWithUsScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseYourAccessToAndUseOfOurServicesScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseYourAccessToAndUseOfOurServicesScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseYourAccessToAndUseOfOurServicesScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseIntellectualPropertyRightsScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseIntellectualPropertyRightsScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseIntellectualPropertyRightsScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseContentScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseContentScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseContentScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseIndemnityScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseIndemnityScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseIndemnityScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseExclusionOfWarrantiesScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseExclusionOfWarrantiesScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseExclusionOfWarrantiesScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseLimitationOfLiabilityScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseLimitationOfLiabilityScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseLimitationOfLiabilityScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseOtherTermsScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TermsOfUseOtherTermsScreen}
          //   requiredRole="VENDOR"
          // />
          <TermsOfUseOtherTermsScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WhatInformationWeCollectScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={WhatInformationWeCollectScreen}
          //   requiredRole="VENDOR"
          // />
          <WhatInformationWeCollectScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowWeUseYourInformationScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={HowWeUseYourInformationScreen}
          //   requiredRole="VENDOR"
          // />
          <HowWeUseYourInformationScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowWeShareYourInformationScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={HowWeShareYourInformationScreen}
          //   requiredRole="VENDOR"
          // />
          <HowWeShareYourInformationScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WhereWeStoreYourInformationScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={WhereWeStoreYourInformationScreen}
          //   requiredRole="VENDOR"
          // />
          <WhereWeStoreYourInformationScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="YourRightsAndChoicesScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={YourRightsAndChoicesScreen}
          //   requiredRole="VENDOR"
          // />
          <YourRightsAndChoicesScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TheSecurityOfYourInformationScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={TheSecurityOfYourInformationScreen}
          //   requiredRole="VENDOR"
          // />
          <TheSecurityOfYourInformationScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowLongWeKeepYourInformationScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={HowLongWeKeepYourInformationScreen}
          //   requiredRole="VENDOR"
          // />
          <HowLongWeKeepYourInformationScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InformationRelatingToChildrenAndTeensScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={InformationRelatingToChildrenAndTeensScreen}
          //   requiredRole="VENDOR"
          // />
          <InformationRelatingToChildrenAndTeensScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicyUpdateScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={PrivacyPolicyUpdateScreen}
          //   requiredRole="VENDOR"
          // />
          <PrivacyPolicyUpdateScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={ContactScreen}
          //   requiredRole="VENDOR"
          // />
          <ContactScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JurisdictionSpecificScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={JurisdictionSpecificScreen}
          //   requiredRole="VENDOR"
          // />
          <JurisdictionSpecificScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FundVendorWallet"
        component={FundVendorWalletScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorTransactionHistory"
        component={VendorTransactionHistory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
