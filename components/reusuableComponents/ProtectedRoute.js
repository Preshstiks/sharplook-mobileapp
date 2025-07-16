// import React, { useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { View, ActivityIndicator } from "react-native";

// /**
//  * ProtectedRoute wraps a screen and only renders it if the user is authenticated and has the correct role.
//  * @param {React.Component} Component - The screen to render if allowed
//  * @param {string} requiredRole - The role required to access this screen (e.g., 'CLIENT' or 'VENDOR')
//  * @param {object} navigation - The navigation prop
//  * @param {object} rest - Other props
//  */
// const ProtectedRoute = ({ Component, requiredRole, navigation, ...rest }) => {
//   const { user, isAuthenticated, isLoading } = useAuth();

//   useEffect(() => {
//     if (!isLoading) {
//       if (!isAuthenticated || !user) {
//         // Not logged in
//         if (requiredRole === "CLIENT") {
//           navigation.replace("Login");
//         } else if (requiredRole === "VENDOR") {
//           navigation.replace("VendorLogin");
//         }
//       } else if (user.role !== requiredRole) {
//         // Wrong role
//         if (user.role === "CLIENT") {
//           navigation.replace("Client");
//         } else if (user.role === "VENDOR") {
//           navigation.replace("Vendor");
//         } else {
//           navigation.replace("Login");
//         }
//       }
//     }
//   }, [isAuthenticated, user, isLoading, navigation, requiredRole]);

//   if (isLoading || !isAuthenticated || !user || user.role !== requiredRole) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#EB278D" />
//       </View>
//     );
//   }

//   // Render the protected screen
//   return <Component {...rest} />;
// };

// export default ProtectedRoute;
