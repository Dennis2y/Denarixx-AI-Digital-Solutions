import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Language = "en" | "de" | "fr" | "es" | "it" | "pt" | "nl" | "tr" | "ar" | "zh";

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  dir?: "ltr" | "rtl";
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  currentOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children, translations }: { children: ReactNode; translations: Record<string, Record<Language, string>> }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("denarixx-lang");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    const opt = LANGUAGES.find(l => l.code === language);
    document.documentElement.dir = opt?.dir || "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("denarixx-lang", lang);
  }, []);

  const t = useCallback((key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry["en"] || key;
  }, [language, translations]);

  const currentOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  const dir = currentOption.dir || "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, currentOption }}>
      {children}
    </LanguageContext.Provider>
  );
}
