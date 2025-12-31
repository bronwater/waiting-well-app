import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Clock, Users, Shield, Heart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const FAQSection = () => {
  const { t } = useTranslation();
  
  const faqCategories = {
    general: {
      title: t('faq.category.general'),
      description: t('faq.category.general.desc'),
      icon: HelpCircle,
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-800",
      questions: [
        {
          question: t('faq.general.expect.title'),
          answer: t('faq.general.expect.content')
        },
        {
          question: t('faq.general.contact.title'),
          answer: t('faq.general.contact.content')
        },
        {
          question: t('faq.general.payment.title'),
          answer: t('faq.general.payment.content')
        }
      ]
    },
    waiting: {
      title: t('faq.category.waiting'),
      description: t('faq.category.waiting.desc'),
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
          question: t('faq.wait.leave.title'),
          answer: t('faq.wait.leave.content')
        },
        {
          question: t('faq.wait.accuracy.title'),
          answer: t('faq.wait.accuracy.content')
        }
      ]
    },
    visitors: {
      title: t('faq.category.visitors'),
      description: t('faq.category.visitors.desc'),
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
          question: t('faq.visitor.family.title'),
          answer: t('faq.visitor.family.content')
        },
        {
          question: t('faq.visitor.children.title'),
          answer: t('faq.visitor.children.content')
        }
      ]
    },
    medical: {
      title: t('faq.category.medical'),
      description: t('faq.category.medical.desc'),
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
          question: t('faq.medical.worsening.title'),
          answer: t('faq.medical.worsening.content')
        }
      ]
    },
    insurance: {
      title: t('faq.category.insurance'),
      description: t('faq.category.insurance.desc'),
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
          question: t('faq.insurance.plans.title'),
          answer: t('faq.insurance.plans.content')
        },
        {
          question: t('faq.insurance.bill.title'),
          answer: t('faq.insurance.bill.content')
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
          {t('faq.subtitle')}
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
                  {category.description}
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