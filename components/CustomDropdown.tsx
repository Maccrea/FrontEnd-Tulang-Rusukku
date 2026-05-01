import React, { useState } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Theme/color';
import { typography } from '../Theme/typography';

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  data: string[];
  onSelect: (item: string) => void;
}

export default function CustomDropdown({
  label,
  placeholder,
  value,
  data,
  onSelect
}: CustomDropdownProps) {

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const hasValue = value && value !== '';

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      <Text style={[typography.variants.label, styles.label]}>
        {label}
      </Text>

      {/* TRIGGER */}
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            typography.variants.textField,
            { color: hasValue ? colors.neutral[800] : colors.neutral[400] }
          ]}
        >
          {hasValue ? value : placeholder}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.neutral[500]}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>

          {/* SEARCH INPUT */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color={colors.neutral[400]}
              style={{ marginRight: 8 }}
            />

            <TextInput
              style={[typography.variants.textField, styles.searchInput]}
              placeholder="Cari..."
              placeholderTextColor={colors.neutral[400]}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* LIST */}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}

            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                  setSearch('');
                }}
              >

                <Text style={[typography.variants.label, styles.itemText]}>
                  {item}
                </Text>

                {value === item && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={colors.navbar.pink}
                  />
                )}

              </TouchableOpacity>
            )}
          />

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 20,
    width: "100%"
  },

  label: {
    marginBottom: 8,
  },

  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: "100%",

    backgroundColor: colors.navbar.background,
    borderWidth: 1,
    borderColor: colors.neutral[200],

    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  dropdownList: {
    marginTop: 6,
    backgroundColor: "#FFFFFF",

    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral[200],

    maxHeight: 250,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",

    paddingHorizontal: 12,
    paddingVertical: 10
  },

  searchInput: {
    flex: 1
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    minHeight: 48,
    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2"
  },

  itemText: {
    color: colors.neutral[800],
  }

}); 