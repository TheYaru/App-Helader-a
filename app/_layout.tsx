import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Slot } from 'expo-router';
import { LanguageProvider } from '../components/LanguageContext';
import { AccessibilityProvider } from '../components/AccessibilityContext';
import { CouponProvider } from "../components/CouponContext";
import { CartProvider } from '../components/CartContext';
import  { AuthProvider } from '../components/AuthContext';
import CartBubble from '../components/CartBubble';
import AccessibilityBubble from '../components/AccessibilityBubble';

export default function Layout() {
  return (
      <AuthProvider>
        <LanguageProvider>
          <AccessibilityProvider>
            <CouponProvider>
              <CartProvider>
                <SafeAreaView style={styles.safe}>
                  <View style={styles.container}>
                    <Slot />
                    <CartBubble />
                    <AccessibilityBubble />
                  </View>
                </SafeAreaView>
              </CartProvider>
            </CouponProvider>
          </AccessibilityProvider>
        </LanguageProvider>
      </AuthProvider>

  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, paddingTop: 64, backgroundColor: 'transparent' },
});