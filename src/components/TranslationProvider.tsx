import { ReactNode, useState, useEffect } from 'react';
import { TranslationContext, Language } from '@/hooks/useTranslation';

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('urgencytrack-language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('urgencytrack-language', language);
  }, [language]);

  const t = (key: string): string => {
    try {
      const translations: Record<Language, Record<string, string>> = {
        en: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Your ER wait time tracker',
        'welcome.greeting': 'Welcome, John Doe',
        'welcome.subtitle': 'Stay informed about your visit',
        'welcome.headerGreeting': 'Welcome',
        'welcome.headerSubtitle': 'Stay informed about your wait',
        'news.title': 'Important Announcements',
        'news.noNews': 'No announcements at this time.',
        'news.priority.low': 'Low',
        'news.priority.medium': 'Medium',
        'news.priority.high': 'High',
        'news.priority.urgent': 'Urgent',
        'news.by': 'by',
        'admin.title': 'Admin Panel',
        'admin.subtitle': 'Manage announcements and settings',
        'admin.backToApp': 'Back to App',
        'admin.tabs.publish': 'Publish News',
        'admin.tabs.preview': 'Preview',
        'admin.news.publish': 'Publish New Announcement',
        'admin.news.title': 'Title',
        'admin.news.titlePlaceholder': 'Enter announcement title...',
        'admin.news.author': 'Author',
        'admin.news.authorPlaceholder': 'Enter author name...',
        'admin.news.priority': 'Priority',
        'admin.news.content': 'Content',
        'admin.news.contentPlaceholder': 'Enter announcement content...',
        'admin.news.publishButton': 'Publish Announcement',
        'admin.news.published': 'Published Announcements',
        'admin.news.error': 'Error',
        'admin.news.fillRequired': 'Please fill in all required fields.',
        'admin.news.publishedSuccess': 'Announcement published successfully.',
        'admin.preview.title': 'Patient Preview',
        'admin.preview.description': 'This is how patients will see the announcements:',
        'admin.tabs.painReports': 'Pain Reports',
        'admin.tabs.overview': 'Overview',
        'admin.pain.title': 'Patient Pain Reports',
        'admin.pain.subtitle': 'Monitor and respond to patient pain assessments',
        'admin.pain.noPain': 'No pain reports available',
        'admin.pain.patient': 'Patient',
        'admin.pain.level': 'Level',
        'admin.pain.location': 'Location',
        'admin.pain.type': 'Type',
        'admin.pain.description': 'Description',
        'admin.pain.time': 'Time',
        'admin.pain.acknowledge': 'Acknowledge',
        'admin.pain.acknowledged': 'Acknowledged',
        'admin.pain.critical': 'Critical',
        'admin.pain.highPriority': 'High Priority',
        'admin.overview.title': 'Dashboard Overview',
        'admin.overview.totalPatients': 'Total Patients in Queue',
        'admin.overview.avgWaitTime': 'Average Wait Time',
        'admin.overview.criticalReports': 'Critical Pain Reports',
        'admin.overview.activeStaff': 'Active Medical Staff',
        'admin.overview.recentActivity': 'Recent Activity',
        
        // Waiting Time Card
        'waitTime.estimatedWait': 'Estimated Wait Time',
        'waitTime.yourPosition': 'Your Position in Queue',
        'waitTime.of': 'of',
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
        
        // Educational Content
        'education.title': 'Health Education Center',
        'education.subtitle': 'Learn about your health conditions and treatment options',
        'education.search': 'Search health topics, conditions, or treatments...',
        'education.conditions': 'Health Conditions',
        'education.treatments': 'Treatments & Procedures',
        'education.readMore': 'Read More',
        'education.viewGuide': 'View Guide',
        'education.quickTips': 'Quick Health Tips',
        'education.quickTipsDesc': 'Daily tips for better health and wellness',
        'education.backToList': 'Back to List',
        
        // Article Content
        'article.bloodPressure.title': 'Understanding High Blood Pressure',
        'article.bloodPressure.desc': 'Learn about hypertension, its causes, symptoms, and management strategies.',
        'article.bloodPressure.content': 'High blood pressure, or hypertension, occurs when the force of blood against artery walls is consistently too high. This condition affects millions worldwide and is often called the "silent killer" because it typically has no symptoms until serious complications develop.\n\nCauses include genetics, diet high in sodium, lack of physical activity, stress, and certain medical conditions. Regular monitoring and lifestyle changes like exercise, healthy diet, and medication when needed can effectively manage hypertension.',
        
        'article.diabetes.title': 'Managing Diabetes',
        'article.diabetes.desc': 'Comprehensive guide to diabetes management, diet, and lifestyle changes.',
        'article.diabetes.content': 'Diabetes is a group of metabolic disorders characterized by high blood sugar levels. Type 1 diabetes occurs when the pancreas produces little or no insulin, while Type 2 diabetes develops when the body becomes resistant to insulin.\n\nEffective management includes regular blood sugar monitoring, balanced nutrition, regular exercise, and medication adherence. Working with healthcare providers to develop a personalized management plan is essential for long-term health.',
        
        'article.anxiety.title': 'Understanding Anxiety',
        'article.anxiety.desc': 'Learn about anxiety disorders, coping mechanisms, and treatment options.',
        'article.anxiety.content': 'Anxiety is a normal emotion that becomes a disorder when it interferes with daily life. Common symptoms include excessive worry, restlessness, fatigue, difficulty concentrating, and physical symptoms like rapid heartbeat.\n\nTreatment options include cognitive-behavioral therapy, medication, mindfulness practices, and lifestyle changes. Learning coping strategies like deep breathing, progressive muscle relaxation, and grounding techniques can help manage anxiety symptoms.',
        
        'article.boneHealth.title': 'Bone Health and Osteoporosis',
        'article.boneHealth.desc': 'Prevention and management of bone health issues as you age.',
        'article.boneHealth.content': 'Osteoporosis is a condition where bones become weak and brittle, increasing fracture risk. Peak bone mass is typically reached by age 30, after which bone density gradually decreases.\n\nPrevention strategies include adequate calcium and vitamin D intake, regular weight-bearing exercise, avoiding smoking and excessive alcohol, and bone density screening. Treatment may include medications that slow bone loss or help build new bone tissue.',
        
        // Health Tips
        'tip.hydration': 'Stay hydrated by drinking at least 8 glasses of water daily',
        'tip.breathing': 'Take deep breaths to reduce stress and improve focus',
        'tip.sleep': 'Get 7-9 hours of quality sleep each night for optimal recovery',
        'tip.exercise': 'Take short walks throughout the day to improve circulation',
      },
      
      es: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Seguimiento de tiempo de espera en urgencias',
        'welcome.greeting': 'Bienvenido, John Doe',
        'welcome.subtitle': 'Manténgase informado sobre su visita',
        'welcome.headerGreeting': 'Bienvenido',
        'welcome.headerSubtitle': 'Manténgase informado sobre su espera',
        'news.title': 'Anuncios Importantes',
        'news.noNews': 'No hay anuncios en este momento.',
        'news.priority.low': 'Baja',
        'news.priority.medium': 'Media',
        'news.priority.high': 'Alta',
        'news.priority.urgent': 'Urgente',
        'news.by': 'por',
        'admin.title': 'Panel de Administración',
        'admin.subtitle': 'Gestionar anuncios y configuraciones',
        'admin.backToApp': 'Volver a la App',
        'admin.tabs.publish': 'Publicar Anuncios',
        'admin.tabs.preview': 'Vista Previa',
        'admin.news.publish': 'Publicar Nuevo Anuncio',
        'admin.news.title': 'Título',
        'admin.news.titlePlaceholder': 'Ingrese el título del anuncio...',
        'admin.news.author': 'Autor',
        'admin.news.authorPlaceholder': 'Ingrese el nombre del autor...',
        'admin.news.priority': 'Prioridad',
        'admin.news.content': 'Contenido',
        'admin.news.contentPlaceholder': 'Ingrese el contenido del anuncio...',
        'admin.news.publishButton': 'Publicar Anuncio',
        'admin.news.published': 'Anuncios Publicados',
        'admin.news.error': 'Error',
        'admin.news.fillRequired': 'Por favor complete todos los campos requeridos.',
        'admin.news.publishedSuccess': 'Anuncio publicado exitosamente.',
        'admin.preview.title': 'Vista Previa para Pacientes',
        'admin.preview.description': 'Así es como verán los anuncios los pacientes:',
        'admin.tabs.painReports': 'Reportes de Dolor',
        'admin.tabs.overview': 'Resumen General',
        'admin.pain.title': 'Reportes de Dolor de Pacientes',
        'admin.pain.subtitle': 'Monitorear y responder a evaluaciones de dolor',
        'admin.pain.noPain': 'No hay reportes de dolor disponibles',
        'admin.pain.patient': 'Paciente',
        'admin.pain.level': 'Nivel',
        'admin.pain.location': 'Ubicación',
        'admin.pain.type': 'Tipo',
        'admin.pain.description': 'Descripción',
        'admin.pain.time': 'Hora',
        'admin.pain.acknowledge': 'Reconocer',
        'admin.pain.acknowledged': 'Reconocido',
        'admin.pain.critical': 'Crítico',
        'admin.pain.highPriority': 'Alta Prioridad',
        'admin.overview.title': 'Resumen del Panel',
        'admin.overview.totalPatients': 'Total de Pacientes en Cola',
        'admin.overview.avgWaitTime': 'Tiempo de Espera Promedio',
        'admin.overview.criticalReports': 'Reportes Críticos de Dolor',
        'admin.overview.activeStaff': 'Personal Médico Activo',
        'admin.overview.recentActivity': 'Actividad Reciente',
        
        // Waiting Time Card
        'waitTime.estimatedWait': 'Tiempo de Espera Estimado',
        'waitTime.yourPosition': 'Su Posición en la Fila',
        'waitTime.of': 'de',
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
        
        // Educational Content
        'education.title': 'Centro de Educación de Salud',
        'education.subtitle': 'Aprenda sobre sus condiciones de salud y opciones de tratamiento',
        'education.search': 'Buscar temas de salud, condiciones o tratamientos...',
        'education.conditions': 'Condiciones de Salud',
        'education.treatments': 'Tratamientos y Procedimientos',
        'education.readMore': 'Leer Más',
        'education.viewGuide': 'Ver Guía',
        'education.quickTips': 'Consejos Rápidos de Salud',
        'education.quickTipsDesc': 'Consejos diarios para mejor salud y bienestar',
        'education.backToList': 'Volver a la Lista',
        
        // Article Content
        'article.bloodPressure.title': 'Entendiendo la Presión Arterial Alta',
        'article.bloodPressure.desc': 'Aprenda sobre la hipertensión, sus causas, síntomas y estrategias de manejo.',
        'article.diabetes.title': 'Manejando la Diabetes',
        'article.diabetes.desc': 'Guía completa para el manejo de diabetes, dieta y cambios de estilo de vida.',
        'article.anxiety.title': 'Entendiendo la Ansiedad',
        'article.anxiety.desc': 'Aprenda sobre trastornos de ansiedad, mecanismos de afrontamiento y opciones de tratamiento.',
        'article.boneHealth.title': 'Salud Ósea y Osteoporosis',
        'article.boneHealth.desc': 'Prevención y manejo de problemas de salud ósea al envejecer.',
        
        // Health Tips
        'tip.hydration': 'Manténgase hidratado bebiendo al menos 8 vasos de agua diariamente',
        'tip.breathing': 'Respire profundamente para reducir el estrés y mejorar el enfoque',
        'tip.sleep': 'Duerma de 7-9 horas de calidad cada noche para una recuperación óptima',
        'tip.exercise': 'Camine cortas distancias durante el día para mejorar la circulación',
      },
      
      fr: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Suivi des temps d\'attente aux urgences',
        'welcome.greeting': 'Bienvenue, John Doe',
        'welcome.subtitle': 'Restez informé de votre visite',
        'welcome.headerGreeting': 'Bienvenue',
        'welcome.headerSubtitle': 'Restez informé de votre attente',
        'news.title': 'Annonces Importantes',
        'news.noNews': 'Aucune annonce pour le moment.',
        'news.priority.low': 'Faible',
        'news.priority.medium': 'Moyenne',
        'news.priority.high': 'Élevée',
        'news.priority.urgent': 'Urgent',
        'news.by': 'par',
        'admin.title': 'Panneau d\'Administration',
        'admin.subtitle': 'Gérer les annonces et configurations',
        'admin.backToApp': 'Retour à l\'App',
        'admin.tabs.publish': 'Publier Annonces',
        'admin.tabs.preview': 'Aperçu',
        'admin.news.publish': 'Publier Nouvelle Annonce',
        'admin.news.title': 'Titre',
        'admin.news.titlePlaceholder': 'Entrez le titre de l\'annonce...',
        'admin.news.author': 'Auteur',
        'admin.news.authorPlaceholder': 'Entrez le nom de l\'auteur...',
        'admin.news.priority': 'Priorité',
        'admin.news.content': 'Contenu',
        'admin.news.contentPlaceholder': 'Entrez le contenu de l\'annonce...',
        'admin.news.publishButton': 'Publier Annonce',
        'admin.news.published': 'Annonces Publiées',
        'admin.news.error': 'Erreur',
        'admin.news.fillRequired': 'Veuillez remplir tous les champs requis.',
        'admin.news.publishedSuccess': 'Annonce publiée avec succès.',
        'admin.preview.title': 'Aperçu pour Patients',
        'admin.preview.description': 'Voici comment les patients verront les annonces:',
        'admin.tabs.painReports': 'Rapports de Douleur',
        'admin.tabs.overview': 'Vue d\'Ensemble',
        'admin.pain.title': 'Rapports de Douleur des Patients',
        'admin.pain.subtitle': 'Surveiller et répondre aux évaluations de douleur',
        'admin.pain.noPain': 'Aucun rapport de douleur disponible',
        'admin.pain.patient': 'Patient',
        'admin.pain.level': 'Niveau',
        'admin.pain.location': 'Emplacement',
        'admin.pain.type': 'Type',
        'admin.pain.description': 'Description',
        'admin.pain.time': 'Heure',
        'admin.pain.acknowledge': 'Reconnaître',
        'admin.pain.acknowledged': 'Reconnu',
        'admin.pain.critical': 'Critique',
        'admin.pain.highPriority': 'Haute Priorité',
        'admin.overview.title': 'Vue d\'Ensemble du Tableau de Bord',
        'admin.overview.totalPatients': 'Total Patients en File',
        'admin.overview.avgWaitTime': 'Temps d\'Attente Moyen',
        'admin.overview.criticalReports': 'Rapports de Douleur Critiques',
        'admin.overview.activeStaff': 'Personnel Médical Actif',
        'admin.overview.recentActivity': 'Activité Récente',
        
        // Other translations would go here - abbreviated for space
        'waitTime.estimatedWait': 'Temps d\'Attente Estimé',
        'waitTime.yourPosition': 'Votre Position dans la File',
        'waitTime.of': 'sur',
        'waitTime.minutes': 'minutes',
        'waitTime.updated': 'Dernière mise à jour',
        'waitTime.justNow': 'à l\'instant',
        'waitTime.minutesAgo': 'minutes',
        'nav.overview': 'Aperçu',
        'medical.title': 'Informations Médicales Optionnelles',
        'guidance.title': 'À Quoi S\'Attendre et Comment Se Préparer',
        'faq.title': 'Foire Aux Questions',
        'emergency.title': 'Ressources d\'Urgence',
        'language.en': 'English',
        'language.es': 'Español',
        'language.fr': 'Français',
        
        // Educational Content
        'education.title': 'Centre d\'Éducation Santé',
        'education.subtitle': 'Apprenez sur vos conditions de santé et options de traitement',
        'education.search': 'Rechercher sujets de santé, conditions ou traitements...',
        'education.conditions': 'Conditions de Santé',
        'education.treatments': 'Traitements et Procédures',
        'education.readMore': 'Lire Plus',
        'education.viewGuide': 'Voir Guide',
        'education.quickTips': 'Conseils Santé Rapides',
        'education.quickTipsDesc': 'Conseils quotidiens pour une meilleure santé et bien-être',
        'education.backToList': 'Retour à la Liste',
        
        // Article Content
        'article.bloodPressure.title': 'Comprendre l\'Hypertension Artérielle',
        'article.bloodPressure.desc': 'Apprenez sur l\'hypertension, ses causes, symptômes et stratégies de gestion.',
        'article.diabetes.title': 'Gérer le Diabète',
        'article.diabetes.desc': 'Guide complet pour la gestion du diabète, régime et changements de mode de vie.',
        'article.anxiety.title': 'Comprendre l\'Anxiété',
        'article.anxiety.desc': 'Apprenez sur les troubles anxieux, mécanismes d\'adaptation et options de traitement.',
        'article.boneHealth.title': 'Santé Osseuse et Ostéoporose',
        'article.boneHealth.desc': 'Prévention et gestion des problèmes de santé osseuse avec l\'âge.',
        
        // Health Tips
        'tip.hydration': 'Restez hydraté en buvant au moins 8 verres d\'eau par jour',
        'tip.breathing': 'Respirez profondément pour réduire le stress et améliorer la concentration',
        'tip.sleep': 'Dormez 7-9 heures de qualité chaque nuit pour une récupération optimale',
        'tip.exercise': 'Faites de courtes promenades tout au long de la journée pour améliorer la circulation',
      },
    };
    
    const languageTranslations = translations[language];
    if (!languageTranslations) {
      console.error(`Language ${language} not found, falling back to English`);
      return translations['en'][key] || key;
    }
    
    return languageTranslations[key] || translations['en'][key] || key;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key;
    }
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