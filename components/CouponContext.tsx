import React, { createContext, useContext, useState } from "react";

const CouponContext = createContext(null);

export function CouponProvider({ children }) {
  const [coupon, setCoupon] = useState(null);

  const giveWelcomeCoupon = () => {
    setCoupon({
      type: "WELCOME20",
      discount: 20,
      used: false,
    });
  };

  const useCoupon = () => {
    setCoupon(prev => prev ? { ...prev, used: true } : null);
  };

  return (
    <CouponContext.Provider value={{ coupon, giveWelcomeCoupon, useCoupon }}>
      {children}
    </CouponContext.Provider>
  );
}

export function useCouponContext() {
  const ctx = useContext(CouponContext);
  if (!ctx) {
    console.error("⚠ useCouponContext se llamó fuera de <CouponProvider>");
  }
  return ctx;
}
