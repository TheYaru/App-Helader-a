import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '../constants/i18n';

export default function Barra() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>{i18n.t('configuracion')}</Text>
        <TouchableOpacity style={styles.toolbarBtn}>
          <Text style={styles.toolbarBtnText}>{i18n.t('ayuda')}</Text>
        </TouchableOpacity>
      </View>
      {/* LinearLayout */}
      <View style={styles.linearLayout}>
        <Text style={styles.item}>{i18n.t('productos')}</Text>
        <Text style={styles.item}>{i18n.t('ofertas')}</Text>
        <Text style={styles.item}>{i18n.t('personalizar')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    elevation: 4,
  },
  toolbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  toolbarBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toolbarBtnText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  linearLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 32,
    gap: 16,
  },
  item: {
    fontSize: 18,
    padding: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    width: '80%',
    textAlign: 'center',
    marginBottom: 8,
  },
});