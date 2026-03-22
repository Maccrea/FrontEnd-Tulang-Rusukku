import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { colors } from "@/Theme/color";
import { Ionicons } from "@expo/vector-icons";
// import CustomInput from "../CustomInput"; // Boleh di-uncomment kalau nanti butuh

interface EditSectionProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const EditSection = ({ title, children, style }: EditSectionProps) => (
  <View style={[styles.sectionContainer, style]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>
      {children}
    </View>
  </View>
);

interface EditRowProps {
  label: string;
  value: string;
  onPress: () => void;
  isLast?: boolean;
}

export const EditRow = ({ label, value, onPress, isLast }: EditRowProps) => (
  <TouchableOpacity
    style={[styles.editRow, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueWrapper}>
      <Text style={styles.value}>{value}</Text>
    </View>  
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 25,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.background.pink,
    borderRadius: 16,
    paddingHorizontal: 16,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 8,
    // elevation: 2,
  },
  editRow: {
    flexDirection: 'column',
    paddingVertical: 14,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 16,
    color: colors.navbar.blue,
  },
  value: {
    fontSize: 16,
    color: colors.text?.primary || "#888",
    fontWeight: '400'
  },
  valueWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor:  colors.navbar.blue, 
    borderRadius: 10,
    padding: 10,
    marginTop:10,
    // backgroundColor: '#FAFAFA',
  },
});