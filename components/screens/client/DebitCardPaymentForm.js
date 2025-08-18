import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import OutlineTextInput from "../../reusuableComponents/inputFields/OutlineTextInput";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Visa from "../../../assets/img/logo/visaicon.svg";
import Mastercard from "../../../assets/img/logo/mastercard-icon.svg";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";

export default function DebitCardPaymentForm({ onAddNewCard, onMakePayment }) {
  const [owner, setOwner] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCard, setSelectedCard] = useState(0); // 0 or 1
  const navigation = useNavigation();

  // Mock card data with gradient colors
  const cards = [
    {
      name: "Mrh Raju",
      type: "Visa Classic",
      number: "5254 **** **** 7690",
      balance: "$32,263,763.87",
      gradientColors: ["#FFA726", "#FF5722"], // Orange to red gradient
      logoPosition: "top-right",
      logo: Visa,
    },
    {
      name: "Raji Balikis",
      type: "Mastercard Gold",
      number: "1234 **** **** 5678",
      balance: "$12,000.00",
      gradientColors: ["#A8E6CF", "#4A5D23"], // Light green to dark green gradient
      logoPosition: "top-right",
      logo: Mastercard,
    },
  ];

  const CardComponent = ({ card, idx, isSelected }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => setSelectedCard(idx)}
      style={[
        styles.cardContainer,
        { marginRight: idx === cards.length - 1 ? 0 : 12 },
      ]}
    >
      <View
        className={
          isSelected
            ? "border-2 border-primary rounded-[16px] w-[338px] h-[228px] items-center justify-center"
            : ""
        }
      >
        <View className="w-[330px] h-[220px] rounded-xl overflow-hidden">
          <LinearGradient
            colors={card.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardMain}
          >
            {/* Decorative wave shape at bottom-right */}
            <View style={styles.waveOverlay} />
            <View style={styles.glowOverlay} />

            {/* Add a chip icon */}
            <View style={styles.chipContainer}>
              <View style={styles.chip} />
            </View>

            {/* Card details */}
            <View>
              <Text
                style={{ fontFamily: "latoRegular" }}
                className="text-[15px] text-white"
              >
                {card.type}
              </Text>
              <Text
                style={{ fontFamily: "latoBold" }}
                className="text-[17px] w-full my-4 tracking-[6px] text-white"
              >
                {card.number}
              </Text>
              <View className="flex-row items-center justify-between">
                <Text
                  style={{ fontFamily: "latoBold" }}
                  className="text-[17px] text-white"
                >
                  {card.name}
                </Text>
                <card.logo width={35} height={35} />
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }} className="bg-secondary pb-10">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ color: "#fff", fontSize: 16, fontFamily: "poppinsMedium" }}
          >
            Make Payment
          </Text>
        </View>
        <View style={{ width: 28 }} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Scrollable Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 mt-6">
            {/* Cards Section */}
            <View style={styles.cardRow}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {cards.map((card, idx) => (
                  <CardComponent
                    key={idx}
                    card={card}
                    idx={idx}
                    isSelected={idx === selectedCard}
                  />
                ))}
              </ScrollView>
            </View>

            <OutlineButton
              title="Add New Card"
              onPress={() => navigation.navigate("AddNewCardScreen")}
              icon={
                <Ionicons name="add-circle-outline" size={24} color="#EB278D" />
              }
              iconPosition="left"
            />

            {/* Form Section */}
            <View style={styles.formContainer}>
              <OutlineTextInput
                value={owner}
                onChangeText={setOwner}
                placeholder="Raji Balikis"
                label="Card Owner"
              />
              <OutlineTextInput
                value={number}
                onChangeText={setNumber}
                placeholder="5254 7634 8734 7690"
                keyboardType="number-pad"
                label="Card Number"
              />
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <OutlineTextInput
                    value={exp}
                    onChangeText={setExp}
                    placeholder="24/24"
                    keyboardType="numbers-and-punctuation"
                    label="EXP"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <OutlineTextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="•••"
                    secureTextEntry
                    keyboardType="number-pad"
                    label="CVV"
                  />
                </View>
              </View>
              <OutlineTextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="₦20,000"
                keyboardType="number-pad"
                label="Amount"
              />
              <AuthButton title="Make Payment" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  cardRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  cardContainer: {
    // Only marginRight is handled here
  },
  formContainer: {
    paddingBottom: 20, // Extra padding at bottom for better scrolling
  },
  cardActive: {
    width: 330,
    height: 220,
    borderWidth: 2,
    borderColor: "#EB278D",
    borderRadius: 20,
    padding: 6,
    shadowColor: "#EB278D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardInactive: {
    width: 330,
    height: 220,
  },
  cardMain: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    padding: 20,
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  curvedOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 16,
  },
  curvedGradient: {
    flex: 1,
    transform: [{ rotate: "45deg" }],
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  cardBrand: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardBrandText: {
    color: "#fff",
    fontFamily: "poppinsBold",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardType: {
    color: "#fff",
    fontFamily: "poppinsRegular",
    fontSize: 14,
    marginTop: 8,
    opacity: 0.9,
  },
  cardNumber: {
    color: "#fff",
    fontFamily: "poppinsMedium",
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 12,
    fontWeight: "500",
  },
  cardBalance: {
    color: "#fff",
    fontFamily: "poppinsBold",
    fontSize: 20,
    marginTop: 8,
    fontWeight: "bold",
  },
  addCardBtn: {
    borderWidth: 1,
    borderColor: "#EB278D",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  addCardText: {
    color: "#EB278D",
    fontFamily: "poppinsMedium",
    fontSize: 16,
  },
  label: {
    fontFamily: "poppinsRegular",
    fontSize: 13,
    color: "#201E1F",
    marginBottom: 2,
    marginTop: 6,
  },
  chipContainer: {
    marginTop: 16,
    marginBottom: 8,
    width: 50,
    height: 36,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  chip: {
    width: 36,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#cfcfcf",
  },
  waveOverlay: {
    position: "absolute",
    bottom: -40,
    right: -40,
    width: 150,
    height: 150,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 75,
    transform: [{ rotate: "45deg" }],
  },
  glowOverlay: {
    position: "absolute",
    top: -30,
    left: -30,
    width: 100,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    opacity: 0.3,
  },
});
