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
  width?: DimensionValue; // Bisa diisi "100%", 200, atau biarkan kosong untuk hug content
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton = ({ 
  title, 
  onPress, 
  isLoading, 
  disabled, 
  width, 
  style, 
  textStyle 
}: PrimaryButtonProps) => {

  const currentColors = disabled || isLoading 
    ? ["#D1D1D1", "#D1D1D1"] 
    : [colors.navbar.blue, colors.navbar.pink];

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[styles.container, { width }, style]} 
    >
      <LinearGradient
        colors={currentColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
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
    alignSelf: 'center', 
  },
  gradientButton: {
    paddingHorizontal: 18, 
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});