import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

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
    'faq.leaving.content': 'Please inform the front desk if you need to step out. Leaving without notice may affect your position in the queue.',
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
    
    // Guidance Section
    'guidance.title': 'Qué Esperar y Cómo Prepararse',
    'guidance.stayCalm': 'Manténgase Calmado y Cómodo',
    'guidance.stayCalm.desc': 'Encuentre un asiento cómodo y trate de relajarse. La respiración profunda puede ayudar a manejar la ansiedad.',
    'guidance.documents': 'Mantenga Documentos Importantes Listos',
    'guidance.documents.desc': 'Tenga su identificación, tarjeta de seguro y cualquier registro médico relevante fácilmente accesible.',
    'guidance.phone': 'Mantenga su Teléfono Cargado',
    'guidance.phone.desc': 'Asegúrese de que su teléfono se mantenga cargado para recibir actualizaciones importantes sobre su tiempo de espera.',
    'guidance.questions': 'Prepare Preguntas para el Personal',
    'guidance.questions.desc': 'Piense en síntomas, niveles de dolor y cuándo comenzaron para ayudar al personal médico.',
    'guidance.follow': 'Siga las Pautas del Hospital',
    'guidance.follow.desc': 'Respete los horarios de visita, niveles de ruido y cualquier instrucción específica del personal del hospital.',
    
    // FAQ Section
    'faq.title': 'Preguntas Frecuentes',
    'faq.emergency.title': '¿Cuándo debo buscar atención inmediata?',
    'faq.emergency.content': 'Si experimenta dolor en el pecho, dificultad para respirar, sangrado severo, pérdida de conciencia o signos de derrame cerebral, alerte al personal inmediatamente.',
    'faq.wait.title': '¿Por qué cambia mi tiempo de espera?',
    'faq.wait.content': 'Los tiempos de espera fluctúan según la gravedad del paciente, nuevas llegadas y la complejidad del tratamiento. Los casos más urgentes siempre tienen prioridad.',
    'faq.leaving.title': '¿Puedo irme y volver?',
    'faq.leaving.content': 'Por favor informe a la recepción si necesita salir. Irse sin avisar puede afectar su posición en la fila.',
    'faq.pain.title': 'Mi dolor está empeorando, ¿qué debo hacer?',
    'faq.pain.content': 'Notifique inmediatamente al personal de enfermería. Pueden reevaluar su condición y ajustar su prioridad si es necesario.',
    'faq.insurance.title': '¿Qué pasa si no tengo seguro?',
    'faq.insurance.content': 'Las salas de emergencia están obligadas a tratar pacientes independientemente del estado del seguro. Hable con servicios financieros sobre opciones de pago.',
    'faq.visitor.title': '¿Pueden los familiares quedarse conmigo?',
    'faq.visitor.content': 'Las políticas de visitantes varían. Consulte con el personal sobre las restricciones actuales y horarios de visita para pacientes de emergencia.',
    
    // Emergency Resources
    'emergency.title': 'Recursos de Emergencia',
    'emergency.crisis': 'Crisis de Salud Mental',
    'emergency.crisis.number': '988',
    'emergency.crisis.desc': 'Línea de Crisis y Suicidio',
    'emergency.poison': 'Control de Envenenamiento',
    'emergency.poison.number': '1-800-222-1222',
    'emergency.poison.desc': 'Ayuda de Venenos 24/7',
    'emergency.domestic': 'Violencia Doméstica',
    'emergency.domestic.number': '1-800-799-7233',
    'emergency.domestic.desc': 'Línea Nacional de Violencia Doméstica',
    
    // Notifications
    'notifications.title': 'Configuración de Notificaciones',
    'notifications.enable': 'Habilitar Notificaciones',
    'notifications.disable': 'Deshabilitar Notificaciones',
    'notifications.description': 'Reciba actualizaciones sobre su tiempo de espera y posición',
    
    // Language Selector
    'language.select': 'Seleccionar Idioma',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
  },
  
  fr: {
    // Header
    'header.title': 'UrgencyTrack',
    'header.subtitle': 'Suivi des temps d\'attente aux urgences',
    
    // Waiting Time Card
    'waitTime.estimatedWait': 'Temps d\'Attente Estimé',
    'waitTime.yourPosition': 'Votre Position dans la File',
    'waitTime.minutes': 'minutes',
    'waitTime.updated': 'Dernière mise à jour',
    'waitTime.justNow': 'à l\'instant',
    'waitTime.minutesAgo': 'minutes passées',
    
    // Navigation
    'nav.overview': 'Aperçu',
    'nav.medicalInfo': 'Info Médicale',
    'nav.guidance': 'Orientation',
    'nav.faq': 'FAQ et Aide',
    
    // Medical Info Form
    'medical.title': 'Informations Médicales Optionnelles',
    'medical.subtitle': 'Ces informations peuvent aider le personnel médical à préparer votre visite',
    'medical.allergies': 'Allergies Connues',
    'medical.allergiesPlaceholder': 'Listez toutes les allergies connues...',
    'medical.medications': 'Médicaments Actuels',
    'medical.medicationsPlaceholder': 'Listez vos médicaments actuels...',
    'medical.conditions': 'Conditions Médicales',
    'medical.conditionsPlaceholder': 'Listez toute condition médicale pertinente...',
    'medical.symptoms': 'Symptômes Actuels',
    'medical.symptomsPlaceholder': 'Décrivez vos symptômes actuels...',
    'medical.save': 'Sauvegarder les Informations',
    'medical.saved': 'Informations médicales sauvegardées avec succès',
    
    // Guidance Section
    'guidance.title': 'À Quoi S\'Attendre et Comment Se Préparer',
    'guidance.stayCalm': 'Restez Calme et Confortable',
    'guidance.stayCalm.desc': 'Trouvez un siège confortable et essayez de vous détendre. La respiration profonde peut aider à gérer l\'anxiété.',
    'guidance.documents': 'Gardez les Documents Importants Prêts',
    'guidance.documents.desc': 'Ayez votre pièce d\'identité, carte d\'assurance et tout dossier médical pertinent facilement accessible.',
    'guidance.phone': 'Gardez Votre Téléphone Chargé',
    'guidance.phone.desc': 'Assurez-vous que votre téléphone reste chargé pour recevoir des mises à jour importantes sur votre temps d\'attente.',
    'guidance.questions': 'Préparez des Questions pour le Personnel',
    'guidance.questions.desc': 'Pensez aux symptômes, niveaux de douleur et quand ils ont commencé pour aider le personnel médical.',
    'guidance.follow': 'Suivez les Directives de l\'Hôpital',
    'guidance.follow.desc': 'Respectez les heures de visite, niveaux de bruit et toute instruction spécifique du personnel hospitalier.',
    
    // FAQ Section
    'faq.title': 'Foire Aux Questions',
    'faq.emergency.title': 'Quand dois-je chercher une attention immédiate?',
    'faq.emergency.content': 'Si vous ressentez une douleur thoracique, difficulté à respirer, saignement sévère, perte de conscience ou signes d\'AVC, alertez le personnel immédiatement.',
    'faq.wait.title': 'Pourquoi mon temps d\'attente change-t-il?',
    'faq.wait.content': 'Les temps d\'attente fluctuent selon la gravité du patient, nouvelles arrivées et complexité du traitement. Les cas plus urgents sont toujours prioritaires.',
    'faq.leaving.title': 'Puis-je partir et revenir?',
    'faq.leaving.content': 'Veuillez informer la réception si vous devez sortir. Partir sans préavis peut affecter votre position dans la file.',
    'faq.pain.title': 'Ma douleur s\'aggrave, que dois-je faire?',
    'faq.pain.content': 'Notifiez immédiatement le personnel infirmier. Ils peuvent réévaluer votre condition et ajuster votre priorité si nécessaire.',
    'faq.insurance.title': 'Et si je n\'ai pas d\'assurance?',
    'faq.insurance.content': 'Les salles d\'urgence sont obligées de traiter les patients quel que soit le statut d\'assurance. Parlez avec les services financiers des options de paiement.',
    'faq.visitor.title': 'Les membres de la famille peuvent-ils rester avec moi?',
    'faq.visitor.content': 'Les politiques de visiteurs varient. Vérifiez avec le personnel les restrictions actuelles et heures de visite pour les patients d\'urgence.',
    
    // Emergency Resources
    'emergency.title': 'Ressources d\'Urgence',
    'emergency.crisis': 'Crise de Santé Mentale',
    'emergency.crisis.number': '988',
    'emergency.crisis.desc': 'Ligne de Crise et Suicide',
    'emergency.poison': 'Centre Antipoison',
    'emergency.poison.number': '1-800-222-1222',
    'emergency.poison.desc': 'Aide Poison 24/7',
    'emergency.domestic': 'Violence Domestique',
    'emergency.domestic.number': '1-800-799-7233',
    'emergency.domestic.desc': 'Ligne Nationale de Violence Domestique',
    
    // Notifications
    'notifications.title': 'Paramètres de Notification',
    'notifications.enable': 'Activer les Notifications',
    'notifications.disable': 'Désactiver les Notifications',
    'notifications.description': 'Recevez des mises à jour sur votre temps d\'attente et position',
    
    // Language Selector
    'language.select': 'Sélectionner la Langue',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
  },
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const createTranslationHook = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('urgencytrack-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('urgencytrack-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return { language, setLanguage, t };
};