import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/Theme/color';

interface CustomBottomFooterProps {
  onClear: () => void;
  onNext: () => void;
  clearLabel?: string;
  nextLabel?: string;
}

export default function CustomBottomFooter({ 
  onClear, 
  onNext, 
  clearLabel = "Clear Filters", 
  nextLabel = "Show Results" 
}: CustomBottomFooterProps) {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={onClear}>
        <Text style={styles.clearText}>{clearLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnShow} onPress={onNext}>
        <Text style={styles.btnShowText}>{nextLabel}</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 40,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: colors.neutral[200],
        borderStyle: 'dashed',
    },
    clearText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.neutral[900],
    },
    btnShow: {
        backgroundColor: '#D1C4FF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    btnShowText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.neutral[900],
    },
});