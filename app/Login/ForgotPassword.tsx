import CustomInput from '@/components/CustomInput';
import { authStyles as styles } from '@/Theme/authStyles';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  const handleLanjutkan = () => {
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email tidak boleh kosong');
      return;
    }
    
    if (!email.includes('@')) {
      setEmailError('Format email tidak valid');
      return;
    }

    router.push('/Login/new-password' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={[typography.variants.h1, styles.title]}>Ubah Kata Sandi</Text>
          <Text style={[typography.variants.body, styles.subtitle]}>
            Masukkan email kamu untuk ubah kata sandi
          </Text>
        </View>

        <CustomInput
          label="Email"
          placeholder="Masukkan email kamu"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          keyboardType="email-address"
          errorMessage={emailError} 
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLanjutkan}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={typography.variants.button}>Lanjutkan</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={() => router.back()}>
          <Text style={[typography.variants.body, styles.skipText]}>lewati</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}