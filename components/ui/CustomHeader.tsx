import { typography } from "@/Theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface CustomHeaderProps {
  title?: string;
  // ya kalo emg gamau ada text nya, cukup panggil <CustomHeader />
}

export const CustomHeader = ({ title }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer as ViewStyle}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={25} color="black" />
      </TouchableOpacity>

      {title && <Text style={[typography.variants.subTitle]}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 16,
  },
});
