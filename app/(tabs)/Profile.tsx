import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { MenuItem } from "@/components/ui/ProfileMenuItem";
import { StatCard } from "@/components/ui/StatCrad";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/120');

  useEffect(() => {
    loadUserData();
    loadProfileData();
    loadProfileImage();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('@user_register');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const loadProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem('@profile_data');
      if (data) {
        setProfileData(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  const loadProfileImage = async () => {
    try {
      const image = await AsyncStorage.getItem('@profile_image');
      if (image) {
        setProfileImage(image);
      }
    } catch (error) {
      console.log('Error loading profile image:', error);
    }
  };

  const displayName = userData?.fullName || profileData?.nama || "User";

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Profil" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <LinearGradient
            colors={colors.gradients.primary as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
          >
            <View style={styles.imageInnerContainer}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </View>
          </LinearGradient>

          <Text style={[typography.variants.h4, { marginTop: 15 }]}>
            {displayName}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Views" count={24} />
          <StatCard label="Likes" count={85} />
          <StatCard label="Match" count={24} />
        </View>

        <View style={styles.menuBox}>
          <MenuItem
            icon="person"
            title="Tentang Saya"
            onPress={() => router.push("/profile/about-me")}
          />
          <MenuItem
            icon="copy"
            title="Keamanan dan Verifikasi"
            onPress={() => router.push("/profile/verify")}
          />
          <MenuItem
            icon="shield-checkmark"
            title="Kode Referral"
            onPress={() => router.push("/profile/refferal")}
          />
        </View>

        <View style={styles.menuBox}>
          <MenuItem
            icon="settings"
            title="Pengaturan Aplikasi"
            onPress={() => router.push("/profile/settings")}
          />
          <MenuItem
            icon="headset"
            title="Pusat Bantuan"
            onPress={() => router.push("/profile/helper")}
          />
          <MenuItem 
            icon="log-out" 
            title="Keluar" 
            onPress={async () => {
              try {
                await AsyncStorage.removeItem('@user_register');
                await AsyncStorage.removeItem('@profile_data');
                await AsyncStorage.removeItem('@profile_image');
              } catch (error) {
                console.log('Error clearing storage on logout:', error);
              }
              router.replace('/LoginForm');
            }}
            isLogout 
          />
        </View>
        
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary || "#FFF5F7",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  gradientBorder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  imageInnerContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  menuBox: {
    backgroundColor: colors.background.pink || "#FFF",
    marginHorizontal: 16,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 15,
  },
});