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

// Vendor Terms of Use Screen Components
import TermsOfUseAcceptanceOfTermsScreen from "./vendortermsofuse/TermsOfUseAcceptanceOfTermsScreen";
import TermsOfUseChangesToTermsScreen from "./vendortermsofuse/TermsOfUseChangesToTermsScreen";
import TermsOfUseEligibilityScreen from "./vendortermsofuse/TermsOfUseEligibilityScreen";
import TermsOfUseServicesOfferedScreen from "./vendortermsofuse/TermsOfUseServicesOfferedScreen";
import TermsOfUseUserAccountsScreen from "./vendortermsofuse/TermsOfUseUserAccountsScreen";
import TermsOfUseLocationTrackingScreen from "./vendortermsofuse/TermsOfUseLocationTrackingScreen";
import TermsOfUseBookingPoliciesScreen from "./vendortermsofuse/TermsOfUseBookingPoliciesScreen";
import TermsOfUsePaymentTermsScreen from "./vendortermsofuse/TermsOfUsePaymentTermsScreen";
import TermsOfUseIntellectualPropertyScreen from "./vendortermsofuse/TermsOfUseIntellectualPropertyScreen";
import TermsOfUseProhibitedActivitiesScreen from "./vendortermsofuse/TermsOfUseProhibitedActivitiesScreen";
import TermsOfUseThirdPartyLinksScreen from "./vendortermsofuse/TermsOfUseThirdPartyLinksScreen";
import TermsOfUseDisclaimersScreen from "./vendortermsofuse/TermsOfUseDisclaimersScreen";
import TermsOfUseIndemnificationScreen from "./vendortermsofuse/TermsOfUseIndemnificationScreen";
import TermsOfUseTerminationScreen from "./vendortermsofuse/TermsOfUseTerminationScreen";
import TermsOfUseGoverningLawScreen from "./vendortermsofuse/TermsOfUseGoverningLawScreen";
import TermsOfUseDisputeResolutionScreen from "./vendortermsofuse/TermsOfUseDisputeResolutionScreen";
import TermsOfUseSeverabilityScreen from "./vendortermsofuse/TermsOfUseSeverabilityScreen";
import TermsOfUseEntireAgreementScreen from "./vendortermsofuse/TermsOfUseEntireAgreementScreen";
import TermsOfUseContactUsScreen from "./vendortermsofuse/TermsOfUseContactUsScreen";

