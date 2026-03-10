import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'; // Tambah TextInput
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/color';
import { typography } from '../Theme/typography';

interface CustomStepperProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChangeText?: (text: string) => void; // Tambah prop optional untuk mengetik
}

export default function CustomStepper({ 
  label, 
  value, 
  onIncrement, 
  onDecrement, 
  onChangeText 
}: CustomStepperProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepperContainer}>
        {/* Tombol Kurang (-) */}
        <TouchableOpacity style={styles.button} onPress={onDecrement} activeOpacity={0.7}>
          <Ionicons name="remove" size={24} color={colors.neutral[900]} />
        </TouchableOpacity>

        {/* Input Angka (Bisa Diketik) */}
        <View style={styles.valueContainer}>
          <TextInput
            style={[typography.variants.body, styles.valueText]}
            value={value.toString()} // Ubah ke string agar bisa dibaca TextInput
            onChangeText={onChangeText}
            keyboardType="numeric"
            textAlign="center"
            selectTextOnFocus={true} // Otomatis select semua teks pas diklik biar gampang hapusnya
          />
        </View>

        {/* Tombol Tambah (+) */}
        <TouchableOpacity style={styles.button} onPress={onIncrement} activeOpacity={0.7}>
          <Ionicons name="add" size={24} color={colors.neutral[900]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    ...typography.variants.body,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.neutral[900],
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.navbar.background, 
    borderWidth: 2,
    borderColor: '#E5E5EA', 
    borderRadius: 14, 
    height: 54, 
    paddingHorizontal: 10,
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center', // Pastikan TextInput berada di tengah secara vertikal
  },
  valueText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[900],
    paddingVertical: 0, // Hilangkan padding default Android agar text beneran di tengah
  },
});