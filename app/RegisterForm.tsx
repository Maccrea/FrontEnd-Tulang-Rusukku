import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import CustomInput from '@/components/CustomInput';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { useRouter } from "expo-router";
import { authStyles as styles } from "../Theme/authStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaError, setNamaError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleDaftar = async () => {
    setNamaError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!nama.trim()) {
      setNamaError('Nama tidak boleh kosong');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email tidak boleh kosong');
      isValid = false;
    } else if (!email.includes('@')) {
      setEmailError('Format email tidak valid');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password tidak boleh kosong');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password minimal 8 karakter');
      isValid = false;
    }

    if (!isValid) return;

    try {
      await AsyncStorage.setItem('userName', nama);
    } catch (e) {
      console.log('Gagal menyimpan nama', e);
    }

    Alert.alert('Sukses', 'Akun berhasil dibuat!', [
      { text: 'OK', onPress: () => router.push('/ReferalCode' as any) }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={[typography.variants.h1, styles.title]}>Halo, Selamat Datang</Text>
          <Text style={[typography.variants.body, styles.subtitle]}>
            Buat akunmu sekarang dan mulai perjalanan cintamu di sini.
          </Text>
        </View>

        <CustomInput
          label="Nama"
          placeholder="Masukkan Nama Kamu"
          value={nama}
          onChangeText={(text) => {
            setNama(text);
            setNamaError('');
          }}
          errorMessage={namaError}
        />

        <CustomInput
          label="Email"
          placeholder="Masukkan Email Kamu"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          keyboardType="email-address"
          errorMessage={emailError}
        />

        <CustomInput
          label="Kata Sandi"
          placeholder="Buat Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          isPassword={true}
          errorMessage={passwordError}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleDaftar}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={typography.variants.button}>Daftar Sekarang</Text>
          </LinearGradient>
          
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={[typography.variants.body, styles.dividerText]}>Atau</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <AntDesign name="google" size={20} color="#DB4437" />
          <Text style={[typography.variants.button, styles.googleButtonText]}>Lanjutkan dengan Google</Text>
        </TouchableOpacity>

        <View style={styles.bottomTextContainer}>
          <Text style={[typography.variants.body, { color: colors.neutral[500] }]}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => router.push('/LoginForm' as any)}>
            <Text style={[typography.variants.body, { color: colors.neutral[500], fontWeight: '500' }]}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}