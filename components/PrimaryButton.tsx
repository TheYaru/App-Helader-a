// components/PrimaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';

type Props = {
  title: string;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export default function PrimaryButton({ title, onPress, accessibilityLabel }: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      style={styles.btn}
      onPress={onPress}
    >
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  txt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
