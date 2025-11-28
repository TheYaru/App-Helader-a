import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useCart } from './CartContext';
import { useAccessibility } from './AccessibilityContext';
import { colors, spacing, radii, typography } from '../constants/theme';

type Props = {
  id: string | number;
  title: string;
  image?: { uri?: string };
  price?: number;
  largeText?: boolean;
};

export default function ProductCard({ id, title, image, price, largeText }: Props) {
  const { add } = useCart();
  const { darkMode } = useAccessibility();

  const onAdd = () => {
    add({
      productId: typeof id === 'string' ? Number(id) : id,
      qty: 1,
      title,
      price: price ?? 0,
    });
  };

  const source = image?.uri ? { uri: image.uri } : require('../assets/images/helado.png');

  const primary = (colors && colors.accessible) ? colors.accessible : '#5E2D35';
  const bgLight = (colors && colors.surface) ? colors.surface : '#FAF7FA';
  const textColor = darkMode ? '#FFFFFF' : (colors?.text ?? '#2A2A2A');
  const cardBg = darkMode ? '#1e1e1e' : bgLight;

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      <Image source={source} style={styles.img} />
      <Text
        style={[
          styles.title,
          largeText && styles.largeText,
          { color: textColor },
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
      {typeof price === 'number' && (
        <Text style={[styles.price, largeText && styles.largeText, { color: darkMode ? '#ddd' : (colors?.subtleText ?? '#555') }]}>
          ${price.toFixed(2)}
        </Text>
      )}
      <Pressable
        style={[styles.btn, { backgroundColor: primary }]}
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel={`Agregar ${title}`}
      >
        <Text style={styles.btnText}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing?.sm ?? 12,
    padding: spacing?.sm ?? 12,
    borderRadius: radii?.sm ?? 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: spacing?.sm ?? 12,
  },
  title: {
    fontSize: typography?.body ?? 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    marginBottom: 8,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: radii?.sm ?? 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
  largeText: {
    fontSize: 20,
  },
});