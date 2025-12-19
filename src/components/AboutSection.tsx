import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Building, Code, Network, Palette, Shield, Briefcase, ChevronDown } from 'lucide-react';
import experiencesData from '@/data/experiences.json';

// Interface atualizada (mantemos duration opcional caso decida usar no futuro, mas não exibiremos agora)
interface Experience {
  id: string;
  role: string;
  company: string;
  years: string;
  duration?: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  icon: string;
  position?: number;
}

const AboutSection = () => {
  const experiences = [...(experiencesData as unknown as Experience[])].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));
  
  const [showAllExperiences, setShowAllExperiences] = useState(false);
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

  const renderIconModal = (iconValue: string) => {
    if (iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/'))) {
      return (
        <img 
          src={iconValue} 
          alt=""
          className="h-8 w-8 object-contain brightness-0 invert" 
        />
      );
    }
    return <Briefcase className="h-6 w-6 text-white" aria-hidden="true" />;
  };

  return (
    <section ref={sectionRef} id="sobre" className="section-snap bg-background scroll-mt-16">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="grid lg:grid-cols-2 gap-12 h-full">
          
          {/* --- COLUNA ESQUERDA (BIO E SKILLS) --- */}
          <div className="space-y-8 animate-in slide-in-from-left-5 fade-in duration-500">
            <div>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                MINHA <span className="text-primary">JORNADA</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6 text-justify">
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

            {/* --- SEÇÃO HABILIDADES --- */}
            <div className="border border-border/40 rounded-xl p-4 md:p-6 bg-secondary/10">
              <button 
                className="w-full flex items-center justify-between cursor-pointer md:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                aria-expanded={isSkillsOpen}
                aria-controls="skills-content"
              >
                  <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                    HABILIDADES
                  </h3>
                  <ChevronDown className={`h-6 w-6 text-primary transition-transform duration-300 md:hidden ${isSkillsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              <div 
                id="skills-content"
                className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${isSkillsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-3">Hard Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.hardSkills.map((skill) => (
                        <Badge key={skill.name} variant="secondary" className="text-xs px-2.5 py-1 hover:bg-primary hover:text-white transition-colors cursor-default">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-3">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.softSkills.map((skill) => (
                         <Badge key={skill.name} variant="outline" className="text-xs px-2.5 py-1 hover:border-primary hover:text-primary transition-colors cursor-default">
                           {skill.name}
                         </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLUNA DIREITA (TIMELINE) --- */}
          <div className="space-y-6 animate-in slide-in-from-right-5 fade-in duration-500 delay-100">
            
            {/* --- SEÇÃO EXPERIÊNCIA --- */}
            <div className="border border-border/40 rounded-xl p-4 md:p-6 md:border-none md:p-0 md:bg-transparent">
                <button 
                    className="w-full flex items-center justify-between cursor-pointer md:cursor-default md:mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                    onClick={() => setIsExperienceOpen(!isExperienceOpen)}
                    aria-expanded={isExperienceOpen}
                    aria-controls="experience-content"
                >
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      EXPERIÊNCIA PROFISSIONAL
                    </h3>
                    <ChevronDown className={`h-6 w-6 text-primary transition-transform duration-300 md:hidden ${isExperienceOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
            
                <div 
                    id="experience-content"
                    className={`mt-6 md:mt-0 transition-all duration-300 ${isExperienceOpen ? 'block' : 'hidden md:block'}`}
                >
                    {experiences.length === 0 && (
                      <p className="text-muted-foreground">Nenhuma experiência encontrada.</p>
                    )}
                    
                    <div className="relative pl-4"> 
                        {/* Linha Vertical Centralizada com a bolinha */}
                        <div className="absolute left-[5px] top-3 bottom-4 w-[2px] bg-border"></div>
                        
                        <div className="flex flex-col gap-6"> 
                        {displayedExperiences.map((exp, index) => (
                            <div key={exp.id} className="flex items-start gap-6 group relative">
                                
                                {/* Bolinha Minimalista */}
                                <div className="absolute left-[-11px] top-[5px] z-10">
                                    <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-background group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <Dialog>
                                    <DialogTrigger asChild>
                                        <Card 
                                            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 border-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Ver detalhes da experiência: ${exp.role} na empresa ${exp.company}`}
                                        >
                                        <CardHeader className="p-4">
                                            <div>
                                            <CardTitle className="text-base md:text-lg font-bold leading-tight mb-1 group-hover:text-primary transition-colors">
                                                {exp.role}
                                            </CardTitle>
                                            
                                            {/* AJUSTE AQUI: Removemos a Data/Duração externa */}
                                            <div className="mt-1">
                                                <CardDescription className="text-sm font-medium flex items-center gap-1">
                                                    <Building className="w-3 h-3" /> {exp.company}
                                                </CardDescription>
                                            </div>

                                            </div>
                                        </CardHeader>
                                        </Card>
                                    </DialogTrigger>
                                    
                                    {/* Modal Detalhado (Mantém Data Completa Aqui) */}
                                    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-zinc-950 border-zinc-800 text-zinc-100 gap-0 p-0 overflow-hidden flex flex-col">
                                        <DialogHeader className="p-6 pb-4 bg-zinc-900/50 border-b border-zinc-800 sticky top-0 z-20 backdrop-blur-sm">
                                            <DialogTitle className="flex items-center gap-3 text-xl text-white">
                                                <div className="p-2 bg-primary/20 rounded-lg">
                                                    {renderIconModal(exp.icon)}
                                                </div>
                                                <span>{exp.role}</span>
                                            </DialogTitle>
                                            <DialogDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm pt-2 text-primary/90 font-medium">
                                                <span className="flex items-center gap-1.5"><Building className="h-4 w-4" aria-hidden="true" />{exp.company}</span>
                                                <span className="hidden sm:inline text-zinc-600">•</span>
                                                
                                                {/* DATA DENTRO: Período completo mantido */}
                                                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" />{exp.years}</span>
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                                            <div>
                                                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4 text-primary" aria-hidden="true" /> Descrição
                                                </h4>
                                                <p className="text-zinc-300 leading-relaxed text-sm md:text-base text-justify">
                                                    {exp.description}
                                                </p>
                                            </div>
                                            
                                            {exp.achievements && exp.achievements.length > 0 && (
                                                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50">
                                                <h4 className="font-semibold mb-3 text-white text-sm uppercase tracking-wide">Principais Conquistas</h4>
                                                <ul className="space-y-2 text-sm text-zinc-400">
                                                    {exp.achievements.map((achievement: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-2.5">
                                                        <span className="text-primary mt-1.5 block w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" aria-hidden="true"></span>
                                                        <span className="leading-relaxed">{achievement}</span>
                                                    </li>
                                                    ))}
                                                </ul>
                                                </div>
                                            )}
                                            
                                            {exp.technologies && exp.technologies.length > 0 && (
                                                <div>
                                                <h4 className="font-semibold mb-3 text-white text-sm uppercase tracking-wide">Tech Stack</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {exp.technologies.map((tech: string) => (
                                                        <Badge key={tech} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-2 py-0.5">
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
                            className="w-full md:w-auto min-w-[200px] border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                            aria-label="Ver todas as experiências profissionais"
                        >
                            Ver trajetória completa
                            <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
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