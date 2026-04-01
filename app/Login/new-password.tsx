import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { authStyles as styles } from '@/Theme/authStyles';

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
          <Text style={[typography.variants.h1, styles.title]}>Reset Your Password</Text>
          <Text style={[typography.variants.body, styles.subtitle]}>
            Password kamu harus beda dari yang sebelumnya
          </Text>
        </View>

        <CustomInput
          label="Password baru"
          placeholder="password baru"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setNewPasswordError('');
          }}
          isPassword={true}
          errorMessage={newPasswordError}
        />

        <CustomInput
          label="Konfirmasi password"
          placeholder="konfirmasi password"
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

        <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/LoginForm')}>
          <Text style={[typography.variants.body, styles.skipText]}>lewati</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}