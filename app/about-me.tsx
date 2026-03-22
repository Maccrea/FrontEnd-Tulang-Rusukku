import { CustomHeader } from "@/components/ui/CustomHeader";
import { EditSection, EditRow } from "@/components/ui/EditProfileWidget";
import { InfoRow } from "@/components/ui/InfoRow";
import { PhotoPickerModal } from "@/components/ui/PhotoPickerModel"; 
import { colors } from "@/Theme/color";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; 

export default function AboutMeScreen() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/300'); // Foto default sementara

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem('@profile_data');
      if (data) {
        setProfileData(JSON.parse(data));
      }
      setLoading(false);
    } catch (error) {
      console.log('Error loading profile:', error);
      setLoading(false);
    }
  };

  const formatBulan = (month: string) => {
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const idx = parseInt(month) - 1;
    return bulan[idx] || month;
  };

  const pilihFotoKartun = () => {
    setProfileImage('https://api.dicebear.com/7.x/adventurer/png?seed=Lyneaa'); 
    setBottomSheetVisible(false);
  };

  const pilihDariGaleri = () => {
    setBottomSheetVisible(false);
  };

  if (loading || !profileData) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title="Tentang Saya" onSave={() => {}} />
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Tentang Saya" onSave={() => console.log("Simpan!")} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* BAGIAN FOTO PROFIL */}
          <View style={styles.profileImageWrapper}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: profileImage }} // Value foto diambil dari state
                style={styles.profileImage}
              />
              <TouchableOpacity 
                style={styles.cameraIconContainer} 
                activeOpacity={0.8}
                onPress={() => setBottomSheetVisible(true)} // Buka modal saat diklik
              >
                <Ionicons name="camera" size={20} color={colors.navbar.blue || "#8DA4F7"} />
              </TouchableOpacity>
            </View>
          </View>

          <EditSection title="Profil Dasar">
            <EditRow label="Nama panggilan" value={profileData.nama || "-"} onPress={() => { }} />
            <EditRow label="Suku" value={profileData.suku || "-"} onPress={() => { }} />
            <EditRow label="Tempat Lahir" value={profileData.tempatLahir || "-"} onPress={() => { }} />
            <EditRow label="Tanggal Lahir" value={`${profileData.DoB?.day} ${formatBulan(profileData.DoB?.month)} ${profileData.DoB?.year}`} onPress={() => { }} />
            <EditRow label="Tinggi badan" value={`${profileData.tinggi} cm`} onPress={() => { }} />
            <EditRow label="Berat badan" value={`${profileData.berat} kg`} onPress={() => { }} />
          </EditSection>

          <EditSection title="Keimanan dan Kerohanian">
            <EditRow label="Aliran Gereja" value={profileData.aliranGereja || "-"} onPress={() => { }} />
            <EditRow label="Pelayanan Gereja" value={profileData.pelayanan?.join(", ") || "-"} onPress={() => { }} />
            <EditRow label="Nama Mentor" value={profileData.namaMentor || "-"} onPress={() => { }} />
            <EditRow label="No. Mentor" value={profileData.phone || "-"} onPress={() => { }} />
          </EditSection>

          <EditSection title="Latar Belakang Personal">
            <EditRow label="Anak Ke" value={`${profileData.anakKe} dari ${profileData.dariSaudara}`} onPress={() => { }} />
            <EditRow label="Penyakit Bawaan" value={profileData.penyakit || "-"} onPress={() => { }} />
            <EditRow label="Status Ayah" value={profileData.punyaAyah ? `Umur: ${profileData.umurAyah}` : "Sudah meninggal"} onPress={() => { }} />
            <EditRow label="Status Ibu" value={profileData.punyaIbu ? `Umur: ${profileData.umurIbu}` : "Sudah meninggal"} onPress={() => { }} />
          </EditSection>

          <EditSection title="Stabilitas Finansial">
            <EditRow label="Penghasilan" value={profileData.penghasilan || "-"} onPress={() => { }} />
            <EditRow label="Domisili" value={profileData.domisili || "-"} onPress={() => { }} />
            <EditRow label="Jumlah Motor" value={`${profileData.jumlahMotor} unit`} onPress={() => { }} />
            <EditRow label="Jumlah Mobil" value={`${profileData.jumlahMobil} unit`} onPress={() => { }} />
          </EditSection>

          <View style={styles.internalBox}>
            <Text style={styles.internalTitle}>
              Keamanan & Verifikasi Internal 🔒
            </Text>
            <InfoRow label="Nama Lengkap" value="Luvena Alysya" />
            <InfoRow label="Tempat" value="Semarang" />
            <InfoRow label="Tanggal Lahir" value="00 - 00 - 2007" />
            <InfoRow label="Alamat Lengkap" value="Kudus" />
            <InfoRow label="NIK KTP" value="0000000000" />
          </View>

        </View>
      </ScrollView>

      {/* MODAL BOTTOM SHEET DIPANGGIL DI SINI */}
      <PhotoPickerModal 
        visible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onSelectCartoon={pilihFotoKartun}
        onSelectGallery={pilihDariGaleri}
      />

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internalBox: {
    marginTop: 30, 
  },
  internalTitle: {
    fontSize: 16,
    fontWeight: "700", 
    color: "#333",
    marginBottom: 5,
    paddingHorizontal: 4, 
  },
  profileImageWrapper: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25, 
  },
  imageContainer: {
    position: 'relative', 
  },
  profileImage: {
    width: 130, // Disesuaikan agar width dan height sama
    height: 130,
    borderRadius: 65,
    resizeMode: 'cover',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0, 
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, 
  },
});