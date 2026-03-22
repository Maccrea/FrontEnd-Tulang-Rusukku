import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

export default function EKtpCameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  // // 1. Handling Izin Kamera
  // if (!permission) return <View style={styles.container} />;

  // if (!permission.granted) {
  //   return (
  //     <View style={styles.centerContainer}>
  //       <Text style={styles.textCenter}>
  //         Aplikasi butuh akses kamera untuk memverifikasi E-KTP kamu.
  //       </Text>
  //       <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
  //         <Text style={styles.btnText}>Beri Izin Kamera</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  // 2. Fungsi Ambil Foto
  // const takePicture = async () => {
  //   if (cameraRef.current && !isTakingPicture) {
  //     try {
  //       setIsTakingPicture(true);
  //       const photo = await cameraRef.current.takePictureAsync({
  //         quality: 0.7,
  //         skipProcessing: false,
  //       });

  //       console.log("Foto berhasil diambil:", photo?.uri);

  //       // Contoh: Navigasi ke halaman preview atau tampilkan Alert
  //       Alert.alert("Berhasil", "Foto E-KTP telah diambil!", [
  //         { text: "OK", onPress: () => router.back() }
  //       ]);
  //     } catch (e) {
  //       console.log("Error ambil foto:", e);
  //       Alert.alert("Error", "Gagal mengambil gambar.");
  //     } finally {
  //       setIsTakingPicture(false);
  //     }
  //   }
  // };

  // return (
  //   // <View style={styles.container}>
  //   //   <CameraView
  //   //     ref={cameraRef}
  //   //     style={styles.camera}
  //   //     facing="back"
  //   //     autofocus="on"
  //   //   >
  //   //     {/* HEADER */}
  //   //     <View style={styles.header}>
  //   //       <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
  //   //         <Ionicons name="chevron-back" size={30} color="white" />
  //   //       </TouchableOpacity>
  //   //       <Text style={[typography.variants.h4, { color: "white" }]}>Foto E-KTP</Text>
  //   //       <View style={{ width: 30 }} />
  //   //     </View>

  //   //     {/* OVERLAY BINGKAI (Di-set Absolute agar Center) */}
  //   //     <View style={StyleSheet.absoluteFill} pointerEvents="none">
  //   //       <View style={styles.mask} />
  //   //       <View style={styles.middleRow}>
  //   //         <View style={styles.mask} />
  //   //         <View style={styles.frame} />
  //   //         <View style={styles.mask} />
  //   //       </View>
  //   //       <View style={styles.mask} />
  //   //     </View>

  //   //     {/* FOOTER & TOMBOL JEPRET */}
  //   //     <View style={styles.footer}>
  //   //       <Text style={[typography.variants.body, styles.instruction]}>
  //   //         Posisikan E-KTP kamu di dalam bingkai dan pastikan tulisan terbaca jelas.
  //   //       </Text>

  //   //       <View style={styles.shutterContainer}>
  //   //         {/* Kita tambah lingkaran luar yang agak transparan untuk aksen */}
  //   //         <TouchableOpacity
  //   //           style={[styles.shutterBtn, isTakingPicture && { opacity: 0.5 }]}
  //   //           onPress={takePicture}
  //   //           disabled={isTakingPicture}
  //   //         >
  //   //           <View style={styles.shutterInner} />
  //   //         </TouchableOpacity>
  //   //       </View>
  //   //     </View>
  //   //   </CameraView>
  //   // </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black"
//   },
//   camera: {
//     flex: 1
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     zIndex: 10,
//   },
//   backBtn: {
//     padding: 5
//   },

//   // Gaya Overlay Masking
//   middleRow: {
//     flexDirection: "row",
//     height: 220
//   },
//   mask: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)"
//   },
//   frame: {
//     width: 320,
//     height: 220,
//     borderWidth: 2,
//     borderColor: "white",
//     borderRadius: 16,
//     backgroundColor: "transparent",
//   },

//   footer: {
//     position: 'absolute',
//     bottom: 50,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//     zIndex: 10,
//   },
//   instruction: {
//     color: "white",
//     textAlign: "center",
//     paddingHorizontal: 50,
//     marginBottom: 30,
//     textShadowColor: 'rgba(0, 0, 0, 0.8)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 5
//   },
//   shutterBtn: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 5,
//     borderColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   shutterInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "white",
//   },

//   // State Izin Kamera
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 30,
//     backgroundColor: "#FFF"
//   },
//   textCenter: {
//     textAlign: "center",
//     fontSize: 16,
//     marginBottom: 20,
//     color: "#333"
//   },
//   permissionBtn: {
//     backgroundColor: colors.icon.bottom || "#CAC0FF",
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 12
//   },
//   btnText: {
//     color: "white",
//     fontWeight: "600"
//   }
// });