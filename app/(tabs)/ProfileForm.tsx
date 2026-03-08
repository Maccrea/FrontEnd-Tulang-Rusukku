import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { authStyles } from '@/Theme/authStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuCards = [
  {
    id: 'profil_dasar',
    title: 'Profil Dasar',
    description: 'Lengkapi informasi mengenai identitas diri, latar belakang, dan profil fisik Anda.',
    IconComponent: Ionicons,
    iconName: 'person',
  },
  {
    id: 'keimanan',
    title: 'Keimanan & Kerohanian',
    description: 'Iman adalah fondasi sebuah hubungan. Bagikan nilai-nilai spiritual yang menjadi landasan hidup Anda.',
    IconComponent: FontAwesome5,
    iconName: 'dove',
  },
  {
    id: 'latar_belakang',
    title: 'Latar Belakang Personal',
    description: 'Informasi mendalam mengenai asal-usul, keluarga, dan kondisi personal Anda.',
    IconComponent: Ionicons,
    iconName: 'body',
  },
  {
    id: 'finansial',
    title: 'Stabilitas Finansial',
    description: 'Tinjauan mengenai pekerjaan, status tempat tinggal, dan tingkat kemapanan Anda.',
    IconComponent: Ionicons,
    iconName: 'briefcase',
  },
];

export default function ProfileFormMenuScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [userName, setUserName] = useState('Someone');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName !== null) {
          const namaPanggilan = storedName.split(' ')[0]; 
          setUserName(namaPanggilan);
        }
      } catch (e) {
        console.log('Gagal mengambil nama', e);
      }
    };
    fetchName();
  }, []);

  const handleLanjutkan = () => {
    if (!isChecked) {
      setErrorMsg('Harap setujui persyaratan sebelum melanjutkan');
      return;
    }
    
    router.push('/profil-dasar' as any);
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={colors.neutral[900]} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={[typography.variants.h2, styles.headerTitle]}>
          Halo {userName}, mari lengkapi profilmu agar dapat bertemu dengan si dia
        </Text>

        <View style={styles.cardsContainer}>
          {menuCards.map((card) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.iconContainer}>
                <card.IconComponent name={card.iconName as any} size={24} color="#B3B5FF" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={[typography.variants.h3Bold, styles.cardTitle]}>{card.title}</Text>
                <Text style={[typography.variants.body, styles.cardDescription]}>
                  {card.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => {
              setIsChecked(!isChecked);
              setErrorMsg('');
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={[typography.variants.body, styles.checkboxText]}>
              Saya menyetujui bahwa data yang diberikan adalah benar dan bersedia membagikannya untuk keperluan verifikasi profil.
            </Text>
          </TouchableOpacity>

          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : null}

          <TouchableOpacity 
            style={[authStyles.buttonContainer, { opacity: isChecked ? 1 : 0.6 }]} 
            onPress={handleLanjutkan}
          >
            <LinearGradient
              colors={[colors.navbar.blue, colors.navbar.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={authStyles.button}
            >
              <Text style={typography.variants.button}>Lanjutkan</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  headerTitle: {
    marginBottom: 30,
    lineHeight: 32,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    borderColor: '#E6E8FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 16,
    marginTop: 2,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: colors.neutral[900],
    marginBottom: 4,
    fontSize: 16,
  },
  cardDescription: {
    color: colors.neutral[600],
    fontSize: 13,
    lineHeight: 20,
  },
  bottomSection: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.neutral[400],
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.navbar.pink,
    borderColor: colors.navbar.pink,
  },
  checkboxText: {
    flex: 1,
    color: colors.neutral[700],
    fontSize: 13,
    lineHeight: 20,
  },
  errorText: {
    color: colors.semantic?.error || 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  }
});