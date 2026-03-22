import { CustomHeader } from "@/components/ui/CustomHeader";
import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import CustomInput from '@/components/CustomInput';

export default function RiwayatCheck() {
    const [nama, setNama] = useState("");
    const [nik, setNik] = useState("");

    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader title="Check Riwayat Finansial" />
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.mainContainer}>
                        <Text style={[typography.variants.body,{marginBottom:25} ]}>
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
                            
                            {/* tanggal lahir nya belom sama checkbox ya*/}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.bottomSection}>
                <PrimaryButton
                    title="Cek Riwayat Sekarang"
                    onPress={() => {
                        console.log("Cek data:", { nik, nama });
                    }}
                    disabled={nik.length < 16 || !nama}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background.primary || "#FFF",
    },
    scrollContent: {
        flexGrow: 1,
    },
    mainContainer: {
        paddingHorizontal: 12, 
    },

    inputGroup: {
        gap: 10, 
    },
    bottomSection: {
        paddingHorizontal: 16, 
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
});