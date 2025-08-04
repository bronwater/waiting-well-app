import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Clock, Users, Shield, Heart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const FAQSection = () => {
  const { t } = useTranslation();
  
  const faqCategories = {
    general: {
      title: "General Information",
      icon: HelpCircle,
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-800",
      questions: [
        {
          question: "What should I expect during my visit?",
          answer: "Your visit will include check-in, waiting time, consultation with medical staff, and any necessary procedures or tests. We'll keep you informed throughout the process."
        },
        {
          question: "How can I update my contact information?",
          answer: "You can update your contact information at the reception desk or through the medical info section in this app."
        },
        {
          question: "What forms of payment do you accept?",
          answer: "We accept cash, credit cards, debit cards, and most insurance plans. Please check with reception for specific insurance coverage."
        }
      ]
    },
    waiting: {
      title: "Wait Times & Process",
      icon: Clock,
      color: "amber",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      textColor: "text-amber-700 dark:text-amber-300",
      borderColor: "border-amber-200 dark:border-amber-800",
      questions: [
        {
          question: t("faq.wait.title"),
          answer: t("faq.wait.content")
        },
        {
          question: "Can I leave and come back?",
          answer: "You may leave briefly, but please inform the front desk. Your position in line will be held for a limited time only."
        },
        {
          question: "How accurate are the wait time estimates?",
          answer: "Wait times are estimates based on current patient flow and can change due to emergencies or complex cases. We update them regularly."
        }
      ]
    },
    visitors: {
      title: "Visitors & Support",
      icon: Users,
      color: "green",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      textColor: "text-green-700 dark:text-green-300",
      borderColor: "border-green-200 dark:border-green-800",
      questions: [
        {
          question: t("faq.visitor.title"),
          answer: t("faq.visitor.content")
        },
        {
          question: "Can family members stay with me?",
          answer: "Family members may stay during consultation, but space may be limited. Please check with your healthcare provider."
        },
        {
          question: "Are there facilities for accompanying children?",
          answer: "We have a family waiting area with basic amenities. Please supervise children at all times."
        }
      ]
    },
    medical: {
      title: "Medical & Emergency",
      icon: Heart,
      color: "red",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      textColor: "text-red-700 dark:text-red-300",
      borderColor: "border-red-200 dark:border-red-800",
      questions: [
        {
          question: t("faq.emergency.title"),
          answer: t("faq.emergency.content")
        },
        {
          question: t("faq.pain.title"),
          answer: t("faq.pain.content")
        },
        {
          question: "What if my condition worsens while waiting?",
          answer: "Please immediately notify staff at the nurse station. We continuously monitor patients and can prioritize urgent cases."
        }
      ]
    },
    insurance: {
      title: "Insurance & Billing",
      icon: Shield,
      color: "purple",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      textColor: "text-purple-700 dark:text-purple-300",
      borderColor: "border-purple-200 dark:border-purple-800",
      questions: [
        {
          question: t("faq.insurance.title"),
          answer: t("faq.insurance.content")
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, we offer various payment options and plans. Please speak with our billing department for more information."
        },
        {
          question: "How long until I receive my bill?",
          answer: "Bills are typically sent within 2-3 weeks after your visit. You can also access billing information through our patient portal."
        }
      ]
    }
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <HelpCircle className="h-6 w-6 text-primary" />
          {t("faq.title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Find answers to common questions organized by category
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/30">
            {Object.entries(faqCategories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="gap-2 flex-col py-4 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                >
                  <div className={`p-2 rounded-full ${category.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${category.textColor}`} />
                  </div>
                  <span className="text-xs font-medium leading-tight text-center">
                    {category.title.split(' ')[0]}
                    <br />
                    <span className="hidden sm:inline opacity-70">
                      {category.title.split(' ').slice(1).join(' ')}
                    </span>
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(faqCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <div className={`mb-6 p-4 rounded-xl ${category.bgColor} ${category.borderColor} border`}>
                <h3 className={`text-xl font-bold flex items-center gap-3 ${category.textColor}`}>
                  <div className="p-2 bg-background/80 rounded-lg shadow-sm">
                    <category.icon className="h-5 w-5" />
                  </div>
                  {category.title}
                </h3>
                <p className={`text-sm mt-2 opacity-80 ${category.textColor}`}>
                  {key === 'general' && 'Essential information about your visit and our services'}
                  {key === 'waiting' && 'Everything about wait times and the process'}
                  {key === 'visitors' && 'Information for family members and visitors'}
                  {key === 'medical' && 'Medical concerns and emergency procedures'}
                  {key === 'insurance' && 'Payment, insurance, and billing information'}
                </p>
              </div>
              
              <div className="space-y-2">
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((item, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${key}-item-${index}`} 
                      className="border rounded-lg px-4 bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <AccordionTrigger className="text-left py-4 hover:no-underline">
                        <span className="font-medium">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};