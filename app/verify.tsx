import { CustomHeader } from "@/components/ui/CustomHeader";
import { colors } from "@/Theme/color";
import { StyleSheet, View } from "react-native";

export default function RefferalCode() {
  return (
    <View style={styles.container}>
      <CustomHeader />

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
