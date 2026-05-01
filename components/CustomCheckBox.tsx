import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

interface CustomCheckboxProps {
  label?: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, options, selected, onChange }) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[typography.variants.h2, styles.label]}>
          {label}
        </Text>
      )}
      
      {options.map((option, idx) => {
        const isSelected = selected.includes(option);
        return (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.7}
            style={[
              styles.optionContainer,
              isSelected && styles.optionSelected // Highlight background kalau terpilih
            ]}
            onPress={() => toggleOption(option)}
          >
            <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
              {isSelected && <Ionicons name="checkmark" size={18} color="#FFF" />}
            </View>
            <Text style={[typography.variants.body, styles.optionText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4, 
  },
  optionSelected: {
    backgroundColor: '#F3E9F5', 
  },
  checkbox: {
    width: 25, 
    height: 25,
    borderRadius: 4,
    borderWidth: 2, 
    borderColor: '#E5E5EA', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  checkboxActive: {
    backgroundColor: '#C175B0',
    borderColor: '#C175B0',
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
  },
});