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
        title: t('feedback.selectRating'),
        description: t('feedback.ratingHelps'),
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    setSubmitted(true);
    toast({
      title: t('feedback.thankYouToast'),
      description: t('feedback.inputHelps'),
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setRating(0);
    setFeedback('');
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return t('feedback.rating.poor');
      case 2: return t('feedback.rating.fair');
      case 3: return t('feedback.rating.good');
      case 4: return t('feedback.rating.veryGood');
      case 5: return t('feedback.rating.excellent');
      default: return '';
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-primary">{t('feedback.thankYou')}</CardTitle>
          <CardDescription>
            {t('feedback.submitted')}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleReset} variant="outline">
            {t('feedback.another')}
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
          {t('feedback.title')}
        </CardTitle>
        <CardDescription>
          {t('feedback.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {t('feedback.question')}
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
              {getRatingText(rating)}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            {t('feedback.comments')}
          </label>
          <Textarea
            placeholder={t('feedback.placeholder')}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-24"
          />
        </div>

        <Button onClick={handleSubmit} className="w-full gap-2">
          <Send className="h-4 w-4" />
          {t('feedback.submit')}
        </Button>
      </CardContent>
    </Card>
  );
};
