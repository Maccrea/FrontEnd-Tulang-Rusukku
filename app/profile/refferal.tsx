import { CustomHeader } from "@/components/ui/CustomHeader";
import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RefferalCode() {
  const myCode = "TULANG69"; // examplee ja

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Kode Referral" />
      
      <View style={styles.container}>
        <Text style={[typography.variants.body, {marginBottom:20}]}>
          Dapatkan bonus coin setiap partner yang menggunakan code anda.
        </Text>

        <View style={styles.referralCard}>
          <Text style={[typography.variants.label, { color: '#666' }]}>Kode Saya</Text>
          <View style={styles.codeRow}>
            <Text style={[typography.variants.h2, styles.codeText]}>{myCode}</Text>
            <TouchableOpacity onPress={() => console.log("Copy Code")}>
              <Ionicons name="copy" size={24} color={colors.navbar.blue} />
            </TouchableOpacity>
          </View>
        </View>

        {/* i mean ni buat kalo misal mau detect stat nyaa? */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={typography.variants.h4}>12</Text>
            <Text style={typography.variants.label}>Teman</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={typography.variants.h4}>1.200</Text>
            <Text style={typography.variants.label}>Coin</Text>
          </View>
        </View>
      </View>

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary || "#FFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  infoText: {
    marginBottom: 25,
    color: "#666",
  },
  referralCard: {
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: 'center',
    marginBottom: 20,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 8,
  },
  codeText: {
    fontWeight: '800',
    letterSpacing: 2,
    color: "#333",
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: (colors.navbar.blue || "#B1BDF3") + "10",
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#DDD",
  },
  bottomSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
});