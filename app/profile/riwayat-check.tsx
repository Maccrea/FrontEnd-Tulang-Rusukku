import { CustomHeader } from "@/components/ui/CustomHeader";
import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import CustomInput from '@/components/CustomInput';
import { Ionicons } from "@expo/vector-icons"; 
import CustomDropdown from '@/components/CustomDropdown'; 

export default function RiwayatCheck() {
    const [nama, setNama] = useState("");
    const [nik, setNik] = useState("");
    
    const [DoB, setDoB] = useState({ day: "", month: "", year: "" });
    const [isChecked, setIsChecked] = useState(false);

    const isFormValid = nik.length === 16 && nama.trim() !== "" && DoB.day !== "" && DoB.month !== "" && DoB.year !== "" && isChecked;

    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader title="Check Riwayat Finansial" />
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.mainContainer}>
                        <Text style={[typography.variants.body, {marginBottom: 25, color: '#666'}]}>
                            Data anda dilindungi enkripsi dan hanya digunakan untuk cek finansial.
                        </Text>

                        <View style={styles.inputGroup}>
                            <CustomInput
                                label="NIK (Nomor Induk Kependudukan)"
                                placeholder="Masukkan 16 digit NIK.."
                                value={nik}
                                onChangeText={setNik}
                                keyboardType="numeric"
                                maxLength={16}
                            />
                            
                            <CustomInput
                                label="Nama Lengkap"
                                placeholder="Sesuai yang tertera di E-KTP"
                                value={nama}
                                onChangeText={setNama}
                            />
                            
                            <Text style={styles.inputLabel}>Tanggal Lahir</Text>
                            <View style={styles.rowContainer}>
                              <View style={{ flex: 1, marginRight: 8, marginTop: -28 }}>
                                <CustomDropdown 
                                    label="" 
                                    placeholder="dd" 
                                    value={DoB.day} 
                                    onSelect={v => setDoB({ ...DoB, day: v })} 
                                    data={Array.from({ length: 31 }, (_, i) => (i + 1).toString())} 
                                />
                              </View>
                              <View style={{ flex: 1, marginRight: 8, marginTop: -28 }}>
                                <CustomDropdown 
                                    label="" 
                                    placeholder="mm" 
                                    value={DoB.month} 
                                    onSelect={v => setDoB({ ...DoB, month: v })} 
                                    data={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]} 
                                />
                              </View>
                              <View style={{ flex: 1, marginTop: -28 }}>
                                <CustomDropdown 
                                    label="" 
                                    placeholder="yy" 
                                    value={DoB.year} 
                                    onSelect={v => setDoB({ ...DoB, year: v })} 
                                    data={Array.from({ length: 60 }, (_, i) => (1965 + i).toString())} 
                                />
                              </View>
                            </View>

                            <TouchableOpacity 
                                style={styles.checkboxContainer} 
                                onPress={() => setIsChecked(!isChecked)}
                                activeOpacity={0.7}
                            >
                                <Ionicons 
                                    name={isChecked ? "checkbox" : "square-outline"} 
                                    size={22} 
                                    color={isChecked ? (colors.navbar.blue || "#8DA4F7") : "#9CA3AF"} 
                                />
                                <Text style={styles.checkboxText}>
                                    Saya setuju data di atas digunakan untuk pengecekan riwayat finansial (BI Checking) secara aman.
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.bottomSection}>
                <PrimaryButton
                    title="Cek Riwayat Sekarang"
                    onPress={() => {
                        console.log("Cek data:", { nik, nama, DoB });
                    }}
                    disabled={!isFormValid}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background.primary || "#FFF5F7",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20, 
    },
    mainContainer: {
        paddingHorizontal: 20, 
        paddingTop: 10,
    },
    inputGroup: {
        gap: 15, 
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        marginBottom: -10, 
        zIndex: 1, 
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        padding: 12,
    },
    checkboxText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        color: '#555',
        lineHeight: 18,
    },

    bottomSection: {
        paddingHorizontal: 16, 
        paddingVertical: 20,
    },
});