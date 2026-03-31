import { colors } from '@/Theme/color';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function CustomTabBar(props: any) {
  const router = useRouter();
  const currentRoute = (props?.state?.routes?.[props?.state?.index]?.name || '').toString().toLowerCase();
  const activeColor = colors?.navbar?.active || '#F1A7C3';
  const inactiveColor = '#9CA3AF';

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/home' as any)}>
          <Ionicons name="home" size={24} color={currentRoute === 'home' ? activeColor : inactiveColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/Vendor' as any)}>
          <FontAwesome5 name="store" size={20} color={currentRoute === 'vendor' ? activeColor : inactiveColor} />
        </TouchableOpacity>

        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/like' as any)}>
            <LinearGradient
              colors={[colors.navbar.blue, colors.navbar.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.centerButton}
            >
              <Ionicons name="heart" size={32} color={currentRoute === 'like' ? activeColor : 'white'} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/chat' as any)}>
          <Ionicons name="chatbubble" size={24} color={currentRoute === 'chat' ? activeColor : inactiveColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/profile-form' as any)}>
          <Ionicons name="person" size={24} color={(currentRoute === 'profile-form' || currentRoute === 'profile') ? activeColor : inactiveColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: width,
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: width * 0.9,
    height: 65,
    borderRadius: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    shadowColor: colors.navbar.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});