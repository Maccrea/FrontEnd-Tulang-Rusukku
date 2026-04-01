import CustomInput from '@/components/CustomInput';
import { authStyles as styles } from '@/Theme/authStyles';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const router = useRouter();

  const handleLanjutkan = () => {
    setNewPasswordError('');
    setConfirmPasswordError('');
    
    let isValid = true;

    if (!newPassword.trim()) {
      setNewPasswordError('Password baru tidak boleh kosong');
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError('Password minimal 6 karakter');
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Konfirmasi password tidak boleh kosong');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Konfirmasi password tidak cocok');
      isValid = false;
    }

    if (!isValid) return;

    router.push('/login' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={[typography.variants.h1, styles.title]}>Konfirmasi Kata Sandi</Text>
          <Text style={[typography.variants.body, styles.subtitle]}>
            Kata sandi kamu harus beda dari yang sebelumnya
          </Text>
        </View>

        <CustomInput
          label="Kata sandi baru"
          placeholder="Masukkan kata sandi baru"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setNewPasswordError('');
          }}
          isPassword={true}
          errorMessage={newPasswordError}
        />

        <CustomInput
          label="Konfirmasi kata sandi baru"
          placeholder="Masukkan ulang kata sandi baru"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordError('');
          }}
          isPassword={true}
          errorMessage={confirmPasswordError}
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

        <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/Login/LoginForm')}>
          <Text style={[typography.variants.body, styles.skipText]}>lewati</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}