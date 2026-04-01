import CustomInput from '@/components/CustomInput';
import { authStyles as styles } from '@/Theme/authStyles';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>        
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
          placeholder="Masukkan alamat email kamu"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          label="Kata Sandi"
          placeholder="Masukkan password kamu"
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
          <TouchableOpacity onPress={() => router.push('/Login/ForgotPassword' as any)}>
            <Text style={[typography.variants.body, { color: colors.neutral[400] }]}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
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

        <View style={styles.bottomTextContainer}>
          <Text style={[typography.variants.body, { color: colors.neutral[500] }]}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => router.push('/RegisterForm' as any)}>
            <Text style={[typography.variants.body, { color: colors.neutral[500], fontWeight: '500' }]}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
}