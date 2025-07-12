import { StyleSheet, Text, View } from "react-native";
import { CustomToast } from "./CustomToast";

export const toastConfig = {
  success: (props) => <CustomToast {...props} />,
  error: (props) => <CustomToast {...props} />,
  info: (props) => <CustomToast {...props} />,
  warning: (props) => <CustomToast {...props} />,
};
