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
  error,
  touched,
  editable = true,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  // Filter out key from props to avoid React warning
  const { key, ...rest } = props;
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
        editable={editable}
        style={[
          { fontFamily: "poppinsRegular", textAlignVertical: "top" },
          style,
        ]}
        className={`border px-4 py-4 text-[12px] rounded-[12px] ${isFocused ? "border-primary" : error && touched ? "border-[#FF0000]" : "border-[#F9BCDC]"}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {error && touched && <Text style={styles.errorText}>{error}</Text>}
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
  error,
  touched,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  // Filter out key from props to avoid React warning
  const { key, ...rest } = props;
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
        className={`border px-4 text-[12px] py-4 rounded-[12px] ${isFocused ? "border-primary" : error && touched ? "border-[#FF0000]" : "border-[#F9BCDC]"}`}
        style={[
          { fontFamily: "poppinsRegular", minHeight, textAlignVertical: "top" },
          style,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {error && touched && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    fontFamily: "poppinsRegular",
    marginTop: 4,
    marginLeft: 12,
  },
});
