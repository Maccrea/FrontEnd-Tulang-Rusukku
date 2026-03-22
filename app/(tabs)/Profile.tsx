import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { MenuItem } from "@/components/ui/ProfileMenuItem";
import { StatCard } from "@/components/ui/StatCrad";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();

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
                source={{ uri: "https://via.placeholder.com/120" }}
                style={styles.profileImage}
              />
            </View>
          </LinearGradient>

          <Text style={[typography.variants.h4, { marginTop: 15 }]}>
            Alyaa Rana Raya
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
            onPress={() => router.push("/about-me")}
          />
          <MenuItem
            icon="copy"
            title="Keamanan dan Verifikasi"
            onPress={() => router.push("/verify")}
          />
          <MenuItem
            icon="shield-checkmark"
            title="Kode Referral"
            onPress={() => router.push("/refferal")}
          />
        </View>

        <View style={styles.menuBox}>
          <MenuItem
            icon="settings"
            title="Pengaturan Aplikasi"
            onPress={() => router.push("/settings")}
          />
          <MenuItem
            icon="headset"
            title="Pusat Bantuan"
            onPress={() => router.push("/helper")}
          />
          <MenuItem 
            icon="log-out" 
            title="Keluar" 
            onPress={() => console.log("Logout")} 
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