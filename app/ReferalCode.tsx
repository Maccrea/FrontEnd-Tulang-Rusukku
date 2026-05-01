import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { authStyles as styles } from '@/Theme/authStyles'; 

export default function ReferralCodeScreen() {
  const [referralCode, setReferralCode] = useState('');
  const [referralCodeError, setReferralCodeError] = useState('');
  const router = useRouter();

  const handleKonfirmasi = () => {
    setReferralCodeError('');

    if (!referralCode.trim()) {
      setReferralCodeError('Kode refferal tidak boleh kosong');
      return;
    }

    Alert.alert('Sukses', 'Kode refferal berhasil digunakan!', [
      { text: 'OK', onPress: () => router.push('/face-verification' as any) }
    ]);
  };

  const handleSkip = () => {
    router.push('/face-verification' as any); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={[typography.variants.h1, styles.title]}>Refferal Code</Text>
          <Text style={[typography.variants.body, styles.subtitle]}>
            Masukkan kode refferal
          </Text>
        </View>

        <CustomInput
          label="Refferal Code"
          placeholder="Refferal Code"
          value={referralCode}
          onChangeText={(text) => {
            setReferralCode(text);
            setReferralCodeError('');
          }}
          errorMessage={referralCodeError}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleKonfirmasi}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={typography.variants.button}>Konfirmasi Kode</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[typography.variants.body, styles.skipText]}>Skip</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}