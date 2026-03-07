import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../Theme/color';
import { typography } from '../Theme/typography';

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void; // Fungsi untuk membuka Modal/Picker
}

export default function CustomDropdown({ 
  label, 
  placeholder, 
  value, 
  onPress 
}: CustomDropdownProps) {
  
  // Cek apakah user sudah pilih data atau masih kosong (placeholder)
  const hasValue = value && value !== '' && value !== 'dd' && value !== 'mm' && value !== 'yy';

  return (
    <View style={styles.container}>
      <Text style={[typography.variants.label, styles.label]}>{label}</Text>
      
      <TouchableOpacity 
        style={styles.inputContainer} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text 
          style={[
            typography.variants.textField, 
            styles.text,
            { color: hasValue ? colors.neutral[900] : colors.neutral[400] }
          ]}
        >
          {hasValue ? value : placeholder}
        </Text>
        
        <View style={styles.icon}>
          <Ionicons 
            name="chevron-down" 
            size={20} 
            color={colors.neutral[400]} 
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    backgroundColor: colors.navbar.background, 
    minHeight: 52, // Supaya tingginya sama dengan CustomInput
  },
  text: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  icon: {
    paddingRight: 16,
  },
});