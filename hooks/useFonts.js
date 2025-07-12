import { useFonts } from "expo-font";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    poppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    poppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    poppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    poppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    poppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    poppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    poppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    poppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    latoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    latoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  return fontsLoaded;
};
