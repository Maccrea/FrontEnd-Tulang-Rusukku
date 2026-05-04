import { CustomHeader } from "@/components/ui/CustomHeader";
import { EditSection, EditRow } from "@/components/ui/EditProfileWidget";
import { InfoRow } from "@/components/ui/InfoRow";
import { PhotoPickerModal } from "@/components/ui/PhotoPickerModel";
import { ToastMessage } from "@/components/ui/ToastMessage";
import { colors } from "@/Theme/color";
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; 

export default function AboutMeScreen() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/300'); 
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadProfileData();
    loadProfileImage();
  }, []);

  const loadProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem('@profile_data');
      if (data) {
        setProfileData(JSON.parse(data));
      } else {
        setProfileData({
          nama: "", suku: "", tempatLahir: "", DoB: {day: "", month: "", year: ""},
          tinggi: "", berat: "", aliranGereja: "", pelayanan: [],
          namaMentor: "", phone: "", anakKe: "", dariSaudara: "", penyakit: "",
          penghasilan: "", domisili: "", jumlahMotor: "", jumlahMobil: ""
        });
      }
      setLoading(false);
    } catch (error) {
      console.log('Error loading profile:', error);
      setLoading(false);
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

  const formatBulan = (month: string) => {
    if (!month) return "-";
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const idx = parseInt(month) - 1;
    return bulan[idx] || month;
  };

  const pilihFotoKartun = async () => {
    const imageUrl = 'https://api.dicebear.com/7.x/adventurer/png?seed=Lyneaa';
    setProfileImage(imageUrl);
    await AsyncStorage.setItem('@profile_image', imageUrl);
    setBottomSheetVisible(false);
  };

  const pilihDariGaleri = () => {
    setBottomSheetVisible(false);
  };

  const updateField = (key: string, value: string) => {
    setProfileData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleSaveToHP = async () => {
    try {
      setLoading(true);
      await AsyncStorage.setItem('@profile_data', JSON.stringify(profileData));
      await AsyncStorage.setItem('@profile_image', profileImage);
      setLoading(false);
      showToast("Data berhasil disimpan! 🎉");
    } catch (e) {
      console.log("Gagal simpan:", e);
      setLoading(false);
      Alert.alert("Gagal 😥", "Ada masalah saat menyimpan perubahan kamu.");
    }
  };

  if (loading || !profileData) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title="Tentang Saya" onSave={() => {}} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.navbar.blue} />
          <Text style={{marginTop: 10, color: '#888'}}>Memuat data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Tentang Saya" onSave={handleSaveToHP} />

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>

          <View style={styles.profileImageWrapper}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage}
              />
              <TouchableOpacity 
                style={styles.cameraIconContainer} 
                activeOpacity={0.8}
                onPress={() => setBottomSheetVisible(true)} 
              >
                <Ionicons name="camera" size={20} color={colors.navbar.blue || "#8DA4F7"} />
              </TouchableOpacity>
            </View>
          </View>

          <EditSection title="Profil Dasar">
            <EditRow label="Nama panggilan" value={profileData.nama} onChangeText={(text) => updateField('nama', text)} />
            <EditRow label="Suku" value={profileData.suku} onChangeText={(text) => updateField('suku', text)} />
            <EditRow label="Tinggi badan (cm)" value={profileData.tinggi?.toString()} onChangeText={(text) => updateField('tinggi', text)} />
            <EditRow label="Berat badan (kg)" value={profileData.berat?.toString()} onChangeText={(text) => updateField('berat', text)} />
          </EditSection>

          <EditSection title="Keimanan dan Kerohanian">
            <EditRow label="Aliran Gereja" value={profileData.aliranGereja} onChangeText={(text) => updateField('aliranGereja', text)} />
            <EditRow label="Pelayanan Gereja" value={profileData.pelayanan?.join(", ")} editable={false} />
            <EditRow label="Nama Mentor" value={profileData.namaMentor} onChangeText={(text) => updateField('namaMentor', text)} />
            <EditRow label="No. Mentor" value={profileData.phone} onChangeText={(text) => updateField('phone', text)} />
          </EditSection>

          <EditSection title="Latar Belakang Personal">
            <EditRow label="Urutan Keluarga" value={`Anak ke-${profileData.anakKe} dari ${profileData.dariSaudara}`} editable={false} />
            <EditRow label="Penyakit Bawaan" value={profileData.penyakit} onChangeText={(text) => updateField('penyakit', text)} />
            <EditRow label="Status Ayah" value={profileData.punyaAyah ? `Umur: ${profileData.umurAyah}` : "Sudah meninggal"} editable={false} />
            <EditRow label="Status Ibu" value={profileData.punyaIbu ? `Umur: ${profileData.umurIbu}` : "Sudah meninggal"} editable={false} />
          </EditSection>

          <EditSection title="Stabilitas Finansial">
            <EditRow label="Penghasilan" value={profileData.penghasilan} onChangeText={(text) => updateField('penghasilan', text)} />
            <EditRow label="Domisili" value={profileData.domisili} onChangeText={(text) => updateField('domisili', text)} />
            <EditRow label="Jumlah Motor" value={profileData.jumlahMotor?.toString()} onChangeText={(text) => updateField('jumlahMotor', text)} />
            <EditRow label="Jumlah Mobil" value={profileData.jumlahMobil?.toString()} onChangeText={(text) => updateField('jumlahMobil', text)} />
          </EditSection>

          <View style={styles.internalBox}>
            <Text style={styles.internalTitle}>Keamanan & Verifikasi Internal 🔒</Text>
            <InfoRow label="Nama Lengkap" value="Luvena Alysya" />
            <InfoRow label="Tempat" value="Semarang" />
            <InfoRow label="Tanggal Lahir" value="00 - 00 - 2007" />
            <InfoRow label="Alamat Lengkap" value="Kudus" />
            <InfoRow label="NIK KTP" value="0000000000" />
          </View>

        </View>
      </ScrollView>

      <PhotoPickerModal 
        visible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onSelectCartoon={pilihFotoKartun}
        onSelectGallery={pilihDariGaleri}
      />

      <ToastMessage
        visible={toastVisible}
        message={toastMessage}
        onHidden={() => setToastVisible(false)}
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
    width: 130, 
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