import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  SearchBar
} from './SearchBar';
interface VendorSearchHeaderProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  location: string;
  onLocationChange: (loc: string) => void;

}

const KOTA_PILIHAN = [
  'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Pusat',
  'Jakarta Timur', 'Jakarta Utara', 'Tangerang Selatan',
  'Depok', 'Bekasi', 'Bogor'
];

export const VendorSearchHeader = ({ searchText, onSearchChange, location, onLocationChange }: VendorSearchHeaderProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchLocationText, setSearchLocationText] = useState('');
  const handleSelectLocation = (kota: string) => {
    onLocationChange(kota);
    setModalVisible(false);
    setSearchLocationText('');
  };

  const filteredKota = KOTA_PILIHAN.filter(kota => 
    kota.toLowerCase().includes(searchLocationText.toLowerCase())
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.locationContainer}
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.locationLabel}>Lokasi kencan <Ionicons name="chevron-down" size={12} /></Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={18} color="#EF4444" />
          <Text style={styles.locationValue}>{location}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari buket bunga, coklat, atau paket EO..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={onSearchChange}
        />
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Lokasi Kencan</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <SearchBar
              value={searchText}
              onChangeText={setSearchLocationText}
              placeholder="Cari lokasi kekasih kamu disini"
            />

            <FlatList
              data={filteredKota}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationOption}
                  onPress={() => handleSelectLocation(item)}
                >
                  <Text style={[styles.locationOptionText, location === item && styles.locationOptionActive]}>
                    {item}
                  </Text>
                  {location === item && <Ionicons name="checkmark" size={20} color="#EF4444" />}
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 4,
  },
  searchContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '60%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  locationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  locationOptionText: {
    fontSize: 15,
    color: '#444',
  },
  locationOptionActive: {
    color: '#EF4444', // Merah sesuai warna pin lokasi
    fontWeight: '700',
  },
});