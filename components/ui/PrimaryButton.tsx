import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";

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
  width = "100%", 
  style, 
  textStyle 
}: PrimaryButtonProps) => {

  const currentColors = disabled || isLoading 
    ? ["#D1D1D1", "#D1D1D1"] 
    : [colors.navbar.blue, colors.navbar.pink];
  const isFullWidth = width === "100%";

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[
        styles.container, 
        { width }, 
        isFullWidth ? { alignSelf: 'stretch' } : { alignSelf: 'center' }, 
        style
      ]} 
    >
      <LinearGradient
        colors={currentColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradientButton,
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