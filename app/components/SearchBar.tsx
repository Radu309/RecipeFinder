import React from 'react';
import { View, TextInput, StyleSheet, TextInputSubmitEditingEventData, NativeSyntheticEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSubmit, placeholder }) => (
  <View style={styles.searchContainer}>
    <TextInput
      placeholder={placeholder || 'Search...'}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit} 
      style={styles.searchInput}
      returnKeyType="search"
    />
    <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
  </View>
);

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
  },
});
