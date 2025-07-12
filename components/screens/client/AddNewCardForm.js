import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import OutlineTextInput from "../../reusuableComponents/inputFields/OutlineTextInput";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Placeholder icons for Mastercard, Verve, Bank
const CardIcons = [
  {
    key: "mastercard",
    icon: <Ionicons name="card" size={28} color="#EB278D" />,
  },
  { key: "verve", icon: <Ionicons name="card" size={28} color="#EB278D" /> },
  { key: "bank", icon: <Ionicons name="business" size={28} color="#EB278D" /> },
];

export default function AddNewCardForm({ onAddCard }) {
  const [selectedType, setSelectedType] = useState("mastercard");
  const [owner, setOwner] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ color: "#fff", fontSize: 16, fontFamily: "poppinsMedium" }}
          >
            Add New Card
          </Text>
        </View>
        <View style={{ width: 28 }} />
      </View>
      <View className="px-4">
        <View style={styles.cardTypeRow}>
          {CardIcons.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[
                styles.cardTypeBtn,
                selectedType === c.key && styles.cardTypeBtnActive,
              ]}
              onPress={() => setSelectedType(c.key)}
            >
              {c.icon}
            </TouchableOpacity>
          ))}
        </View>
        {/* Form */}
        <Text style={styles.label}>Card Owner</Text>
        <OutlineTextInput
          value={owner}
          onChangeText={setOwner}
          placeholder="Raji Balikis Ajoke"
        />
        <Text style={styles.label}>Card Number</Text>
        <OutlineTextInput
          value={number}
          onChangeText={setNumber}
          placeholder="5254 7634 8734 7690"
          keyboardType="number-pad"
        />
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>EXP</Text>
            <OutlineTextInput
              value={exp}
              onChangeText={setExp}
              placeholder="24/24"
              keyboardType="numbers-and-punctuation"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>CVV</Text>
            <OutlineTextInput
              value={cvv}
              onChangeText={setCvv}
              placeholder="•••"
              secureTextEntry
              keyboardType="number-pad"
            />
          </View>
        </View>
        <OutlineButton
          title="Add New Card"
          style={{ marginTop: 24 }}
          onPress={() =>
            onAddCard &&
            onAddCard({ owner, number, exp, cvv, type: selectedType })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EB278D",
    paddingTop: 50,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  cardTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 8,
  },
  cardTypeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#EB278D",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  cardTypeBtnActive: {
    backgroundColor: "#EB278D",
  },
  label: {
    fontFamily: "poppinsRegular",
    fontSize: 13,
    color: "#201E1F",
    marginBottom: 2,
    marginTop: 6,
  },
});
