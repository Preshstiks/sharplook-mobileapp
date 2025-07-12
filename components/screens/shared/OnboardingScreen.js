import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import OnboardingImg1 from "../../../assets/img/onboarding/img1.svg";
import OnboardingImg2 from "../../../assets/img/onboarding/new.svg";
import OnboardingImg3 from "../../../assets/img/onboarding/img2.svg";
import Svg, { Circle as SvgCircle } from "react-native-svg";
import { Animated as RNAnimated } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet as RNStyleSheet } from "react-native";
import BottomModal from "../../reusuableComponents/BottomModal";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { AntDesign } from "@expo/vector-icons";

const steps = [
  {
    image: OnboardingImg1,
    title: "Beauty, Booked Instantly",
    description:
      "Find trusted makeup artists, hairstylists, and nail techs near you — anytime, anywhere.",
  },
  {
    image: OnboardingImg2,
    title: "Verified Pros, Real Results",
    description:
      "Explore portfolios, read reviews and book with confidence. Every vendor is vetted for quality.",
  },
  {
    image: OnboardingImg3,
    title: " Glam, Your Way",
    description:
      "From soft glam to bold braids — choose your look, your time, your style.",
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: (step + 1) / steps.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      toggleModal();
    }
  };

  const handleSkip = () => {
    toggleModal();
  };

  const size = 64;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;

  return (
    <View className="flex-1 bg-secondary">
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        {(() => {
          const StepImage = steps[step].image;
          return <StepImage width={220} height={220} style={styles.image} />;
        })()}
        <Text style={styles.title}>{steps[step].title}</Text>
        <Text style={styles.description}>{steps[step].description}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={styles.buttonContainer}
        >
          <View style={styles.progressWrapper}>
            <Animated.View style={{ position: "absolute" }}>
              <AnimatedCircle
                size={size}
                strokeWidth={strokeWidth}
                progress={progress}
                color="#EB278D"
              />
            </Animated.View>
            <View style={styles.innerButton}>
              {step === steps.length - 1 ? (
                <MaterialIcons name="check" size={28} color="white" />
              ) : (
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="white"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <BottomModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        backgroundcolor="#FCFCFC"
      >
        <View className="pt-10">
          <OutlineButton
            title="Are you a Client?"
            onPress={() => navigation.navigate("Login")}
            icon={<AntDesign name="user" size={20} color="#EB278D" />}
            iconPosition="left"
          />
          <OutlineButton
            title="Are you a Vendor?"
            onPress={() => navigation.navigate("VendorLogin")}
            icon={<MaterialIcons name="storefront" size={20} color="#EB278D" />}
            iconPosition="left"
          />
        </View>
      </BottomModal>
    </View>
  );
}

function AnimatedCircle({ size, strokeWidth, progress, color }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedStroke = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <Svg width={size} height={size}>
      <SvgCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#FFFAFD"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <AnimatedCircleSVG
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={animatedStroke}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const AnimatedCircleSVG = RNAnimated.createAnimatedComponent(SvgCircle);

const styles = StyleSheet.create({
  skipContainer: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "poppinsMedium",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bottomContainer: {
    paddingBottom: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
    color: "#000",
    fontFamily: "poppinsBold",
  },
  description: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "poppinsRegular",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressWrapper: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  innerButton: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EB278D",
    alignItems: "center",
    justifyContent: "center",
    top: 8,
    left: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
const sheetStyles = RNStyleSheet.create({
  sheetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3D9C7",
    paddingVertical: 20,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#BF6A37",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginBottom: 24,
    width: 320,
    backgroundColor: "transparent",
  },
  roleText: {
    fontSize: 20,
    color: "#BF6A37",
    fontFamily: "poppinsRegular",
  },
});
