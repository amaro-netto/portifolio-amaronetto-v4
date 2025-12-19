import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Building, Code, Network, Palette, Shield, Briefcase, ChevronDown } from 'lucide-react';
import experiencesData from '@/data/experiences.json';

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

const ExperienceSection = () => {
  const experiences = [...(experiencesData as unknown as Experience[])].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));
  
  const [showAllExperiences, setShowAllExperiences] = useState(false);
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

  // Limitado a 4 itens visíveis inicialmente
  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 4);

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
    <section ref={sectionRef} id="experiencia" className="section-snap bg-muted/30 scroll-mt-16 border-t border-border/30">
      <div className="container mx-auto px-4 py-20 h-full">
        
        <div className="text-center mb-16 animate-in slide-in-from-bottom-5 fade-in duration-700">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
             COMPETÊNCIAS E <span className="text-primary">CARREIRA</span>
           </h2>
        </div>

        {/* --- GRID: SKILLS vs EXPERIÊNCIA --- */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* --- SEÇÃO HABILIDADES (LADO ESQUERDO) --- */}
            <div className="border border-border/40 rounded-xl p-6 bg-background h-full shadow-sm">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                    HABILIDADES TÉCNICAS
                  </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-4">Hard Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.hardSkills.map((skill) => (
                        <Badge key={skill.name} variant="secondary" className="text-xs px-2.5 py-1.5 hover:bg-primary hover:text-white transition-colors cursor-default">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-4">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.softSkills.map((skill) => (
                         <Badge key={skill.name} variant="outline" className="text-xs px-2.5 py-1.5 hover:border-primary hover:text-primary transition-colors cursor-default">
                           {skill.name}
                         </Badge>
                      ))}
                    </div>
                  </div>
                </div>
            </div>

            {/* --- SEÇÃO EXPERIÊNCIA (LADO DIREITO) --- */}
            <div className="border border-border/40 rounded-xl p-6 bg-background shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      EXPERIÊNCIA PROFISSIONAL
                    </h3>
                </div>
            
                <div>
                    {experiences.length === 0 && (
                      <p className="text-muted-foreground">Nenhuma experiência encontrada.</p>
                    )}
                    
                    {/* CONTAINER DA TIMELINE AJUSTADO */}
                    <div className="relative pl-8"> {/* Aumentado para 32px de espaço */}
                        
                        {/* Linha Vertical - Centralizada matematicamente com a bolinha */}
                        <div className="absolute left-[15px] top-2 bottom-4 w-[2px] bg-border"></div>
                        
                        <div className="flex flex-col gap-6"> 
                        {displayedExperiences.map((exp) => (
                            <div key={exp.id} className="flex items-start gap-4 group relative">
                                
                                {/* Bolinha Minimalista Alinhada */}
                                {/* left -22px compensa o padding de 32px e centraliza a bolinha de 12px (w-3) em 16px */}
                                <div className="absolute left-[-22px] top-[6px] z-10">
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
                                            
                                            <div className="mt-1">
                                                <CardDescription className="text-sm font-medium flex items-center gap-1">
                                                    <Building className="w-3 h-3" /> {exp.company}
                                                </CardDescription>
                                            </div>

                                            </div>
                                        </CardHeader>
                                        </Card>
                                    </DialogTrigger>
                                    
                                    {/* Modal Detalhado */}
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

                    {!showAllExperiences && experiences.length > 4 && (
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
    </section>
  );
};

export default ExperienceSection;