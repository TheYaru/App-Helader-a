import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

import VerticalMenu from '../components/VerticalMenu';
import { typography, spacing } from '../constants/theme';
import { useAccessibility } from '../components/AccessibilityContext';
import i18n from '../constants/i18n';

export default function Home() {
  const { largeText } = useAccessibility();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.heladeria, largeText && styles.largeTitle]}>K'Delight</Text>
      <Text style={[styles.title, largeText && styles.largeTitle]}>{i18n.t('bienvenido')}</Text>

      <View style={styles.center}>
        <Image source={require('../assets/images/heladeria.png')} style={styles.ice} />
        <Text style={[styles.subtitle, largeText && styles.largeSubtitle]}>{i18n.t('heladeria')}</Text>

        <View style={styles.menuContainer}>
          <VerticalMenu />
        </View>

        {/* Botón Registrarse */}
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/register")}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Botón Iniciar sesión */}
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.replace("/login")}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  heladeria: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  largeTitle: {
    fontSize: typography.h1 + 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  ice: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: spacing.md,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  largeSubtitle: {
    fontSize: 26,
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#E8E8E8',
  },
  secondaryButtonText: {
    color: '#333',
  },
});
