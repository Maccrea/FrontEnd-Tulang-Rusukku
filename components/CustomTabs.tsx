import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/Theme/color';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface CustomTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function CustomTabs({ tabs, activeTab, onTabChange }: CustomTabsProps) {
  return (
    <View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContentContainer}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity 
              key={tab.id} 
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onTabChange(tab.id)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
              
              {tab.count !== undefined && tab.count > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{tab.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.bottomBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    maxHeight: 50,
  },
  tabContentContainer: {
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: colors.neutral[900], 
  },
  tabText: {
    fontSize: 15,
    color: colors.neutral[500],
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.neutral[900],
    fontWeight: '600',
  },
  badgeContainer: {
    backgroundColor: '#FFE4F2', 
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 6,
  },
  badgeText: {
    color: colors.neutral[900],
    fontSize: 12,
    fontWeight: '600',
  },
  bottomBorder: {
    height: 1,
    backgroundColor: colors.neutral[300],
    width: '100%',
    marginTop: -1, 
  },
});