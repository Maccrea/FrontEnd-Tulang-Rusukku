import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { authStyles } from '@/Theme/authStyles';

export default function MBTIScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      router.push('/home' as any);
    }
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <View style={[authStyles.container, styles.customContainer]}>

        <View style={styles.topBar}>
          {step === 1 && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color={colors.neutral[900]} />
            </TouchableOpacity>
          )}
          {step === 1 && (
            <Text style={typography.variants.h3Bold}>MBTI</Text>
          )}
        </View>

        <View style={styles.content}>
          {step === 1 ? (
            <View style={styles.emptyState}>
            </View>
          ) : (
            <View style={styles.resultContainer}>
              <Text style={[typography.variants.body, styles.questionText]}>
                Apa Tipe MBTI kamu?
              </Text>
              <Text style={[typography.variants.h1, styles.mbtiType]}>
                INTP
              </Text>
              
              <Image
                source={require('../assets/images/image-29.png')} 
                style={styles.mbtiImage}
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={authStyles.buttonContainer} onPress={handleNext}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={authStyles.button}
          >
            <Text style={typography.variants.button}>
              {step === 1 ? 'Lanjutkan' : 'Cari partner kamu sekarang'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customContainer: {
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
  },
  resultContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    color: colors.neutral[800],
    marginBottom: 8,
  },
  mbtiType: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 32,
  },
  mbtiImage: {
    width: 250,
    height: 350,
  },
});