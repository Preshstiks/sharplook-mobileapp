import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfileScreen from "./UserProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import SettingsScreen from "./SettingsScreen";
import HelpSupportScreen from "./HelpSupportScreen";
import LegalScreen from "./LegalScreen";
import TermsOfUseScreen from "./TermsOfUseScreen";
import PrivacyPolicyScreen from "./PrivacyPolicyScreen";

// New Privacy Policy Screen Components
import DataControllerScreen from "./privacypolicy/DataControllerScreen";
import PrivacyPolicyIntroScreen from "./privacypolicy/PrivacyPolicyIntroScreen";
import AutomaticCollectionScreen from "./privacypolicy/AutomaticCollectionScreen";
import CollectionOfPersonalInfoScreen from "./privacypolicy/CollectionOfPersonalInfoScreen";
import CookiesAndUsageDataScreen from "./privacypolicy/CookiesAndUsageDataScreen";
import HowWeShareInfoScreen from "./privacypolicy/HowWeShareInfoScreen";
import ManagingPersonalInfoScreen from "./privacypolicy/ManagingPersonalInfoScreen";
import UseAndProcessingScreen from "./privacypolicy/UseAndProcessingScreen";
import UsageDataScreen from "./privacypolicy/UsageDataScreen";
import InformationTransferScreen from "./privacypolicy/InformationTransferScreen";
import ServiceProvidersScreen from "./privacypolicy/ServiceProvidersScreen";
import PrivacyOfChildrenScreen from "./privacypolicy/PrivacyOfChildrenScreen";
import NewslettersScreen from "./privacypolicy/NewslettersScreen";
import LinksToOtherAppsScreen from "./privacypolicy/LinksToOtherAppsScreen";
import InformationSecurityScreen from "./privacypolicy/InformationSecurityScreen";
import DataBreachScreen from "./privacypolicy/DataBreachScreen";
import LegalDisclosuresScreen from "./privacypolicy/LegalDisclosuresScreen";
import ChangesAndAmendmentsScreen from "./privacypolicy/ChangesAndAmendmentsScreen";
import IndemnityScreen from "./privacypolicy/IndemnityScreen";
import AcceptanceOfPolicyScreen from "./privacypolicy/AcceptanceOfPolicyScreen";
import ContactingUsScreen from "./privacypolicy/ContactingUsScreen";

// New Terms of Use Screen Components
import TermsOfUseAcceptanceOfTermsScreen from "./termsofuse/TermsOfUseAcceptanceOfTermsScreen";
import TermsOfUseChangesToTermsScreen from "./termsofuse/TermsOfUseChangesToTermsScreen";
import TermsOfUseEligibilityScreen from "./termsofuse/TermsOfUseEligibilityScreen";
import TermsOfUseServicesOfferedScreen from "./termsofuse/TermsOfUseServicesOfferedScreen";
import TermsOfUseUserAccountsScreen from "./termsofuse/TermsOfUseUserAccountsScreen";
import TermsOfUseLocationTrackingScreen from "./termsofuse/TermsOfUseLocationTrackingScreen";
import TermsOfUseBookingPoliciesScreen from "./termsofuse/TermsOfUseBookingPoliciesScreen";
import TermsOfUsePaymentTermsScreen from "./termsofuse/TermsOfUsePaymentTermsScreen";
import TermsOfUseIntellectualPropertyScreen from "./termsofuse/TermsOfUseIntellectualPropertyScreen";
import TermsOfUseProhibitedActivitiesScreen from "./termsofuse/TermsOfUseProhibitedActivitiesScreen";
import TermsOfUseThirdPartyLinksScreen from "./termsofuse/TermsOfUseThirdPartyLinksScreen";
import TermsOfUseDisclaimersScreen from "./termsofuse/TermsOfUseDisclaimersScreen";
import TermsOfUseIndemnificationScreen from "./termsofuse/TermsOfUseIndemnificationScreen";
import TermsOfUseTerminationScreen from "./termsofuse/TermsOfUseTerminationScreen";
import TermsOfUseGoverningLawScreen from "./termsofuse/TermsOfUseGoverningLawScreen";
import TermsOfUseDisputeResolutionScreen from "./termsofuse/TermsOfUseDisputeResolutionScreen";
import TermsOfUseSeverabilityScreen from "./termsofuse/TermsOfUseSeverabilityScreen";
import TermsOfUseEntireAgreementScreen from "./termsofuse/TermsOfUseEntireAgreementScreen";
import TermsOfUseContactUsScreen from "./termsofuse/TermsOfUseContactUsScreen";

