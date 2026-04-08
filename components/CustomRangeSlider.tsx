// CustomRangeSlider.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

const { width } = Dimensions.get('window');

interface CustomRangeSliderProps {
  label: string;
  unit: string; // Tambahkan ini biar bisa "th", "cm", atau "kg"
  min: number;
  max: number;
  values: number[];
  onValuesChange: (values: number[]) => void;
}

export default function CustomRangeSlider({ label, unit, min, max, values, onValuesChange }: CustomRangeSliderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {/* Tampilan Angka Real-time */}
      <Text style={styles.valueText}>
        {values[0]}{unit} – {values[1]}{unit}
      </Text>
      
      <MultiSlider
        values={values}
        sliderLength={width - 48} 
        onValuesChange={onValuesChange}
        min={min}
        max={max}
        step={1}
        allowOverlap={false}
        snapped
        
        // Styling Garis
        selectedStyle={{ backgroundColor: '#000000', height: 2 }} 
        unselectedStyle={{ backgroundColor: '#D1D1D1', height: 2 }} 
        trackStyle={{ height: 2 }}
        
        // Styling Kotak Geser (Marker)
        customMarker={() => (
          <View style={styles.marker} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 0 },
  label: { ...typography.variants.h4, color: colors.neutral[900], marginBottom: 4 },
  valueText: { ...typography.variants.body, color: colors.neutral[500]},
  marker: {
    height: 15,
    width: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3, // Bentuk kotak kekinian sesuai gambar kamu
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Biar ada efek timbul sedikit di Android
  },
});