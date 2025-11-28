import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { registerUser } from "../constants/api";
import { useRouter } from "expo-router";
import { useCouponContext } from "./CouponContext";
import { useAuth } from "./AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { giveWelcomeCoupon } = useCouponContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const newUser = await registerUser({ name, email, password });

      await login(newUser);
      giveWelcomeCoupon(); // CUPÓN 🎉

      Alert.alert("🎉 ¡Cuenta creada!", "Recibiste un cupón del 20%.");
      router.push("/ofertas");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

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

      <PrimaryButton title="Registrarme" onPress={handleRegister} />
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
