import { CustomHeader } from "@/components/ui/CustomHeader";
import { EditSection, EditRow } from "@/components/ui/EditProfileWidget";
import { InfoRow } from "@/components/ui/InfoRow";
import { colors } from "@/Theme/color";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { typography } from "@/Theme/typography";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutMeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Tentang Saya" onSave={() => console.log("Simpan!")} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          <EditSection title="Profil Dasar">
            <EditRow label="Nama panggilan" value="Lyneaa" onPress={() => { }} />
            <EditRow label="Suku" value="Jawa" onPress={() => { }} />
            <EditRow label="Tinggi badan" value="160 cm" onPress={() => { }} />
            <EditRow label="Berat badan" value="60 kg"  onPress={() => { }} />
          </EditSection>

          <EditSection title="Keimanan dan Kerohanian">
            <EditRow label="Jenis Gereja" value="GKI" onPress={() => { }} />
            <EditRow label="Nama Gereja" value="" onPress={() => { }} />
            <EditRow label="Pelayanan Gereja" value="" onPress={() => { }} />
          </EditSection>

          {/* <EditSection title="Latar Belakang Personal">
            anak keberapa dari berapa saudara
          </EditSection> */}

          <EditSection title="Stabilitas Finansial">
            <EditRow label="Jenis Pekerjaan" value="" onPress={() => { }} />
            <EditRow label="Penghasilan" value="" onPress={() => { }} />
            <EditRow label="Kepemilikan Tempat Tinggal" value="" onPress={() => { }} />
            <EditRow label="Kepemilikan Kendaraan" value="" onPress={() => { }} />
          </EditSection>


          <View style={styles.internalBox}>
            <Text style={styles.internalTitle}>
              Keamanan & Verifikasi Internal 🔒
            </Text>

            <InfoRow label="Nama Lengkap" value="Luvena Alysya" />
            <InfoRow label="Tanggal Lahir" value="00 - 00 - 2007" />
            <InfoRow label="Alamat Lengkap" value="Kudus" />
            <InfoRow label="NIK KTP" value="3374***********" />
          </View>
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
  },
  internalBox: {
    marginTop: 35,
  },
  internalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  infoList: {
    // Bisa ditambah background atau border jika ingin dikotakin
  }
});