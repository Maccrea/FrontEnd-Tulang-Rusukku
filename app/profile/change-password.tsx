import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ToastMessage } from "@/components/ui/ToastMessage";
import { colors } from "@/Theme/color";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from '@/components/CustomInput';
import { typography } from '@/Theme/typography';

export default function ChangePasswordScreen() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const isFormValid = oldPassword.length >= 6 && newPassword.length >= 6 && confirmPassword.length >= 6;

  const showToast = (message: string, success: boolean) => {
    setToastMessage(message);
    setIsSuccess(success);
    setToastVisible(true);
    
    setTimeout(() => {
      setToastVisible(false);
      if (success) {
        router.back();
      }
    }, 2200);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      showToast("Password baru tidak cocok!", false);
      return;
    }

    if (oldPassword === newPassword) {
      showToast("Password baru tidak boleh sama dengan yang lama!", false);
      return;
    }

    console.log("Menyimpan password baru...");
    showToast("Kata sandi berhasil diubah! 🎉", true);
  };


  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Ubah Kata Sandi" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            
            <Text style={typography.variants.body}>
              Pastikan kata sandi baru kamu kuat dan tidak mudah ditebak oleh orang lain.
            </Text>

            <View style={styles.formGroup}>
              <CustomInput
                label="Kata Sandi Saat Ini"
                placeholder="Masukkan kata sandi lama"
                value={oldPassword}
                onChangeText={setOldPassword}
                isPassword={true}
              />

              <CustomInput
                label="Kata Sandi Baru"
                placeholder="Masukkan kata sandi baru"
                value={newPassword}
                onChangeText={setNewPassword}
                isPassword={true}
              />

              <CustomInput
                label="Konfirmasi Kata Sandi Baru"
                placeholder="Ulangi kata sandi baru"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword={true}
              />
            
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Simpan Kata Sandi"
          onPress={handleSavePassword}
          disabled={!isFormValid} 
        />
      </View>

      <ToastMessage
        visible={toastVisible}
        message={toastMessage}
        type={isSuccess ? "success" : "error"}
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

    paddingBottom: 40,
  },
  formGroup: {
    marginTop:20
  },
  bottomSection: {
    paddingHorizontal: 16, 
    paddingVertical: 20,
  },
});