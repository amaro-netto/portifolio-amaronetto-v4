import { Button } from '@/components/ui/button';
import { Code, Palette, Shield, Network, ArrowRight, Mail } from 'lucide-react';
import amaroPortrait from '@/assets/amaro-portrait.webp';
import amaroPortraitLight from '@/assets/amaro-portrait-white.webp'; // Nova imagem importada

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const certifications = [
    { icon: Network, label: 'Redes', tooltip: 'Especialista em Infraestrutura de Redes' },
    { icon: Code, label: 'Projetos', tooltip: 'Desenvolvimento Full-Stack' },
    { icon: Shield, label: 'Suporte', tooltip: 'Suporte Técnico Especializado' },
    { icon: Palette, label: 'Design', tooltip: 'Design Gráfico e Web' },
  ];

  return (
    <section 
      id="inicio" 
      className="section-snap relative bg-gradient-hero dark:bg-secondary overflow-hidden h-screen min-h-[600px] flex flex-col"
      aria-label="Introdução e Boas-vindas"
    >
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-tech opacity-20 pointer-events-none select-none"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none select-none"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none select-none"></div>
      
      {/* Container Principal */}
      <div className="relative container mx-auto px-4 h-full flex flex-col lg:flex-row">
        
        {/* --- COLUNA ESQUERDA: TEXTO --- */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-24 lg:pt-0 z-20 lg:w-1/2">
          <div className="space-y-6 md:space-y-8 max-w-2xl animate-in slide-in-from-left-10 fade-in duration-700">
            <div className="space-y-3 md:space-y-4">
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-sm">
                Soluções em{' '}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Tecnologia
                </span>
                <br />
                para seu Negócio
              </h1>
              
              <p className="text-lg md:text-2xl text-white/90 font-medium tracking-wide">
                Profissional de TI e Designer
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed mx-auto lg:mx-0 text-justify md:text-left">
                Transformo ideias em soluções digitais eficientes, combinando expertise técnica 
                com design inovador para impulsionar seu negócio no mundo digital.
              </p>
            </div>

            {/* Botões */}
            <div className="flex flex-row gap-3 w-full max-w-sm mx-auto lg:mx-0">
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="flex-1 bg-primary hover:bg-primary-hover text-white shadow-tech transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1 h-12 text-sm md:text-base group"
                aria-label="Ver meu portfólio"
              >
                Ver Portfólio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button
                onClick={() => scrollToSection('contato')}
                variant="outline"
                className="
                    flex-1 
                    h-12 text-sm md:text-base
                    border-2 border-white 
                    bg-transparent text-white 
                    hover:bg-white hover:text-primary hover:border-white
                    shadow-tech transition-all duration-300 
                    transform hover:-translate-y-1
                "
                aria-label="Entrar em contato"
              >
                Contate-me
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Ícones de Certificações */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start py-2 pb-4 lg:pb-0">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="flex flex-col items-center space-y-1 w-14 h-14 md:w-16 md:h-16 justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-sm">
                      <IconComponent className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] md:text-xs font-medium text-white/90 group-hover:text-white transition-colors">
                        {cert.label}
                      </span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-zinc-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-zinc-800 shadow-xl z-50">
                      {cert.tooltip}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45 border-b border-r border-zinc-800"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- COLUNA DIREITA: IMAGEM (AJUSTADA PARA TEMA) --- */}
        <div className="
            flex-1 
            w-full 
            mt-auto 
            lg:mt-0 
            lg:absolute 
            lg:bottom-0 
            lg:right-0 
            lg:w-1/2 
            lg:h-full 
            pointer-events-none
            flex flex-col justify-end items-center lg:items-end
        ">
            <div className="relative w-full h-full flex flex-col justify-end items-center lg:items-end animate-in fade-in zoom-in-95 duration-1000 delay-200">
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-primary blur-[100px] opacity-20 transform translate-y-20 pointer-events-none"></div>
              
              {/* IMAGEM MODO CLARO (Visível no Light, Oculta no Dark) */}
              <img
                src={amaroPortraitLight}
                alt="Foto de perfil de Amaro Netto"
                width={800} 
                height={1000}
                className="
                  block dark:hidden  /* Lógica de troca */
                  relative z-10 w-auto object-contain object-bottom
                  h-[45vh] max-h-[400px]
                  lg:h-[90vh] lg:max-h-none lg:mr-auto 
                  drop-shadow-2xl
                "
                loading="eager"
                fetchPriority="high" 
              />

              {/* IMAGEM MODO ESCURO (Oculta no Light, Visível no Dark) */}
              <img
                src={amaroPortrait}
                alt="Foto de perfil de Amaro Netto"
                width={800} 
                height={1000}
                className="
                  hidden dark:block  /* Lógica de troca */
                  relative z-10 w-auto object-contain object-bottom
                  h-[45vh] max-h-[400px]
                  lg:h-[90vh] lg:max-h-none lg:mr-auto 
                  drop-shadow-2xl
                "
                loading="eager"
                fetchPriority="high" 
              />
            </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;