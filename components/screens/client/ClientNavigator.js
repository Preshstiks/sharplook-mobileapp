import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClientBottomNav from "./ClientBottomNav";
import CustomDrawerContent from "./CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import FilterScreen from "./FilterScreen";
import ChatListScreen from "./GlobalScreens/ChatListScreen";
import ChatDetailScreen from "./GlobalScreens/ChatDetailScreen";
import DebitCardPaymentForm from "./DebitCardPaymentForm";
import AddNewCardForm from "./AddNewCardForm";
import Search from "./Search";
import BookAppointmentScreen from "./GlobalScreens/BookAppointmentScreen";
import BookingDetailScreen from "./Booking/BookingDetailScreen";
import ChatDetailScreenHardcoded from "./ChatDetailScreenHardcoded";
import SettingsScreen from "./Profile/SettingsScreen";
import HelpSupportScreen from "./Profile/HelpSupportScreen";
import LegalScreen from "./Profile/LegalScreen";
import AddReviewScreen from "./reviews/AddReviewScreen";
import OtherScreen from "./OtherScreen";
import ReferAndEarnScreen from "./ReferAndEarnScreen";
import WalletScreen from "./WalletScreen";
import ReviewsScreen from "./reviews/ReviewsScreen";
import OfferPriceScreen from "./Booking/OfferPriceScreen";
import VendorPortfolioScreen from "./GlobalScreens/VendorPortfolioScreen";
import ClientWithdrawScreen from "./ClientWithdrawScreen";
import FundClientWalletScreen from "./FundClientWallet";
import BookingHomeServiceAppointScreen from "./GlobalScreens/bookingHomeserviceappointscreen";
import PaystackWebViewScreen from "./PaystackWebViewScreen";
import AddProductReviewScreen from "./reviews/AddProductReview";
import AddServiceReviewScreen from "./reviews/AddServiceReview";
import ServiceReviewsScreen from "./reviews/ServiceReview";
import ProductReviewsScreen from "./reviews/ProductReview";
import AcceptedOfferDetailScreen from "./Booking/AcceptedOfferDetailScreen";
import BookingStack from "./Booking/BookingStack";
import NotificationStack from "./Notification/NotificationStack";
import ProfileStack from "./Profile/ProfileStack";
import WalletStack from "./WalletStack";

const Drawer = createDrawerNavigator();

export default function ClientNavigator() {
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
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name="Main"
        component={ClientBottomNav}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      <Drawer.Screen
        name="Account Information"
        component={ProfileStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="My Bookings"
        component={BookingStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="SharpPay"
        component={WalletStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Refer and Earn"
        component={ReferAndEarnScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
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

      {/* ScreenSTacks */}

      <Drawer.Screen
        name="Notification"
        component={NotificationStack}
        options={{ drawerItemStyle: { display: "none" } }}
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
        name="VendorPortfolioScreen"
        component={VendorPortfolioScreen}
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
        name="AddProductReviewScreen"
        component={AddProductReviewScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="AddServiceReviewScreen"
        component={AddServiceReviewScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ServiceReviewScreen"
        component={ServiceReviewsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ProductReviewScreen"
        component={ProductReviewsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      <Drawer.Screen
        name="OtherScreen"
        component={OtherScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      <Drawer.Screen
        name="ClientWithdrawScreen"
        component={ClientWithdrawScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="FundClientWallet"
        component={FundClientWalletScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      <Drawer.Screen
        name="OfferPriceScreen"
        component={OfferPriceScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="BookingHomeServiceAppointScreen"
        component={BookingHomeServiceAppointScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="PaystackWebViewScreen"
        component={PaystackWebViewScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="AcceptedOfferDetailScreen"
        component={AcceptedOfferDetailScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
}
