import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatIcon from "../../../assets/icon/chat.svg";
import WhiteChatIcon from "../../../assets/icon/whitechat.svg";
import SpaImg from "../../../assets/img/vendorprof.svg";
import Specialist1 from "../../../assets/img/ayo.svg";
import Specialist2 from "../../../assets/img/alex.svg";
import Specialist3 from "../../../assets/img/sharon.svg";
import Specialist4 from "../../../assets/img/priti.svg";
import Service1 from "../../../assets/img/service1.svg";
import Service2 from "../../../assets/img/service2.svg";
import Service3 from "../../../assets/img/service3.svg";
import Service4 from "../../../assets/img/service4.svg";
import BottomModal from "../../reusuableComponents/BottomModal";
import { useState } from "react";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";

const specialists = [
  { name: "Ayomide", role: "Esthetician", Img: Specialist1 },
  { name: "Alex", role: "Hair Stylist", Img: Specialist2 },
  { name: "Sharon", role: "Brow Technician", Img: Specialist3 },
  { name: "Priti", role: "Masseur", Img: Specialist4 },
  { name: "Segun", role: "Barber", Img: Specialist4 },
];
const products = [
  { name: "Make-Up Brush", price: "₦6000", Img: Service1 },
  { name: "Body Scrub", price: "₦10000", Img: Service2 },
  { name: "Waxing Liquid", price: "₦8000", Img: Service3 },
];

const { width } = Dimensions.get("window");

