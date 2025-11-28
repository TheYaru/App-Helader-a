import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useCart } from "../components/CartContext";
import { useCouponContext } from "../components/CouponContext";

export default function Checkout() {
  const { items, total, discountedTotal, checkout } = useCart();
  const { coupon } = useCouponContext();

  const [localTotal, setLocalTotal] = useState(total);
  const [localDiscounted, setLocalDiscounted] = useState(discountedTotal);

  useEffect(() => {
    setLocalTotal(total);
    setLocalDiscounted(discountedTotal);
  }, [total, discountedTotal, coupon]);

  const handlePay = async () => {
    try {
      const result = await checkout();
      Alert.alert("¡Compra realizada!", `Orden #${result.id}`);
    } catch (err) {
      Alert.alert("Error", "No se pudo completar la compra.");
    }
  };

  if (!items.length) {
    return (
      <View style={styles.center}>
        <Text>No hay productos en el carrito.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del pedido</Text>

      {items.map((it, i) => (
        <Text key={i} style={styles.item}>
          {it.qty} × {it.title} — ${it.price}
        </Text>
      ))}

      <View style={styles.sep} />

      <Text style={styles.totalLabel}>
        Total sin descuento: ${localTotal.toFixed(2)}
      </Text>

      {coupon && !coupon.used && (
        <Text style={styles.couponLabel}>
          Cupón aplicado ({coupon.discount}%): -$
          {(localTotal - localDiscounted).toFixed(2)}
        </Text>
      )}

      <Text style={styles.finalTotal}>
        Total Final: ${localDiscounted.toFixed(2)}
      </Text>

      <Pressable style={styles.payBtn} onPress={handlePay}>
        <Text style={styles.payText}>Pagar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },
  item: { fontSize: 16, marginBottom: 6 },
  sep: { height: 1, backgroundColor: "#ccc", marginVertical: 12 },
  totalLabel: { fontSize: 16, marginBottom: 4 },
  couponLabel: { fontSize: 16, color: "green", marginBottom: 4 },
  finalTotal: { fontSize: 20, fontWeight: "bold", marginVertical: 12 },
  payBtn: {
    backgroundColor: "#e8385a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: { color: "#fff", fontWeight: "800", fontSize: 18 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
