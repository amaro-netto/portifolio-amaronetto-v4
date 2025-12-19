import { useRef } from 'react';
import logoLight from '@/assets/logolight.svg';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="sobre" className="section-snap bg-background scroll-mt-16 flex items-center">
      <div className="container mx-auto px-4 py-20">
        
        {/* --- GRID: JORNADA vs QUEM SOMOS --- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-in slide-in-from-bottom-5 fade-in duration-700">
            
            {/* LADO ESQUERDO: MINHA JORNADA */}
            <div>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                MINHA <span className="text-primary">JORNADA</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6 text-justify">
                Com mais de 10 anos de experiência em tecnologia, construí uma carreira sólida 
                combinando desenvolvimento, design e liderança técnica. Minha paixão é 
                transformar desafios complexos em soluções elegantes que geram impacto real.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg text-justify [text-align-last:left]">
                Especializo-me em criar experiências digitais que não apenas funcionam perfeitamente, 
                mas também encantam os usuários. Acredito que a tecnologia deve ser uma ponte 
                entre pessoas e possibilidades.
              </p>
            </div>

            {/* LADO DIREITO: QUEM SOMOS (EMPRESA) */}
            <div className="flex flex-col justify-center items-center text-center p-10 bg-secondary/5 rounded-2xl border border-border/50 hover:border-primary/20 transition-colors duration-500">
                <div className="mb-6 p-6 bg-primary/10 rounded-full">
                    <img 
                        src={logoLight} 
                        alt="Amaro Netto Soluções Logo" 
                        className="h-20 w-20 md:h-24 md:w-24 object-contain dark:brightness-0 dark:invert" 
                    />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    AMARO NETTO <span className="text-primary">SOLUÇÕES</span>
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                    Consultoria especializada em Tecnologia da Informação, Infraestrutura, Segurança e Desenvolvimento. 
                    Entregamos soluções estratégicas que unem inovação técnica e eficiência operacional para o seu negócio.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;