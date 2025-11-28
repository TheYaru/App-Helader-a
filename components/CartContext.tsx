import React, { createContext, useContext, useState, useMemo } from "react";
import { Alert } from "react-native";
import { API_BASE } from "../constants/api";
import { useCouponContext } from "./CouponContext";

type CartItem = { productId: number; qty: number; title?: string; price?: number };

type ContextType = {
  items: CartItem[];
  add: (p: CartItem) => void;
  remove: (productId: number) => void;
  clear: () => void;
  checkout: () => Promise<{ id?: number }>;
  total: number;
  discountedTotal: number;
};

const CartContext = createContext<ContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart fuera del CartProvider");
  return ctx;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { coupon } = useCouponContext();  

  const add = (p: CartItem) => {
    setItems(prev => {
      const f = prev.find(x => x.productId === p.productId);
      if (f) {
        Alert.alert("Carrito", `Se agregó ${p.title}`);
        return prev.map(x =>
          x.productId === p.productId ? { ...x, qty: x.qty + p.qty } : x
        );
      }
      Alert.alert("Carrito", `Se agregó ${p.title}`);
      return [...prev, p];
    });
  };

  const remove = (productId: number) =>
    setItems(prev => prev.filter(x => x.productId !== productId));

  const clear = () => setItems([]);

  // 🧮 Calculado siempre en tiempo real
  const total = useMemo(() => {
    return items.reduce((s, it) => s + (it.price || 0) * it.qty, 0);
  }, [items]);

  const discountedTotal = useMemo(() => {
    if (coupon && !coupon.used) {
      return total - total * (coupon.discount / 100);
    }
    return total;
  }, [total, coupon]);

  const checkout = async () => {
    const payload = {
      items: items.map(i => ({ productId: i.productId, qty: i.qty })),
      total: discountedTotal,
    };

    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Checkout falló");

    const data = await res.json();
    clear();
    return data;
  };

  return (
    <CartContext.Provider value={{ items, add, remove, clear, checkout, total, discountedTotal }}>
      {children}
    </CartContext.Provider>
  );
};
