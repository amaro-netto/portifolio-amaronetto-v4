// src/components/AboutSection.tsx (versão final completa e dinâmica)

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Building, Code, Network, Palette, Shield } from 'lucide-react';

// Objeto para mapear o nome do ícone (do DB) para o componente React
const iconMap = {
  Code: Code,
  Network: Network,
  Palette: Palette,
  Shield: Shield,
};

// Função para buscar as experiências no Supabase
const fetchExperiences = async () => {
  const { data, error } = await supabase.from('experiences').select('*').order('years', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const AboutSection = () => {
  // Hook para buscar os dados dinamicamente
  const { data: experiences, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences
  });
  
  // O objeto de skills continua estático, como no seu projeto original
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
    <section id="sobre" className="section-snap bg-background">
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
                      <Badge key={skill.name} variant="secondary" className="text-xs px-2 py-1">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.softSkills.map((skill) => (
                       <Badge key={skill.name} variant="secondary" className="text-xs px-2 py-1">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Coluna da Direita (Timeline) - agora dinâmica */}
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
                <div className="relative flex">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                  {/* Coluna de Ícones */}
                  <div className="flex flex-col space-y-8 mr-6">
                    {experiences.map((exp) => {
                      const IconComponent = iconMap[exp.icon as keyof typeof iconMap] || Code;
                      return (
                         <div key={`icon-${exp.id}`} className="relative z-10">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-md">
                            <IconComponent className="h-4 w-4 text-primary-foreground" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Coluna de Cards */}
                  <div className="flex flex-col space-y-8 flex-1">
                    {experiences.map((exp) => {
                       const IconComponent = iconMap[exp.icon as keyof typeof iconMap] || Code;
                      return (
                        <Dialog key={exp.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:border-primary/50 group">
                              <CardHeader className="pb-3 p-4">
                                <div>
                                  <CardTitle className="text-lg font-semibold leading-tight mb-1">{exp.role}</CardTitle>
                                  <CardDescription className="text-sm mb-2">{exp.company}</CardDescription>
                                  <Badge variant="outline" className="text-sm">{exp.years}</Badge>
                                </div>
                              </CardHeader>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <IconComponent className="h-5 w-5 text-primary" />
                                <span>{exp.role}</span>
                              </DialogTitle>
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;