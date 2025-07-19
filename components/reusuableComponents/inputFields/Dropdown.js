import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Dropdown({
  label,
  value,
  onValueChange,
  error,
  touched,
  options,
  placeholder, // new prop
}) {
  const [isFocused, setIsFocused] = useState(false);

  // Floating label style
  const labelStyle = {
    position: "absolute",
    left: 12,
    paddingHorizontal: 4,
    top: -10,
    fontFamily: "poppinsRegular",
    fontSize: 12,
    backgroundColor: "#FFFAFD",
    color: isFocused ? "#EB278D" : "#333333",
    zIndex: 2,
    alignSelf: "flex-start",
    opacity: label ? 1 : 0,
  };

  // Outlined border color
  const borderColor =
    error && touched ? "#FF0000" : isFocused ? "#EB278D" : "#F9BCDC";

  // Show label if focused or value is selected
  const showLabel = !!label;

  return (
    <View style={{ marginBottom: 16 }}>
      <View
        style={[styles.outlinedContainer, { borderColor }]}
        onLayout={() => {}}
      >
        {showLabel && (
          <Text style={labelStyle} numberOfLines={1}>
            {label}
          </Text>
        )}
        <TouchableWithoutFeedback onPress={() => setIsFocused(true)}>
          <View style={styles.pickerWrapper} pointerEvents="box-none">
            <Picker
              selectedValue={value}
              onValueChange={(val) => {
                setIsFocused(false);
                onValueChange(val);
              }}
              style={styles.picker}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              dropdownIconColor="#EB278D"
            >
              {/* Placeholder option if provided */}
              {placeholder && (
                <Picker.Item label={placeholder} value="" color="#BEBEBE" />
              )}
              {options &&
                options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
            </Picker>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  outlinedContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "visible",
    position: "relative",
    marginTop: 12,
    backgroundColor: "transparent",
  },
  pickerWrapper: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  picker: {
    width: "100%",
    backgroundColor: "transparent",
    fontFamily: "poppinsRegular",
    color: "#333",
    marginTop: Platform.OS === "ios" ? 8 : 0,
  },
  error: {
    color: "#EB278D",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "poppinsRegular",
  },
});
