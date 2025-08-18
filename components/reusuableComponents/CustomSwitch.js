import React from "react";
import {
  TouchableOpacity,
  Animated,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function CustomSwitch({
  value,
  onValueChange,
  style,
  onText = "on",
  offText = "off",
}) {
  const translateX = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const thumbPosition = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28], // adjust for thumb size and padding
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.switch, value ? styles.switchOn : styles.switchOff, style]}
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <Animated.View style={[styles.thumb, { left: thumbPosition }]} />
      <View style={styles.textContainer}>
        {value ? (
          <Text style={[styles.text, styles.textOn]}>{onText}</Text>
        ) : (
          <Text style={[styles.text, styles.textOff]}>{offText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switch: {
    width: 52,
    height: 28,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    position: "relative",
    backgroundColor: "#ccc",
  },
  switchOn: {
    backgroundColor: "#EB278D",
  },
  switchOff: {
    backgroundColor: "#D4D4D4",
  },
  thumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    top: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "lowercase",
  },
  textOn: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: 8,
    fontSize: 12,
    marginTop: 2,
    fontFamily: "poppinsRegular",
  },
  textOff: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "poppinsRegular",
    alignSelf: "flex-end",
    paddingRight: 8,
  },
});
