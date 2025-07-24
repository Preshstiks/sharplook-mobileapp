import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfileScreen from "./UserProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import SettingsScreen from "./SettingsScreen";
import HelpSupportScreen from "./HelpSupportScreen";
import LegalScreen from "./LegalScreen";
import PrivacyPolicyUpdateScreen from "./privacypolicy/PrivacyPolicyUpdateScreen";
import TermsOfUseScreen from "./TermsOfUseScreen";
import TermsOfUseYourRelationshipWithUsScreen from "./termsofuse/TermsOfUseYourRelationshipWithUsScreen";
import TermsOfUseAcceptingTheTermsScreen from "./termsofuse/TermsOfUseAcceptingTheTermsScreen";
import TermsOfUseChangesToTheTermsScreen from "./termsofuse/TermsOfUseChangesToTheTermsScreen";
import WhatInformationWeCollectScreen from "./privacypolicy/WhatInformationWeCollectScreen";
import HowWeUseYourInformationScreen from "./privacypolicy/HowWeUseYourInformationScreen";
import HowWeShareYourInformationScreen from "./privacypolicy/HowWeShareYourInformationScreen";
import WhereWeStoreYourInformationScreen from "./privacypolicy/WhereWeStoreYourInformationScreen";
import YourRightsAndChoicesScreen from "./privacypolicy/YourRightsAndChoicesScreen";
import TheSecurityOfYourInformationScreen from "./privacypolicy/TheSecurityOfYourInformationScreen";
import HowLongWeKeepYourInformationScreen from "./privacypolicy/HowLongWeKeepYourInformationScreen";
import InformationRelatingToChildrenAndTeensScreen from "./privacypolicy/InformationRelatingToChildrenAndTeensScreen";
import ContactScreen from "./privacypolicy/ContactScreen";
import JurisdictionSpecificScreen from "./privacypolicy/JurisdictionSpecificScreen";
import PrivacyPolicyScreen from "./PrivacyPolicyScreen";

import TermsOfUseYourAccountWithUsScreen from "./termsofuse/TermsOfUseYourAccountWithUsScreen";
import TermsOfUseYourAccessToAndUseOfOurServicesScreen from "./termsofuse/TermsOfUseYourAccessToAndUseOfOurServicesScreen";
import TermsOfUseIntellectualPropertyRightsScreen from "./termsofuse/TermsOfUseIntellectualPropertyRightsScreen";
import TermsOfUseContentScreen from "./termsofuse/TermsOfUseContentScreen";
import TermsOfUseIndemnityScreen from "./termsofuse/TermsOfUseIndemnityScreen";
import TermsOfUseExclusionOfWarrantiesScreen from "./termsofuse/TermsOfUseExclusionOfWarrantiesScreen";
import TermsOfUseLimitationOfLiabilityScreen from "./termsofuse/TermsOfUseLimitationOfLiabilityScreen";
import TermsOfUseOtherTermsScreen from "./termsofuse/TermsOfUseOtherTermsScreen";
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
      <Stack.Screen
        name="PrivacyPolicyUpdateScreen"
        component={PrivacyPolicyUpdateScreen}
      />
      <Stack.Screen
        name="TermsOfUseYourRelationshipWithUsScreen"
        component={TermsOfUseYourRelationshipWithUsScreen}
      />
      <Stack.Screen
        name="TermsOfUseAcceptingTheTermsScreen"
        component={TermsOfUseAcceptingTheTermsScreen}
      />
      <Stack.Screen
        name="TermsOfUseChangesToTheTermsScreen"
        component={TermsOfUseChangesToTheTermsScreen}
      />
      <Stack.Screen
        name="WhatInformationWeCollectScreen"
        component={WhatInformationWeCollectScreen}
      />
      <Stack.Screen
        name="HowWeUseYourInformationScreen"
        component={HowWeUseYourInformationScreen}
      />
      <Stack.Screen
        name="HowWeShareYourInformationScreen"
        component={HowWeShareYourInformationScreen}
      />
      <Stack.Screen
        name="WhereWeStoreYourInformationScreen"
        component={WhereWeStoreYourInformationScreen}
      />
      <Stack.Screen
        name="YourRightsAndChoicesScreen"
        component={YourRightsAndChoicesScreen}
      />
      <Stack.Screen
        name="TheSecurityOfYourInformationScreen"
        component={TheSecurityOfYourInformationScreen}
      />
      <Stack.Screen
        name="HowLongWeKeepYourInformationScreen"
        component={HowLongWeKeepYourInformationScreen}
      />
      <Stack.Screen
        name="InformationRelatingToChildrenAndTeensScreen"
        component={InformationRelatingToChildrenAndTeensScreen}
      />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen
        name="JurisdictionSpecificScreen"
        component={JurisdictionSpecificScreen}
      />

      <Stack.Screen
        name="TermsOfUseYourAccountWithUsScreen"
        component={TermsOfUseYourAccountWithUsScreen}
      />
      <Stack.Screen
        name="TermsOfUseYourAccessToAndUseOfOurServicesScreen"
        component={TermsOfUseYourAccessToAndUseOfOurServicesScreen}
      />
      <Stack.Screen
        name="TermsOfUseIntellectualPropertyRightsScreen"
        component={TermsOfUseIntellectualPropertyRightsScreen}
      />
      <Stack.Screen
        name="TermsOfUseContentScreen"
        component={TermsOfUseContentScreen}
      />
      <Stack.Screen
        name="TermsOfUseIndemnityScreen"
        component={TermsOfUseIndemnityScreen}
      />
      <Stack.Screen
        name="TermsOfUseExclusionOfWarrantiesScreen"
        component={TermsOfUseExclusionOfWarrantiesScreen}
      />
      <Stack.Screen
        name="TermsOfUseLimitationOfLiabilityScreen"
        component={TermsOfUseLimitationOfLiabilityScreen}
      />
      <Stack.Screen
        name="TermsOfUseOtherTermsScreen"
        component={TermsOfUseOtherTermsScreen}
      />

      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
