import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/Theme/color";

interface PhotoPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCartoon: () => void;
  onSelectGallery: () => void;
}

export const PhotoPickerModal = ({ visible, onClose, onSelectCartoon, onSelectGallery }: PhotoPickerModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetIndicator} />
          <Text style={styles.bottomSheetTitle}>Ubah Foto Profil</Text>

          <TouchableOpacity style={styles.sheetOption} onPress={onSelectCartoon}>
            <View style={[styles.iconBox, { backgroundColor: '#FFF0F5' }]}>
              <Ionicons name="happy-outline" size={24} color={colors.navbar.pink || "#FFB6C1"} />
            </View>
            <Text style={styles.sheetOptionText}>Gunakan Avatar Kartun</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sheetOption} onPress={onSelectGallery}>
            <View style={[styles.iconBox, { backgroundColor: '#F0F4FF' }]}>
              <Ionicons name="image-outline" size={24} color={colors.navbar.blue || "#8DA4F7"} />
            </View>
            <Text style={styles.sheetOptionText}>Unggah Foto Cantik (Galeri)</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  bottomSheetIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sheetOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});