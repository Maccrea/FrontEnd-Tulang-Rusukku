import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle; 
}

export const SearchBar = ({ 
  value, 
  onChangeText, 
  placeholder = "Cari sesuatu...", 
  containerStyle 
}: SearchBarProps) => {
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <TextInput 
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
      <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
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
});