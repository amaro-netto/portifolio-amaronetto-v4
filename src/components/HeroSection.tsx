// src/components/HeroSection.tsx
import { Button } from '@/components/ui/button';
import { Code, Palette, Shield, Network } from 'lucide-react';
import amaroPortrait from '@/assets/amaro-portrait.webp';

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
    <section id="inicio" className="section-snap relative bg-gradient-hero dark:bg-secondary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-tech opacity-20"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row justify-between items-center h-screen pt-20">
          {/* Texto */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2 container self-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Soluções em{' '}
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Tecnologia
                  </span>{' '}
                  para seu Negócio
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 font-medium">
                  Profissional de TI e Designer
                </p>
                
                <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                  Transformo ideias em soluções digitais eficientes, combinando expertise técnica 
                  com design inovador para impulsionar seu negócio no mundo digital.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection('portfolio')}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-tech transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1"
                  size="lg"
                >
                  Ver Portfólio
                </Button>
                <Button
                  onClick={() => scrollToSection('contato')}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-tech transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1"
                  size="lg"
                >
                  Contate-me
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start py-1">
                {certifications.map((cert, index) => {
                  const IconComponent = cert.icon;
                  return (
                    <div
                      key={index}
                      className="group relative"
                    >
                      <div className="flex flex-col items-center space-y-1 w-16 h-16 justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <IconComponent className="h-5 w-5 text-accent" />
                        <span className="text-xs font-small text-white/100">
                          {cert.label}
                        </span>
                      </div>
                      
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-secondary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        {cert.tooltip}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex-1 flex flex-col mb-12 lg:mb-0 order-2 lg:order-1 h-full">
            <div className="relative h-full w-full max-w-2xl mx-auto flex flex-col lg:justify-end">
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 transform -rotate-6 scale-105"></div>
              
              <img
                src={amaroPortrait}
                alt="Amaro Netto - Profissional de TI e Designer"
                className="
                  relative
                  w-full
                  h-auto
                  max-h-72
                  sm:max-h-80
                  md:max-h-96
                  lg:max-h-full
                  object-contain
                  flex-shrink-0
                  mx-auto
                "
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