import AddProductScreen from "./ProductAndServices/AddProductScreen";
import AddServicesScreen from "./ProductAndServices/AddServicesScreen";
import EditProductScreen from "./ProductAndServices/EditProduct";
import WithdrawScreen from "./Dashboard/WithdrawScreen";
import EditServicesScreen from "./ProductAndServices/EditService";
import FundVendorWalletScreen from "./Dashboard/FundVendorWallet";
import VendorTransactionHistory from "./Dashboard/VendorTransactionHistory";
import VendorOffersScreen from "./VendorOffersScreen";
import VendorOfferDetailsScreen from "./VendorOfferDetailsScreen";
import SubscriptionScreen from "./SubscriptionScreen";
import VendorReferAndEarnScreen from "./VendorReferAndEarnScreen";
import { Ionicons } from "@expo/vector-icons";
import OrdersStack from "./MyOrder/MyOrderStack";
import DataControllerScreen from "./vendorprivacypolicy/DataController";
import VendorPrivacyPolicyIntroScreen from "./vendorprivacypolicy/VendorPrivacyPolicyIntroScreen";
import VendorAutomaticCollectionScreen from "./vendorprivacypolicy/VendorAutomaticCollectionScreen";
import VendorCollectionOfPersonalInfoScreen from "./vendorprivacypolicy/VendorCollectionOfPersonalInfoScreen";
import VendorCookiesAndUsageDataScreen from "./vendorprivacypolicy/VendorCookiesAndUsageDataScreen";
import VendorHowWeShareInfoScreen from "./vendorprivacypolicy/VendorHowWeShareInfoScreen";
import VendorManagingPersonalInfoScreen from "./vendorprivacypolicy/VendorManagingPersonalInfoScreen";
import VendorUseAndProcessingScreen from "./vendorprivacypolicy/VendorUseAndProcessingScreen";
import VendorUsageDataScreen from "./vendorprivacypolicy/VendorUsageDataScreen";
import VendorInformationTransferScreen from "./vendorprivacypolicy/VendorInformationTransferScreen";
import VendorServiceProvidersScreen from "./vendorprivacypolicy/VendorServiceProvidersScreen";
import VendorPrivacyOfChildrenScreen from "./vendorprivacypolicy/VendorPrivacyOfChildrenScreen";
import VendorNewslettersScreen from "./vendorprivacypolicy/VendorNewslettersScreen";
import VendorLinksToOtherAppsScreen from "./vendorprivacypolicy/VendorLinksToOtherAppsScreen";
import VendorInformationSecurityScreen from "./vendorprivacypolicy/VendorInformationSecurityScreen";
import VendorDataBreachScreen from "./vendorprivacypolicy/VendorDataBreachScreen";
import VendorLegalDisclosuresScreen from "./vendorprivacypolicy/VendorLegalDisclosuresScreen";
import VendorChangesAndAmendmentsScreen from "./vendorprivacypolicy/VendorChangesAndAmendmentsScreen";
import VendorIndemnityScreen from "./vendorprivacypolicy/VendorIndemnityScreen";
import VendorAcceptanceOfPolicyScreen from "./vendorprivacypolicy/VendorAcceptanceOfPolicyScreen";
import VendorContactingUsScreen from "./vendorprivacypolicy/VendorContactingUsScreen";
import ServiceLevelAgreementScreen from "./ServiceLevelAgreement";
// import ProtectedRoute from "../../reusuableComponents/ProtectedRoute";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function VendorMainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#d6c0ad", width: 300 },
        drawerActiveTintColor: "#BF6A37",
        drawerInactiveTintColor: "#3c2a1e",
        drawerLabelStyle: { fontFamily: "poppinsRegular", fontSize: 16 },
        swipeEnabled: false,
        drawerPosition: "left",
      }}
    >
      <Drawer.Screen
        name="Main"
        component={VendorBottomNav}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      <Drawer.Screen
        name="Analytics & Insights"
        component={AnalyticsAndInsightScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Store Management"
        component={StoreManagementScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="OrdersStack"
        component={OrdersStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Refer and Earn"
        component={VendorReferAndEarnScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotificationList}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Chat"
        component={VendorChatListScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={VendorSettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Help & Support"
        component={VendorHelpSupportScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Legal"
        component={VendorLegalScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
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
        component={VendorMainDrawer}
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
        name="ServiceLevelAgreementScreen"
        children={(props) => (
          // <ProtectedRoute
          //   {...props}
          //   Component={VendorTermsOfUseScreen}
          //   requiredRole="VENDOR"
          // />
          <ServiceLevelAgreementScreen {...props} />
        )}
        options={{ headerShown: false }}
      />

      {/* Vendor Terms of Use Screen Routes */}
      <Stack.Screen
        name="TermsOfUseAcceptanceOfTermsScreen"
        children={(props) => <TermsOfUseAcceptanceOfTermsScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseChangesToTermsScreen"
        children={(props) => <TermsOfUseChangesToTermsScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseEligibilityScreen"
        children={(props) => <TermsOfUseEligibilityScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseServicesOfferedScreen"
        children={(props) => <TermsOfUseServicesOfferedScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseUserAccountsScreen"
        children={(props) => <TermsOfUseUserAccountsScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseLocationTrackingScreen"
        children={(props) => <TermsOfUseLocationTrackingScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseBookingPoliciesScreen"
        children={(props) => <TermsOfUseBookingPoliciesScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUsePaymentTermsScreen"
        children={(props) => <TermsOfUsePaymentTermsScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseIntellectualPropertyScreen"
        children={(props) => (
          <TermsOfUseIntellectualPropertyScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseProhibitedActivitiesScreen"
        children={(props) => (
          <TermsOfUseProhibitedActivitiesScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseThirdPartyLinksScreen"
        children={(props) => <TermsOfUseThirdPartyLinksScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseDisclaimersScreen"
        children={(props) => <TermsOfUseDisclaimersScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseIndemnificationScreen"
        children={(props) => <TermsOfUseIndemnificationScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseTerminationScreen"
        children={(props) => <TermsOfUseTerminationScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseGoverningLawScreen"
        children={(props) => <TermsOfUseGoverningLawScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseDisputeResolutionScreen"
        children={(props) => <TermsOfUseDisputeResolutionScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseSeverabilityScreen"
        children={(props) => <TermsOfUseSeverabilityScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseEntireAgreementScreen"
        children={(props) => <TermsOfUseEntireAgreementScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfUseContactUsScreen"
        children={(props) => <TermsOfUseContactUsScreen {...props} />}
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
        name="VendorDataControllerScreen"
        children={(props) => <DataControllerScreen {...props} />}
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
      <Stack.Screen
        name="VendorOffers"
        component={VendorOffersScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="VendorOfferDetails"
        component={VendorOfferDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorReferAndEarn"
        component={VendorReferAndEarnScreen}
        options={{ headerShown: false }}
      />

      {/* New Privacy Policy Screens */}
      <Stack.Screen
        name="VendorPrivacyPolicyIntroScreen"
        children={(props) => <VendorPrivacyPolicyIntroScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorAutomaticCollectionScreen"
        children={(props) => <VendorAutomaticCollectionScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorCollectionOfPersonalInfoScreen"
        children={(props) => (
          <VendorCollectionOfPersonalInfoScreen {...props} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorCookiesAndUsageDataScreen"
        children={(props) => <VendorCookiesAndUsageDataScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorHowWeShareInfoScreen"
        children={(props) => <VendorHowWeShareInfoScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorManagingPersonalInfoScreen"
        children={(props) => <VendorManagingPersonalInfoScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorUseAndProcessingScreen"
        children={(props) => <VendorUseAndProcessingScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorUsageDataScreen"
        children={(props) => <VendorUsageDataScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorInformationTransferScreen"
        children={(props) => <VendorInformationTransferScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorServiceProvidersScreen"
        children={(props) => <VendorServiceProvidersScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorPrivacyOfChildrenScreen"
        children={(props) => <VendorPrivacyOfChildrenScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorNewslettersScreen"
        children={(props) => <VendorNewslettersScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorLinksToOtherAppsScreen"
        children={(props) => <VendorLinksToOtherAppsScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorInformationSecurityScreen"
        children={(props) => <VendorInformationSecurityScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorDataBreachScreen"
        children={(props) => <VendorDataBreachScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorLegalDisclosuresScreen"
        children={(props) => <VendorLegalDisclosuresScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorChangesAndAmendmentsScreen"
        children={(props) => <VendorChangesAndAmendmentsScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorIndemnityScreen"
        children={(props) => <VendorIndemnityScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorAcceptanceOfPolicyScreen"
        children={(props) => <VendorAcceptanceOfPolicyScreen {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorContactingUsScreen"
        children={(props) => <VendorContactingUsScreen {...props} />}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
