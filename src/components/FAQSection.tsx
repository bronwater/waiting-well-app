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

  return (
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
  );
};