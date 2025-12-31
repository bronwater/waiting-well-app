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
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const { t } = useTranslation();

  const educationalContent = {
    conditions: [
      {
        id: 1,
        title: t('article.bloodPressure.title'),
        description: t('article.bloodPressure.desc'),
        category: t('education.category.cardiovascular'),
        duration: `5 ${t('education.minRead')}`,
        icon: Heart,
        content: t('article.bloodPressure.content')
      },
      {
        id: 2,
        title: t('article.diabetes.title'),
        description: t('article.diabetes.desc'),
        category: t('education.category.endocrine'),
        duration: `8 ${t('education.minRead')}`,
        icon: Heart,
        content: t('article.diabetes.content')
      },
      {
        id: 3,
        title: t('article.anxiety.title'),
        description: t('article.anxiety.desc'),
        category: t('education.category.mentalHealth'),
        duration: `6 ${t('education.minRead')}`,
        icon: Brain,
        content: t('article.anxiety.content')
      },
      {
        id: 4,
        title: t('article.boneHealth.title'),
        description: t('article.boneHealth.desc'),
        category: t('education.category.orthopedic'),
        duration: `7 ${t('education.minRead')}`,
        icon: Bone,
        content: t('article.boneHealth.content')
      }
    ],
    treatments: [
      {
        id: 1,
        title: t('treatment.physicalTherapy.title'),
        description: t('treatment.physicalTherapy.desc'),
        type: t('treatment.physicalTherapy.type'),
        duration: "15 min",
        category: t('education.category.rehabilitation')
      },
      {
        id: 2,
        title: t('treatment.medication.title'),
        description: t('treatment.medication.desc'),
        type: t('treatment.medication.type'),
        duration: "10 min",
        category: t('education.category.pharmacy')
      },
      {
        id: 3,
        title: t('treatment.surgery.title'),
        description: t('treatment.surgery.desc'),
        type: t('treatment.surgery.type'),
        duration: "20 min",
        category: t('education.category.surgery')
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

  if (selectedArticle) {
    const article = educationalContent.conditions.find(item => item.id === selectedArticle);
    if (article) {
      const IconComponent = article.icon;
      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedArticle(null)}
                  className="gap-2"
                >
                  ← {t('education.backToList')}
                </Button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{article.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {article.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed">
                  {article.content}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t text-sm text-muted-foreground">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {article.duration}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {t('education.title')}
          </CardTitle>
          <CardDescription>
            {t('education.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('education.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="conditions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="conditions">{t('education.conditions')}</TabsTrigger>
          <TabsTrigger value="treatments">{t('education.treatments')}</TabsTrigger>
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedArticle(item.id)}
                    >
                      {t('education.readMore')}
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
                    {t('education.viewGuide')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>{t('education.quickTips')}</CardTitle>
          <CardDescription>
            {t('education.quickTipsDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[
              {
                tip: t('tip.hydration'),
                category: t('education.category.nutrition')
              },
              {
                tip: t('tip.breathing'),
                category: t('education.category.mentalHealth')
              },
              {
                tip: t('tip.sleep'),
                category: t('education.category.sleep')
              },
              {
                tip: t('tip.exercise'),
                category: t('education.category.exercise')
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