import { CustomHeader } from "@/components/ui/CustomHeader";
import { MenuItem } from "@/components/ui/ProfileMenuItem";
import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface VerificationOptionProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

const VerificationOption = ({
  icon,
  title,
  description,
  onPress,
}: VerificationOptionProps) => (
  <View style={styles.optionContainer}>
    <MenuItem icon={icon} title={title} onPress={onPress} hideBorder={true} />
    <Text style={[typography.variants.label, styles.itemSubtitle]}>
      {description}
    </Text>
  </View>
);

export default function IdentityVerification() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} >
      <CustomHeader />

      <View style={styles.container}>
        <Text style={[typography.variants.h3, styles.titleText]}>
          Verifikasi Identitas
        </Text>

        <Text style={[typography.variants.body, styles.descriptionText]}>
          Mohon unggah dokumen berikut untuk memverifikasi akun Anda.
        </Text>

        <View style={styles.optionsWrapper}>
          <VerificationOption
            icon="card"
            title="Ambil Foto E-KTP"
            description="Untuk memverifikasi keaslian data diri dan identitas Anda."
            onPress={() => router.push("/ektp-cam")}
          />

          <VerificationOption
            icon="wallet"
            title="Cek Riwayat Finansial"
            description="Untuk meninjau rekam jejak finansial secara aman dan transparan."
            onPress={() => router.push("/bi-check")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    maxWidth: "85%",
    alignSelf: "center",
  },
  optionsWrapper: {
    marginTop: 10,
  },
  optionContainer: {
    marginBottom: 20,
  },
  itemSubtitle: {
    paddingLeft: 50,
    color: colors.text.primary,
    marginTop: -15,
    paddingHorizontal: 12,
  },
});
