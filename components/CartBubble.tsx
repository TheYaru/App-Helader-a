import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';

export default function CartBubble() {
  const { items } = useCart();
  const router = useRouter();
  const count = items.reduce((s, it) => s + it.qty, 0);
  if (count === 0) return null;

  const onPress = () => {
    router.push('/checkout');
  };

  return (
    <Pressable
      style={styles.bubble}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver carrito, ${count} items`}
    >
      <Text style={styles.text}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#e8385a',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});