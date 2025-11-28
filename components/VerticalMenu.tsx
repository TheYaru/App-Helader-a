import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { colors, spacing, radii } from '../constants/theme';
import i18n from '../constants/i18n';

const items = [
  { label: 'productos', href: '/productos' },
  { label: 'pedidos', href: '/checkout' },        
  { label: 'ofertas', href: '/ofertas' },
  { label: 'ubicacion', href: '/ubicacion' },
  { label: 'ayuda', href: '/ayuda' },
  { label: 'configuracion', href: '/configuracion' }, // usa /configuracion
];

export default function VerticalMenu() {
  return (
    <View style={styles.wrap}>
      {items.map((it) => (
        <Link key={it.label} href={it.href} asChild>
          <Pressable style={styles.btn} accessibilityRole="button" accessibilityLabel={i18n.t(it.label)}>
            <Text style={styles.txt}>{i18n.t(it.label)}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: radii.md,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: { color: 'white', fontWeight: '700' },
});