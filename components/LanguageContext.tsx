import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../constants/i18n';

type LanguageContextType = {
  idioma: string;
  setIdioma: (lang: string) => void;
};

const STORAGE_KEY = '@kdelight_idioma';

export const LanguageContext = createContext<LanguageContextType>({
  idioma: 'es',
  setIdioma: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idioma, setIdiomaState] = useState<string>(i18n.locale?.startsWith('es') ? 'es' : 'en');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setIdiomaState(saved);
          i18n.locale = saved;
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const setIdioma = (lang: string) => {
    setIdiomaState(lang);
    i18n.locale = lang;
    AsyncStorage.setItem(STORAGE_KEY, lang).catch(() => {});
  };

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
};