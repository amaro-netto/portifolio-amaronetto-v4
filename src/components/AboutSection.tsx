// src/components/AboutSection.tsx

// 1. IMPORTAR useRef e useEffect do React
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Calendar, Building, Code, Network, Palette, Shield, PenTool, Megaphone, LifeBuoy, Database, Server, Cloud, ClipboardList, Users, Briefcase, BarChart3, LayoutTemplate } from 'lucide-react';

const iconMap = {
  Code: Code,
  Database: Database,
  Server: Server,
  Network: Network,
  Cloud: Cloud,
  Shield: Shield,
  LifeBuoy: LifeBuoy,
  Briefcase: Briefcase,
  Users: Users,
  ClipboardList: ClipboardList,
  Megaphone: Megaphone,
  BarChart3: BarChart3,
  PenTool: PenTool,
  Palette: Palette,
  LayoutTemplate: LayoutTemplate,
};

const fetchExperiences = async () => {
  const { data, error } = await supabase.from('experiences').select('*').order('position', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const AboutSection = () => {
  const { data: experiences, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences
  });
  
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  // 2. CRIAR A REFERÊNCIA PARA A SEÇÃO
  const sectionRef = useRef<HTMLElement>(null);

  // 3. CONFIGURAR O INTERSECTION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se a seção NÃO ESTIVER mais visível na tela...
        if (!entry.isIntersecting) {
          // ...recolhe a lista de experiências.
          setShowAllExperiences(false);
        }
      },
      {
        // A função será chamada quando 10% da seção sair da tela
        threshold: 0.1, 
      }
    );

    // Começa a observar a seção se ela existir
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Função de limpeza: para de observar quando o componente é desmontado
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez

  const displayedExperiences = experiences
    ? showAllExperiences ? experiences : experiences.slice(0, 5)
    : [];

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

  return (
    // 4. ANEXAR A REFERÊNCIA AO ELEMENTO DA SEÇÃO
    <section ref={sectionRef} id="sobre" className="section-snap bg-background">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="grid lg:grid-cols-2 gap-12 h-full">
          {/* Coluna da Esquerda (Jornada & Habilidades) */}
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
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                HABILIDADES
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Hard Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.hardSkills.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="text-xs px-2 py-1">{skill.name}</Badge>
                    ))}
                  </div>
                </div>
                <div>
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

          {/* Coluna da Direita (Timeline) */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            
            {isLoading && (
              <div className="space-y-4 pt-8">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
              </div>
            )}
            
            {experiences && (
              <>
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                  <div className="flex flex-col gap-8">
                    {displayedExperiences.map((exp) => {
                      const IconComponent = iconMap[exp.icon as keyof typeof iconMap] || Code;
                      return (
                        <div key={exp.id} className="flex items-center gap-6">
                          <div className="relative z-10">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-md">
                              <IconComponent className="h-4 w-4 text-primary-foreground" />
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
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center space-x-2"><IconComponent className="h-5 w-5 text-primary" /><span>{exp.role}</span></DialogTitle>
                                  <DialogDescription className="flex items-center space-x-4 text-sm">
                                    <span className="flex items-center space-x-1"><Building className="h-4 w-4" /><span>{exp.company}</span></span>
                                    <span className="flex items-center space-x-1"><Calendar className="h-4 w-4" /><span>{exp.years}</span></span>
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                                  <div>
                                    <h4 className="font-medium mb-2">Principais Conquistas:</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      {exp.achievements?.map((achievement: string, idx: number) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                          <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current"></span>
                                          <span>{achievement}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Tecnologias:</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {exp.technologies?.map((tech: string) => <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>)}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      );
                    })}
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;