import { ReactNode } from 'react';
import { TranslationContext, createTranslationHook } from '@/hooks/useTranslation';

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const translationContext = createTranslationHook();

  return (
    <TranslationContext.Provider value={translationContext}>
      {children}
    </TranslationContext.Provider>
  );
};