import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, Platform, StatusBar, Animated, Easing } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import CustomTabBar from '../components/CustomTabBar';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { router } from 'expo-router';

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
  const [userName, setUserName] = useState('Unknown');
  const [activeTab, setActiveTab] = useState('Karakter');
  const [greeting, setGreeting] = useState('');
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [showLikeAnim, setShowLikeAnim] = useState(false);

  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

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

  const handleLike = async () => {
    setShowLikeAnim(true);
    scaleValue.setValue(0);
    opacityValue.setValue(1);

    try {
      const saved = await AsyncStorage.getItem('notifications');
      const currentNotifs = saved ? JSON.parse(saved) : [];
      const newNotif = {
        id: Date.now().toString(),
        type: 'like',
        tab: 'social',
        title: "Kamu menyukai Jane!",
        message: "Kamu baru saja mengirimkan like ke Jane. Tunggu dia like balik ya!",
        time: "Baru saja",
        isUnread: true
      };
      await AsyncStorage.setItem('notifications', JSON.stringify([newNotif, ...currentNotifs]));
    } catch (e) {}

    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.5,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 10, 
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ]).start(() => {
      setShowLikeAnim(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <View>
            <Text style={typography.variants.body}>{greeting},</Text>
            <Text style={typography.variants.h3Bold}>{userName}</Text>
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/Notification' as any)}>
              <GradientIcon IconFamily={Ionicons} name="notifications" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/Curency' as any)}>
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
            source={require('../assets/images/jane.png')} 
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

          {showLikeAnim && (
            <Animated.View style={[
              styles.floatingHeartContainer,
              {
                transform: [{ scale: scaleValue }],
                opacity: opacityValue
              }
            ]}>
              <GradientIcon IconFamily={Ionicons} name="heart" size={100} />
            </Animated.View>
          )}

          <View style={styles.sideButtonsContainer}>
            <TouchableOpacity 
              style={styles.sideCircleButton} 
              activeOpacity={0.8}
              onPress={() => setIsInfoVisible(true)}
            >
              <Ionicons name="information" size={24} color={colors.neutral[400]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sideCircleButton} activeOpacity={0.8}>
              <MaterialCommunityIcons name="alpha-c-circle-outline" size={28} color={colors.neutral[400]} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 8 }} onPress={handleLike}>
              <GradientIcon IconFamily={Ionicons} name="heart" size={50} />
            </TouchableOpacity>
          </View>

        </View>

        {isInfoVisible && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Informasi Jane</Text>
              <Text style={styles.modalText}>
                Jane adalah seorang ENTP yang suka jalan-jalan dan mencoba hal baru. 
                Hobi utamanya adalah fotografi dan mendaki gunung.
              </Text>
              
              <TouchableOpacity 
                style={styles.closeModalButton}
                onPress={() => setIsInfoVisible(false)}
              >
                <Text style={styles.closeModalText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <CustomTabBar />
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
    width: '75%',
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
  sideButtonsContainer: {
    position: 'absolute',
    right: 16,
    bottom: 30,
    alignItems: 'center',
    gap: 16,
  },
  sideCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingHeartContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: colors.navbar.pink,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  closeModalText: {
    color: 'white',
    fontWeight: 'bold',
  },
});