// src/components/ContactSection.tsx (modificado para aceitar SVGs customizados)

import { useState, useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
// MODIFICAÇÃO: Removemos os ícones de redes sociais e mantivemos apenas os que são usados em outras partes do componente.
import {
  Clock,
  CheckCircle,
  Send,
  MapPin,
} from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      toast({
        title: "Erro de Configuração",
        description: "O reCAPTCHA não está pronto. Tente recarregar a página.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await executeRecaptcha('contactForm');

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          token: token,
        },
      });

      if (error) {
        const errorMessage = error.context?.error?.message || "Houve um problema. Por favor, tente novamente mais tarde.";
        throw new Error(errorMessage);
      }

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em até 24 horas.",
        variant: "default"
      });

      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (error: any) {
      toast({
        title: "Erro ao enviar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [executeRecaptcha, formData, toast]);

  // --- MODIFICAÇÃO: A estrutura do array socialLinks foi alterada ---
  // A propriedade 'icon' foi substituída por 'iconSrc' que aponta para o caminho do seu SVG na pasta 'public'.
  // A propriedade 'color' foi removida.
  const socialLinks = [
    {
      iconSrc: '/icons/whatsapp.svg', // Exemplo de caminho
      label: 'WhatsApp',
      value: '+55 (21) 96403-9120',
      url: 'https://wa.me/5521964039120',
    },
    {
      iconSrc: '/icons/email.svg', // Exemplo de caminho
      label: 'E-mail',
      value: 'ti.amaronetto@gmail.com',
      url: 'mailto:ti.amaronetto@gmail.com',
    },
    {
      iconSrc: '/icons/instagram.svg', // Exemplo de caminho
      label: 'Instagram',
      value: '@ti.amaronetto',
      url: 'https://instagram.com/ti.amaronetto',
    },
    {
      iconSrc: '/icons/facebook.svg', // Exemplo de caminho
      label: 'Facebook',
      value: '/Amaro-Netto-Solu%C3%A7%C3%B5es/61578435551178/',
      url: 'https://www.facebook.com/people/Amaro-Netto-Solu%C3%A7%C3%B5es/61578435551178/',
    },
    {
      iconSrc: '/icons/github.svg', // Exemplo de caminho
      label: 'GitHub',
      value: '/amaro-netto',
      url: 'https://github.com/amaro-netto',
    },
    {
      iconSrc: '/icons/linkedin.svg', // Exemplo de caminho
      label: 'LinkedIn',
      value: '/in/amarosilvanetto',
      url: 'https://linkedin.com/in/amarosilvanetto',
    },
    {
      iconSrc: '/icons/agenda.svg', // Exemplo de caminho
      label: 'Agenda',
      value: 'Agendar Reunião',
      url: 'https://calendly.com/amaronetto',
    }
  ];

  return (
    <section id="contato" className="section-snap bg-background pb-20">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="text-left mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            VAMOS <span className="text-primary">CONVERSAR</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Pronto para transformar sua ideia em realidade? Entre em contato e vamos criar algo incrível juntos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-xl text-foreground mb-6">
                Entre em Contato
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                {socialLinks.map((social, index) => {
                  // MODIFICAÇÃO: A lógica de renderização foi simplificada para usar uma tag <img>
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      className="p-0"
                      onClick={() => window.open(social.url, '_blank')}
                      aria-label={social.label}
                    >
                      <img src={social.iconSrc} alt={social.label} className="h-12 w-12" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Horário de Atendimento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Segunda a Sexta</span>
                  <span className="text-sm font-medium">das 9h às 18h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sábados e Domingos</span>
                  <span className="text-sm font-medium">Somente Sob agendamento</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Respondo em até 24 horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">Rio de Janeiro, RJ</div>
                    <div className="text-sm text-muted-foreground">
                      Atendimento presencial na região metropolitana e Interior.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Envie sua Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nome Completo *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        className="mt-1 focus-ring"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="mt-1 focus-ring"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="mt-1 focus-ring"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">
                      Mensagem *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Conte sobre seu projeto ou dúvida..."
                      rows={6}
                      className="mt-1 focus-ring resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Enviar Mensagem</span>
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Campos obrigatórios. Seus dados são protegidos e não serão compartilhados.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;