import { useState } from 'react';
import { BookOpen, Play, FileText, Search, Heart, Brain, Bone, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';

export const EducationalContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const educationalContent = {
    conditions: [
      {
        id: 1,
        title: "Understanding High Blood Pressure",
        description: "Learn about hypertension, its causes, symptoms, and management strategies.",
        category: "Cardiovascular",
        duration: "5 min read",
        icon: Heart,
        content: "High blood pressure occurs when the force of blood against artery walls is consistently too high..."
      },
      {
        id: 2,
        title: "Managing Diabetes",
        description: "Comprehensive guide to diabetes management, diet, and lifestyle changes.",
        category: "Endocrine",
        duration: "8 min read",
        icon: Heart,
        content: "Diabetes is a group of metabolic disorders characterized by high blood sugar levels..."
      },
      {
        id: 3,
        title: "Understanding Anxiety",
        description: "Learn about anxiety disorders, coping mechanisms, and treatment options.",
        category: "Mental Health",
        duration: "6 min read",
        icon: Brain,
        content: "Anxiety is a normal emotion that becomes a disorder when it interferes with daily life..."
      },
      {
        id: 4,
        title: "Bone Health and Osteoporosis",
        description: "Prevention and management of bone health issues as you age.",
        category: "Orthopedic",
        duration: "7 min read",
        icon: Bone,
        content: "Osteoporosis is a condition where bones become weak and brittle..."
      }
    ],
    treatments: [
      {
        id: 1,
        title: "Physical Therapy Exercises",
        description: "Safe exercises to improve mobility and reduce pain.",
        type: "Video Guide",
        duration: "15 min",
        category: "Rehabilitation"
      },
      {
        id: 2,
        title: "Medication Management",
        description: "How to properly take medications and understand side effects.",
        type: "Interactive Guide",
        duration: "10 min",
        category: "Pharmacy"
      },
      {
        id: 3,
        title: "Pre-Surgery Preparation",
        description: "What to expect before, during, and after surgery.",
        type: "Comprehensive Guide",
        duration: "20 min",
        category: "Surgery"
      }
    ]
  };

  const filteredConditions = educationalContent.conditions.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTreatments = educationalContent.treatments.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Health Education Center
          </CardTitle>
          <CardDescription>
            Learn about your health conditions and treatment options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search health topics, conditions, or treatments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="conditions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="conditions">Health Conditions</TabsTrigger>
          <TabsTrigger value="treatments">Treatments & Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="conditions" className="space-y-4">
          {filteredConditions.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {item.duration}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="treatments" className="space-y-4">
          {filteredTreatments.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Quick Health Tips</CardTitle>
          <CardDescription>
            Daily tips for better health and wellness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[
              {
                tip: "Stay hydrated by drinking at least 8 glasses of water daily",
                category: "Nutrition"
              },
              {
                tip: "Take deep breaths to reduce stress and improve focus",
                category: "Mental Health"
              },
              {
                tip: "Get 7-9 hours of quality sleep each night for optimal recovery",
                category: "Sleep"
              },
              {
                tip: "Take short walks throughout the day to improve circulation",
                category: "Exercise"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{item.tip}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};