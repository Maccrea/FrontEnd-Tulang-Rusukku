import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { authStyles } from '@/Theme/authStyles';

const { width } = Dimensions.get('window');

export default function FaceScanScreen() {
  const router = useRouter();
  
  const [permission, requestPermission] = useCameraPermissions();
  
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    const startDelay = setTimeout(() => {
      if (permission?.granted) {
        setIsScanning(true);
      }
    }, 1000);

    if (isScanning) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer);
            setIsScanning(false);
            
            setTimeout(() => {
              router.push('/ProfileForm');
            }, 1000);
            return 100;
          }
          
          const diff = Math.floor(Math.random() * 8) + 2; 
          return Math.min(oldProgress + diff, 100);
        });
      }, 200);
    }

    return () => {
      clearTimeout(startDelay);
      clearInterval(timer);
    };
  }, [isScanning, permission]);

  if (!permission) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={typography.variants.body}>Memuat kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[typography.variants.body, { textAlign: 'center', marginBottom: 20 }]}>
          Kami butuh izin kamera agar kamu bisa melakukan verifikasi wajah.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={authStyles.buttonContainer}>
           <Text style={[typography.variants.button, { color: colors.navbar.blue }]}>Berikan Izin Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={colors.neutral[900]} />
          </TouchableOpacity>
          <Text style={[typography.variants.h3Bold]}>
            Verifikasi Wajah
          </Text>
        </View>

        <Text style={[typography.variants.body, styles.instructionText]}>
          Posisikan wajah Anda di dalam bingkai oval dan tahan posisi Anda.
        </Text>

        <View style={styles.cameraFrameContainer}>
          <View style={styles.cameraOval}>
            <CameraView 
              style={StyleSheet.absoluteFillObject} 
              facing="front" 
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.percentageText}>{progress}%</Text>
          <Text style={[typography.variants.body, styles.analyzingText]}>
            {progress === 100 ? 'Verifikasi Selesai!' : 'Menganalisa wajah anda'}
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  instructionText: {
    textAlign: 'center',
    color: colors.neutral[600],
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  cameraFrameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
  },
  cameraOval: {
    width: width * 0.7,
    height: width * 0.95, 
    borderRadius: 200,    
    backgroundColor: colors.neutral[200], 
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors.navbar.pink, 
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  analyzingText: {
    color: colors.neutral[600],
  }
});