import { useRef } from 'react';
import logoLight from '@/assets/logolight.svg';
import sobreDark from '@/assets/sobre.webp';      
import sobreLight from '@/assets/sobre-white.webp'; 

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // CONFIGURAÇÃO DA IMAGEM
  // lg:-mr-32 -> Puxa a imagem para a direita (centro da tela)
  // lg:ml-8   -> Dá espaço para o texto na esquerda
  // shape-margin -> Empurra o texto para não encostar na foto
  const sharedImageStyles = `
    lg:float-right 
    w-auto 
    object-contain object-bottom
    lg:ml-8 lg:-mr-32 lg:-mb-20 z-10 relative
    [shape-margin:3rem] 
    drop-shadow-2xl
  `;

  // --- CONTROLE DE ALTURA DA FOTO ---
  const imageHeightClass = "lg:h-[min(62vh,700px)] xl:h-[min(70vh,820px)]"; 

  return (
    <section ref={sectionRef} id="sobre" className="section-snap bg-background scroll-mt-16 flex items-center min-h-[100svh] py-12 md:py-16 xl:py-20">
      <div className="container mx-auto px-4 h-full flex items-center">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start animate-in slide-in-from-bottom-5 fade-in duration-700 w-full">
            
            {/* --- LADO ESQUERDO: TEXTO + FOTO --- */}
            <div className="lg:w-2/3 relative clearfix">
               <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-10">
                MINHA <span className="text-primary">JORNADA</span>
              </h2>

              {/* IMAGEM CLARA */}
              <img
                src={sobreLight}
                alt="Foto de Amaro Netto"
                className={`hidden lg:block dark:hidden ${sharedImageStyles} ${imageHeightClass} [shape-outside:url('/src/assets/sobre-white.webp')]`}
                loading="lazy"
              />

              {/* IMAGEM ESCURA */}
              <img
                src={sobreDark}
                alt="Foto de Amaro Netto"
                className={`hidden dark:lg:block ${sharedImageStyles} ${imageHeightClass} [shape-outside:url('/src/assets/sobre.webp')]`}
                loading="lazy"
              />
              
              <div className="text-muted-foreground leading-relaxed text-base md:text-lg text-justify [text-align-last:left] relative z-20">
                <p className="mb-8">
                  Com mais de 10 anos de experiência imersiva em tecnologia, construí uma carreira sólida 
                  que combina o rigor do desenvolvimento back-end, a criatividade do design de interfaces e a visão estratégica da liderança técnica. 
                </p>
                <p className="mb-8">
                  Minha paixão não é apenas codificar, mas transformar desafios de negócios complexos em soluções digitais elegantes, performáticas e, acima de tudo, que geram impacto real e mensurável para as organizações.
                </p>
                <p>
                  Especializo-me em criar ecossistemas digitais que não apenas funcionam perfeitamente sob o capô, 
                  mas também encantam os usuários na superfície. Acredito firmemente que a tecnologia, quando bem aplicada, deve ser uma ponte intuitiva e poderosa entre pessoas, processos e novas possibilidades.
                </p>
              </div>
            </div>

            {/* --- LADO DIREITO: EMPRESA --- */}
            <div className="lg:w-1/3 flex flex-col justify-center items-center text-center p-10 bg-secondary/5 rounded-3xl border border-border/50 hover:border-primary/20 transition-all duration-500 shadow-lg hover:shadow-xl sticky top-32 z-0">
                <div className="mb-8 p-6 bg-primary/10 rounded-full">
                    <img 
                        src={logoLight} 
                        alt="Amaro Netto Soluções Logo" 
                        className="h-24 w-24 md:h-28 md:w-28 object-contain dark:brightness-0 dark:invert" 
                    />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                    AMARO NETTO <span className="text-primary">SOLUÇÕES</span>
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Consultoria boutique especializada em Tecnologia da Informação. Unimos infraestrutura robusta, segurança de dados e desenvolvimento sob medida para entregar inovação estratégica e eficiência operacional para o seu negócio.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
