import React, { useState } from 'react';
import { View, Pressable, Modal, Text, Switch, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';
import { useAccessibility } from './AccessibilityContext';
import i18n from '../constants/i18n';

export default function AccessibilityBubble() {
  const { largeText, setLargeText, darkMode, setDarkMode } = useAccessibility();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        style={styles.bubble}
        accessibilityRole="button"
        accessibilityLabel={i18n.t('accesibilidad')}
        onPress={() => setVisible(true)}
      >
        <Text style={{ fontSize: 18 }}>♿</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t('accesibilidad')}</Text>
            <View style={styles.optionRow}>
              <Text style={{ fontSize: 16 }}>{i18n.t('texto_grande')}</Text>
              <Switch value={largeText} onValueChange={setLargeText} />
            </View>
            <View style={styles.optionRow}>
              <Text style={{ fontSize: 16 }}>{i18n.t('modo_oscuro')}</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
            <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
              <Text>{i18n.t('cancelar')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 16,
    elevation: 4,
    zIndex: 99,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: 280,
    alignItems: 'center',
  },
  modalTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 16 },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 16 },
  closeBtn: { marginTop: 12, padding: 8, backgroundColor: colors.subtle, borderRadius: 8 },
});