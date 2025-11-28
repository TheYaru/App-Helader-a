import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import i18n from '../constants/i18n';
import { useLanguage } from '../components/LanguageContext';

export default function Ayuda() {
  const { idioma, setIdioma } = useLanguage();

  const cambiarIdioma = () => {
    const nuevo = idioma === 'es' ? 'en' : 'es';
    setIdioma(nuevo);
    i18n.locale = nuevo;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('ayuda')}</Text>
      <View style={styles.section}>
        <Text style={styles.label}>{i18n.t('idioma')}: {idioma.toUpperCase()}</Text>
        <Button title={i18n.t('cambiar_idioma')} onPress={cambiarIdioma} />
      </View>
      {/* ...resto de la ayuda... */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff5f7' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  section: { marginBottom: 24, alignItems: 'center' },
  label: { fontSize: 18, marginBottom: 8 },
});