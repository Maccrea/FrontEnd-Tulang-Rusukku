import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface TabBarOption {
    label: string; 
    value: string; 
}

interface TabBar {
    options: TabBarOption[];
    activeValue: string;
    onSelect: (value: string) => void;
    containerStyle?: ViewStyle; 
}

export const SegmentedControl: React.FC<TabBar> = ({ 
    options, 
    activeValue, 
    onSelect, 
    containerStyle 
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {options.map((option) => {
                const isActive = activeValue === option.value;
                return (
                    <TouchableOpacity
                        key={option.value}
                        style={[styles.btn, isActive && styles.btnActive]}
                        onPress={() => onSelect(option.value)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.text, isActive && styles.textActive]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFDCFD', 
        borderRadius: 12,
        padding: 8,
    },
    btn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 12,
    },
    btnActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2, 
    },
    text: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
    textActive: {
        color: '#333',
        fontWeight: '700',
    },
});