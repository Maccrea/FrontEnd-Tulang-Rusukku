import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  label: string;
  count: number;
}

export const StatCard = ({ label, count }: StatCardProps) => (
  <View style={styles.card}>
    <Text style={typography.variants.label}>{count}</Text>
    <Text style={[typography.variants.body, { color: colors.text.primary }]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.pink,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
});
