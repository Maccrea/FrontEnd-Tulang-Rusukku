
import { CustomHeader } from "@/components/ui/CustomHeader";
import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function BiCheckScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={[typography.variants.h3, styles.titleText]}>
            BI Checking
          </Text>
          <Text style={[typography.variants.body, styles.descriptionText]}>
            Tinjau rekam jejak finansial Anda secara aman untuk mempermudah proses verifikasi.
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.row}>
              <Ionicons name="shield-checkmark" size={24} color={colors.icon.bottom || "#CAC0FF"} />
              <Text style={[typography.variants.h4, styles.cardTitle]}>Status Skor Kredit</Text>
            </View>
            <Text style={[typography.variants.label, styles.cardValue]}>
              Data Anda akan ditarik secara real-time dari sistem informasi layanan keuangan.
            </Text>
          </View>

          <View style={styles.instructionSection}>
            <Text style={[typography.variants.label, { fontWeight: '600', marginBottom: 12 }]}>
              Langkah-langkah:
            </Text>
            <View style={styles.stepRow}>
              <View style={styles.dot} />
              <Text style={typography.variants.label}>Hubungkan akun perbankan/SLIK.</Text>
            </View>
            <View style={styles.stepRow}>
              <View style={styles.dot} />
              <Text style={typography.variants.label}>Tunggu proses penarikan data selesai.</Text>
            </View>
            <View style={styles.stepRow}>
              <View style={styles.dot} />
              <Text style={typography.variants.label}>Hasil akan muncul secara otomatis.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Cek Riwayat Sekarang"
          onPress={() => router.push("/riwayat-check")}        
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary || "#FFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titleText: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: "center",
    color: "#737373",
    marginBottom: 30,
    lineHeight: 22,
    alignSelf: "center",
  },
  infoCard: {
    backgroundColor: colors.background.pink,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.icon.bottom || "#CAC0FF",
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  cardValue: {
    color: "#555",
    lineHeight: 18,
  },
  instructionSection: {
    paddingHorizontal: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.icon.bottom || "#CAC0FF",
    marginRight: 10,
  },
  bottomSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  primaryButton: {
    backgroundColor: colors.icon.bottom || "#CAC0FF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});