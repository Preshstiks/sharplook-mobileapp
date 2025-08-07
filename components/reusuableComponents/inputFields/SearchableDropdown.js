import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchableDropdown({
  label,
  value,
  onValueChange,
  error,
  touched,
  options,
  placeholder,
  disabled = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options || []);

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

  // Get selected option label
  const selectedOption = options?.find((option) => option.value === value);
  const displayValue = selectedOption
    ? selectedOption.label
    : placeholder || "Select an option";

  // Filter options based on search text
  const filterOptions = (text) => {
    setSearchText(text);
    if (!text.trim()) {
      setFilteredOptions(options || []);
    } else {
      const filtered = (options || []).filter((option) =>
        option.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleOptionSelect = (option) => {
    onValueChange(option.value);
    setIsModalVisible(false);
    setSearchText("");
    setFilteredOptions(options || []);
    setIsFocused(false);
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
      setIsFocused(true);
      setFilteredOptions(options || []);
      setSearchText("");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsFocused(false);
    setSearchText("");
    setFilteredOptions(options || []);
  };

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
        <TouchableOpacity
          onPress={openModal}
          style={styles.pickerWrapper}
          disabled={disabled}
        >
          <Text style={[styles.displayText, disabled && styles.disabledText]}>
            {displayValue}
          </Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color={disabled ? "#BEBEBE" : "#EB278D"}
          />
        </TouchableOpacity>
      </View>
      {error && touched && <Text style={styles.error}>{error}</Text>}

      {/* Modal with search */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  {/* Header */}
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{label}</Text>
                    <TouchableOpacity onPress={closeModal}>
                      <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                  </View>

                  {/* Search Input */}
                  <View style={styles.searchContainer}>
                    <Ionicons
                      name="search"
                      size={20}
                      color="#666"
                      style={styles.searchIcon}
                    />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search banks..."
                      value={searchText}
                      onChangeText={filterOptions}
                      autoFocus={true}
                    />
                  </View>

                  {/* Options List */}
                  <FlatList
                    data={filteredOptions}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.optionItem,
                          value === item.value && styles.selectedOption,
                        ]}
                        onPress={() => handleOptionSelect(item)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            value === item.value && styles.selectedOptionText,
                          ]}
                        >
                          {item.label}
                        </Text>
                        {value === item.value && (
                          <Ionicons
                            name="checkmark"
                            size={20}
                            color="#EB278D"
                          />
                        )}
                      </TouchableOpacity>
                    )}
                    style={styles.optionsList}
                    showsVerticalScrollIndicator={false}
                  />

                  {filteredOptions.length === 0 && searchText && (
                    <View style={styles.noResults}>
                      <Text style={styles.noResultsText}>No banks found</Text>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  displayText: {
    fontFamily: "poppinsRegular",
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  disabledText: {
    color: "#BEBEBE",
  },
  error: {
    color: "#EB278D",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "poppinsRegular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    minHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "poppinsMedium",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "poppinsRegular",
    color: "#333",
  },
  optionsList: {
    flex: 1,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOption: {
    backgroundColor: "#FFF0F5",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "poppinsRegular",
    color: "#333",
    flex: 1,
  },
  selectedOptionText: {
    color: "#EB278D",
    fontFamily: "poppinsMedium",
  },
  noResults: {
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: "poppinsRegular",
    color: "#666",
  },
});
