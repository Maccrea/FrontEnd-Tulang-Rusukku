import { typography } from "@/Theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { colors } from "@/Theme/color";
import { PrimaryButton } from "./PrimaryButton";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface CustomHeaderProps {
  title?: string;
  onSave?: () => void; 
}

export const CustomHeader = ({ title, onSave }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftGroup}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>

        {title && (
          <Text style={[typography.variants.subTitle]}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.rightButtonContainer}>
        {onSave && (
          <PrimaryButton 
            title="Simpan" 
            width="auto" 
            onPress={onSave} 
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: 'transparent',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
  },
  backButton: {
    paddingRight: 8,
  },
  rightButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});