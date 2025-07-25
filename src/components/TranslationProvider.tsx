import { ReactNode, useState, useEffect } from 'react';
import { TranslationContext, Language } from '@/hooks/useTranslation';

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('urgencytrack-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('urgencytrack-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translations = {
      en: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Your ER wait time tracker',
        
        // Waiting Time Card
        'waitTime.estimatedWait': 'Estimated Wait Time',
        'waitTime.yourPosition': 'Your Position in Queue',
        'waitTime.minutes': 'minutes',
        'waitTime.updated': 'Last updated',
        'waitTime.justNow': 'just now',
        'waitTime.minutesAgo': 'minutes ago',
        
        // Navigation
        'nav.overview': 'Overview',
        'nav.medicalInfo': 'Medical Info',
        'nav.guidance': 'Guidance',
        'nav.faq': 'FAQ & Help',
        
        // Medical Info Form
        'medical.title': 'Optional Medical Information',
        'medical.subtitle': 'This information can help medical staff prepare for your visit',
        'medical.allergies': 'Known Allergies',
        'medical.allergiesPlaceholder': 'List any known allergies...',
        'medical.medications': 'Current Medications',
        'medical.medicationsPlaceholder': 'List your current medications...',
        'medical.conditions': 'Medical Conditions',
        'medical.conditionsPlaceholder': 'List any relevant medical conditions...',
        'medical.symptoms': 'Current Symptoms',
        'medical.symptomsPlaceholder': 'Describe your current symptoms...',
        'medical.save': 'Save Information',
        'medical.saved': 'Medical information saved successfully',
        
        // Guidance Section
        'guidance.title': 'What to Expect & How to Prepare',
        'guidance.stayCalm': 'Stay Calm and Comfortable',
        'guidance.stayCalm.desc': 'Find a comfortable seat and try to relax. Deep breathing can help manage anxiety.',
        'guidance.documents': 'Keep Important Documents Ready',
        'guidance.documents.desc': 'Have your ID, insurance card, and any relevant medical records easily accessible.',
        'guidance.phone': 'Keep Your Phone Charged',
        'guidance.phone.desc': 'Ensure your phone stays charged to receive important updates about your wait time.',
        'guidance.questions': 'Prepare Questions for Staff',
        'guidance.questions.desc': 'Think about symptoms, pain levels, and when they started to help medical staff.',
        'guidance.follow': 'Follow Hospital Guidelines',
        'guidance.follow.desc': 'Respect visiting hours, noise levels, and any specific instructions from hospital staff.',
        
        // FAQ Section
        'faq.title': 'Frequently Asked Questions',
        'faq.emergency.title': 'When should I seek immediate attention?',
        'faq.emergency.content': 'If you experience chest pain, difficulty breathing, severe bleeding, loss of consciousness, or signs of stroke, alert staff immediately.',
        'faq.wait.title': 'Why is my wait time changing?',
        'faq.wait.content': 'Wait times fluctuate based on patient severity, new arrivals, and treatment complexity. More urgent cases are always prioritized.',
        'faq.leaving.title': 'Can I leave and come back?',
        'faq.leaving.content': 'Please inform the front desk if you need to step out. Leaving without notice may affect your treatment timing.',
        'faq.pain.title': 'My pain is getting worse, what should I do?',
        'faq.pain.content': 'Immediately notify the nursing staff. They can reassess your condition and adjust your priority if needed.',
        'faq.insurance.title': 'What if I don\'t have insurance?',
        'faq.insurance.content': 'Emergency rooms are required to treat patients regardless of insurance status. Speak with financial services about payment options.',
        'faq.visitor.title': 'Can family members stay with me?',
        'faq.visitor.content': 'Visitor policies vary. Check with staff about current restrictions and visiting hours for emergency patients.',
        
        // Emergency Resources
        'emergency.title': 'Emergency Resources',
        'emergency.crisis': 'Mental Health Crisis',
        'emergency.crisis.number': '988',
        'emergency.crisis.desc': 'Suicide & Crisis Lifeline',
        'emergency.poison': 'Poison Control',
        'emergency.poison.number': '1-800-222-1222',
        'emergency.poison.desc': '24/7 Poison Help',
        'emergency.domestic': 'Domestic Violence',
        'emergency.domestic.number': '1-800-799-7233',
        'emergency.domestic.desc': 'National Domestic Violence Hotline',
        
        // Notifications
        'notifications.title': 'Notification Settings',
        'notifications.enable': 'Enable Notifications',
        'notifications.disable': 'Disable Notifications',
        'notifications.description': 'Get updates about your wait time and position',
        
        // Language Selector
        'language.select': 'Select Language',
        'language.en': 'English',
        'language.es': 'Español',
        'language.fr': 'Français',
      },
      
      es: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Seguimiento de tiempo de espera en urgencias',
        
        // Waiting Time Card
        'waitTime.estimatedWait': 'Tiempo de Espera Estimado',
        'waitTime.yourPosition': 'Su Posición en la Fila',
        'waitTime.minutes': 'minutos',
        'waitTime.updated': 'Última actualización',
        'waitTime.justNow': 'ahora mismo',
        'waitTime.minutesAgo': 'minutos atrás',
        
        // Navigation
        'nav.overview': 'Resumen',
        'nav.medicalInfo': 'Info Médica',
        'nav.guidance': 'Orientación',
        'nav.faq': 'FAQ y Ayuda',
        
        // Medical Info Form
        'medical.title': 'Información Médica Opcional',
        'medical.subtitle': 'Esta información puede ayudar al personal médico a prepararse para su visita',
        'medical.allergies': 'Alergias Conocidas',
        'medical.allergiesPlaceholder': 'Liste cualquier alergia conocida...',
        'medical.medications': 'Medicamentos Actuales',
        'medical.medicationsPlaceholder': 'Liste sus medicamentos actuales...',
        'medical.conditions': 'Condiciones Médicas',
        'medical.conditionsPlaceholder': 'Liste cualquier condición médica relevante...',
        'medical.symptoms': 'Síntomas Actuales',
        'medical.symptomsPlaceholder': 'Describa sus síntomas actuales...',
        'medical.save': 'Guardar Información',
        'medical.saved': 'Información médica guardada exitosamente',
        
        // Other translations would go here - abbreviated for space
        'guidance.title': 'Qué Esperar y Cómo Prepararse',
        'faq.title': 'Preguntas Frecuentes',
        'emergency.title': 'Recursos de Emergencia',
        'language.en': 'English',
        'language.es': 'Español',
        'language.fr': 'Français',
      },
      
      fr: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Suivi des temps d\'attente aux urgences',
        
        // Other translations would go here - abbreviated for space
        'waitTime.estimatedWait': 'Temps d\'Attente Estimé',
        'nav.overview': 'Aperçu',
        'medical.title': 'Informations Médicales Optionnelles',
        'guidance.title': 'À Quoi S\'Attendre et Comment Se Préparer',
        'faq.title': 'Foire Aux Questions',
        'emergency.title': 'Ressources d\'Urgence',
        'language.en': 'English',
        'language.es': 'Español',
        'language.fr': 'Français',
      },
    };
    
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const translationContext = {
    language,
    setLanguage,
    t
  };

  return (
    <TranslationContext.Provider value={translationContext}>
      {children}
    </TranslationContext.Provider>
  );
};