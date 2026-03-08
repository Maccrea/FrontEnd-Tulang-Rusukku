import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { authStyles } from '@/Theme/authStyles';

export default function FaceVerificationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <View style={[authStyles.container, styles.customContainer]}>
        
        <View>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color={colors.neutral[900]} />
            </TouchableOpacity>
            <Text style={[typography.variants.h3Bold, styles.headerTitle]}>
              Verifikasi Wajah
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={[typography.variants.body, styles.instructionText]}>
              Mari pastikan kamu adalah pengguna asli.
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={authStyles.buttonContainer} 
          onPress={() => router.push('/face-scan' as any)} 
        >
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={authStyles.button}
          >
            <Text style={typography.variants.button}>Mulai Sekarang</Text>
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
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {},
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  instructionText: {
    textAlign: 'center',
    color: colors.neutral[600],
    lineHeight: 22,
  }
});