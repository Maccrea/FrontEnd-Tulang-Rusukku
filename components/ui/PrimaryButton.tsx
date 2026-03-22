import React from "react";
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  DimensionValue,
  View
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  width?: DimensionValue;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton = ({ 
  title, 
  onPress, 
  isLoading, 
  disabled, 
  width = "100%", // Default sekarang 100%
  style, 
  textStyle 
}: PrimaryButtonProps) => {

  const currentColors = disabled || isLoading 
    ? ["#D1D1D1", "#D1D1D1"] 
    : [colors.navbar.blue, colors.navbar.pink];

  // Cek apakah tombol ini memakai ukuran full width
  const isFullWidth = width === "100%";

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[
        styles.container, 
        { width }, 
        isFullWidth ? { alignSelf: 'stretch' } : { alignSelf: 'center' }, // Logic dinamis
        style
      ]} 
    >
      <LinearGradient
        colors={currentColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradientButton,
          // Kalau full width, paddingnya ditebalkan sedikit biar proporsional
          isFullWidth && { paddingVertical: 16 } 
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={[typography.variants.button, textStyle]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});