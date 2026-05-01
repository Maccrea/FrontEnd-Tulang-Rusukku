import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { authStyles as styles } from "../Theme/authStyles";

const slides = [
  {
    id: "1",
    title: "Koneksi yang Bermakna",
    description: "Temukan pasangan sefrekuensi yang siap melangkah",
    image: require("../assets/images/undraw_love_9mug 1.png"),
  },
  {
    id: "2",
    title: "Aman & Terverifikasi",
    description:
      "Ruang obrolan dengan sistem verifikasi identitas (E-KTP) dan batasan usia yang ketat",
    image: require("../assets/images/undraw_love_9mug 1.png"),
  },
  {
    id: "3",
    title: "Mulai Kisah Cinta Anda",
    description:
      "Mulailah lembaran baru untuk menemukan cinta sejati dan membangun masa depan.",
    image: require("../assets/images/undraw_love_9mug 1.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("/LoginForm" as any);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.onboardSlide}>
        <Image
          source={item.image}
          style={styles.onboardImage}
          resizeMode="contain"
        />
        <View style={styles.onboardTextContainer}>
          <Text style={[typography.variants.h3Bold, styles.title]}>
            {item.title}
          </Text>
          <Text style={[typography.variants.body, styles.onboardDescription]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.onboardContainer}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      <View style={styles.onboardBottomContainer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={scrollToNext}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={typography.variants.button}>
              {currentIndex === slides.length - 1 ? "Daftar Sekarang" : "Next"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
