import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MedicalInfoForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Information Updated",
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
          Medical Information
          <span className="text-xs bg-muted px-2 py-1 rounded-full font-normal">Optional</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share any relevant information to help medical staff provide better care
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="allergies">Allergies</Label>
              <Input id="allergies" placeholder="None" />
            </div>
            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Input id="medications" placeholder="None" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="conditions">Medical Conditions</Label>
            <Textarea 
              id="conditions" 
              placeholder="Any chronic conditions, previous surgeries, etc."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="symptoms">Current Symptoms</Label>
            <Textarea 
              id="symptoms" 
              placeholder="Describe what brought you to the emergency room"
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
            Save Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};