import ProfileScreen from "./ProfileScreen";
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
      <Stack.Screen name="LegalScreen" component={LegalScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name="TermsOfUseScreen" component={TermsOfUseScreen} />

      {/* New Terms of Use Screen Routes */}
      <Stack.Screen
        name="TermsOfUseAcceptanceOfTermsScreen"
        component={TermsOfUseAcceptanceOfTermsScreen}
      />
      <Stack.Screen
        name="TermsOfUseChangesToTermsScreen"
        component={TermsOfUseChangesToTermsScreen}
      />
      <Stack.Screen
        name="TermsOfUseEligibilityScreen"
        component={TermsOfUseEligibilityScreen}
      />
      <Stack.Screen
        name="TermsOfUseServicesOfferedScreen"
        component={TermsOfUseServicesOfferedScreen}
      />
      <Stack.Screen
        name="TermsOfUseUserAccountsScreen"
        component={TermsOfUseUserAccountsScreen}
      />
      <Stack.Screen
        name="TermsOfUseLocationTrackingScreen"
        component={TermsOfUseLocationTrackingScreen}
      />
      <Stack.Screen
        name="TermsOfUseBookingPoliciesScreen"
        component={TermsOfUseBookingPoliciesScreen}
      />
      <Stack.Screen
        name="TermsOfUsePaymentTermsScreen"
        component={TermsOfUsePaymentTermsScreen}
      />
      <Stack.Screen
        name="TermsOfUseIntellectualPropertyScreen"
        component={TermsOfUseIntellectualPropertyScreen}
      />
      <Stack.Screen
        name="TermsOfUseProhibitedActivitiesScreen"
        component={TermsOfUseProhibitedActivitiesScreen}
      />
      <Stack.Screen
        name="TermsOfUseThirdPartyLinksScreen"
        component={TermsOfUseThirdPartyLinksScreen}
      />
      <Stack.Screen
        name="TermsOfUseDisclaimersScreen"
        component={TermsOfUseDisclaimersScreen}
      />
      <Stack.Screen
        name="TermsOfUseIndemnificationScreen"
        component={TermsOfUseIndemnificationScreen}
      />
      <Stack.Screen
        name="TermsOfUseTerminationScreen"
        component={TermsOfUseTerminationScreen}
      />
      <Stack.Screen
        name="TermsOfUseGoverningLawScreen"
        component={TermsOfUseGoverningLawScreen}
      />
      <Stack.Screen
        name="TermsOfUseDisputeResolutionScreen"
        component={TermsOfUseDisputeResolutionScreen}
      />
      <Stack.Screen
        name="TermsOfUseSeverabilityScreen"
        component={TermsOfUseSeverabilityScreen}
      />
      <Stack.Screen
        name="TermsOfUseEntireAgreementScreen"
        component={TermsOfUseEntireAgreementScreen}
      />
      <Stack.Screen
        name="TermsOfUseContactUsScreen"
        component={TermsOfUseContactUsScreen}
      />

      {/* New Privacy Policy Screen Routes */}
      <Stack.Screen
        name="DataControllerScreen"
        component={DataControllerScreen}
      />
      <Stack.Screen
        name="PrivacyPolicyIntroScreen"
        component={PrivacyPolicyIntroScreen}
      />
      <Stack.Screen
        name="AutomaticCollectionScreen"
        component={AutomaticCollectionScreen}
      />
      <Stack.Screen
        name="CollectionOfPersonalInfoScreen"
        component={CollectionOfPersonalInfoScreen}
      />
      <Stack.Screen
        name="CookiesAndUsageDataScreen"
        component={CookiesAndUsageDataScreen}
      />
      <Stack.Screen
        name="HowWeShareInfoScreen"
        component={HowWeShareInfoScreen}
      />
      <Stack.Screen
        name="ManagingPersonalInfoScreen"
        component={ManagingPersonalInfoScreen}
      />
      <Stack.Screen
        name="UseAndProcessingScreen"
        component={UseAndProcessingScreen}
      />
      <Stack.Screen name="UsageDataScreen" component={UsageDataScreen} />
      <Stack.Screen
        name="InformationTransferScreen"
        component={InformationTransferScreen}
      />
      <Stack.Screen
        name="ServiceProvidersScreen"
        component={ServiceProvidersScreen}
      />
      <Stack.Screen
        name="PrivacyOfChildrenScreen"
        component={PrivacyOfChildrenScreen}
      />
      <Stack.Screen name="NewslettersScreen" component={NewslettersScreen} />
      <Stack.Screen
        name="LinksToOtherAppsScreen"
        component={LinksToOtherAppsScreen}
      />
      <Stack.Screen
        name="InformationSecurityScreen"
        component={InformationSecurityScreen}
      />
      <Stack.Screen name="DataBreachScreen" component={DataBreachScreen} />
      <Stack.Screen
        name="LegalDisclosuresScreen"
        component={LegalDisclosuresScreen}
      />
      <Stack.Screen
        name="ChangesAndAmendmentsScreen"
        component={ChangesAndAmendmentsScreen}
      />
      <Stack.Screen name="IndemnityScreen" component={IndemnityScreen} />
      <Stack.Screen
        name="AcceptanceOfPolicyScreen"
        component={AcceptanceOfPolicyScreen}
      />
      <Stack.Screen name="ContactingUsScreen" component={ContactingUsScreen} />

      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
