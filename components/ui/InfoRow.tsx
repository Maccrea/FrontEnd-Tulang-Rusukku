import { colors } from "@/Theme/color";
import { StyleSheet, View, Text, ScrollView,TouchableOpacity } from "react-native";
import { typography } from "@/Theme/typography";
import { Ionicons } from "@expo/vector-icons";

export const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,

  },
  infoLabel: { color: '#888', fontSize: 16 }, // gatau deh, itu semi bold nya ga kedetect og
  infoValue: { color: '#333', fontWeight: '500', fontSize: 16 },
});