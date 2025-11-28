// app/ubicacion.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import AccessibilityBubble from '../components/AccessibilityBubble';
import { Ionicons } from '@expo/vector-icons';

export default function Ubicacion(){
  return (
    <SafeAreaView style={{flex:1, padding:18}}>
      <Text style={{fontSize:30, fontWeight:'800'}}>Ubicación</Text>
      <Text style={{marginTop:10}}>Encontranos:</Text>

      <View style={{marginTop:18, backgroundColor:'#7AF98B', height:260, borderRadius:14, alignItems:'center', justifyContent:'center'}}>
        <Ionicons name="location" size={36} color="#065f46" />
        <Text style={{marginTop:8}}>Mapa / Lugar</Text>
      </View>

      <Pressable style={{position:'absolute', right:18, bottom:30, backgroundColor:'#F0EFF5', padding:12, borderRadius:999}}>
        <Ionicons name="share-social" size={20} color="#333" />
      </Pressable>

      <AccessibilityBubble />
    </SafeAreaView>
  );
}
