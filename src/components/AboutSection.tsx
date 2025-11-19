import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Building, Code, Network, Palette, Shield, Briefcase, ChevronDown } from 'lucide-react'; // Adicionado ChevronDown

// Importação direta do JSON
import experiencesData from '@/data/experiences.json';

const AboutSection = () => {
  // Ordenação local por posição ou data
  const experiences = [...experiencesData].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));
  
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  // --- ESTADOS DO MENU RETRÁTIL (MOBILE) ---
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShowAllExperiences(false);
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 5);

  const skills = {
    hardSkills: [
      { name: 'React & Next.js', icon: Code },
      { name: 'TypeScript', icon: Code },
      { name: 'Node.js & APIs', icon: Network },
      { name: 'PostgreSQL & MongoDB', icon: Shield },
      { name: 'AWS & Docker', icon: Network },
      { name: 'Git & CI/CD', icon: Code },
      { name: 'Figma & Adobe CC', icon: Palette },
      { name: 'Linux & Windows Server', icon: Shield }
    ],
    softSkills: [
      { name: 'Liderança de Equipes', icon: Code },
      { name: 'Comunicação Assertiva', icon: Palette },
      { name: 'Gestão de Projetos', icon: Network },
      { name: 'Resolução de Problemas', icon: Shield },
      { name: 'Pensamento Analítico', icon: Code },
      { name: 'Trabalho em Equipe', icon: Palette },
      { name: 'Adaptabilidade', icon: Network },
      { name: 'Mentoria & Ensino', icon: Shield }
    ]
  };

  // Função auxiliar para renderizar o ícone corretamente
  const renderIcon = (iconValue: string) => {
    // Se for URL (começa com http), renderiza imagem
    if (iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/'))) {
      return (
        <img 
          src={iconValue} 
          alt="icon" 
          className="h-full w-full object-contain p-2 brightness-0 invert" // p-2 para dar respiro dentro da bolinha
          onError={(e) => {
             e.currentTarget.style.display = 'none'; // Esconde se der erro
          }}
        />
      );
    }
    // Fallback para ícone padrão se não for URL
    return <Briefcase className="h-5 w-5 text-primary-foreground" />;
  };

