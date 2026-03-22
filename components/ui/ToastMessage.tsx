import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ToastMessageProps = {
  visible: boolean;
  message: string;
  duration?: number;
  onHidden?: () => void;
  style?: ViewStyle;
  type?: "success" | "error" | "info";
};

export function ToastMessage({ visible, message, duration = 2000, onHidden, style, type = "info" }: ToastMessageProps) {
  const translateY = useRef(new Animated.Value(-100)).current;

  const getIconName = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      default:
        return "information-circle";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "#4ADE80";
      case "error":
        return "#F87171";
      default:
        return "#60A5FA";
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.delay(duration),
        Animated.timing(translateY, { toValue: -100, duration: 250, useNativeDriver: true }),
      ]).start(() => {
        onHidden?.();
      });
    } else {
      Animated.timing(translateY, { toValue: -100, duration: 200, useNativeDriver: true }).start();
    }
  }, [visible, duration, translateY, onHidden]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, style, { transform: [{ translateY }] }]}> 
      <Ionicons name={getIconName()} size={24} color={getIconColor()} />
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    marginTop:20,
    top: 10,
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
