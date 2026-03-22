import { colors } from "@/Theme/color";
import { typography } from "@/Theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  icon: any;
  title: string;
  onPress: () => void;
  hideBorder?: boolean;
  isLogout?: boolean;
}

export const MenuItem = ({
  icon,
  title,
  onPress,
  hideBorder = false,
  isLogout = false,
}: MenuItemProps) => (
  <TouchableOpacity
    style={[styles.menuRow, hideBorder && { borderBottomWidth: 0 }]}
    onPress={onPress}
  >
    <View style={styles.leftSection}>
      <Ionicons
        name={icon}
        size={22}
        color={
          isLogout ? colors.semantic.error || "#FF4D4D" : colors.icon.bottom
        }
      />
      <Text
        style={[
          typography.variants.label,
          styles.menuTitle,
          isLogout && { color: "#FF4D4D" },
        ]}
      >
        {title}
      </Text>
    </View>

    {!isLogout && (
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.icon.bottom || "#CCC"}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.icon.bottom || "#CAC0FF", //la jd ungu?
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuTitle: {
    marginLeft: 15,
  },
});
