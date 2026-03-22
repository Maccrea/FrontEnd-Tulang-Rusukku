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
import CustomInput from "../CustomInput";

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  editRow: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 10,
  },
  label: { 
    fontSize: 15, 
    color: colors.text.grey, 
  },
  valueContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  value: { 
    fontSize: 15, 
    color: colors.navbar.blue, 
    fontWeight: '500' 
  },
});