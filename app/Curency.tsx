import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../components/CustomHeader';
import CustomTabBar from '../components/CustomTabBar';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

const transactions = [
  {
    id: '1',
    title: 'Send gift to jane',
    date: '22 Aug 2022 • 10:00 am',
    amount: '-$400',
    amountColor: '#FF4B4B',
    avatar: require('../assets/images/jane.png')
  },
  {
    id: '2',
    title: 'Get gift from jane',
    date: '22 Aug 2022 • 10:00 am',
    amount: '+400',
    amountColor: '#4CAF50',
    avatar: require('../assets/images/jane.png')
  }
];

export default function CurrencyScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader title="Currency" />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.topSection}>
            <View>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>45</Text>
                <MaterialCommunityIcons name="diamond" size={28} color="#4DA6FF" style={styles.diamondIcon} />
              </View>
              <Text style={styles.dateText}>Jan 20, 15:28</Text>
            </View>
            

            <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
              <LinearGradient
                colors={[colors.navbar.blue, colors.navbar.pink]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.topUpButton}
              >
                <Text style={styles.topUpText}>+ Top Up Diamond <MaterialCommunityIcons name="diamond" size={14} color="white" /></Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.bannerContainer}>
            <View style={styles.bannerBackground} />
            <View style={styles.bannerImagesContainer}>
              <Image source={require('../assets/images/jane.png')} style={styles.bannerAvatarLeft} />
              <Image source={require('../assets/images/jane.png')} style={styles.bannerAvatarRight} />
            </View>
          </View>

          <View style={styles.transactionSection}>
            <Text style={styles.transactionTitle}>Detail Transaction</Text>
            
            {transactions.map((trx) => (
              <View key={trx.id} style={styles.transactionCard}>
                <Image source={trx.avatar} style={styles.transactionAvatar} />
                <View style={styles.transactionInfo}>
                  <Text style={[typography.variants.body, styles.transactionName]}>{trx.title}</Text>
                  <Text style={[typography.variants.caption, styles.transactionDate]}>{trx.date}</Text>
                </View>
                <Text style={[styles.transactionAmount, { color: trx.amountColor }]}>{trx.amount}</Text>
              </View>
            ))}
          </View>

        </ScrollView>
        {/* <CustomTabBar /> */}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 0.5 : 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  diamondIcon: {
    marginLeft: 8,
    marginTop: 4,
  },
  dateText: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 4,
  },
  topUpButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  topUpText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  bannerContainer: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  bannerBackground: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: '#EAEBFA',
    borderRadius: 16,
  },
  bannerImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 100,
  },
  bannerAvatarLeft: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  bannerAvatarRight: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  transactionSection: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    color: colors.neutral[900],
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    color: colors.neutral[500],
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});