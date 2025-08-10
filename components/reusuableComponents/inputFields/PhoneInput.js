import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const PhoneInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  style,
  error,
  touched,
  isPhoneInput = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isPassword = secureTextEntry;

  // Outlined border color
  const borderColor =
    error && touched ? "#FF0000" : isFocused ? "#EB278D" : "#F9BCDC";

  // Label style: always floating
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
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const formatNigerianPhone = (phoneNumber) => {
    // Remove any non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, "");

    // If it starts with 0, remove the leading 0
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }

    // If it starts with 234, don't add another +234
    if (cleaned.startsWith("234")) {
      return "+" + cleaned;
    }

    // Add +234 prefix for Nigerian numbers
    return "+234" + cleaned;
  };

  const handlePhoneChange = (text) => {
    if (isPhoneInput) {
      const formatted = formatNigerianPhone(text);
      onChangeText(formatted);
    } else {
      onChangeText(text);
    }
  };

  const getDisplayValue = () => {
    if (isPhoneInput && value) {
      // Remove +234 for display, show only the local number
      return value.replace("+234", "");
    }
    return value;
  };

  // Filter out key from props to avoid React warning
  const { key, ...rest } = props;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.outlinedContainer,
          { borderColor: borderColor },
          isFocused && styles.outlinedContainerFocused,
        ]}
      >
        <Text style={labelStyle} numberOfLines={1}>
          {label}
        </Text>

        {isPhoneInput && (
          <View style={styles.countryCodeContainer}>
            <Text style={styles.flagText}>🇳🇬</Text>
            <Text style={styles.countryCodeText}>+234</Text>
          </View>
        )}

        <TextInput
          style={[styles.textInput, isPhoneInput && styles.phoneTextInput]}
          placeholder={placeholder || ""}
          placeholderTextColor="#999"
          value={getDisplayValue()}
          cursorColor="#EB278D"
          onChangeText={handlePhoneChange}
          secureTextEntry={isPassword && !isPasswordVisible}
          keyboardType={isPhoneInput ? "phone-pad" : keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          maxLength={isPhoneInput ? 10 : undefined} // Limit to 10 digits for Nigerian numbers
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
            testID="toggle-password"
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#EB278D4D"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && touched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  outlinedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    height: 52,
    width: "100%",
    position: "relative",
    marginTop: 12,
  },
  outlinedContainerFocused: {
    borderColor: "#EB278D",
    backgroundColor: "transparent",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    marginTop: 8,
    backgroundColor: "transparent",
  },
  phoneTextInput: {
    marginLeft: 8,
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: "#F9BCDC",
    marginTop: 8,
  },
  flagText: {
    fontSize: 16,
    marginRight: 4,
  },
  countryCodeText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "poppinsRegular",
    marginRight: 8,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    fontFamily: "poppinsRegular",
    marginTop: 4,
    marginLeft: 12,
  },
});
