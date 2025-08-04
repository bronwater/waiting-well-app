import { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

export const FeedbackRating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Your rating helps us improve our service.",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    setSubmitted(true);
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve patient care.",
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setRating(0);
    setFeedback('');
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-primary">Thank You!</CardTitle>
          <CardDescription>
            Your feedback has been submitted and will help us improve our services.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleReset} variant="outline">
            Submit Another Review
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Rate Your Experience
        </CardTitle>
        <CardDescription>
          Your feedback helps us improve patient care and service quality.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            How would you rate your overall experience?
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-primary mt-2 font-medium">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Additional Comments (Optional)
          </label>
          <Textarea
            placeholder="Tell us about your experience, suggestions for improvement, or compliments for our staff..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-24"
          />
        </div>

        <Button onClick={handleSubmit} className="w-full gap-2">
          <Send className="h-4 w-4" />
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
};