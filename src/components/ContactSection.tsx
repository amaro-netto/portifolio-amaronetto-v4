import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  MapPin, 
  GraduationCap,
  MessageCircle,
  ExternalLink
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
    <section id="contato" className="section-snap bg-background pt-24 pb-0 border-t border-border/30 scroll-mt-10">
      <div className="container mx-auto px-4 h-full">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12 animate-in slide-in-from-bottom-5 fade-in duration-700">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
             VAMOS <span className="text-primary">CONVERSAR?</span>
           </h2>
           <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
             Seja para um novo projeto, consultoria ou apenas um networking, estou disponível para trocar ideias.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* --- COLUNA ESQUERDA (CONTEÚDO) --- */}
          <div className="lg:col-span-7 flex flex-col gap-10 pb-10">
                
                {/* 1. REDES SOCIAIS */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-xl flex items-center gap-2 text-foreground">
                       <MessageCircle className="h-5 w-5 text-primary" /> Redes Sociais
                    </h3>
                    
                    {/* Scroll horizontal no mobile, wrap no desktop */}
                    <div className="flex flex-nowrap gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap no-scrollbar">
                        {socialLinks.map((social, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-14 w-14 rounded-xl bg-secondary/30 hover:bg-primary/10 hover:scale-110 transition-all p-3 border border-transparent hover:border-primary/20 group"
                            onClick={() => window.open(social.url, '_blank')}
                            title={social.label}
                            aria-label={`Ir para ${social.label}`}
                        >
                            <img 
                              src={social.iconSrc} 
                              alt={social.label} 
                              className="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
                            />
                        </Button>
                        ))}
                    </div>
                </div>

                {/* 2. HORÁRIO E LOCALIZAÇÃO */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="border-border/40 bg-card/50 shadow-sm hover:border-primary/30 transition-colors group">
                        <CardContent className="p-5 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-base text-foreground">Horário</h4>
                                <p className="text-sm text-muted-foreground">Seg - Sex: 09h às 18h</p>
                                <p className="text-xs text-muted-foreground/70 mt-1">Sáb - Dom: Agendado</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50 shadow-sm hover:border-primary/30 transition-colors group">
                        <CardContent className="p-5 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-base text-foreground">Localização</h4>
                                <p className="text-sm text-muted-foreground">Rio de Janeiro, RJ</p>
                                <p className="text-xs text-muted-foreground/70 mt-1">Atendimento Remoto Global</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. PERFIL DE ESTUDOS */}
                <div className="pt-6 border-t border-border/40">
                     <div className="mb-6">
                        <h3 className="font-semibold text-xl mb-3 flex items-center gap-2 text-foreground">
                            <GraduationCap className="h-6 w-6 text-primary" /> 
                            Aprendizado Contínuo
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify max-w-2xl">
                            Acredito que a tecnologia exige evolução constante. Mantenho minhas skills afiadas através das principais plataformas do mercado.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {learningPlatforms.map((platform) => (
                        <a 
                            key={platform.name} 
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-primary/20 transition-all group"
                        >
                            <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                {platform.name}
                            </span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                        </a>
                        ))}
                    </div>
                </div>
          </div>

          {/* --- COLUNA DIREITA (FOTO) --- */}
          {/* Ajuste de Z-Index e overflow para a imagem não cobrir elementos interativos */}
          <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end h-full min-h-[300px] lg:min-h-[600px] pointer-events-none">
                <div className="absolute bottom-0 right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full opacity-60" />
                
                <img 
                    src={amaroPortrait} 
                    alt="Amaro Netto" 
                    className="relative z-10 h-full max-h-[500px] lg:max-h-[650px] w-auto object-contain object-bottom drop-shadow-2xl transition-transform hover:scale-[1.02] duration-500 mask-image-gradient"
                />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;