// Função auxiliar para o Modal (ícone)
  const renderIconModal = (iconValue: string) => {
    if (iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/'))) {
      return (
        <img 
          src={iconValue} 
          alt="icon" 
          // ADICIONADO: 'brightness-0 invert' transforma qualquer cor em BRANCO puro
          // Se quiser outra cor, precisaria usar a técnica de 'mask' ou editar o SVG original
          className="h-8 w-8 object-contain brightness-0 invert" 
        />
      );
    }
    // Fallback do Lucide (ícone de maleta) também forçado para branco
    return <Briefcase className="h-6 w-6 text-white" />;
  };

  return (
    <section ref={sectionRef} id="sobre" className="section-snap bg-background">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="grid lg:grid-cols-2 gap-12 h-full">
          
          {/* --- COLUNA ESQUERDA (BIO E SKILLS) --- */}
          <div className="space-y-8">
            <div>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                MINHA <span className="text-primary">JORNADA</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 text-justify">
                Com mais de 10 anos de experiência em tecnologia, construí uma carreira sólida 
                combinando desenvolvimento, design e liderança técnica. Minha paixão é 
                transformar desafios complexos em soluções elegantes que geram impacto real.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 text-justify [text-align-last:left]">
                Especializo-me em criar experiências digitais que não apenas funcionam perfeitamente, 
                mas também encantam os usuários. Acredito que a tecnologia deve ser uma ponte 
                entre pessoas e possibilidades.
              </p>
            </div>

            {/* --- SEÇÃO HABILIDADES (COM ACORDEÃO MOBILE) --- */}
            <div>
              <div 
                className="flex items-center justify-between mb-6 cursor-pointer md:cursor-default"
                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
              >
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    HABILIDADES
                  </h3>
                  {/* Seta visível apenas no mobile */}
                  <ChevronDown className={`h-6 w-6 text-primary transition-transform duration-300 md:hidden ${isSkillsOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Conteúdo: Hidden no mobile (se fechado), Grid no Desktop */}
              <div className={`${isSkillsOpen ? 'block' : 'hidden'} md:grid md:grid-cols-2 gap-8 transition-all duration-300`}>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Hard Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.hardSkills.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="text-xs px-2 py-1">{skill.name}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4 md:mt-0"> {/* Margem top apenas no mobile para separar */}
                  <h4 className="text-lg font-medium text-foreground mb-4">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.softSkills.map((skill) => (
                       <Badge key={skill.name} variant="secondary" className="text-xs px-2 py-1">{skill.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLUNA DIREITA (TIMELINE) --- */}
          <div className="space-y-6">
            
            {/* --- SEÇÃO EXPERIÊNCIA (COM ACORDEÃO MOBILE) --- */}
            <div>
                <div 
                    className="flex items-center justify-between mb-6 cursor-pointer md:cursor-default"
                    onClick={() => setIsExperienceOpen(!isExperienceOpen)}
                >
                    <h3 className="font-display text-xl font-semibold text-foreground">
                    EXPERIÊNCIA PROFISSIONAL
                    </h3>
                    <ChevronDown className={`h-6 w-6 text-primary transition-transform duration-300 md:hidden ${isExperienceOpen ? 'rotate-180' : ''}`} />
                </div>
            
                {/* Conteúdo: Hidden no mobile (se fechado), Block no Desktop */}
                <div className={`${isExperienceOpen ? 'block' : 'hidden'} md:block`}>
                    
                    {experiences.length === 0 && (
                    <p className="text-muted-foreground">Nenhuma experiência encontrada.</p>
                    )}
                    
                    <div className="relative">
                        <div className="absolute left-5 top-5 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                        
                        <div className="flex flex-col gap-4">
                        {displayedExperiences.map((exp) => (
                            <div key={exp.id} className="flex items-center gap-4">
                            <div className="relative z-10">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    {/* Ícone na Timeline */}
                                    {renderIcon(exp.icon)}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Dialog>
                                <DialogTrigger asChild>
                                    <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:border-primary/50 group">
                                    <CardHeader className="pb-4 p-4">
                                        <div>
                                        <CardTitle className="text-lg font-semibold leading-tight mb-2">{exp.role}</CardTitle>
                                        <div className="flex justify-between items-center">
                                            <CardDescription className="text-sm">{exp.company}</CardDescription>
                                            <Badge variant="outline" className="text-xs">{exp.years}</Badge>
                                        </div>
                                        </div>
                                    </CardHeader>
                                    </Card>
                                </DialogTrigger>
                                
                                {/* Modal Escuro com Destaques em Azul */}
                                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-white">
                                    <DialogHeader>
                                    <DialogTitle className="flex items-center space-x-3 text-white">
                                        {renderIconModal(exp.icon)}
                                        <span>{exp.role}</span>
                                    </DialogTitle>
                                    <DialogDescription className="flex items-center space-x-4 text-sm pt-2 text-primary font-medium">
                                        <span className="flex items-center space-x-1"><Building className="h-4 w-4" /><span>{exp.company}</span></span>
                                        <span className="flex items-center space-x-1"><Calendar className="h-4 w-4" /><span>{exp.years}</span></span>
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 mt-4">
                                    <p className="text-zinc-300 leading-relaxed">{exp.description}</p>
                                    
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <div>
                                        <h4 className="font-medium mb-2 text-white">Principais Conquistas:</h4>
                                        <ul className="space-y-1 text-sm text-zinc-400">
                                            {exp.achievements.map((achievement: string, idx: number) => (
                                            <li key={idx} className="flex items-start space-x-2">
                                                <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                                                <span>{achievement}</span>
                                            </li>
                                            ))}
                                        </ul>
                                        </div>
                                    )}
                                    
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div>
                                        <h4 className="font-medium mb-2 text-white">Tecnologias:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {exp.technologies.map((tech: string) => (
                                                <Badge key={tech} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                        </div>
                                    )}
                                    </div>
                                </DialogContent>
                                </Dialog>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    {!showAllExperiences && experiences.length > 5 && (
                        <div className="text-center pt-8">
                        <Button 
                            variant="outline" 
                            onClick={() => setShowAllExperiences(true)}
                            className="w-full"
                        >
                            Ver a trilha profissional completa
                        </Button>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;