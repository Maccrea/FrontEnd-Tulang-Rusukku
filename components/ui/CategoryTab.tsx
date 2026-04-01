import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface CategoryTabsProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
    containerStyle?: ViewStyle;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    activeCategory,
    onSelectCategory,
    containerStyle,
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.tabsContainer, containerStyle]}
        >
            {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                        onPress={() => onSelectCategory(cat)}
                        activeOpacity={0.7}
                    >
                        <Text style={[typography.variants.body, isActive && typography.variants.body]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        paddingHorizontal: 24,
        gap: 15, 
    },
    tabBtn: {
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#E5E5EA',
        marginRight: 5, 
    },
    tabBtnActive: {
        backgroundColor: colors.background.pink || '#FDECF9',
        borderColor: '#E5E5EA',
    },
});