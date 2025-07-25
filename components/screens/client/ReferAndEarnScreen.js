import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Clipboard,
  Linking,
  Share,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { showToast } from "../../ToastComponent/Toast";
const mockTransactions = [
  {
    type: "credit",
    desc: "Friend Sarah joined & booked",
    date: "2023-10-28",
    amount: 100,
  },
  {
    type: "credit",
    desc: "Friend David joined & booked",
    date: "2023-10-20",
    amount: 100,
  },
  {
    type: "debit",
    desc: "Used for a Manicure service",
    date: "2023-10-15",
    amount: -50,
  },
  {
    type: "credit",
    desc: "Friend Emily joined & booked",
    date: "2023-10-10",
    amount: 100,
  },
  {
    type: "credit",
    desc: "Friend John joined & booked",
    date: "2023-10-05",
    amount: 100,
  },
  {
    type: "credit",
    desc: "Friend Mark joined & booked",
    date: "2023-09-30",
    amount: 100,
  },
];

export default function ReferAndEarnScreen() {
  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  //   const sharemsg = `I’ve been using this app lately, and it’s honestly made self-care so much easier. From finding trusted experts to grabbing my favorite beauty essentials—everything's just a tap away
  // And here’s the best part: you get ₦100 when you join using my referral code ${user?.referralCode}, and I get ₦100 for every person who joins using my referral code. Give it a try—you’ll thank me later 💖`;
  //   const shareToWhatsApp = async () => {
  //     const url = `whatsapp://send?text=${encodeURIComponent(sharemsg)}`;
  //     const canOpen = await Linking.canOpenURL(url);
  //     if (canOpen) {
  //       Linking.openURL(url);
  //     } else {
  //       showToast.info("Whatsapp not installed");
  //     }
  //   };
  //   const shareToOtherApps = async () => {
  //     try {
  //       await Share.share({
  //         message: sharemsg,
  //       });
  //     } catch (error) {
  //       showToast.info("Cannot share message");
  //     }
  //   };
  const referralCode = user?.referralCode;
  const handleCopy = () => {
    Clipboard.setString(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <View className="flex-1 bg-white">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Client")}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Refer and Earn</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.headerBox}>
          <Text
            style={{ fontFamily: "latoBold" }}
            className="text-[30px] text-center mb-2 text-primary"
          >
            Refer a Friend, Earn{"\n"}
            <Text>₦100 Each!</Text>
          </Text>
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-[12px] text-center"
          >
            Invite your friends to book beauty services with SharpLook. When
            they join and book, you both get ₦100 credit.
          </Text>
        </View>

        <View style={styles.card}>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[14px] mb-2"
          >
            Your Referral Code
          </Text>
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-[10px] text-faintDark2"
          >
            Share this code with your friends!
          </Text>
          <View style={styles.codeRow} className="border border-[#EBEBEA]">
            <Text style={styles.code}>{user?.referralCode}</Text>
            <TouchableOpacity onPress={handleCopy} style={styles.copyIcon}>
              <Feather
                name={copied ? "check" : "copy"}
                size={20}
                color="#EB278D"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
            <MaterialIcons name="content-copy" size={12} color="#fff" />
            <Text style={styles.copyBtnText}>Copy Code</Text>
          </TouchableOpacity>
          <View style={styles.shareRow}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color="#22C55E"
              style={styles.shareIcon}
            />

            <Feather
              name="share-2"
              size={20}
              color="#A855F7"
              style={styles.shareIcon}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[14px] mb-2"
          >
            Your Reward Summary
          </Text>
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-[10px] text-faintDark2"
          >
            Your earnings and referral progress.
          </Text>

          <View style={styles.summaryRow}>
            <Ionicons name="wallet-outline" size={20} color="#EB278D" />
            <Text style={styles.summaryLabel}>Current Balance</Text>
            <Text style={styles.summaryValue}>₦500</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="people-outline" size={20} color="#EB278D" />
            <Text style={styles.summaryLabel}>Friends Who Joined</Text>
            <Text style={styles.summaryValue}>5</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Wallet Transactions</Text>
          {mockTransactions.map((tx, idx) => (
            <View key={idx} style={styles.txRow}>
              <Feather
                name={
                  tx.type === "credit" ? "arrow-up-right" : "arrow-down-left"
                }
                size={24}
                color={tx.type === "credit" ? "#EB278D" : "#EF4444"}
                style={{ marginRight: 8 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.txDesc}>{tx.desc}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <Text
                style={[
                  styles.txAmount,
                  { color: tx.amount > 0 ? "#EB278D" : "#EF4444" },
                ]}
              >
                {" "}
                {tx.amount > 0 ? "+" : ""}₦{Math.abs(tx.amount)}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.forNewUsers}>For New Users</Text>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Have a referral code?</Text>
          <Text style={styles.sectionDesc}>
            Enter your friend's code to get a bonus!
          </Text>
          <TextInput
            style={styles.input}
            className="border border-[#EBEBEA]"
            placeholder="Enter code here"
            value={inputCode}
            onChangeText={setInputCode}
          />
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.pasteBtn}
              onPress={() => setInputCode(referralCode)}
            >
              <Text style={styles.pasteBtnText}>Paste Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    color: "#222",
    fontSize: 16,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
  headerBox: {
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#FFF6F0",
    borderRadius: 16,
    padding: 16,
  },
  headerTitle: {
    fontFamily: "poppinsBold",
    fontSize: 22,
    color: "#BF6A37",
    textAlign: "center",
    marginBottom: 4,
  },
  headerHighlight: {
    color: "#E57373",
    fontFamily: "poppinsBold",
    fontSize: 22,
  },
  headerDesc: {
    fontFamily: "poppinsRegular",
    fontSize: 13,
    color: "#3c2a1e",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: "poppinsMedium",
    fontSize: 14,
    marginBottom: 2,
  },
  sectionDesc: {
    fontFamily: "poppinsRegular",
    fontSize: 12,
    color: "#3c2a1e",
    marginBottom: 8,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  code: {
    fontFamily: "poppinsBold",
    fontSize: 16,
    color: "#3c2a1e",
    flex: 1,
  },
  copyIcon: {
    marginLeft: 8,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EB278D",
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: "center",
    marginBottom: 8,
  },
  copyBtnText: {
    color: "#fff",
    fontFamily: "poppinsRegular",
    fontSize: 12,
    marginLeft: 6,
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  shareIcon: {
    marginHorizontal: 8,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  summaryLabel: {
    fontFamily: "poppinsMedium",
    fontSize: 14,
    marginBottom: 8,
    color: "#3c2a1e",
    marginLeft: 8,
    flex: 1,
  },
  summaryValue: {
    fontFamily: "latoBold",
    fontSize: 20,
    color: "#EB278D",
  },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  txDesc: {
    fontFamily: "poppinsSemiBold",
    fontSize: 12,
  },
  txDate: {
    fontFamily: "poppinsRegular",
    fontSize: 10,
    color: "#A89B8A",
  },
  txAmount: {
    fontFamily: "poppinsSemiBold",
    fontSize: 15,
    marginLeft: 8,
  },
  forNewUsers: {
    fontFamily: "poppinsSemiBold",
    fontSize: 14,
    color: "#3c2a1e",
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#EBEBEA",
    borderRadius: 8,
    padding: 10,
    fontFamily: "poppinsRegular",
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: "#F7F7F7",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pasteBtn: {
    borderWidth: 1,
    width: "48%",
    borderColor: "#EB278D",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  pasteBtnText: {
    color: "#EB278D",
    marginTop: 2,
    textAlign: "center",
    fontFamily: "poppinsRegular",
    fontSize: 12,
  },
  applyBtn: {
    backgroundColor: "#EB278D",
    borderRadius: 8,
    width: "48%",
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  applyBtnText: {
    color: "#fff",
    marginTop: 2,
    textAlign: "center",
    fontFamily: "poppinsRegular",
    fontSize: 12,
  },
});
