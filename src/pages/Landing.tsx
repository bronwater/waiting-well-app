import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Clock, Users, TrendingDown, Shield, Bell, CheckCircle2, ArrowRight, Mail, Phone, Building2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Landing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    hospital: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous contacterons dans les plus brefs délais.",
    });
    setFormData({ name: "", hospital: "", email: "", phone: "", message: "" });
  };

  const features = [
    {
      icon: Clock,
      title: "Gestion du temps d'attente",
      description: "Informez vos patients en temps réel et réduisez leur anxiété grâce à des mises à jour automatiques."
    },
    {
      icon: Users,
      title: "Expérience patient améliorée",
      description: "Offrez à vos patients un portail intuitif pour suivre leur parcours et accéder aux informations médicales."
    },
    {
      icon: Bell,
      title: "Notifications intelligentes",
      description: "Système de notifications automatiques pour tenir les patients informés à chaque étape de leur visite."
    },
    {
      icon: Shield,
      title: "Sécurité des données",
      description: "Protection complète des données médicales conformément aux normes de sécurité les plus strictes."
    },
    {
      icon: TrendingDown,
      title: "Réduction des coûts",
      description: "Optimisez vos ressources et réduisez les coûts opérationnels grâce à une meilleure gestion des flux."
    },
    {
      icon: CheckCircle2,
      title: "Déploiement rapide",
      description: "Solution clé en main, facile à intégrer dans votre infrastructure existante en quelques jours."
    }
  ];

  const benefits = [
    {
      stat: "40%",
      label: "Réduction du temps d'attente perçu"
    },
    {
      stat: "85%",
      label: "Satisfaction patient"
    },
    {
      stat: "30%",
      label: "Diminution des appels au standard"
    },
    {
      stat: "24/7",
      label: "Disponibilité du service"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-medical">UrgencyTrack</span>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '#contact'}>
            Nous contacter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Transformez l'expérience patient dans vos{" "}
              <span className="text-gradient-medical">urgences</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              UrgencyTrack est la solution digitale qui améliore la communication avec vos patients 
              et optimise la gestion de vos flux d'urgence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg" onClick={() => window.location.href = '#contact'}>
                Demander une démo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg" onClick={() => window.location.href = '#features'}>
                Découvrir les fonctionnalités
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Une solution complète pour vos urgences
            </h2>
            <p className="text-lg text-muted-foreground">
              Toutes les fonctionnalités dont vous avez besoin pour moderniser votre service d'urgence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover-scale border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / ROI Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Des résultats mesurables
            </h2>
            <p className="text-lg text-muted-foreground">
              Nos hôpitaux partenaires constatent des améliorations significatives dès les premières semaines
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-5xl md:text-6xl font-bold text-gradient-medical">
                  {benefit.stat}
                </div>
                <div className="text-lg text-muted-foreground">
                  {benefit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Pourquoi choisir UrgencyTrack ?
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Installation simplifiée</h3>
                      <p className="text-muted-foreground">Intégration rapide sans perturber vos opérations existantes</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Support dédié</h3>
                      <p className="text-muted-foreground">Une équipe à votre écoute pour vous accompagner au quotidien</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Évolution continue</h3>
                      <p className="text-muted-foreground">Mises à jour régulières avec de nouvelles fonctionnalités</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Conformité garantie</h3>
                      <p className="text-muted-foreground">Respect total des normes RGPD et sécurité médicale</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Heart className="h-32 w-32 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Prêt à améliorer votre service d'urgence ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Contactez-nous pour une démonstration personnalisée et découvrez comment UrgencyTrack peut transformer votre établissement
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                  <CardDescription>Nous vous répondons sous 24h</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Nom de l'établissement"
                        value={formData.hospital}
                        onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email professionnel"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Téléphone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Votre message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">contact@urgencytrack.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Téléphone</h3>
                        <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Bureau</h3>
                        <p className="text-muted-foreground">Paris, France</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-gradient-medical">UrgencyTrack</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 UrgencyTrack. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
