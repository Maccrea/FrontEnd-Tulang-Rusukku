import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  errorMessage?: string;
}

export default function CustomInput({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  isPassword = false, 
  keyboardType = 'default',
  maxLength,
  errorMessage
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[typography.variants.label, styles.label]}>{label}</Text>
      
      <View style={[
        styles.inputContainer, 
        errorMessage ? { borderColor: colors.semantic.error } : null
      ]}>
        <TextInput
          style={[typography.variants.textField, styles.input]}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral[400]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          maxLength={maxLength}
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            <Ionicons 
              name={showPassword ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color={colors.neutral[400]} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
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
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  icon: {
    padding: 14,
  },
  errorText: {
    color: colors.semantic.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});