// components/CheckboxListItem.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

export default function CheckboxListItem({ label, checked, onToggle }:{label:string; checked:boolean; onToggle:()=>void}) {
  return (
    <Pressable onPress={onToggle} style={styles.row} accessibilityRole="checkbox" accessibilityState={{checked}} accessibilityLabel={label}>
      <View style={[styles.dot, {backgroundColor: colors.accent}]}>
        <Text style={{color:'#000'}}>A</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={{flex:1}} />
      {checked ? <Ionicons name="checkmark-circle" size={20} color={colors.primary}/> : <Ionicons name="ellipse-outline" size={20} color="#999"/>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection:'row', alignItems:'center', padding:10, borderRadius:8, backgroundColor:'#FFF6FB', marginBottom:8 },
  dot: { width:32, height:32, borderRadius:32, alignItems:'center', justifyContent:'center', marginRight:12 },
  label: { fontSize:16 },
});
