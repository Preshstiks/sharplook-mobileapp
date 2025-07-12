import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClientBottomNav from "./ClientBottomNav";
import { View, Text } from "react-native";
import CustomDrawerContent from "./CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import FilterScreen from "./FilterScreen";
import VendorProfileScreen from "./VendorProfileScreen";
import ChatListScreen from "./ChatListScreen";
import ChatDetailScreen from "./ChatDetailScreen";
import DebitCardPaymentForm from "./DebitCardPaymentForm";
import AddNewCardForm from "./AddNewCardForm";
import Search from "./Search";
import NotificationDetailScreen from "./NotificationDetailScreen";
import BookAppointmentScreen from "./BookAppointmentScreen";
import BookingDetailScreen from "./BookingDetailScreen";
import ChatDetailScreenHardcoded from "./ChatDetailScreenHardcoded";
import CartScreen from "./CartScreen";
import SettingsScreen from "./SettingsScreen";
import HelpSupportScreen from "./HelpSupportScreen";
import LegalScreen from "./LegalScreen";
import PrivacyPolicyScreen from "./PrivacyPolicyScreen";
import ReviewsScreen from "./reviews/ReviewsScreen";
import AddReviewScreen from "./reviews/AddReviewScreen";
import OtherScreen from "./OtherScreen";
import WhatInformationWeCollectScreen from "./privacypolicy/WhatInformationWeCollectScreen";
import HowWeUseYourInformationScreen from "./privacypolicy/HowWeUseYourInformationScreen";
import HowWeShareYourInformationScreen from "./privacypolicy/HowWeShareYourInformationScreen";
import WhereWeStoreYourInformationScreen from "./privacypolicy/WhereWeStoreYourInformationScreen";
import YourRightsAndChoicesScreen from "./privacypolicy/YourRightsAndChoicesScreen";
import TheSecurityOfYourInformationScreen from "./privacypolicy/TheSecurityOfYourInformationScreen";
import HowLongWeKeepYourInformationScreen from "./privacypolicy/HowLongWeKeepYourInformationScreen";
import InformationRelatingToChildrenAndTeensScreen from "./privacypolicy/InformationRelatingToChildrenAndTeensScreen";
import PrivacyPolicyUpdateScreen from "./privacypolicy/PrivacyPolicyUpdateScreen";
import ContactScreen from "./privacypolicy/ContactScreen";
import JurisdictionSpecificScreen from "./privacypolicy/JurisdictionSpecificScreen";
import TermsOfUseScreen from "./TermsOfUseScreen";
import TermsOfUseYourRelationshipWithUsScreen from "./termsofuse/TermsOfUseYourRelationshipWithUsScreen";
import TermsOfUseAcceptingTheTermsScreen from "./termsofuse/TermsOfUseAcceptingTheTermsScreen";
import TermsOfUseChangesToTheTermsScreen from "./termsofuse/TermsOfUseChangesToTheTermsScreen";
import TermsOfUseYourAccountWithUsScreen from "./termsofuse/TermsOfUseYourAccountWithUsScreen";
import TermsOfUseYourAccessToAndUseOfOurServicesScreen from "./termsofuse/TermsOfUseYourAccessToAndUseOfOurServicesScreen";
import TermsOfUseIntellectualPropertyRightsScreen from "./termsofuse/TermsOfUseIntellectualPropertyRightsScreen";
import TermsOfUseContentScreen from "./termsofuse/TermsOfUseContentScreen";
import TermsOfUseIndemnityScreen from "./termsofuse/TermsOfUseIndemnityScreen";
import TermsOfUseExclusionOfWarrantiesScreen from "./termsofuse/TermsOfUseExclusionOfWarrantiesScreen";
import TermsOfUseLimitationOfLiabilityScreen from "./termsofuse/TermsOfUseLimitationOfLiabilityScreen";
import TermsOfUseOtherTermsScreen from "./termsofuse/TermsOfUseOtherTermsScreen";
import UserProfileScreen from "./userprofile/UserProfileScreen";
import EditProfileScreen from "./userprofile/EditProfileScreen";

// Placeholder screens
function AccountInfoScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account Information</Text>
    </View>
  );
}
function BookingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>My Bookings</Text>
    </View>
  );
}
function WalletScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>My Wallet</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function ClientNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#d6c0ad", width: 300 },
        drawerActiveTintColor: "#BF6A37",
        drawerInactiveTintColor: "#3c2a1e",
        drawerLabelStyle: { fontFamily: "poppinsRegular", fontSize: 16 },
        swipeEnabled: false,
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={ClientBottomNav}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Account Information"
        component={AccountInfoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Bookings"
        component={BookingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Wallet"
        component={WalletScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="HelpSupportScreen"
        component={HelpSupportScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="LegalScreen"
        component={LegalScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="VendorProfileScreen"
        component={VendorProfileScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Filter"
        component={FilterScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="DebitCardScreen"
        component={DebitCardPaymentForm}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="AddNewCardScreen"
        component={AddNewCardForm}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="BookingDetailScreen"
        component={BookingDetailScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ChatDetailScreenHardcoded"
        component={ChatDetailScreenHardcoded}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ReviewsScreen"
        component={ReviewsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="AddReviewScreen"
        component={AddReviewScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="OtherScreen"
        component={OtherScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="WhatInformationWeCollectScreen"
        component={WhatInformationWeCollectScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="HowWeUseYourInformationScreen"
        component={HowWeUseYourInformationScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="HowWeShareYourInformationScreen"
        component={HowWeShareYourInformationScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="WhereWeStoreYourInformationScreen"
        component={WhereWeStoreYourInformationScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="YourRightsAndChoicesScreen"
        component={YourRightsAndChoicesScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TheSecurityOfYourInformationScreen"
        component={TheSecurityOfYourInformationScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="HowLongWeKeepYourInformationScreen"
        component={HowLongWeKeepYourInformationScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="InformationRelatingToChildrenAndTeensScreen"
        component={InformationRelatingToChildrenAndTeensScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="PrivacyPolicyUpdateScreen"
        component={PrivacyPolicyUpdateScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="JurisdictionSpecificScreen"
        component={JurisdictionSpecificScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseScreen"
        component={TermsOfUseScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseYourRelationshipWithUsScreen"
        component={TermsOfUseYourRelationshipWithUsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseAcceptingTheTermsScreen"
        component={TermsOfUseAcceptingTheTermsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseChangesToTheTermsScreen"
        component={TermsOfUseChangesToTheTermsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseYourAccountWithUsScreen"
        component={TermsOfUseYourAccountWithUsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseYourAccessToAndUseOfOurServicesScreen"
        component={TermsOfUseYourAccessToAndUseOfOurServicesScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseIntellectualPropertyRightsScreen"
        component={TermsOfUseIntellectualPropertyRightsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseContentScreen"
        component={TermsOfUseContentScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseIndemnityScreen"
        component={TermsOfUseIndemnityScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseExclusionOfWarrantiesScreen"
        component={TermsOfUseExclusionOfWarrantiesScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseLimitationOfLiabilityScreen"
        component={TermsOfUseLimitationOfLiabilityScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="TermsOfUseOtherTermsScreen"
        component={TermsOfUseOtherTermsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
}
