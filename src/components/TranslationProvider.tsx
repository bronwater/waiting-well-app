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
        'welcome.title': 'Welcome, John Doe',
        'welcome.subtitle': 'Stay informed about your visit',
        'beingCalled.title': "You're Being Called!",
        'beingCalled.message': 'Please proceed to your assigned room now.',
        
        // News
        'news.title': 'Important Announcements',
        'news.noNews': 'No announcements at this time.',
        'news.priority.low': 'Low',
        'news.priority.medium': 'Medium',
        'news.priority.high': 'High',
        'news.priority.urgent': 'Urgent',
        'news.by': 'by',
        
        // Admin
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
        
        // Waiting Time Card
        'waitTime.estimatedWait': 'Estimated Wait Time',
        'waitTime.yourPosition': 'Your Position in Queue',
        'waitTime.totalPatients': 'Total Patients',
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
        'medical.emergencyContact': 'I have notified my emergency contact',
        'medical.confidential': 'This information is confidential and only shared with your care team',
        'medical.save': 'Save Information',
        'medical.saved': 'Medical information saved successfully',
        'medical.infoSaved': 'Information Saved',
        'medical.detailsHelp': 'Your details help us provide better care',
        'medical.optional': 'Optional',
        
        // Emergency Contacts
        'contact.title': 'Emergency Contact Alerts',
        'contact.name': 'Contact Name',
        'contact.namePlaceholder': 'Enter contact name',
        'contact.relationship': 'Relationship',
        'contact.relationshipPlaceholder': 'Select relationship',
        'contact.phone': 'Phone Number',
        'contact.phonePlaceholder': 'Enter phone number',
        'contact.email': 'Email Address',
        'contact.emailPlaceholder': 'Enter email address',
        'contact.notifications': 'Notification Preferences',
        'contact.waitUpdates': 'Wait time updates',
        'contact.completion': 'Visit completion',
        'contact.add': 'Add Contact',
        'contact.remove': 'Remove',
        'contact.sendAlerts': 'Send Alerts',
        'contact.alertsSent': 'Alerts Sent',
        'contact.missingInfo': 'Missing Information',
        'contact.fillAllFields': 'Please fill in all required fields.',
        'contact.added': 'Contact Added',
        'contact.addedSuccess': 'Emergency contact added successfully.',
        'contact.removed': 'Contact Removed',
        'contact.removedSuccess': 'Emergency contact removed.',
        'contact.alertsSentSuccess': 'Emergency alerts sent successfully.',
        'contact.preview': 'Notification Preview',
        'contact.previewMessage': 'Hello! This is an update about John Doe\'s visit to the Emergency Room. Current status: Position 3 in queue, estimated wait time: 25 minutes. We will keep you informed of any changes.',
        
        // Relationships
        'relationship.spouse': 'Spouse',
        'relationship.parent': 'Parent',
        'relationship.child': 'Child',
        'relationship.sibling': 'Sibling',
        'relationship.otherFamily': 'Other Family',
        'relationship.friend': 'Friend',
        'relationship.caregiver': 'Caregiver',
        'relationship.other': 'Other',
        
        // Tabs
        'tabs.medicalInfo': 'Medical Info',
        'tabs.emergencyContacts': 'Emergency Contacts',
        
        // General UI
        'general.updates': 'Updates',
        'general.completion': 'Completion',
        
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
        'faq.description': 'Find answers to common questions organized by category',
        'faq.general': 'General',
        'faq.waiting': 'Wait Times',
        'faq.visitors': 'Visitors',
        'faq.medical': 'Medical',
        'faq.insurance': 'Insurance',
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
        
        // FAQ Categories descriptions
        'faq.general.desc': 'Essential information about your visit and our services',
        'faq.waiting.desc': 'Everything about wait times and the process',
        'faq.visitors.desc': 'Information for family members and visitors',
        'faq.medical.desc': 'Medical concerns and emergency procedures',
        'faq.insurance.desc': 'Payment, insurance, and billing information',
        
        // FAQ Category titles
        'faq.category.general': 'General Information',
        'faq.category.waiting': 'Wait Times & Process',
        'faq.category.visitors': 'Visitors & Support',
        'faq.category.medical': 'Medical & Emergency',
        'faq.category.insurance': 'Insurance & Billing',
        
        // Additional FAQ Questions
        'faq.visit.title': 'What should I expect during my visit?',
        'faq.visit.content': 'Your visit will include check-in, waiting time, consultation with medical staff, and any necessary procedures or tests. We\'ll keep you informed throughout the process.',
        'faq.contact.title': 'How can I update my contact information?',
        'faq.contact.content': 'You can update your contact information at the reception desk or through the medical info section in this app.',
        'faq.payment.title': 'What forms of payment do you accept?',
        'faq.payment.content': 'We accept cash, credit cards, debit cards, and most insurance plans. Please check with reception for specific insurance coverage.',
        'faq.leaveReturn.title': 'Can I leave and come back?',
        'faq.leaveReturn.content': 'You may leave briefly, but please inform the front desk. Your position in line will be held for a limited time only.',
        'faq.accuracy.title': 'How accurate are the wait time estimates?',
        'faq.accuracy.content': 'Wait times are estimates based on current patient flow and can change due to emergencies or complex cases. We update them regularly.',
        'faq.family.title': 'Can family members stay with me?',
        'faq.family.content': 'Family members may stay during consultation, but space may be limited. Please check with your healthcare provider.',
        'faq.children.title': 'Are there facilities for accompanying children?',
        'faq.children.content': 'We have a family waiting area with basic amenities. Please supervise children at all times.',
        'faq.worsen.title': 'What if my condition worsens while waiting?',
        'faq.worsen.content': 'Please immediately notify staff at the nurse station. We continuously monitor patients and can prioritize urgent cases.',
        'faq.paymentPlan.title': 'Do you offer payment plans?',
        'faq.paymentPlan.content': 'Yes, we offer various payment options and plans. Please speak with our billing department for more information.',
        'faq.bill.title': 'How long until I receive my bill?',
        'faq.bill.content': 'Bills are typically sent within 2-3 weeks after your visit. You can also access billing information through our patient portal.',
        
        // Feedback Rating
        'feedback.title': 'Rate Your Experience',
        'feedback.subtitle': 'Your feedback helps us improve patient care and service quality.',
        'feedback.rateOverall': 'How would you rate your overall experience?',
        'feedback.comments': 'Additional Comments (Optional)',
        'feedback.commentsPlaceholder': 'Tell us about your experience, suggestions for improvement, or compliments for our staff...',
        'feedback.submit': 'Submit Feedback',
        'feedback.thankYou': 'Thank You!',
        'feedback.submitted': 'Your feedback has been submitted and will help us improve our services.',
        'feedback.submitAnother': 'Submit Another Review',
        'feedback.selectRating': 'Please select a rating',
        'feedback.ratingHelps': 'Your rating helps us improve our service.',
        'feedback.thankYouTitle': 'Thank you for your feedback!',
        'feedback.thankYouMessage': 'Your input helps us improve patient care.',
        'feedback.poor': 'Poor',
        'feedback.fair': 'Fair',
        'feedback.good': 'Good',
        'feedback.veryGood': 'Very Good',
        'feedback.excellent': 'Excellent',
        
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
        
        // Educational Categories
        'education.category.cardiovascular': 'Cardiovascular',
        'education.category.endocrine': 'Endocrine',
        'education.category.mentalHealth': 'Mental Health',
        'education.category.orthopedic': 'Orthopedic',
        'education.category.rehabilitation': 'Rehabilitation',
        'education.category.pharmacy': 'Pharmacy',
        'education.category.surgery': 'Surgery',
        'education.category.nutrition': 'Nutrition',
        'education.category.sleep': 'Sleep',
        'education.category.exercise': 'Exercise',
        
        // Educational Content
        'education.physicalTherapy': 'Physical Therapy Exercises',
        'education.videoGuide': 'Video Guide',
        'education.medicationManagement': 'Medication Management',
        'education.interactiveGuide': 'Interactive Guide',
        'education.preSurgeryPrep': 'Pre-Surgery Preparation',
        'education.comprehensiveGuide': 'Comprehensive Guide',
        
        // Article Content
        'article.bloodPressure.title': 'Understanding High Blood Pressure',
        'article.bloodPressure.desc': 'Learn about hypertension, its causes, symptoms, and management strategies.',
        'article.bloodPressure.content': 'High blood pressure, or hypertension, occurs when the force of blood against artery walls is consistently too high. This condition affects millions worldwide and is often called the "silent killer" because it typically has no symptoms until serious complications develop.\\n\\nCauses include genetics, diet high in sodium, lack of physical activity, stress, and certain medical conditions. Regular monitoring and lifestyle changes like exercise, healthy diet, and medication when needed can effectively manage hypertension.',
        
        'article.diabetes.title': 'Managing Diabetes',
        'article.diabetes.desc': 'Comprehensive guide to diabetes management, diet, and lifestyle changes.',
        'article.diabetes.content': 'Diabetes is a group of metabolic disorders characterized by high blood sugar levels. Type 1 diabetes occurs when the pancreas produces little or no insulin, while Type 2 diabetes develops when the body becomes resistant to insulin.\\n\\nEffective management includes regular blood sugar monitoring, balanced nutrition, regular exercise, and medication adherence. Working with healthcare providers to develop a personalized management plan is essential for long-term health.',
        
        'article.anxiety.title': 'Understanding Anxiety',
        'article.anxiety.desc': 'Learn about anxiety disorders, coping mechanisms, and treatment options.',
        'article.anxiety.content': 'Anxiety is a normal emotion that becomes a disorder when it interferes with daily life. Common symptoms include excessive worry, restlessness, fatigue, difficulty concentrating, and physical symptoms like rapid heartbeat.\\n\\nTreatment options include cognitive-behavioral therapy, medication, mindfulness practices, and lifestyle changes. Learning coping strategies like deep breathing, progressive muscle relaxation, and grounding techniques can help manage anxiety symptoms.',
        
        'article.boneHealth.title': 'Bone Health and Osteoporosis',
        'article.boneHealth.desc': 'Prevention and management of bone health issues as you age.',
        'article.boneHealth.content': 'Osteoporosis is a condition where bones become weak and brittle, increasing fracture risk. Peak bone mass is typically reached by age 30, after which bone density gradually decreases.\\n\\nPrevention strategies include adequate calcium and vitamin D intake, regular weight-bearing exercise, avoiding smoking and excessive alcohol, and bone density screening. Treatment may include medications that slow bone loss or help build new bone tissue.',
        
        // Health Tips
        'tip.hydration': 'Stay hydrated by drinking at least 8 glasses of water daily',
        'tip.breathing': 'Take deep breaths to reduce stress and improve focus',
        'tip.sleep': 'Get 7-9 hours of quality sleep each night for optimal recovery',
        'tip.exercise': 'Take short walks throughout the day to improve circulation',
        
        // Notifications
        'notifications.title': 'Notification Settings',
        'notifications.enable': 'Enable Notifications',
        'notifications.disable': 'Disable Notifications',
        'notifications.description': 'Get updates about your wait time and position',
        'notifications.enabled': 'Enabled',
        'notifications.enabledDesc': 'You will receive notifications about wait time updates',
        'notifications.unsupported': 'Notifications not supported in this browser',
        'notifications.permissionGranted': 'Notifications enabled successfully!',
        'notifications.permissionDenied': 'Notification permission denied',
        'notifications.callTitle': "You're being called!",
        'notifications.callDesc': 'Please proceed to your assigned room.',
        'notifications.updateTitle': 'Update: You\'re moving up!',
        'notifications.updateDesc': 'Your estimated wait time has been updated.',
        
        // Language Selector
        'language.select': 'Select Language',
        'language.en': 'English',
        'language.es': 'Español',
        'language.fr': 'Français',
        
        // Footer
        'footer.emergency': 'For medical emergencies, press the call button or dial 911',
        'footer.app': 'UrgencyTrack - Keeping you informed during your visit',
      },
      
      es: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Seguimiento de tiempo de espera en urgencias',
        'welcome.title': 'Bienvenido, John Doe',
        'welcome.subtitle': 'Manténgase informado sobre su visita',
        'beingCalled.title': '¡Te están llamando!',
        'beingCalled.message': 'Por favor diríjase a su habitación asignada ahora.',
        
        // News
        'news.title': 'Anuncios Importantes',
        'news.noNews': 'No hay anuncios en este momento.',
        'news.priority.low': 'Baja',
        'news.priority.medium': 'Media',
        'news.priority.high': 'Alta',
        'news.priority.urgent': 'Urgente',
        'news.by': 'por',
        
        // Admin
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
        
        // Waiting Time Card
        'waitTime.estimatedWait': 'Tiempo de Espera Estimado',
        'waitTime.yourPosition': 'Su Posición en la Fila',
        'waitTime.totalPatients': 'Total de Pacientes',
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
        'medical.emergencyContact': 'He notificado a mi contacto de emergencia',
        'medical.confidential': 'Esta información es confidencial y solo se comparte con su equipo de atención',
        'medical.save': 'Guardar Información',
        'medical.saved': 'Información médica guardada exitosamente',
        'medical.infoSaved': 'Información Guardada',
        'medical.detailsHelp': 'Sus detalles nos ayudan a brindar mejor atención',
        'medical.optional': 'Opcional',
        
        // Emergency Contacts
        'contact.title': 'Alertas de Contacto de Emergencia',
        'contact.name': 'Nombre del Contacto',
        'contact.namePlaceholder': 'Ingrese nombre del contacto',
        'contact.relationship': 'Relación',
        'contact.relationshipPlaceholder': 'Seleccione relación',
        'contact.phone': 'Número de Teléfono',
        'contact.phonePlaceholder': 'Ingrese número de teléfono',
        'contact.email': 'Dirección de Email',
        'contact.emailPlaceholder': 'Ingrese dirección de email',
        'contact.notifications': 'Preferencias de Notificación',
        'contact.waitUpdates': 'Actualizaciones de tiempo de espera',
        'contact.completion': 'Finalización de visita',
        'contact.add': 'Agregar Contacto',
        'contact.remove': 'Eliminar',
        'contact.sendAlerts': 'Enviar Alertas',
        'contact.alertsSent': 'Alertas Enviadas',
        'contact.missingInfo': 'Información Faltante',
        'contact.fillAllFields': 'Por favor complete todos los campos requeridos.',
        'contact.added': 'Contacto Agregado',
        'contact.addedSuccess': 'Contacto de emergencia agregado exitosamente.',
        'contact.removed': 'Contacto Eliminado',
        'contact.removedSuccess': 'Contacto de emergencia eliminado.',
        'contact.alertsSentSuccess': 'Alertas de emergencia enviadas exitosamente.',
        'contact.preview': 'Vista Previa de Notificación',
        'contact.previewMessage': '¡Hola! Esta es una actualización sobre la visita de John Doe a la Sala de Emergencias. Estado actual: Posición 3 en la fila, tiempo de espera estimado: 25 minutos. Le mantendremos informado de cualquier cambio.',
        
        // Relationships
        'relationship.spouse': 'Cónyuge',
        'relationship.parent': 'Padre/Madre',
        'relationship.child': 'Hijo/Hija',
        'relationship.sibling': 'Hermano/Hermana',
        'relationship.otherFamily': 'Otro Familiar',
        'relationship.friend': 'Amigo/Amiga',
        'relationship.caregiver': 'Cuidador',
        'relationship.other': 'Otro',
        
        // Tabs
        'tabs.medicalInfo': 'Info Médica',
        'tabs.emergencyContacts': 'Contactos de Emergencia',
        
        // General UI
        'general.updates': 'Actualizaciones',
        'general.completion': 'Finalización',
        
        // Guidance Section
        'guidance.title': 'Qué Esperar y Cómo Prepararse',
        'guidance.stayCalm': 'Manténgase Calmado y Cómodo',
        'guidance.stayCalm.desc': 'Encuentre un asiento cómodo y trate de relajarse. La respiración profunda puede ayudar a manejar la ansiedad.',
        'guidance.documents': 'Mantenga Documentos Importantes Listos',
        'guidance.documents.desc': 'Tenga su identificación, tarjeta de seguro y cualquier registro médico relevante fácilmente accesible.',
        'guidance.phone': 'Mantenga su Teléfono Cargado',
        'guidance.phone.desc': 'Asegúrese de que su teléfono permanezca cargado para recibir actualizaciones importantes sobre su tiempo de espera.',
        'guidance.questions': 'Prepare Preguntas para el Personal',
        'guidance.questions.desc': 'Piense en síntomas, niveles de dolor y cuándo comenzaron para ayudar al personal médico.',
        'guidance.follow': 'Siga las Pautas del Hospital',
        'guidance.follow.desc': 'Respete los horarios de visita, niveles de ruido y cualquier instrucción específica del personal del hospital.',
        
        // FAQ Section
        'faq.title': 'Preguntas Frecuentes',
        'faq.description': 'Encuentre respuestas a preguntas comunes organizadas por categoría',
        'faq.general': 'General',
        'faq.waiting': 'Tiempos de Espera',
        'faq.visitors': 'Visitantes',
        'faq.medical': 'Médico',
        'faq.insurance': 'Seguro',
        'faq.emergency.title': '¿Cuándo debo buscar atención inmediata?',
        'faq.emergency.content': 'Si experimenta dolor en el pecho, dificultad para respirar, sangrado severo, pérdida de conciencia, o signos de derrame cerebral, alerte al personal inmediatamente.',
        'faq.wait.title': '¿Por qué cambia mi tiempo de espera?',
        'faq.wait.content': 'Los tiempos de espera fluctúan según la gravedad del paciente, nuevas llegadas y complejidad del tratamiento. Los casos más urgentes siempre tienen prioridad.',
        'faq.leaving.title': '¿Puedo irme y volver?',
        'faq.leaving.content': 'Por favor informe a la recepción si necesita salir. Irse sin avisar puede afectar el tiempo de su tratamiento.',
        'faq.pain.title': 'Mi dolor está empeorando, ¿qué debo hacer?',
        'faq.pain.content': 'Notifique inmediatamente al personal de enfermería. Pueden reevaluar su condición y ajustar su prioridad si es necesario.',
        'faq.insurance.title': '¿Qué pasa si no tengo seguro?',
        'faq.insurance.content': 'Las salas de emergencia están obligadas a tratar pacientes independientemente del estado del seguro. Hable con servicios financieros sobre opciones de pago.',
        'faq.visitor.title': '¿Pueden los familiares quedarse conmigo?',
        'faq.visitor.content': 'Las políticas de visitantes varían. Consulte con el personal sobre las restricciones actuales y horarios de visita para pacientes de emergencia.',
        
        // FAQ Categories descriptions
        'faq.general.desc': 'Información esencial sobre su visita y nuestros servicios',
        'faq.waiting.desc': 'Todo sobre tiempos de espera y el proceso',
        'faq.visitors.desc': 'Información para familiares y visitantes',
        'faq.medical.desc': 'Preocupaciones médicas y procedimientos de emergencia',
        'faq.insurance.desc': 'Información de pago, seguro y facturación',
        
        // FAQ Category titles
        'faq.category.general': 'Información General',
        'faq.category.waiting': 'Tiempos de Espera y Proceso',
        'faq.category.visitors': 'Visitantes y Apoyo',
        'faq.category.medical': 'Médico y Emergencias',
        'faq.category.insurance': 'Seguro y Facturación',
        
        // Additional FAQ Questions
        'faq.visit.title': '¿Qué debo esperar durante mi visita?',
        'faq.visit.content': 'Su visita incluirá registro, tiempo de espera, consulta con personal médico y cualquier procedimiento o prueba necesaria. Le mantendremos informado durante todo el proceso.',
        'faq.contact.title': '¿Cómo puedo actualizar mi información de contacto?',
        'faq.contact.content': 'Puede actualizar su información de contacto en el mostrador de recepción o a través de la sección de información médica en esta aplicación.',
        'faq.payment.title': '¿Qué formas de pago aceptan?',
        'faq.payment.content': 'Aceptamos efectivo, tarjetas de crédito, tarjetas de débito y la mayoría de planes de seguro. Por favor consulte en recepción sobre cobertura de seguro específica.',
        
        // Feedback Rating
        'feedback.title': 'Califique Su Experiencia',
        'feedback.subtitle': 'Su retroalimentación nos ayuda a mejorar la atención al paciente y la calidad del servicio.',
        'feedback.rateOverall': '¿Cómo calificaría su experiencia general?',
        'feedback.comments': 'Comentarios Adicionales (Opcional)',
        'feedback.commentsPlaceholder': 'Cuéntenos sobre su experiencia, sugerencias de mejora o elogios para nuestro personal...',
        'feedback.submit': 'Enviar Retroalimentación',
        'feedback.thankYou': '¡Gracias!',
        'feedback.submitted': 'Su retroalimentación ha sido enviada y nos ayudará a mejorar nuestros servicios.',
        'feedback.submitAnother': 'Enviar Otra Reseña',
        'feedback.selectRating': 'Por favor seleccione una calificación',
        'feedback.ratingHelps': 'Su calificación nos ayuda a mejorar nuestro servicio.',
        'feedback.thankYouTitle': '¡Gracias por su retroalimentación!',
        'feedback.thankYouMessage': 'Su aporte nos ayuda a mejorar la atención al paciente.',
        'feedback.poor': 'Malo',
        'feedback.fair': 'Regular',
        'feedback.good': 'Bueno',
        'feedback.veryGood': 'Muy Bueno',
        'feedback.excellent': 'Excelente',
        
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
        
        // Educational Categories
        'education.category.cardiovascular': 'Cardiovascular',
        'education.category.endocrine': 'Endocrino',
        'education.category.mentalHealth': 'Salud Mental',
        'education.category.orthopedic': 'Ortopédico',
        'education.category.rehabilitation': 'Rehabilitación',
        'education.category.pharmacy': 'Farmacia',
        'education.category.surgery': 'Cirugía',
        'education.category.nutrition': 'Nutrición',
        'education.category.sleep': 'Sueño',
        'education.category.exercise': 'Ejercicio',
        
        // Educational Content
        'education.physicalTherapy': 'Ejercicios de Fisioterapia',
        'education.videoGuide': 'Guía en Video',
        'education.medicationManagement': 'Manejo de Medicamentos',
        'education.interactiveGuide': 'Guía Interactiva',
        'education.preSurgeryPrep': 'Preparación Pre-Quirúrgica',
        'education.comprehensiveGuide': 'Guía Completa',
        
        // Language Selector
        'language.select': 'Seleccionar Idioma',
        'language.en': 'English',
        'language.es': 'Español',
        'language.fr': 'Français',
        
        // Footer
        'footer.emergency': 'Para emergencias médicas, presione el botón de llamada o marque 911',
        'footer.app': 'UrgencyTrack - Manteniéndole informado durante su visita',
      },
      
      fr: {
        // Header
        'header.title': 'UrgencyTrack',
        'header.subtitle': 'Suivi des temps d\'attente aux urgences',
        'welcome.title': 'Bienvenue, John Doe',
        'welcome.subtitle': 'Restez informé de votre visite',
        'beingCalled.title': 'On vous appelle !',
        'beingCalled.message': 'Veuillez vous rendre à votre chambre assignée maintenant.',
        
        // News
        'news.title': 'Annonces Importantes',
        'news.noNews': 'Aucune annonce pour le moment.',
        'news.priority.low': 'Faible',
        'news.priority.medium': 'Moyenne',
        'news.priority.high': 'Élevée',
        'news.priority.urgent': 'Urgent',
        'news.by': 'par',
        
        // Admin
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
        
        // Waiting Time Card
        'waitTime.estimatedWait': 'Temps d\'Attente Estimé',
        'waitTime.yourPosition': 'Votre Position dans la File',
        'waitTime.totalPatients': 'Total des Patients',
        'waitTime.minutes': 'minutes',
        'waitTime.updated': 'Dernière mise à jour',
        'waitTime.justNow': 'à l\'instant',
        'waitTime.minutesAgo': 'minutes plus tôt',
        
        // Navigation
        'nav.overview': 'Aperçu',
        'nav.medicalInfo': 'Info Médicale',
        'nav.guidance': 'Orientation',
        'nav.faq': 'FAQ et Aide',
        
        // Medical Info Form
        'medical.title': 'Informations Médicales Optionnelles',
        'medical.subtitle': 'Ces informations peuvent aider le personnel médical à préparer votre visite',
        'medical.allergies': 'Allergies Connues',
        'medical.allergiesPlaceholder': 'Listez toute allergie connue...',
        'medical.medications': 'Médicaments Actuels',
        'medical.medicationsPlaceholder': 'Listez vos médicaments actuels...',
        'medical.conditions': 'Conditions Médicales',
        'medical.conditionsPlaceholder': 'Listez toute condition médicale pertinente...',
        'medical.symptoms': 'Symptômes Actuels',
        'medical.symptomsPlaceholder': 'Décrivez vos symptômes actuels...',
        'medical.emergencyContact': 'J\'ai notifié mon contact d\'urgence',
        'medical.confidential': 'Ces informations sont confidentielles et partagées uniquement avec votre équipe de soins',
        'medical.save': 'Sauvegarder Informations',
        'medical.saved': 'Informations médicales sauvegardées avec succès',
        'medical.infoSaved': 'Informations Sauvegardées',
        'medical.detailsHelp': 'Vos détails nous aident à fournir de meilleurs soins',
        'medical.optional': 'Optionnel',
        
        // Emergency Contacts
        'contact.title': 'Alertes de Contact d\'Urgence',
        'contact.name': 'Nom du Contact',
        'contact.namePlaceholder': 'Entrez le nom du contact',
        'contact.relationship': 'Relation',
        'contact.relationshipPlaceholder': 'Sélectionnez la relation',
        'contact.phone': 'Numéro de Téléphone',
        'contact.phonePlaceholder': 'Entrez le numéro de téléphone',
        'contact.email': 'Adresse Email',
        'contact.emailPlaceholder': 'Entrez l\'adresse email',
        'contact.notifications': 'Préférences de Notification',
        'contact.waitUpdates': 'Mises à jour du temps d\'attente',
        'contact.completion': 'Achèvement de la visite',
        'contact.add': 'Ajouter Contact',
        'contact.remove': 'Supprimer',
        'contact.sendAlerts': 'Envoyer Alertes',
        'contact.alertsSent': 'Alertes Envoyées',
        'contact.missingInfo': 'Informations Manquantes',
        'contact.fillAllFields': 'Veuillez remplir tous les champs requis.',
        'contact.added': 'Contact Ajouté',
        'contact.addedSuccess': 'Contact d\'urgence ajouté avec succès.',
        'contact.removed': 'Contact Supprimé',
        'contact.removedSuccess': 'Contact d\'urgence supprimé.',
        'contact.alertsSentSuccess': 'Alertes d\'urgence envoyées avec succès.',
        'contact.preview': 'Aperçu de Notification',
        'contact.previewMessage': 'Bonjour ! Ceci est une mise à jour concernant la visite de John Doe aux Urgences. Statut actuel : Position 3 dans la file, temps d\'attente estimé : 25 minutes. Nous vous tiendrons informé de tout changement.',
        
        // Relationships
        'relationship.spouse': 'Époux/Épouse',
        'relationship.parent': 'Parent',
        'relationship.child': 'Enfant',
        'relationship.sibling': 'Frère/Sœur',
        'relationship.otherFamily': 'Autre Famille',
        'relationship.friend': 'Ami(e)',
        'relationship.caregiver': 'Aidant',
        'relationship.other': 'Autre',
        
        // Tabs
        'tabs.medicalInfo': 'Info Médicale',
        'tabs.emergencyContacts': 'Contacts d\'Urgence',
        
        // General UI
        'general.updates': 'Mises à jour',
        'general.completion': 'Achèvement',
        
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
        'guidance.follow.desc': 'Respectez les heures de visite, niveaux sonores et toute instruction spécifique du personnel hospitalier.',
        
        // FAQ Section
        'faq.title': 'Foire Aux Questions',
        'faq.description': 'Trouvez des réponses aux questions communes organisées par catégorie',
        'faq.general': 'Général',
        'faq.waiting': 'Temps d\'Attente',
        'faq.visitors': 'Visiteurs',
        'faq.medical': 'Médical',
        'faq.insurance': 'Assurance',
        'faq.emergency.title': 'Quand dois-je chercher une attention immédiate ?',
        'faq.emergency.content': 'Si vous ressentez des douleurs thoraciques, difficultés respiratoires, saignements sévères, perte de conscience, ou signes d\'AVC, alertez le personnel immédiatement.',
        'faq.wait.title': 'Pourquoi mon temps d\'attente change-t-il ?',
        'faq.wait.content': 'Les temps d\'attente fluctuent selon la gravité des patients, nouvelles arrivées et complexité du traitement. Les cas plus urgents sont toujours prioritaires.',
        'faq.leaving.title': 'Puis-je partir et revenir ?',
        'faq.leaving.content': 'Veuillez informer la réception si vous devez sortir. Partir sans préavis peut affecter le timing de votre traitement.',
        'faq.pain.title': 'Ma douleur s\'aggrave, que dois-je faire ?',
        'faq.pain.content': 'Notifiez immédiatement le personnel infirmier. Ils peuvent réévaluer votre condition et ajuster votre priorité si nécessaire.',
        'faq.insurance.title': 'Et si je n\'ai pas d\'assurance ?',
        'faq.insurance.content': 'Les salles d\'urgence sont tenues de traiter les patients indépendamment du statut d\'assurance. Parlez aux services financiers des options de paiement.',
        'faq.visitor.title': 'Les membres de la famille peuvent-ils rester avec moi ?',
        'faq.visitor.content': 'Les politiques de visiteurs varient. Vérifiez avec le personnel les restrictions actuelles et heures de visite pour les patients d\'urgence.',
        
        // FAQ Categories descriptions
        'faq.general.desc': 'Informations essentielles sur votre visite et nos services',
        'faq.waiting.desc': 'Tout sur les temps d\'attente et le processus',
        'faq.visitors.desc': 'Informations pour les membres de la famille et visiteurs',
        'faq.medical.desc': 'Préoccupations médicales et procédures d\'urgence',
        'faq.insurance.desc': 'Informations de paiement, assurance et facturation',
        
        // FAQ Category titles
        'faq.category.general': 'Informations Générales',
        'faq.category.waiting': 'Temps d\'Attente et Processus',
        'faq.category.visitors': 'Visiteurs et Soutien',
        'faq.category.medical': 'Médical et Urgences',
        'faq.category.insurance': 'Assurance et Facturation',
        
        // Additional FAQ Questions
        'faq.visit.title': 'À quoi dois-je m\'attendre pendant ma visite ?',
        'faq.visit.content': 'Votre visite comprendra l\'enregistrement, temps d\'attente, consultation avec le personnel médical et tout examen ou procédure nécessaire. Nous vous tiendrons informé tout au long du processus.',
        'faq.contact.title': 'Comment puis-je mettre à jour mes informations de contact ?',
        'faq.contact.content': 'Vous pouvez mettre à jour vos informations de contact à la réception ou via la section d\'informations médicales de cette application.',
        'faq.payment.title': 'Quelles formes de paiement acceptez-vous ?',
        'faq.payment.content': 'Nous acceptons l\'argent comptant, cartes de crédit, cartes de débit et la plupart des plans d\'assurance. Veuillez vérifier à la réception pour la couverture d\'assurance spécifique.',
        
        // Feedback Rating
        'feedback.title': 'Évaluez Votre Expérience',
        'feedback.subtitle': 'Vos commentaires nous aident à améliorer les soins aux patients et la qualité du service.',
        'feedback.rateOverall': 'Comment évalueriez-vous votre expérience globale ?',
        'feedback.comments': 'Commentaires Supplémentaires (Optionnel)',
        'feedback.commentsPlaceholder': 'Parlez-nous de votre expérience, suggestions d\'amélioration ou compliments pour notre personnel...',
        'feedback.submit': 'Envoyer Commentaires',
        'feedback.thankYou': 'Merci !',
        'feedback.submitted': 'Vos commentaires ont été soumis et nous aideront à améliorer nos services.',
        'feedback.submitAnother': 'Soumettre Une Autre Évaluation',
        'feedback.selectRating': 'Veuillez sélectionner une évaluation',
        'feedback.ratingHelps': 'Votre évaluation nous aide à améliorer notre service.',
        'feedback.thankYouTitle': 'Merci pour vos commentaires !',
        'feedback.thankYouMessage': 'Votre contribution nous aide à améliorer les soins aux patients.',
        'feedback.poor': 'Mauvais',
        'feedback.fair': 'Acceptable',
        'feedback.good': 'Bon',
        'feedback.veryGood': 'Très Bon',
        'feedback.excellent': 'Excellent',
        
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
        
        // Educational Categories
        'education.category.cardiovascular': 'Cardiovasculaire',
        'education.category.endocrine': 'Endocrinien',
        'education.category.mentalHealth': 'Santé Mentale',
        'education.category.orthopedic': 'Orthopédique',
        'education.category.rehabilitation': 'Réhabilitation',
        'education.category.pharmacy': 'Pharmacie',
        'education.category.surgery': 'Chirurgie',
        'education.category.nutrition': 'Nutrition',
        'education.category.sleep': 'Sommeil',
        'education.category.exercise': 'Exercice',
        
        // Educational Content
        'education.physicalTherapy': 'Exercices de Physiothérapie',
        'education.videoGuide': 'Guide Vidéo',
        'education.medicationManagement': 'Gestion des Médicaments',
        'education.interactiveGuide': 'Guide Interactif',
        'education.preSurgeryPrep': 'Préparation Pré-Chirurgicale',
        'education.comprehensiveGuide': 'Guide Complet',
        
        // Language Selector
        'language.select': 'Sélectionner Langue',
        'language.en': 'English',
        'language.es': 'Español',
        'language.fr': 'Français',
        
        // Footer
        'footer.emergency': 'Pour les urgences médicales, appuyez sur le bouton d\'appel ou composez le 911',
        'footer.app': 'UrgencyTrack - Vous tenir informé pendant votre visite',
      }
    };

    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};