"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";

interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    book: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

const DICTIONARY: Record<Language, Translations> = {
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Quiénes Somos",
      contact: "Contacto",
      book: "Agendar Cita",
    },
    hero: {
      tagline: "Centro de Acompañamiento Integral",
      title: "Tu bienestar, nuestro compromiso.",
      subtitle:
        "Atención psicológica accesible, humana y basada en evidencia en el corazón de La Paz.",
      ctaPrimary: "Agendar mi cita",
      ctaSecondary: "Conoce nuestros servicios",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      contact: "Contact",
      book: "Book Appointment",
    },
    hero: {
      tagline: "Comprehensive Psychological Care Center",
      title: "Your well-being, our commitment.",
      subtitle:
        "Accessible, compassionate, evidence-based psychological care in the heart of La Paz.",
      ctaPrimary: "Book an appointment",
      ctaSecondary: "Explore our services",
    },
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: "es",
  setLang: () => {},
  t: DICTIONARY.es,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("dulcepaz_lang") as Language;
    if (saved && (saved === "es" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("dulcepaz_lang", newLang);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: DICTIONARY[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
