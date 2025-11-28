// app/personalizar.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import CheckboxListItem from '../components/CheckboxListItem';
import PrimaryButton from '../components/PrimaryButton';
import AccessibilityBubble from '../components/AccessibilityBubble';
import Slider from '@react-native-community/slider';

const toppings = ['Chocolate', 'Caramelo', 'Sprinkles', 'Nuez'];

export default function Personalizar() {
  const [checkedMap, setCheckedMap] = useState<Record<string,boolean>>(() =>
    toppings.reduce((acc,t)=>({...acc,[t]:true}), {})
  );
  const [size, setSize] = useState(1); // 0 small,1 med,2 large

  const toggle = (t:string) => setCheckedMap(prev=>({...prev, [t]: !prev[t]}));

  return (
    <SafeAreaView style={{flex:1, padding:18}}>
      <Text style={{fontSize:30, fontWeight:'800'}}>Personalizar pedido</Text>

      <View style={{marginTop:18, backgroundColor:'#FAF4FB', padding:12, borderRadius:12}}>
        <Text style={{fontWeight:'700', marginBottom:8}}>Toppings</Text>
        {toppings.map(t => (
          <CheckboxListItem key={t} label={t} checked={!!checkedMap[t]} onToggle={()=>toggle(t)} />
        ))}

        <Text style={{marginTop:8, fontWeight:'700'}}>Tamaño</Text>
        <View style={{paddingVertical:8}}>
          <Slider
            minimumValue={0}
            maximumValue={2}
            step={1}
            value={size}
            onValueChange={v=>setSize(v)}
            minimumTrackTintColor="#B98EC7"
            maximumTrackTintColor="#EEE"
            accessibilityLabel="Seleccionar tamaño"
          />
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>S</Text><Text>M</Text><Text>L</Text>
          </View>
        </View>

        <View style={{alignItems:'center', marginTop:12}}>
          <PrimaryButton title="Agregar al Carrito" accessibilityLabel="Agregar al carrito" onPress={()=>{}} />
        </View>
      </View>

      <AccessibilityBubble />
    </SafeAreaView>
  );
}
