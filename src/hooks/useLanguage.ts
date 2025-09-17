import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/utils/translations';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: Record<string, unknown> = translations[context.language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k] as Record<string, unknown>;
      } else {
        // Fallback to English if key not found
        current = translations.en;
        for (const fallbackKey of keys) {
          if (current && typeof current === 'object' && fallbackKey in current) {
            current = current[fallbackKey] as Record<string, unknown>;
          } else {
            return key; // Return key if not found in any language
          }
        }
        break;
      }
    }
    
    return typeof current === 'string' ? current : key;
  };

  return {
    ...context,
    t
  };
};