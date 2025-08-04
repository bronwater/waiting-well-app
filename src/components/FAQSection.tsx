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
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          {t("faq.title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Find answers to common questions organized by category
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {Object.entries(faqCategories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={key} value={key} className="gap-1 flex-col py-3">
                  <IconComponent className="h-4 w-4" />
                  <span className="text-xs hidden sm:inline">{category.title.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(faqCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  {category.title}
                </h3>
              </div>
              <Accordion type="single" collapsible>
                {category.questions.map((item, index) => (
                  <AccordionItem key={index} value={`${key}-item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};