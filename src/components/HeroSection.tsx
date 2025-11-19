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
    <section id="inicio" className="section-snap relative bg-gradient-hero dark:bg-secondary overflow-hidden h-screen min-h-[600px] flex flex-col">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-tech opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Container Principal */}
      <div className="relative container mx-auto px-4 h-full flex flex-col lg:flex-row">
        
        {/* --- COLUNA ESQUERDA: TEXTO --- */}
        {/* Mobile: Order 1 (Topo), Texto Centralizado */}
        {/* Desktop: Order 1 (Esquerda), Texto Alinhado à Esquerda, 50% largura */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-24 lg:pt-0 z-20 order-1">
          <div className="space-y-8 max-w-2xl">
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
              
              <p className="text-lg text-white/80 leading-relaxed mx-auto lg:mx-0">
                Transformo ideias em soluções digitais eficientes, combinando expertise técnica 
                com design inovador para impulsionar seu negócio no mundo digital.
              </p>
            </div>

            {/* Botões (Lado a Lado no Mobile e Desktop) */}
            <div className="flex flex-row gap-3 w-full max-w-sm mx-auto lg:mx-0">
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground shadow-tech transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1 h-12"
              >
                Ver Portfólio
              </Button>
              <Button
                onClick={() => scrollToSection('contato')}
                className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground shadow-tech transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1 h-12"
              >
                Contate-me
              </Button>
            </div>

            {/* Ícones */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start py-1">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <div key={index} className="group relative">
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

        {/* --- COLUNA DIREITA: IMAGEM --- */}
        {/* Mobile: Order 2 (Fundo), Altura Automática */}
        {/* Desktop: Order 2 (Direita), Altura Total (h-full), Alinhado ao Fundo (items-end) */}
        <div className="flex-1 flex flex-col justify-end items-center lg:items-end w-full mt-auto lg:mt-0 lg:h-full order-2 relative">
            {/* Efeito de brilho atrás da foto */}
            <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 transform -rotate-6 scale-105 pointer-events-none"></div>
            
            <img
              src={amaroPortrait}
              alt="Amaro Netto"
              className="
                relative
                z-10
                w-auto
                object-contain
                object-bottom
                /* Mobile Height Control */
                h-[45vh]
                max-h-[400px]
                /* Desktop Height Control */
                lg:h-[85vh]
                lg:max-h-none
                lg:w-auto
                block
              "
              loading="eager"
            />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;