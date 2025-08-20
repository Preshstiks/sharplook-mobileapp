import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height: screenHeight } = Dimensions.get("window");

export default function Dropdown({
  label,
  value,
  onValueChange,
  error,
  touched,
  options = [],
  placeholder = "Select an option...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownButton = useRef();

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    dropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      const dropdownHeight = Math.min(options.length * 50 + 20, 200);
      const spaceBelow = screenHeight - py - h;
      const spaceAbove = py;

      // Position dropdown below if there's enough space, otherwise above
      if (spaceBelow >= dropdownHeight) {
        setDropdownTop(py + h);
      } else if (spaceAbove >= dropdownHeight) {
        setDropdownTop(py - dropdownHeight);
      } else {
        // If neither space is enough, position in the middle
        setDropdownTop(py + h);
      }
    });
    setIsOpen(true);
  };

  const onItemPress = (item) => {
    setIsOpen(false);
    onValueChange(item.value);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, value === item.value && styles.selectedItem]}
      onPress={() => onItemPress(item)}
    >
      <Text
        style={[
          styles.itemText,
          value === item.value && styles.selectedItemText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const getSelectedLabel = () => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const isPlaceholder = !value;
  const borderColor =
    error && touched ? "#FF0000" : isOpen ? "#EB278D" : "#F9BCDC";

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={[styles.outlinedContainer, { borderColor }]}>
        {label && (
          <Text
            style={[styles.label, { color: isOpen ? "#EB278D" : "#333333" }]}
          >
            {label}
          </Text>
        )}

        <TouchableOpacity
          ref={dropdownButton}
          style={styles.button}
          onPress={toggleDropdown}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.buttonText, isPlaceholder && styles.placeholderText]}
            numberOfLines={1}
          >
            {getSelectedLabel()}
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            color="#EB278D"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {error && touched && <Text style={styles.error}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
              style={styles.list}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            />
          </View>
        </TouchableOpacity>
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
    backgroundColor: "#FFFAFD",
  },
  label: {
    position: "absolute",
    left: 12,
    top: -10,
    paddingHorizontal: 4,
    fontSize: 12.5,
    backgroundColor: "#FFFAFD",
    fontFamily: "poppinsRegular",
    zIndex: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingRight: 40,
    minHeight: 48,
  },
  buttonText: {
    flex: 1,
    fontSize: 17,
    color: "#333333",
    fontFamily: "poppinsRegular",
  },
  placeholderText: {
    color: "#BEBEBE",
  },
  icon: {
    position: "absolute",
    right: 12,
    color: "#EB278D",
    fontSize: 12,
    fontFamily: "poppinsRegular",
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdown: {
    position: "absolute",
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    maxHeight: 200,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  list: {
    maxHeight: 200,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
  },
  selectedItem: {
    backgroundColor: "#F9BCDC",
  },
  itemText: {
    fontSize: 15,
    color: "#333333",
    fontFamily: "poppinsRegular",
  },
  selectedItemText: {
    color: "#EB278D",
    fontWeight: "500",
  },
  error: {
    color: "#EB278D",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "poppinsRegular",
  },
});
