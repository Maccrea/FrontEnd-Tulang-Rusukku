import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import CustomInput from '@/components/CustomInput';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { router, useRouter } from "expo-router";
import { Route } from 'expo-router/build/Route';

export default function RegisterScreen() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    router.push({
      pathname: "/ProfileForm",
      params: {
        nama,
      }
    });
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
          onChangeText={setNama}
        />

        <CustomInput
          label="Email"
          placeholder="Masukkan Email Kamu"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          label="Kata Sandi"
          placeholder="Buat Password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />

        <TouchableOpacity style={styles.registerButtonContainer} onPress={handleRegister}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.registerButton}
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

        <View style={styles.loginContainer}>
          <Text style={[typography.variants.body, { color: colors.neutral[500] }]}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => router.push('/LoginForm')}>
            <Text style={[typography.variants.body, { color: colors.neutral[500], fontWeight: '500' }]}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 10,
    color: colors.neutral[600],
  },
  registerButtonContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
    marginTop: 10, 
  },
  registerButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[300],
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.neutral[400],
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#EAC4D5', 
    borderRadius: 12,
    backgroundColor: colors.navbar.background,
    marginBottom: 24,
  },
  googleButtonText: {
    color: colors.neutral[600],
    marginLeft: 12,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
});