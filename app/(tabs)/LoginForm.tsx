import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons'; 
import CustomInput from '@/components/CustomInput';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={[typography.variants.h1, styles.title]}>Selamat Datang Kembali</Text>
          <Text style={typography.variants.body}>Lanjutkan pencarianmu dengan sukacita.</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/undraw_love_9mug 1.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <CustomInput
          label="Email"
          placeholder="Masukkan Email Kamu"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          label="Kata Sandi"
          placeholder="Masukkan Password Kamu"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />

        <View style={styles.actionRow}>
          <View style={styles.rememberMeContainer}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? colors.navbar.pink : colors.neutral[400]}
              style={styles.checkbox}
            />
            <Text style={[typography.variants.body, { color: colors.neutral[500] }]}>Ingat saya</Text>
          </View>
          <TouchableOpacity>
            <Text style={[typography.variants.body, { color: colors.neutral[400] }]}>Lupa Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButtonContainer}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginButton}
          >
            <Text style={typography.variants.button}>Masuk</Text>
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

        <View style={styles.registerContainer}>
          <Text style={[typography.variants.body, { color: colors.neutral[500] }]}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => router.push('/RegisterForm')}>
            <Text style={[typography.variants.body, { color: colors.neutral[500], fontWeight: '500' }]}>Register</Text>
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
    marginBottom: 30,
  },
  title: {
    marginBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 250,
    height: 180,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
    width: 18,
    height: 18,
    borderColor: colors.neutral[400],
  },
  loginButtonContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
  },
  loginButton: {
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
});