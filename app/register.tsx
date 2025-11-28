import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RegisterForm from "../components/RegisterForm";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 20 },
});
