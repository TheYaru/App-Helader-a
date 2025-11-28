// components/FilterBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

export default function FilterBar({ value, onChange }:{value:string; onChange:(v:string)=>void}) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={18} color="#666" style={{marginLeft:8}}/>
      <TextInput
        accessibilityLabel="Buscar productos"
        placeholder="Filtros de productos"
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E9F1',
    borderRadius: 999,
    paddingVertical: 8,
    marginVertical: 12,
  },
  input: { flex: 1, paddingHorizontal: 10, fontSize: 16 },
});
