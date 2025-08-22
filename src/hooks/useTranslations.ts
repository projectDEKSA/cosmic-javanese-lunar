import { translations, Language, TranslationKey } from '@/lib/translations';

export const useTranslations = (language: Language) => {
  const t = (key: TranslationKey): string => {
    const value = translations[language][key] || translations.en[key];
    return typeof value === 'string' ? value : key;
  };

  const getNestedTranslation = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        current = translations.en;
        for (const fallbackKey of keys) {
          if (current && typeof current === 'object' && fallbackKey in current) {
            current = current[fallbackKey];
          } else {
            return path; // Return the path if not found
          }
        }
        break;
      }
    }
    
    return typeof current === 'string' ? current : path;
  };

  return { t, getNestedTranslation };
};