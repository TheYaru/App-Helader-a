import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_DARK = '@kdelight_darkmode';
const STORAGE_KEY_LARGE = '@kdelight_largetext';

type AccessibilityContextType = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  largeText: boolean;
  setLargeText: (v: boolean) => void;
};

export const AccessibilityContext = createContext<AccessibilityContextType>({
  darkMode: false,
  setDarkMode: () => {},
  largeText: false,
  setLargeText: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkModeState] = useState(false);
  const [largeText, setLargeTextState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const d = await AsyncStorage.getItem(STORAGE_KEY_DARK);
        const l = await AsyncStorage.getItem(STORAGE_KEY_LARGE);
        if (d !== null) setDarkModeState(d === '1');
        if (l !== null) setLargeTextState(l === '1');
      } catch (e) {}
    })();
  }, []);

  const setDarkMode = (v: boolean) => {
    setDarkModeState(v);
    AsyncStorage.setItem(STORAGE_KEY_DARK, v ? '1' : '0').catch(() => {});
  };

  const setLargeText = (v: boolean) => {
    setLargeTextState(v);
    AsyncStorage.setItem(STORAGE_KEY_LARGE, v ? '1' : '0').catch(() => {});
  };

  return (
    <AccessibilityContext.Provider value={{ darkMode, setDarkMode, largeText, setLargeText }}>
      {children}
    </AccessibilityContext.Provider>
  );
};