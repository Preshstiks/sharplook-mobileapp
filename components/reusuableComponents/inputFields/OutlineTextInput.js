import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

export default function OutlineTextInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  style,
  label,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="mb-3">
      {label && (
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-[12px] pb-1"
        >
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C4C4C4"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[
          { fontFamily: "poppinsRegular", textAlignVertical: "top" },
          style,
        ]}
        className={`border px-4 py-4 text-[12px] rounded-[12px] ${isFocused ? "border-primary" : "border-[#F9BCDC]"}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
}

export function OutlineTextAreaInput({
  value,
  onChangeText,
  placeholder,
  style,
  label,
  numberOfLines = 4,
  minHeight = 100,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="mb-3">
      {label && (
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-[12px] pb-1"
        >
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C4C4C4"
        multiline
        numberOfLines={numberOfLines}
        className={`border px-4 text-[12px] py-4 rounded-[12px] ${isFocused ? "border-primary" : "border-[#F9BCDC]"}`}
        style={[
          { fontFamily: "poppinsRegular", minHeight, textAlignVertical: "top" },
          style,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  input: {
    height: 44,
    fontSize: 15,
    color: "#201E1F",
    fontFamily: "poppinsRegular",
  },
  label: {
    fontFamily: "poppinsRegular",
    fontSize: 13,
    color: "#201E1F",
    marginBottom: 2,
    marginTop: 6,
  },
});
