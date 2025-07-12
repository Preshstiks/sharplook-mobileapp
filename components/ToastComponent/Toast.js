import Toast from "react-native-toast-message";

export const showToast = {
  success: (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 40,
    });
  },
  error: (message) => {
    Toast.show({
      type: "error",
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 40,
    });
  },
  info: (message) => {
    Toast.show({
      type: "info",
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 40,
    });
  },
  warning: (message) => {
    Toast.show({
      type: "warning",
      text1: message,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 40,
    });
  },
};
