import { CustomHeader } from "@/components/ui/CustomHeader";
import { colors } from "@/Theme/color";
import { StyleSheet, View } from "react-native";

export default function AboutMeScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title="Tentang Saya" />

      <View style={{ padding: 20 }}>{}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
