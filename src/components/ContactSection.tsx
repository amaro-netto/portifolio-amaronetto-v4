import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Certifique-se de importar CardContent
import { 
  Clock, 
  MapPin, 
  GraduationCap,
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  Github,
  Linkedin
} from 'lucide-react';

import amaroPortrait from '@/assets/amaro-portrait2.webp';

const ContactSection = () => {
  const socialLinks = [
    { iconSrc: '/icons/whatsapp.svg', label: 'WhatsApp', url: 'https://wa.me/5521964039120' },
    { iconSrc: '/icons/instagram.svg', label: 'Instagram', url: 'https://instagram.com/ti.amaronetto' },
    { iconSrc: '/icons/facebook.svg', label: 'Facebook', url: 'https://www.facebook.com/people/Amaro-Netto-Solu%C3%A7%C3%B5es/61578435551178/' },
    { iconSrc: '/icons/github.svg', label: 'GitHub', url: 'https://github.com/amaro-netto' },
    { iconSrc: '/icons/linkedin.svg', label: 'LinkedIn', url: 'https://linkedin.com/in/amarosilvanetto' },
    { iconSrc: '/icons/agenda.svg', label: 'Agenda', url: 'https://calendly.com/amaronetto' },
    { iconSrc: '/icons/email.svg', label: 'E-mail', url: 'mailto:ti.amaronetto@gmail.com' },
  ];

  const learningPlatforms = [
    { name: 'Alura', icon: '/icons/logo-alura.webp', url: 'https://cursos.alura.com.br/user/amarosilvanetto' },
    { name: 'DIO', icon: '/icons/dio.webp', url: 'https://www.dio.me/users/amarosilva002' },
    { name: 'Coursera', icon: '/icons/coursera.webp', url: 'https://www.coursera.org/learner/amaronetto' },
    { name: 'Cisco', icon: '/icons/cisco.webp', url: 'https://www.credly.com/users/amaro-amarante-da-silva-netto/badges#credly' },
  ];

  return (
    // AJUSTE 1: Aumentei 'py-16' para 'pt-32 pb-20' para dar mais espaço no topo
    <section id="contato" className="section-snap bg-background pt-32 pb-20 border-t border-border/30">
      <div className="container mx-auto px-4 h-full">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
             VAMOS <span className="text-primary">CONVERSAR?</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          
          {/* --- COLUNA ESQUERDA (CONTEÚDO) --- */}
          <div className="lg:col-span-7 space-y-10">
                
                {/* 1. REDES SOCIAIS */}
                <div>
                    <h3 className="font-semibold text-xl mb-5 flex items-center gap-2 text-foreground">
                       <MessageCircle className="h-5 w-5 text-primary" /> Redes Sociais
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((social, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 rounded-xl bg-secondary/30 hover:bg-primary/10 hover:scale-110 transition-all p-2.5 border border-transparent hover:border-primary/20"
                            onClick={() => window.open(social.url, '_blank')}
                            title={social.label}
                        >
                            <img src={social.iconSrc} alt={social.label} className="h-full w-full object-contain opacity-90 hover:opacity-100" />
                        </Button>
                        ))}
                    </div>
                </div>

                {/* 2. HORÁRIO E LOCALIZAÇÃO (EM CARDS) */}
                {/* AJUSTE 2: Agora são componentes Card reais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/30">
                    {/* Card Horário */}
                    <Card className="border-muted-foreground/20 bg-card/50 shadow-sm hover:border-primary/30 transition-colors">
                        <CardContent className="p-5 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-base text-foreground">Horário</h4>
                                <p className="text-sm text-muted-foreground">Seg - Sex: 09h às 18h</p>
                                <p className="text-xs text-muted-foreground/70 mt-0.5">Sáb - Dom: Somente Mediante Agendamento</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card Localização */}
                    <Card className="border-muted-foreground/20 bg-card/50 shadow-sm hover:border-primary/30 transition-colors">
                        <CardContent className="p-5 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-base text-foreground">Localização</h4>
                                <p className="text-sm text-muted-foreground">Rio de Janeiro, RJ</p>
                                <p className="text-xs text-muted-foreground/70 mt-0.5">Atendimento Presencial/Remoto</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. PERFIL DE ESTUDOS */}
                <div className="pt-6 border-t border-border/30">
                     <div className="mb-6">
                        <h3 className="font-semibold text-xl mb-3 flex items-center gap-2 text-foreground">
                            <GraduationCap className="h-6 w-6 text-primary" /> 
                            Perfil de Estudos
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed text-justify max-w-3xl">
                            Mantenho-me sempre atualizado com as últimas tecnologias através de diversas 
                            plataformas de ensino e certificações reconhecidas. Acredito que a evolução profissional 
                            vem do equilíbrio constante entre teoria sólida e prática.
                        </p>
                    </div>

                    {/* AJUSTE 3: Removido o título "CERTIFICAÇÕES" */}
                    <div>
                        <div className="flex flex-wrap gap-4">
                            {learningPlatforms.map((platform) => (
                            <div 
                                key={platform.name} 
                                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-primary/20 transition-all cursor-pointer group"
                                onClick={() => window.open(platform.url, '_blank')}
                            >
                                <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all" />
                                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                    {platform.name}
                                </span>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
          </div>

          {/* --- COLUNA DIREITA (FOTO) --- */}
          <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end h-full min-h-[400px] lg:min-h-[600px]">
                <div className="absolute bottom-0 right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full opacity-60 pointer-events-none" />
                
                <img 
                    src={amaroPortrait} 
                    alt="Amaro Netto" 
                    className="relative z-10 h-full max-h-[600px] w-auto object-contain object-bottom drop-shadow-2xl transition-transform hover:scale-[1.02] duration-500"
                />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;