import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

interface Props {
  label: string;
  data: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function CustomChipSelect({ label, data, selectedValue, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {/* Teks Deskripsi yang berubah sesuai pilihan */}
      <Text style={styles.selectedDisplayText}>
        {selectedValue ? selectedValue : "Pilih status"}
      </Text>

      <View style={styles.chipContainer}>
        {data.map((item) => {
          const isSelected = selectedValue === item;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                isSelected && styles.chipSelected
              ]}
              onPress={() => onSelect(item)}
            >
              <Text style={[
                styles.chipText,
                isSelected && styles.chipTextSelected
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    ...typography.variants.h4,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  selectedDisplayText: {
    ...typography.variants.body,
    color: colors.neutral[500],
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: colors.neutral[300],
    backgroundColor: 'transparent',
  },
  chipSelected: {
    borderColor: '#000000', 
    backgroundColor: 'transparent',
  },
  chipText: {
    ...typography.variants.body,
    color: colors.neutral[700],
  },
  chipTextSelected: {
    color: '#000000',
    fontWeight: '600',
  },
});