import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { EditSection } from "@/components/ui/EditProfileWidget";
import { colors } from "@/Theme/color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SettingRow = ({ label, onPress, isDestructive = false }: { label: string, onPress: () => void, isDestructive?: boolean }) => (
  <TouchableOpacity style={styles.rowContainer} onPress={onPress} activeOpacity={0.7}>
    <Text style={[styles.label, isDestructive && styles.destructiveText]}>{label}</Text>
    {!isDestructive && <Ionicons name="chevron-forward" size={18} color="#CCC" />}
  </TouchableOpacity>
);

const SettingSwitch = ({ label, value, onValueChange }: { label: string, value: boolean, onValueChange: (val: boolean) => void }) => (
  <View style={styles.rowContainer}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      trackColor={{ false: "#E5E7EB", true: colors.navbar.pink || "#FFB6C1" }}
      thumbColor={"#FFFFFF"}
      ios_backgroundColor="#E5E7EB"
      onValueChange={onValueChange}
      value={value}
      style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}  
    />
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [isGhostMode, setIsGhostMode] = useState(false);
  const [notifMatch, setNotifMatch] = useState(true);
  const [notifMessage, setNotifMessage] = useState(true);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Hapus Akun Permanen",
      "Apakah kamu yakin ingin menghapus akun? Semua data profil, match, dan isi chat kamu akan hilang selamanya.",
      [
        { text: "Batal", style: "cancel" },
        { text: "Ya, Hapus", onPress: () => console.log("Akun berhasil dihapus!"), style: "destructive" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Pengaturan Aplikasi" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          <EditSection title="Akun & Privasi">
            <SettingRow label="Ubah Kata Sandi" onPress={() => router.push("/profile/change-password")} />
            <SettingRow label="Daftar Blokir (Blocked Users)" onPress={() => router.push("/profile/block-lists")} />
            {/* <SettingSwitch 
              label="Mode Penyamaran (Ghost Mode)" 
              value={isGhostMode} 
              onValueChange={setIsGhostMode} 
            /> */}
          </EditSection>

          <EditSection title="Notifikasi">
            <SettingSwitch 
              label="Notifikasi Match Baru" 
              value={notifMatch} 
              onValueChange={setNotifMatch} 
            />
            <SettingSwitch 
              label="Notifikasi Pesan Masuk" 
              value={notifMessage} 
              onValueChange={setNotifMessage} 
            />
          </EditSection>

          <EditSection title="Manajemen Akun">
            <SettingRow 
              label="Nonaktifkan Akun Sementara" 
              onPress={() => console.log("Akun sedang tidur/nonaktif")} 
            />
            <SettingRow 
              label="Hapus Akun Permanen" 
              onPress={handleDeleteAccount} 
              isDestructive={true} 
            />
          </EditSection>

          <Text style={styles.versionText}>Tulang Rusukku v1.0.0</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary || "#FFF5F7",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  label: {
    fontSize: 15,
    color: "#444",
    fontWeight: "500",
  },
  destructiveText: {
    color: "#EF4444",
    fontWeight: "600",
  },
  versionText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 35,
    marginBottom: 10,
  }
});