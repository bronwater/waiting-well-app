import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const FAQSection = () => {
  const { t } = useTranslation();
  
  const faqItems = [
    {
      question: t("faq.emergency.title"),
      answer: t("faq.emergency.content")
    },
    {
      question: t("faq.leaving.title"),
      answer: t("faq.leaving.content")
    },
    {
      question: t("faq.pain.title"),
      answer: t("faq.pain.content")
    },
    {
      question: t("faq.wait.title"),
      answer: t("faq.wait.content")
    },
    {
      question: t("faq.visitor.title"),
      answer: t("faq.visitor.content")
    },
    {
      question: t("faq.insurance.title"),
      answer: t("faq.insurance.content")
    }
  ];

  const emergencyContacts = [
    { label: "Nurse Station", number: "Extension 2000" },
    { label: "Patient Relations", number: "Extension 1500" },
    { label: "Emergency", number: "911" }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {t("faq.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            {t("emergency.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">{contact.label}</span>
                <Button variant="outline" size="sm">
                  {contact.number}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gradient-calm rounded-lg">
            <h4 className="font-semibold mb-2">Emergency Health Resources</h4>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto justify-start">
                <ExternalLink className="h-3 w-3 mr-1" />
                {t("emergency.poison")}: {t("emergency.poison.number")}
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                <ExternalLink className="h-3 w-3 mr-1" />
                {t("emergency.crisis")}: {t("emergency.crisis.number")}
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                <ExternalLink className="h-3 w-3 mr-1" />
                {t("emergency.domestic")}: {t("emergency.domestic.number")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};