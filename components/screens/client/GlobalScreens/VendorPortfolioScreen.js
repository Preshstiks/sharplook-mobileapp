import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Modal,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WhiteChatIcon from "../../../../assets/icon/whitechat.svg";
import SkeletonBox from "../../../reusuableComponents/SkeletonLoader";
import { useChatNavigation } from "../../../../hooks/useChatNavigation";
import { ChatConnectionLoader } from "../../../reusuableComponents/ChatConnectionLoader";
import { EmptyData } from "../../../reusuableComponents/EmptyData";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function VendorPortfolioScreen({ navigation, route }) {
  const portfolioImg = route.params.portfolio;

  const vendorData = route.params.vendorData;
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());
  const { navigateToChat, isConnecting } = useChatNavigation();
  useEffect(() => {
    // Preload images for better performance
    preloadImages();
  }, []);

  const preloadImages = async () => {
    const imageLoadPromises = portfolioImg.map((imageUri, index) => {
      return new Promise((resolve) => {
        Image.prefetch(imageUri)
          .then(() => {
            setLoadedImages((prev) => new Set([...prev, index]));
            resolve();
          })
          .catch(() => {
            setImageLoadErrors((prev) => new Set([...prev, index]));
            resolve(); // Still resolve to not block other images
          });
      });
    });

    // Wait for all images to load or fail, then hide loading
    await Promise.all(imageLoadPromises);
    setLoading(false);
  };

  const handleImagePress = (imageUri, index) => {
    setSelectedImage(imageUri);
    setCurrentImageIndex(index);
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const goToNextImage = () => {
    if (currentImageIndex < portfolioImg.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(portfolioImg[nextIndex]);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(portfolioImg[prevIndex]);
    }
  };

  const PortfolioSkeleton = () => (
    <View className="flex-row flex-wrap justify-between">
      {Array.from({ length: 6 }).map((_, idx) => (
        <View
          key={idx}
          className="w-[31%] aspect-square rounded-lg overflow-hidden mb-4"
        >
          <SkeletonBox width="100%" height="100%" borderRadius={8} />
        </View>
      ))}
    </View>
  );

  const ImageItem = ({ img, idx }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [hasError, setHasError] = useState(imageLoadErrors.has(idx));

    return (
      <TouchableOpacity
        key={idx}
        className="w-[31%] aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100"
        onPress={() => handleImagePress(img, idx)}
        activeOpacity={0.8}
      >
        {!hasError ? (
          <>
            <Image
              source={{ uri: img }}
              className="w-full h-full"
              resizeMode="cover"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setHasError(true);
                setImageLoading(false);
              }}
              // Add cache policy for better performance
              cache="force-cache"
            />
            {imageLoading && (
              <View className="absolute inset-0 justify-center items-center bg-gray-100">
                <ActivityIndicator size="small" color="#EB278D" />
              </View>
            )}
          </>
        ) : (
          <View className="w-full h-full justify-center items-center bg-gray-200">
            <Ionicons name="image-outline" size={24} color="#9CA3AF" />
            <Text className="text-sm text-gray-400 mt-1">Failed to load</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <ChatConnectionLoader visible={isConnecting} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-[16px] text-white"
        >
          Vendor's Portfolio
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigateToChat(navigation, {
              vendorId: vendorData?.id,
              receiverName: vendorData?.vendorOnboarding?.businessName,
              vendorPhone: vendorData?.phone,
              chat: {
                id: vendorData?.id,
                name: vendorData?.vendorOnboarding?.businessName,
                avatar: vendorData?.vendorOnboarding?.profilePicture,
                vendorId: vendorData?.id,
              },
            })
          }
        >
          <WhiteChatIcon width={30} height={30} />
        </TouchableOpacity>
      </View>

      {/* Portfolio Grid */}
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true} // Optimize memory usage
        maxToRenderPerBatch={6} // Render images in batches
        initialNumToRender={6}
      >
        {loading ? (
          <PortfolioSkeleton />
        ) : portfolioImg.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {portfolioImg.map((img, idx) => (
              <ImageItem key={idx} img={img} idx={idx} />
            ))}
          </View>
        ) : (
          <EmptyData msg="No portfolio images" />
        )}
      </ScrollView>

      {/* Full Screen Image Preview Modal */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
        statusBarTranslucent={true}
      >
        <View className="flex-1 bg-black bg-opacity-95">
          {/* Gradient Overlay for Better Contrast */}
          <View className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />

          {/* Top Controls */}
          <View className="absolute top-0 left-0 right-0 z-20 flex-row justify-between items-center p-4 pt-12">
            <TouchableOpacity
              className="bg-black bg-opacity-70 rounded-full p-3"
              onPress={closeImageModal}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View className="flex-row items-center bg-black bg-opacity-70 rounded-full px-4 py-2">
              <Text className="text-white text-lg font-medium mr-2">
                {currentImageIndex + 1}
              </Text>
              <Text className="text-white text-lg opacity-60">
                / {portfolioImg.length}
              </Text>
            </View>
            <View className="w-12" />
          </View>

          {/* Image Container */}
          <View className="flex-1 justify-center items-center">
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-full"
                resizeMode="contain"
                cache="force-cache"
              />
            )}
          </View>

          {/* Bottom Controls */}
          <View className="absolute bottom-0 left-0 right-0 z-20 flex-row justify-between items-center p-4 pb-8">
            <TouchableOpacity
              className={`bg-black bg-opacity-70 rounded-full p-3 ${
                currentImageIndex === 0 ? "opacity-40" : ""
              }`}
              onPress={goToPreviousImage}
              disabled={currentImageIndex === 0}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`bg-black bg-opacity-70 rounded-full p-3 ${
                currentImageIndex === portfolioImg.length - 1
                  ? "opacity-40"
                  : ""
              }`}
              onPress={goToNextImage}
              disabled={currentImageIndex === portfolioImg.length - 1}
            >
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Tap to close hint */}
          <TouchableOpacity
            className="absolute inset-0 z-10"
            onPress={closeImageModal}
            activeOpacity={1}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EB278D",
    paddingTop: 60,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});
