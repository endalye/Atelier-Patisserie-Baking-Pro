import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AppLanguage, TranslationKey, UI_TRANSLATIONS } from './translations';

const LANG_STORAGE_KEY = 'atelier-lang';
const USER_LANG_STORAGE_PREFIX = 'atelier-lang:';

export function getStoredLanguage(): AppLanguage {
  try {
    const val = localStorage.getItem(LANG_STORAGE_KEY);
    if (val === 'ar' || val === 'am' || val === 'en') return val;
    return 'en';
  } catch {
    return 'en';
  }
}

export function getStoredUserLanguage(uid: string): AppLanguage | null {
  try {
    const val = localStorage.getItem(`${USER_LANG_STORAGE_PREFIX}${uid}`);
    if (val === 'ar' || val === 'am' || val === 'en') return val;
    return null;
  } catch {
    return null;
  }
}

export function translateWithLang(
  lang: AppLanguage,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
  let template: string = dict[key] ?? UI_TRANSLATIONS.en[key] ?? key;
  if (vars) {
    for (const [varKey, varVal] of Object.entries(vars)) {
      template = template.replace(new RegExp(`\\{${varKey}\\}`, 'g'), String(varVal));
    }
  }
  return template;
}

interface I18nContextValue {
  lang: AppLanguage;
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
  setLang: (next: AppLanguage, uid?: string) => void;
  syncUserLanguage: (uid: string | null | undefined) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AppLanguage>(() => getStoredLanguage());
  const [activeUid, setActiveUid] = useState<string | null>(null);

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = UI_TRANSLATIONS[lang].appPageTitle;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      if (activeUid) {
        localStorage.setItem(`${USER_LANG_STORAGE_PREFIX}${activeUid}`, lang);
      }
    } catch {
      // Ignore storage errors
    }
  }, [lang, dir, activeUid]);

  const setLang = useCallback(
    (next: AppLanguage, uid?: string) => {
      const targetUid = uid ?? activeUid;
      setLangState(next);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next);
        if (targetUid) {
          localStorage.setItem(`${USER_LANG_STORAGE_PREFIX}${targetUid}`, next);
        }
      } catch {
        // Ignore storage errors
      }
    },
    [activeUid]
  );

  const syncUserLanguage = useCallback((uid: string | null | undefined) => {
    if (!uid) {
      setActiveUid(null);
      return;
    }
    setActiveUid(uid);
    const savedForUser = getStoredUserLanguage(uid);
    if (savedForUser) {
      setLangState(savedForUser);
    } else {
      // Save current global preference for this user so it persists for future logins
      const current = getStoredLanguage();
      try {
        localStorage.setItem(`${USER_LANG_STORAGE_PREFIX}${uid}`, current);
      } catch {
        // Ignore
      }
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) =>
      translateWithLang(lang, key, vars),
    [lang]
  );

  return (
    <I18nContext.Provider
      value={{
        lang,
        dir,
        isRtl,
        setLang,
        syncUserLanguage,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return ctx;
}
