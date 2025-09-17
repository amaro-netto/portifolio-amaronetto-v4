import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Building, ExternalLink, GraduationCap, Code, Network, Palette, Shield } from 'lucide-react';

const AboutSection = () => {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

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

  const experiences = [
    {
      id: 1,
      years: '2022 - Atual',
      role: 'Tech Lead & Designer',
      company: 'Freelancer',
      icon: Code,
      description: 'Liderando projetos de desenvolvimento full-stack e design para diversos clientes, com foco em soluções escaláveis e experiências de usuário excepcionais. Responsável pela arquitetura técnica, mentoria de desenvolvedores júnior e gestão de projetos complexos.',
      achievements: [
        'Entregou 50+ projetos web com 100% de satisfação do cliente',
        'Implementou arquiteturas que reduziram tempo de carregamento em 40%',
        'Estabeleceu processos de desenvolvimento que aumentaram produtividade em 60%',
        'Mentoreou 15+ desenvolvedores júnior'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'AWS', 'Figma', 'Adobe Creative Suite']
    },
    {
      id: 2,
      years: '2020 - 2022',
      role: 'Desenvolvedor Full-Stack Sênior',
      company: 'TechCorp Solutions',
      icon: Network,
      description: 'Desenvolvimento de aplicações enterprise escaláveis, liderança técnica em projetos críticos e implementação de melhores práticas de desenvolvimento. Foco em performance, segurança e experiência do usuário.',
      achievements: [
        'Arquitetou sistema que processa 1M+ transações diárias',
        'Reduziu bugs em produção em 80% através de testes automatizados',
        'Liderou migração para arquitetura de microserviços',
        'Implementou pipeline CI/CD que reduziu deploy de 2h para 15min'
      ],
      technologies: ['Node.js', 'React', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis']
    },
    {
      id: 3,
      years: '2018 - 2020',
      role: 'Designer & Desenvolvedor',
      company: 'Creative Digital Agency',
      icon: Palette,
      description: 'Combinando habilidades de design e desenvolvimento para criar experiências digitais inovadoras. Responsável por todo o ciclo do produto, desde a concepção até a implementação.',
      achievements: [
        'Criou identidades visuais para 30+ marcas',
        'Desenvolveu sites que geraram 200% mais conversões',
        'Implementou sistema de design usado por toda a empresa',
        'Ganhou prêmio "Melhor Design Web" da região'
      ],
      technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'WordPress', 'Photoshop', 'Illustrator']
    },
    {
      id: 4,
      years: '2016 - 2018',
      role: 'Especialista em TI',
      company: 'Infratech Sistemas',
      icon: Shield,
      description: 'Gerenciamento de infraestrutura de TI, suporte técnico especializado e implementação de soluções de segurança. Responsável pela manutenção de sistemas críticos e suporte a usuários.',
      achievements: [
        'Manteve 99.8% de uptime em serviços críticos',
        'Implementou backup automatizado que evitou perda de dados',
        'Reduziu tempo de resolução de incidentes em 50%',
        'Treinou equipe de suporte em novas tecnologias'
      ],
      technologies: ['Windows Server', 'Linux', 'VMware', 'Active Directory', 'Network Security']
    }
  ];

  const learningPlatforms = [
    { name: 'AWS', icon: '☁️', url: 'https://aws.amazon.com/certification/' },
    { name: 'Google Cloud', icon: '🔵', url: 'https://cloud.google.com/certification' },
    { name: 'Microsoft', icon: '🔷', url: 'https://docs.microsoft.com/learn/' },
    { name: 'Coursera', icon: '🎓', url: 'https://coursera.org' },
    { name: 'Udemy', icon: '📚', url: 'https://udemy.com' },
    { name: 'Alura', icon: '🚀', url: 'https://alura.com.br' },
  ];

  const handleExperienceClick = (id: number) => {
    setSelectedExperience(selectedExperience === id ? null : id);
  };

  return (
    <section id="sobre" className="section-snap bg-background">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="grid lg:grid-cols-2 gap-12 h-full">
          {/* Left Column - Journey & Skills */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                MINHA <span className="text-primary">JORNADA</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 text-justify">
                Com mais de 8 anos de experiência em tecnologia, construí uma carreira sólida 
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
                  <div className="space-y-3">
                    {skills.hardSkills.map((skill) => (
                      <div key={skill.name} className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
                        <skill.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Soft Skills</h4>
                  <div className="space-y-3">
                    {skills.softSkills.map((skill) => (
                      <div key={skill.name} className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
                        <skill.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            
            <div className="relative pl-8">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-8">
                {experiences.map((exp) => {
                  const IconComponent = exp.icon;
                  return (
                    <Dialog key={exp.id}>
                      <div className="relative">
                        {/* Timeline Icon on Line */}
                        <div className="absolute -left-2 top-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-md z-10">
                          <IconComponent className="h-3 w-3 text-primary-foreground" />
                        </div>
                        
                        <DialogTrigger asChild>
                          <Card className="max-w-sm ml-8 cursor-pointer hover:shadow-md transition-all duration-300 hover:border-primary/50 group">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base font-semibold">
                                    {exp.role}
                                  </CardTitle>
                                  <CardDescription className="text-sm">
                                    {exp.company}
                                  </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                                  {exp.years}
                                </Badge>
                              </div>
                            </CardHeader>
                          </Card>
                        </DialogTrigger>
                      </div>

                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <IconComponent className="h-5 w-5 text-primary" />
                            <span>{exp.role}</span>
                          </DialogTitle>
                          <DialogDescription className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{exp.company}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.years}</span>
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                          
                          <div>
                            <h4 className="font-medium mb-2">Principais Conquistas:</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {exp.achievements.map((achievement, idx) => (
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
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Platforms */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              APRENDIZADO CONTÍNUO
            </h3>
            <p className="text-muted-foreground">
              Sempre em busca de conhecimento através das melhores plataformas
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {learningPlatforms.map((platform) => (
              <button
                key={platform.name}
                className="w-16 h-16 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer focus-ring"
                onClick={() => window.open(platform.url, '_blank')}
                aria-label={`Visitar ${platform.name}`}
                title={platform.name}
              >
                <img 
                  src="https://cursos.alura.com.br/assets/images/logos/logo-alura.svg" 
                  alt={platform.name}
                  className="w-8 h-8 object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;