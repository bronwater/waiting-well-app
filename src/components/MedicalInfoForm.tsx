import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

export const MedicalInfoForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: t("medical.saved"),
      description: "Your medical information has been saved to help provide better care.",
    });
  };

  if (isSubmitted) {
    return (
      <Card className="shadow-card border-success/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-success">Information Saved</h3>
            <p className="text-sm text-muted-foreground">Your details help us provide better care</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          {t("medical.title")}
          <span className="text-xs bg-muted px-2 py-1 rounded-full font-normal">Optional</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("medical.subtitle")}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="allergies">{t("medical.allergies")}</Label>
              <Input id="allergies" placeholder={t("medical.allergiesPlaceholder")} />
            </div>
            <div>
              <Label htmlFor="medications">{t("medical.medications")}</Label>
              <Input id="medications" placeholder={t("medical.medicationsPlaceholder")} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="conditions">{t("medical.conditions")}</Label>
            <Textarea 
              id="conditions" 
              placeholder={t("medical.conditionsPlaceholder")}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="symptoms">{t("medical.symptoms")}</Label>
            <Textarea 
              id="symptoms" 
              placeholder={t("medical.symptomsPlaceholder")}
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="emergency-contact" />
            <Label htmlFor="emergency-contact" className="text-sm">
              I have notified my emergency contact
            </Label>
          </div>

          <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              This information is confidential and only shared with your care team
            </p>
          </div>

          <Button type="submit" className="w-full" variant="success">
            {t("medical.save")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};