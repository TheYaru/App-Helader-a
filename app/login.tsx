import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 20 },
});
