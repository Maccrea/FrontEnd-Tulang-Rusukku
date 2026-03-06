import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

const { width, height } = Dimensions.get('window');
const slides = [
  {
    id: '1',
    title: 'Koneksi yang Bermakna',
    description: 'Temukan pasangan sefrekuensi yang siap melangkah',
    image: require('../../assets/images/undraw_love_9mug 1.png'),
  },
  {
    id: '2',
    title: 'Aman & Terverifikasi',
    description: 'Ruang obrolan dengan sistem verifikasi identitas (E-KTP) dan batasan usia yang ketat',
    image: require('../../assets/images/undraw_love_9mug 1.png'),
  },
  {
    id: '3',
    title: 'Mulai Kisah Cinta Anda',
    description: 'Mulailah lembaran baru untuk menemukan cinta sejati dan membangun masa depan.',
    image: require('../../assets/images/undraw_love_9mug 1.png'),
  }
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
      router.push('/RegisterForm'); 
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={[typography.variants.h3Bold, styles.title]}>{item.title}</Text>
          <Text style={[typography.variants.body, styles.description]}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot
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
              {currentIndex === slides.length - 1 ? 'Daftar Sekarang' : 'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingTop: height * 0.15,
  },
  image: {
    width: width * 0.8,
    height: height * 0.35,
  },
  textContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    color: colors.neutral[600],
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.navbar.pink,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.neutral[300],
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});