export default function VendorProfileScreen({ navigation }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const handleDebitCardPayment = () => {
    setShowPaymentModal(false);
    navigation.navigate("DebitCardScreen");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }} className="pb-[60px]">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-[16px] text-white"
        >
          Vendor's Profile
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatDetailScreenHardcoded")}
        >
          <WhiteChatIcon width={30} height={30} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Main Image */}
        <View style={styles.mainImgWrap}>
          <SpaImg width={width} height={180} />
        </View>
        {/* Vendor Info */}
        <View style={styles.vendorInfoWrap}>
          <View style={{ flex: 1 }}>
            <Text
              className="text-faintDark text-[16px]"
              style={{ fontFamily: "poppinsMedium" }}
            >
              Heritage Spa and Beauty Services
            </Text>
            <View style={styles.reviewRow} className="mt-2">
              <Text
                className="text-[#201E1F] text-[12px]"
                style={{ fontFamily: "poppinsRegular" }}
              >
                4.0 Reviews
              </Text>
              <View style={{ flexDirection: "row", marginLeft: 8 }}>
                {[1, 2, 3, 4].map((i) => (
                  <Ionicons key={i} name="star" size={20} color="#FFC107" />
                ))}
                <Ionicons name="star-outline" size={20} color="#FFC107" />
              </View>
            </View>
          </View>
          <View className="p-2 bg-primary rounded-[4px]">
            <Text className="text-white text-[12px]">In-shop</Text>
          </View>
        </View>
        {/* About Us */}
        <View style={styles.sectionWrap}>
          <Text style={{ fontFamily: "poppinsMedium" }} className="text-[16px]">
            About Us
          </Text>
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-[12px] mt-3"
          >
            Heritage Spa and Beauty Services is a small, serene spot offering
            expert beauty care and relaxing spa treatments to help you look and
            feel your best.
          </Text>
        </View>
        {/* Availability */}
        <View style={styles.sectionWrap}>
          <Text style={{ fontFamily: "poppinsMedium" }} className="text-[16px]">
            Availability
          </Text>
          <View style={styles.availabilityRow} className="mt-3">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px]"
            >
              Mon - Fri
            </Text>
            <Text
              style={{ fontFamily: "poppinsMedium" }}
              className="text-[14px] text-primary"
            >
              9:00AM - 10:00PM
            </Text>
          </View>
          <View style={styles.availabilityRow}>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px]"
            >
              Sat - Sun
            </Text>
            <Text
              style={{ fontFamily: "poppinsMedium" }}
              className="text-[14px] text-primary"
            >
              1:00PM - 6:00PM
            </Text>
          </View>
        </View>
        <View className="h-[1px] bg-[#0000001A] mx-4" />
        <View style={styles.sectionWrap}>
          <Text style={{ fontFamily: "poppinsMedium" }} className="text-[16px]">
            Our Specialist
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12 }}
          >
            {specialists.map((sp, idx) => (
              <View key={idx} style={styles.specialistWrap}>
                <View style={styles.specialistImgWrap}>
                  <sp.Img width={60} height={60} />
                </View>
                <Text
                  style={{ fontFamily: "poppinsSemiBold" }}
                  className="text-[12px] text-fadedDark"
                >
                  {sp.name}
                </Text>
                <Text
                  style={{ fontFamily: "poppinsRegular" }}
                  className="text-[10px] text-center text-fadedDark"
                >
                  {sp.role}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="h-[1px] bg-[#0000001A] mx-4" />

        <View style={styles.sectionWrap}>
          <Text style={{ fontFamily: "poppinsMedium" }} className="text-[16px]">
            Our Services
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            {[
              {
                name: "Massage",
                price: "₦65,999",
                img: Service1,
              },
              {
                name: "Pedicure",
                price: "₦65,999",
                img: Service2,
              },
              {
                name: "Waxing",
                price: "₦5,999",
                img: Service3,
              },
              {
                name: "Facials",
                price: "₦65,999",
                img: Service4,
              },
            ].map((service, idx) => (
              <View
                key={idx}
                style={{ width: (width - 48) / 2, marginBottom: 20 }}
              >
                <View
                  style={{
                    borderRadius: 4,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    height: 120,
                    width: "100%",
                  }}
                >
                  <service.img
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[12px]"
                  >
                    {service.name}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[12px] text-primary"
                  >
                    {service.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EB278D",
                    borderRadius: 8,
                    marginTop: 10,
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("BookAppointmentScreen", { service })
                  }
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "poppinsRegular",
                      fontSize: 12,
                    }}
                  >
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionWrap}>
          <Text style={{ fontFamily: "poppinsMedium" }} className="text-[16px]">
            Our Products
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12 }}
          >
            {products.map((pr, idx) => (
              <View key={idx} style={{ width: 160, marginRight: 16 }}>
                <View
                  style={{
                    borderRadius: 4,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    height: 120,
                    width: "100%",
                  }}
                >
                  <pr.Img
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[12px]"
                  >
                    {pr.name}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[12px] text-primary"
                  >
                    {pr.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EB278D",
                    borderRadius: 8,
                    marginTop: 10,
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                  onPress={() => setShowPaymentModal(true)}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "poppinsRegular",
                      fontSize: 12,
                    }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      {/* Payment Modal */}
      <BottomModal
        isVisible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        showCloseBtn={true}
      >
        <View className="mb-8 mt-2">
          <Text
            className="text-[16px] text-fadedDark"
            style={{ fontFamily: "latoBold" }}
          >
            Payment
          </Text>
        </View>
        <View className="space-y-4 pb-10 mt-2">
          <OutlineButton
            positionLeft
            title="Wallet"
            icon={<Ionicons name="wallet-outline" size={28} color="#EB278D" />}
          />
          <OutlineButton
            positionLeft
            onPress={handleDebitCardPayment}
            title="Debit Card"
            icon={<Ionicons name="card-outline" size={28} color="#EB278D" />}
          />
          <OutlineButton
            positionLeft
            title="USSD"
            icon={<Ionicons name="keypad-outline" size={28} color="#EB278D" />}
          />
        </View>
      </BottomModal>
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
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  mainImgWrap: {
    width: "100%",
    height: 180,
    backgroundColor: "#eee",
  },
  vendorInfoWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  vendorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    color: "#888",
    fontSize: 14,
  },
  chatBtn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 8,
    marginLeft: 12,
  },
  sectionWrap: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  sectionText: {
    color: "#444",
    fontSize: 14,
    lineHeight: 20,
  },
  availabilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  availDay: {
    color: "#222",
    fontWeight: "500",
    fontSize: 14,
  },
  availTime: {
    color: "#EB278D",
    fontWeight: "600",
    fontSize: 15,
  },
  specialistWrap: {
    alignItems: "center",
    marginRight: 24,
    width: 80,
  },
  specialistImgWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    overflow: "hidden",
  },
  specialistName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
  specialistRole: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
