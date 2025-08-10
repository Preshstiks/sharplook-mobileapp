import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

const SkeletonBox = ({ width, height, borderRadius = 4, style = {} }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      testID="skeleton-box"
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#E5E7EB",
          opacity,
        },
        style,
      ]}
    />
  );
};

export const OfferCardSkeleton = () => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {/* Service Name */}
          <SkeletonBox
            width="70%"
            height={16}
            borderRadius={4}
            style={{ marginBottom: 8 }}
          />

          {/* Service Type */}
          <SkeletonBox
            width="40%"
            height={12}
            borderRadius={4}
            style={{ marginBottom: 8 }}
          />

          {/* Price */}
          <SkeletonBox width="50%" height={16} borderRadius={4} />
        </View>

        <View style={{ alignItems: "flex-end" }}>
          {/* Status Badge */}
          <SkeletonBox
            width={60}
            height={24}
            borderRadius={8}
            style={{ marginBottom: 8 }}
          />

          {/* Date */}
          <SkeletonBox width={80} height={12} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};

export const OffersListSkeleton = ({ count = 3 }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      {Array.from({ length: count }).map((_, index) => (
        <OfferCardSkeleton key={index} />
      ))}
    </View>
  );
};

export default SkeletonBox;
