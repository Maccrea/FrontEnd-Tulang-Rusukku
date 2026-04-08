import React, { useState } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/color';
import { typography } from '../Theme/typography';

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  data: string[];
  onSelect: (item: string) => void;
}

export default function CustomDropdownV2({
  label,
  value, // Nilai yang dipilih (misal: "Semarang")
  data,
  onSelect
}: Omit<CustomDropdownProps, 'placeholder'>) { // Placeholder dibuang

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const hasValue = value && value !== '';

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.labelTitle}>{label}</Text>

      {/* Teks Deskripsi Langsung Pakai Value */}
      <Text style={styles.selectedDisplayText}>
        {hasValue ? value : "Belum dipilih"}
      </Text>

      <TouchableOpacity
        style={[styles.dropdownTrigger, open && { borderColor: colors.neutral[400] }]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            typography.variants.textField,
            { color: hasValue ? colors.neutral[800] : colors.neutral[400], flex: 1 }
          ]}
        >
          {hasValue ? value : "Pilih..."}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.neutral[500]}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          {/* SEARCH INPUT */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color={colors.neutral[400]}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={[typography.variants.textField, styles.searchInput]}
              placeholder="Cari..."
              placeholderTextColor={colors.neutral[400]}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* LIST ITEMS */}
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                  setSearch('');
                }}
              >
                <Text style={[typography.variants.label, styles.itemText]}>
                  {item}
                </Text>

                {value === item && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.neutral[900]} // Ceklis hitam simpel
                  />
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Tidak ditemukan</Text>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%"
  },
  labelTitle: {
    ...typography.variants.h4, 
    color: colors.neutral[900],
    marginBottom: 3,
  },
  selectedDisplayText: {
    ...typography.variants.body,
    color: colors.neutral[500], 
    marginBottom: 15,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    backgroundColor: '#FAFAFA', 
    borderWidth: 1,
    borderColor: colors.neutral[200], 
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    maxHeight: 250,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden'
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FAFAFA"
  },
  itemText: {
    color: colors.neutral[700],
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: colors.neutral[300]
  }
});