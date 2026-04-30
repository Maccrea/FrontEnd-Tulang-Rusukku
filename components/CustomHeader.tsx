import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

interface CustomHeaderProps {
  title: string;
  rightText?: string;
  onRightPress?: () => void;
}

export default function CustomHeader({ title, rightText, onRightPress }: CustomHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContent}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color={colors.neutral[900]} />
        </TouchableOpacity>
        
        <Text style={[typography.variants.h3Bold, styles.title]}>
          {title}
        </Text>
      </View>

      {rightText && (
        <TouchableOpacity onPress={onRightPress} activeOpacity={0.7} style={styles.rightButton}>
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4, 
    marginLeft: -4, 
  },
  title: {
    color: colors.neutral[900],
    fontSize: 20,
  },
  rightButton: {
    backgroundColor: colors.navbar.pink,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rightText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});