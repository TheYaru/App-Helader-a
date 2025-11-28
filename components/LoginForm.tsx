import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { loginUser } from "../constants/api";
import { useRouter } from "expo-router";
import { useCouponContext } from "./CouponContext";
import { useAuth } from "./AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { giveWelcomeCoupon } = useCouponContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await loginUser({ email, password });

      await login(result); 
      giveWelcomeCoupon(); // CUPÓN 🎉

      Alert.alert("Bienvenido", "Ingreso correcto.");
      router.push("/ofertas");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <PrimaryButton title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: "700", marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
});
