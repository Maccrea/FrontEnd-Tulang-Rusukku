import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastMessage } from "@/components/ui/ToastMessage";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function EKtpCameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [ektpData, setEktpData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  React.useEffect(() => {
    const loadSavedEktp = async () => {
      try {
        const savedUri = await AsyncStorage.getItem('@ektp_photo_uri');
        const savedData = await AsyncStorage.getItem('@ektp_ocr_data');

        if (savedUri) {
          setCapturedPhoto(savedUri);
        }
        if (savedData) {
          setEktpData(JSON.parse(savedData));
        }
      } catch (error) {
        console.log('Error loading saved E-KTP:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedEktp();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#FFF' }}>Memuat data E-KTP...</Text>
      </View>
    );
  }

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.textCenter}>
          Aplikasi butuh akses kamera untuk memverifikasi E-KTP kamu.
        </Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.btnText}>Beri Izin Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isTakingPicture) {
      try {
        setIsTakingPicture(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          skipProcessing: false,
        });

        console.log("Foto berhasil diambil:", photo?.uri);
        
        if (photo?.uri) {
            setCapturedPhoto(photo.uri);
        }

      } catch (e) {
        console.log("Error ambil foto:", e);
        Alert.alert("Error", "Gagal mengambil gambar.");
      } finally {
        setIsTakingPicture(false);
      }
    }
  };
  const showToastAndGoBack = () => {
    setToastMessage("Data KTP berhasil disimpan! 🎉");
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      router.back();
    }, 2200);
  };
const handleConfirmData = async () => {
    try {
      if (capturedPhoto) {
        await AsyncStorage.setItem('@ektp_photo_uri', capturedPhoto);
      }

      const mockDataKTP = {
        nik: "3321012345678900",
        nama: "Luvena Alysya",
        ttl: "Semarang, 15-08-2007",
        alamat: "Jl. Kenangan No. 12, Kudus"
      };
      await AsyncStorage.setItem('@ektp_ocr_data', JSON.stringify(mockDataKTP));
      setEktpData(mockDataKTP);

      showToastAndGoBack();
    } catch (e) {
      console.log("Error simpan data E-KTP:", e);
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan data.");
    }
  };

  
  if (capturedPhoto) {
    return (
      <SafeAreaView style={styles.resultContainer}>
        <CustomHeader title="Scan E-KTP"/>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.previewImageContainer}>
            <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
          </View>

          <View style={styles.dataCard}>
            <View style={styles.dataCardHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#4ADE80" />
              <Text style={styles.dataCardTitle}>Verifikasi Berhasil</Text>
            </View>
            <Text style={styles.dataCardSubtitle}>Berikut adalah data yang terbaca dari KTP kamu:</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>NIK</Text>
              <Text style={styles.infoValue}>{ektpData?.nik || '3321012345678900'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nama Lengkap</Text>
              <Text style={styles.infoValue}>{ektpData?.nama || 'Luvena Alysya'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tempat/Tgl Lahir</Text>
              <Text style={styles.infoValue}>{ektpData?.ttl || 'Semarang, 15-08-2007'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Alamat</Text>
              <Text style={styles.infoValue}>{ektpData?.alamat || 'Jl. Kenangan No. 12, Kudus'}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <PrimaryButton title="Ungah dan Lanjutkan" onPress={handleConfirmData}/>
            <TouchableOpacity style={styles.btnWrapper} onPress={() => setCapturedPhoto(null)} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.primary as [string, string, ...string[]]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.gradientBorder}
              >
                <View style={styles.retakeBtnInner}>
                  <Text style={styles.retakeBtnText}>Foto Ulang</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
           
          </View>
        </ScrollView>
        <ToastMessage
          visible={toastVisible}
          message={toastMessage}
          onHidden={() => setToastVisible(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        autofocus="on"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={[typography.variants.h4, { color: "white" }]}>Foto E-KTP</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.mask} />
          <View style={styles.middleRow}>
            <View style={styles.mask} />
            <View style={styles.frame} />
            <View style={styles.mask} />
          </View>
          <View style={styles.mask} />
        </View>

        <View style={styles.footer}>
          <Text style={[typography.variants.body, styles.instruction]}>
            Posisikan E-KTP kamu di dalam bingkai dan pastikan tulisan terbaca jelas.
          </Text>

          <View style={styles.shutterContainer}>
            <TouchableOpacity
              style={[styles.shutterBtn, isTakingPicture && { opacity: 0.5 }]}
              onPress={takePicture}
              disabled={isTakingPicture}
            >
              <View style={styles.shutterInner} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  camera: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 60, paddingHorizontal: 20, zIndex: 10 },
  backBtn: { padding: 5 },
  middleRow: { flexDirection: "row", height: 220 },
  mask: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  frame: { width: 320, height: 220, borderWidth: 2, borderColor: "white", borderRadius: 16, backgroundColor: "transparent" },
  footer: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: "center", zIndex: 10 },
  instruction: { color: "white", textAlign: "center", paddingHorizontal: 50, marginBottom: 30, textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5 },
  shutterContainer: {},
  shutterBtn: { width: 80, height: 80, borderRadius: 40, borderWidth: 5, borderColor: "white", justifyContent: "center", alignItems: "center" },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: "white" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 30, backgroundColor: "#FFF" },
  textCenter: { textAlign: "center", fontSize: 16, marginBottom: 20, color: "#333" },
  permissionBtn: { backgroundColor: colors.icon.bottom || "#CAC0FF", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 },
  btnText: { color: "white", fontWeight: "600" },

  resultContainer: {
    flex: 1,
    backgroundColor: colors.background.primary || "#FFF5F7",
  },
  previewImageContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: "#E5E7EB",
  },
  previewImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  dataCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dataCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dataCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
  },
  dataCardSubtitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  infoLabel: {
    fontSize: 14,
    color: "#888",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  
  actionButtons: {
    flexDirection: "column", 
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 15, 
  },
  btnWrapper: {
    flex: 1,
    borderRadius: 12,
    shadowColor: colors.navbar.blue || "#8DA4F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  gradientBorder: {
    padding: 1.5, 
    borderRadius: 12,
  },
  retakeBtnInner: {
    backgroundColor: "#FFFFFF", 
    paddingVertical: 13.5, 
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  retakeBtnText: {
    color: colors.text.primary,
    // color: colors.navbar.pink || "#EFA7C2",
    fontWeight: "400",
    fontSize: 15,
  },
});