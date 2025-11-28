import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import AccessibilityBubble from "../components/AccessibilityBubble";
import { useCouponContext } from "../components/CouponContext";
import { useRouter } from "expo-router";

export default function Ofertas() {
  const router = useRouter();
  const { coupon, useCoupon } = useCouponContext();

  return (
    <SafeAreaView style={{ flex: 1, padding: 18 }}>
      <Text style={{ fontSize: 30, fontWeight: "800" }}>Ofertas</Text>

      {/* CUPÓN DE REGISTRO */}
      {coupon && !coupon.used && (
        <View
          style={{
            marginTop: 18,
            backgroundColor: "#FFE8E8",
            padding: 16,
            borderRadius: 14,
          }}
        >
          <Text style={{ fontWeight: "800", fontSize: 20 }}>
            Cupón de Bienvenida 🎉
          </Text>

          <Text style={{ color: "#444", marginVertical: 8 }}>
            ¡Tienes un {coupon.discount}% de descuento por registrarte!
          </Text>

          <PrimaryButton
            title="Usar cupón"
            onPress={() => {
              useCoupon();          // marcar cupón como usado
              router.push("/productos");  // ir directo a productos
            }}
          />
        </View>
      )}

      {/* OFERTA FIJA */}
      <View
        style={{
          marginTop: 18,
          backgroundColor: "#F7EDF7",
          padding: 16,
          borderRadius: 14,
        }}
      >
        <View
          style={{
            height: 120,
            backgroundColor: "#E8DFE9",
            borderRadius: 8,
            marginBottom: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Imagen promo</Text>
        </View>

        <Text style={{ fontWeight: "700" }}>2 x 1</Text>
        <Text style={{ color: "#555", marginVertical: 8 }}>
          Compra un helado y llévate otro gratis. Válido 31 Dic 2025
        </Text>

        <PrimaryButton title="Usar cupón" onPress={() => router.push("/productos")} />
      </View>

      <AccessibilityBubble />
    </SafeAreaView>
  );
}
