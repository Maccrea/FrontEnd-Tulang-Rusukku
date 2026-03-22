import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ViewStyle
} from "react-native";
import { colors } from "@/Theme/color";

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
  onChangeText?: (text: string) => void;
  isLast?: boolean;
  editable?: boolean; 
}

export const EditRow = ({ label, value, onChangeText, isLast, editable = true }: EditRowProps) => (
  <View style={[styles.editRow, isLast && { borderBottomWidth: 0 }]}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueWrapper}>
      <TextInput
        style={styles.value}
        value={value}
        onChangeText={onChangeText}
        editable={editable && !!onChangeText} 
        placeholder={`Ketik ${label.toLowerCase()} di sini`}
        placeholderTextColor="#CCC"
      />
    </View>
  </View>
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
    opacity: 0.5,
  },
  editRow: {
    flexDirection: 'column',
    paddingVertical: 14,
  },
  label: {
    fontSize: 16,
    color: colors.navbar.blue,
  },
  valueWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.navbar.blue, 
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: colors.text?.primary || "#888",
    fontWeight: '400',
    padding: 0,
  },
});