import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

const { width } = Dimensions.get('window');

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 6) return 'Selamat Subuh';
  if (hour >= 6 && hour < 11) return 'Selamat Pagi';
  if (hour >= 11 && hour < 15) return 'Selamat Siang';
  if (hour >= 15 && hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
};

const GradientIcon = ({ IconFamily, name, size }: { IconFamily: any, name: string, size: number }) => {
  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
          <IconFamily name={name} size={size} color="white" />
        </View>
      }
    >
      <LinearGradient
        colors={[colors.navbar.blue, colors.navbar.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};

export default function HomeScreen() {
  const [userName, setUserName] = useState('Alyaa');
  const [activeTab, setActiveTab] = useState('Karakter');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());

    const fetchName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName !== null) {
          const namaPanggilan = storedName.split(' ')[0];
          setUserName(namaPanggilan);
        }
      } catch (e) {}
    };
    fetchName();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <View>
            <Text style={typography.variants.body}>{greeting},</Text>
            <Text style={typography.variants.h3Bold}>{userName}</Text>
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <GradientIcon IconFamily={Ionicons} name="notifications" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <GradientIcon IconFamily={MaterialCommunityIcons} name="diamond" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'Karakter' && styles.activeTab]}
            onPress={() => setActiveTab('Karakter')}
          >
            <Text style={[styles.tabText, activeTab === 'Karakter' && styles.activeTabText]}>
              Karakter
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'Filter' && styles.activeTab]}
            onPress={() => setActiveTab('Filter')}
          >
            <Text style={[styles.tabText, activeTab === 'Filter' && styles.activeTabText]}>
              Filter
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <Image 
            source={require('../../assets/images/jane.png')} 
            style={styles.cardImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.cardGradient}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>
                Jane, 24 <MaterialCommunityIcons name="check-decagram" size={20} color="#FF99C2" />
              </Text>
              <Text style={styles.cardMbti}>✨ Matched ENTP</Text>
            </View>
          </LinearGradient>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 20 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFE4F2',
    marginHorizontal: 24,
    borderRadius: 30,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 26,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.neutral[900],
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 100,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#E6E8FF',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
    padding: 24,
  },
  cardInfo: {
    marginBottom: 10,
  },
  cardName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardMbti: {
    fontSize: 14,
    color: '#E0E0E0',
  },
});