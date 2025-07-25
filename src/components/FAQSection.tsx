import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, ExternalLink } from "lucide-react";

const faqItems = [
  {
    question: "How are patients prioritized?",
    answer: "Patients are seen based on the severity of their condition, not arrival time. This triage system ensures those with life-threatening conditions receive immediate care."
  },
  {
    question: "Can I leave and come back?",
    answer: "You may leave temporarily, but please inform the front desk. Your position may be affected, and you'll need to re-register upon return."
  },
  {
    question: "What if my symptoms get worse?",
    answer: "Immediately notify any staff member or press the call button. Don't wait for your scheduled time if your condition worsens."
  },
  {
    question: "How accurate is the wait time?",
    answer: "Wait times are estimates based on current patient volume and staff availability. Emergency cases may affect these estimates."
  },
  {
    question: "Can family members stay with me?",
    answer: "Visitor policies vary by department. Check with staff about current guidelines for your specific area."
  },
  {
    question: "What should I do if I feel faint or dizzy?",
    answer: "Remain seated or lie down if possible, and immediately call for a nurse. Do not attempt to walk if you feel unsteady."
  }
];

const emergencyContacts = [
  { label: "Nurse Station", number: "Extension 2000" },
  { label: "Patient Relations", number: "Extension 1500" },
  { label: "Emergency", number: "911" }
];

export const FAQSection = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Frequently Asked Questions
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
            Emergency Contacts
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
                Poison Control: 1-800-222-1222
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                <ExternalLink className="h-3 w-3 mr-1" />
                Mental Health Crisis Line
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start">
                <ExternalLink className="h-3 w-3 mr-1" />
                Stroke & Heart Attack Symptoms
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};