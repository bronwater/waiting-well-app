import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  urgency?: 'low' | 'medium' | 'high';
}

export const SymptomChecker = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('symptom.initialMessage'),
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // Simple AI symptom assessment (in real app, this would connect to medical AI API)
  const analyzeSymptoms = (userInput: string): { response: string; urgency: 'low' | 'medium' | 'high' } => {
    const input = userInput.toLowerCase();
    
    // High urgency keywords
    if (input.includes('chest pain') || input.includes('difficulty breathing') || 
        input.includes('unconscious') || input.includes('severe bleeding') ||
        input.includes('stroke') || input.includes('heart attack')) {
      return {
        response: t('symptom.highUrgencyResponse'),
        urgency: 'high'
      };
    }
    
    // Medium urgency
    if (input.includes('pain') || input.includes('fever') || input.includes('nausea') ||
        input.includes('headache') || input.includes('injury')) {
      return {
        response: t('symptom.mediumUrgencyResponse'),
        urgency: 'medium'
      };
    }
    
    // Low urgency
    return {
      response: t('symptom.lowUrgencyResponse'),
      urgency: 'low'
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    const analysis = analyzeSymptoms(inputValue);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: analysis.response,
      sender: 'bot',
      timestamp: new Date(),
      urgency: analysis.urgency,
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setUrgencyLevel(analysis.urgency);
    setInputValue('');

    // After a few exchanges, complete the assessment
    if (messages.length >= 6) {
      setTimeout(() => {
        const completionMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: t('symptom.completionMessage'),
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, completionMessage]);
        setIsAssessmentComplete(true);
      }, 1000);
    }
  };

  const getUrgencyBadge = (urgency: 'low' | 'medium' | 'high') => {
    const variants = {
      low: { variant: 'secondary' as const, icon: CheckCircle, text: t('symptom.lowPriority') },
      medium: { variant: 'default' as const, icon: AlertCircle, text: t('symptom.mediumPriority') },
      high: { variant: 'destructive' as const, icon: AlertCircle, text: t('symptom.highPriority') }
    };
    
    const config = variants[urgency];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            {t('symptom.title')}
          </div>
          {getUrgencyBadge(urgencyLevel)}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {!isAssessmentComplete && (
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('symptom.placeholder')}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {isAssessmentComplete && (
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-sm font-medium text-success">{t('symptom.assessmentComplete')}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('symptom.assessmentShared')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};