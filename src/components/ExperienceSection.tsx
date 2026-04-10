import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Building,
  Code,
  Network,
  Palette,
  Shield,
  Briefcase,
  ChevronDown,
  X,
  Sparkles,
} from 'lucide-react';
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
  const experiences = [...(experiencesData as unknown as Experience[])].sort(
    (a, b) => (Number(a.position) || 0) - (Number(b.position) || 0)
  );

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

  const displayedExperiences = showAllExperiences
    ? experiences
    : experiences.slice(0, 4);

  const skills = {
    hardSkills: [
      { name: 'React & Next.js', icon: Code },
      { name: 'TypeScript', icon: Code },
      { name: 'Node.js & APIs', icon: Network },
      { name: 'PostgreSQL & MongoDB', icon: Shield },
      { name: 'AWS & Docker', icon: Network },
      { name: 'Git & CI/CD', icon: Code },
      { name: 'Figma & Adobe CC', icon: Palette },
      { name: 'Linux & Windows Server', icon: Shield },
    ],
    softSkills: [
      { name: 'Liderança de Equipes', icon: Code },
      { name: 'Comunicação Assertiva', icon: Palette },
      { name: 'Gestão de Projetos', icon: Network },
      { name: 'Resolução de Problemas', icon: Shield },
      { name: 'Pensamento Analítico', icon: Code },
      { name: 'Trabalho em Equipe', icon: Palette },
      { name: 'Adaptabilidade', icon: Network },
      { name: 'Mentoria & Ensino', icon: Shield },
    ],
  };

  const renderIconModal = (iconValue: string) => {
    if (iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/'))) {
      return (
        <img
          src={iconValue}
          alt="Logotipo da experiência"
          className="h-8 w-8 object-contain brightness-0 invert"
        />
      );
    }

    return <Briefcase className="h-6 w-6 text-white" aria-hidden="true" />;
  };

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="section-snap scroll-mt-16 border-t border-white/10 bg-transparent"
    >
      <div className="container mx-auto h-[100svh] px-4 py-[clamp(20px,4vh,40px)]">
        <div className="mx-auto flex h-full max-w-[1400px] flex-col">
          <div className="mb-[clamp(18px,3vh,32px)] text-center">
            <p className="mb-3 text-[clamp(11px,1.2vw,13px)] font-semibold uppercase tracking-[0.35em] text-[#D5D9DC]/80">
              Competências e carreira
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,54px)] font-bold leading-[0.95] text-white">
              EXPERIÊNCIA <span className="text-[#4D8DFF]">PROFISSIONAL</span>
            </h2>
          </div>

          <div className="grid min-h-0 flex-1 gap-[clamp(16px,2vw,28px)] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="min-h-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#071a2c]/70 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              <div className="flex h-full flex-col p-[clamp(18px,2.2vw,30px)]">
                <div className="mb-[clamp(14px,2vh,22px)] flex items-center justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[clamp(10px,1vw,12px)] font-semibold uppercase tracking-[0.28em] text-[#D5D9DC]/70">
                      Competências
                    </p>
                    <h3 className="font-display text-[clamp(20px,2vw,28px)] font-bold text-white">
                      Habilidades em destaque
                    </h3>
                  </div>

                  <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[#D5D9DC]/80 md:flex md:items-center md:gap-2">
                    <Sparkles className="h-4 w-4 text-[#4D8DFF]" />
                    <span className="text-xs font-medium">Perfil técnico + gestão</span>
                  </div>
                </div>

                <div className="grid min-h-0 flex-1 gap-[clamp(14px,1.5vw,22px)] md:grid-cols-2">
                  <div className="flex min-h-0 flex-col rounded-[24px] border border-white/10 bg-[#0A1422]/75 p-[clamp(16px,1.8vw,22px)]">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0D2439] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <Code className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[clamp(10px,1vw,11px)] font-semibold uppercase tracking-[0.22em] text-[#D5D9DC]/65">
                          Hard skills
                        </p>
                        <p className="text-[clamp(14px,1.2vw,16px)] font-semibold text-white">
                          Stack e infraestrutura
                        </p>
                      </div>
                    </div>

                    <div className="custom-scrollbar flex flex-wrap content-start gap-2 overflow-y-auto pr-1">
                      {skills.hardSkills.map((skill) => (
                        <Badge
                          key={skill.name}
                          className="rounded-full border border-[#D5D9DC]/14 bg-[#13263c] px-3 py-1.5 text-[11px] font-medium text-[#F4F5F7] hover:bg-[#18314d]"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex min-h-0 flex-col rounded-[24px] border border-white/10 bg-[#0A1422]/75 p-[clamp(16px,1.8vw,22px)]">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F4F5F7] text-[#0D2439] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[clamp(10px,1vw,11px)] font-semibold uppercase tracking-[0.22em] text-[#D5D9DC]/65">
                          Soft skills
                        </p>
                        <p className="text-[clamp(14px,1.2vw,16px)] font-semibold text-white">
                          Liderança e execução
                        </p>
                      </div>
                    </div>

                    <div className="custom-scrollbar flex flex-wrap content-start gap-2 overflow-y-auto pr-1">
                      {skills.softSkills.map((skill) => (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className="rounded-full border border-[#D5D9DC]/18 bg-transparent px-3 py-1.5 text-[11px] font-medium text-[#D5D9DC] hover:border-[#4D8DFF]/50 hover:bg-[#4D8DFF]/8 hover:text-white"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#071a2c]/70 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              <div className="flex h-full flex-col p-[clamp(18px,2.2vw,30px)]">
                <div className="mb-[clamp(14px,2vh,22px)] flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[clamp(10px,1vw,12px)] font-semibold uppercase tracking-[0.28em] text-[#D5D9DC]/70">
                      Trajetória
                    </p>
                    <h3 className="font-display text-[clamp(20px,2vw,28px)] font-bold text-white">
                      Experiência profissional
                    </h3>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D5D9DC]/75">
                      {displayedExperiences.length.toString().padStart(2, '0')} / {experiences.length.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden">
                  {experiences.length === 0 ? (
                    <p className="text-[#D5D9DC]/70">Nenhuma experiência encontrada.</p>
                  ) : (
                    <div className="custom-scrollbar relative h-full overflow-y-auto pr-2">
                      <div className="absolute left-[15px] top-3 bottom-10 w-px bg-gradient-to-b from-[#4D8DFF]/80 via-[#D5D9DC]/18 to-transparent" />

                      <div className="relative flex flex-col gap-4 pl-10">
                        {displayedExperiences.map((exp) => (
                          <div key={exp.id} className="group relative">
                            <div className="absolute -left-[31px] top-[22px] z-10">
                              <div className="h-4 w-4 rounded-full border-4 border-[#071a2c] bg-[#4D8DFF] shadow-[0_0_0_6px_rgba(77,141,255,0.10)] transition-transform duration-300 group-hover:scale-110" />
                            </div>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Card
                                  className="cursor-pointer rounded-[24px] border border-white/10 bg-[#0A1422]/82 text-left shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4D8DFF]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF]"
                                  role="button"
                                  tabIndex={0}
                                  aria-label={`Ver detalhes da experiência: ${exp.role} na empresa ${exp.company}`}
                                >
                                  <CardHeader className="p-[clamp(16px,1.8vw,22px)]">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="min-w-0 flex-1">
                                        <CardTitle className="truncate text-[clamp(18px,1.6vw,24px)] font-bold leading-tight text-white transition-colors group-hover:text-[#8DB7FF]">
                                          {exp.role}
                                        </CardTitle>

                                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(12px,1vw,14px)] font-medium text-[#D5D9DC]/84">
                                          <span className="inline-flex min-w-0 items-center gap-2">
                                            <Building className="h-4 w-4 shrink-0 text-[#8DB7FF]" />
                                            <span className="truncate">{exp.company}</span>
                                          </span>

                                          <span className="hidden text-white/25 sm:inline">•</span>

                                          <span className="inline-flex items-center gap-2 whitespace-nowrap text-[#D5D9DC]/72">
                                            <Calendar className="h-4 w-4 shrink-0 text-[#8DB7FF]" />
                                            <span>{exp.years}</span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </CardHeader>
                                </Card>
                              </DialogTrigger>

                              <DialogContent className="w-[97vw] max-w-[1600px] h-[94vh] max-h-[94vh] p-0 overflow-hidden flex flex-col bg-[#0B1120] border-white/10 shadow-2xl rounded-xl text-[#F4F5F7]">
                                <DialogClose className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white">
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Fechar</span>
                                </DialogClose>

                                <DialogHeader className="border-b border-white/10 bg-[#0D2439]/55 px-6 py-6 text-left md:px-10">
                                  <div className="flex items-start gap-4 pr-12">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                                      {renderIconModal(exp.icon)}
                                    </div>

                                    <div className="min-w-0">
                                      <DialogTitle className="text-[clamp(22px,2vw,34px)] font-bold leading-tight text-white">
                                        {exp.role}
                                      </DialogTitle>

                                      <DialogDescription className="mt-3 flex flex-col gap-2 text-[clamp(13px,1vw,15px)] text-[#D5D9DC] sm:flex-row sm:flex-wrap sm:items-center">
                                        <span className="inline-flex items-center gap-2">
                                          <Building className="h-4 w-4 text-[#8DB7FF]" />
                                          {exp.company}
                                        </span>
                                        <span className="hidden sm:inline text-white/25">•</span>
                                        <span className="inline-flex items-center gap-2">
                                          <Calendar className="h-4 w-4 text-[#8DB7FF]" />
                                          {exp.years}
                                        </span>
                                        {exp.duration && (
                                          <>
                                            <span className="hidden sm:inline text-white/25">•</span>
                                            <span>{exp.duration}</span>
                                          </>
                                        )}
                                      </DialogDescription>
                                    </div>
                                  </div>
                                </DialogHeader>

                                <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8">
                                  <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                                    <div className="space-y-6">
                                      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
                                        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#D5D9DC]/75">
                                          <Briefcase className="h-4 w-4 text-[#8DB7FF]" />
                                          Visão geral
                                        </h4>
                                        <p className="text-[clamp(14px,1.05vw,16px)] leading-relaxed text-[#F4F5F7]/88">
                                          {exp.description}
                                        </p>
                                      </div>

                                      {exp.achievements && exp.achievements.length > 0 && (
                                        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
                                          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#D5D9DC]/75">
                                            Principais conquistas
                                          </h4>
                                          <ul className="space-y-3">
                                            {exp.achievements.map((achievement: string, idx: number) => (
                                              <li
                                                key={idx}
                                                className="flex items-start gap-3 text-[clamp(13px,1vw,15px)] leading-relaxed text-[#F4F5F7]/84"
                                              >
                                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4D8DFF]" />
                                                <span>{achievement}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>

                                    <div className="space-y-6">
                                      <div className="rounded-[24px] border border-white/10 bg-[#0D2439]/42 p-6">
                                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#D5D9DC]/75">
                                          Detalhes
                                        </h4>
                                        <div className="space-y-3 text-[clamp(13px,0.95vw,15px)] text-[#F4F5F7]/84">
                                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                                            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D5D9DC]/60">
                                              Empresa
                                            </span>
                                            <span>{exp.company}</span>
                                          </div>
                                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                                            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D5D9DC]/60">
                                              Período
                                            </span>
                                            <span>{exp.years}</span>
                                          </div>
                                          {exp.duration && (
                                            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                                              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D5D9DC]/60">
                                                Duração
                                              </span>
                                              <span>{exp.duration}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
                                          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#D5D9DC]/75">
                                            Tecnologias
                                          </h4>
                                          <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech: string) => (
                                              <Badge
                                                key={tech}
                                                className="rounded-full border border-[#4D8DFF]/22 bg-[#4D8DFF]/10 px-3 py-1.5 text-[11px] font-medium text-[#DDE9FF] hover:bg-[#4D8DFF]/18"
                                              >
                                                {tech}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {!showAllExperiences && experiences.length > 4 && (
                  <div className="pt-[clamp(14px,2vh,22px)]">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllExperiences(true)}
                      className="w-full rounded-full border-white/12 bg-white/5 px-5 py-6 text-sm font-medium text-[#F4F5F7] hover:bg-[#0D2439] hover:text-white"
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

export default ExperienceSection;
