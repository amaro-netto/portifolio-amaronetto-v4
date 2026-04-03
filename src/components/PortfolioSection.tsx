import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code2,
  Calendar,
  Layers,
  Wrench,
  Target,
  Box,
  User,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Globe
} from 'lucide-react';
import projectsData from '@/data/projects.json';
import { cn } from '@/lib/utils';

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [sectionLayout, setSectionLayout] = useState({ width: 1280, height: 820, scale: 1 });

  useEffect(() => {
    const handleResize = () => {
      const nextItemsPerPage = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

      const nextPreset =
        nextItemsPerPage === 1
          ? { width: 420, height: 760 }
          : nextItemsPerPage === 2
            ? { width: 920, height: 780 }
            : { width: 1280, height: 800 };

      const horizontalPadding = window.innerWidth < 768 ? 24 : 40;
      const verticalPadding = window.innerWidth < 768 ? 24 : 32;
      const availableWidth = Math.max(window.innerWidth - horizontalPadding, 320);
      const availableHeight = Math.max(window.innerHeight - verticalPadding, 520);

      const widthScale = availableWidth / nextPreset.width;
      const heightScale = availableHeight / nextPreset.height;
      const nextScale = Math.min(widthScale, heightScale, 1.02);

      setItemsPerPage(nextItemsPerPage);
      setSectionLayout({
        width: nextPreset.width,
        height: nextPreset.height,
        scale: Math.max(nextScale, 0.58),
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [...projectsData].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = currentIndex * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentIndex >= totalPages && totalPages > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalPages]);

  const goToNext = () => {
    if (totalPages > 0) setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    if (totalPages > 0) setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const p: any = projects.find((proj) => proj.id === selectedProject);

  return (
    <section id="portfolio" className="section-snap h-[100svh] overflow-hidden bg-muted/30 scroll-mt-16">
      <div className="flex h-full w-full items-center justify-center overflow-hidden px-3 py-3 md:px-5 md:py-4">
        <div
          className="relative shrink-0"
          style={{
            width: `${sectionLayout.width * sectionLayout.scale}px`,
            height: `${sectionLayout.height * sectionLayout.scale}px`,
          }}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              width: `${sectionLayout.width}px`,
              height: `${sectionLayout.height}px`,
              transform: `scale(${sectionLayout.scale})`,
              transformOrigin: 'top left',
            }}
          >
            <div className="flex h-full w-full flex-col px-6 py-6 md:px-8 md:py-8">
              <div className="mb-8 text-left animate-in slide-in-from-bottom-5 fade-in duration-700">
                <h2 className="mb-3 font-display text-[42px] font-bold leading-[0.95] text-foreground">
                  MEU <span className="text-primary">PORTFÓLIO</span>
                </h2>
                <p className="max-w-[840px] text-[18px] leading-[1.45] text-muted-foreground">
                  Aqui estão alguns dos projetos que desenvolvi, variando de aplicações web complexas a soluções de automação e infraestrutura.
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrev}
                    disabled={totalPages <= 1}
                    className="focus-ring h-10 px-4 text-[14px] hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Ir para página anterior de projetos"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Anterior
                  </Button>

                  <div
                    className="rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-[14px] text-muted-foreground backdrop-blur-sm"
                    role="status"
                  >
                    <span className="font-medium text-primary">{String(currentIndex + 1).padStart(2, '0')}</span>
                    <span className="mx-1 opacity-50">/</span>
                    <span>{String(totalPages).padStart(2, '0')}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNext}
                    disabled={totalPages <= 1}
                    className="focus-ring h-10 px-4 text-[14px] hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Ir para próxima página de projetos"
                  >
                    Próximo <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className={`grid content-start gap-6 ${itemsPerPage === 1 ? 'grid-cols-1' : itemsPerPage === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {visibleProjects.map((project, idx) => {
                    const previewText = project.objective || project.context || project.approach || project.results || '';
                    const techTags = project.tags?.slice(0, itemsPerPage === 1 ? 5 : 4).join(' • ') || 'Tecnologias do projeto';
                    const cardHeight = itemsPerPage === 1 ? 520 : itemsPerPage === 2 ? 500 : 480;
                    const imageHeight = itemsPerPage === 1 ? 250 : itemsPerPage === 2 ? 230 : 205;

                    return (
                      <Card
                        key={project.id}
                        className="group flex flex-col overflow-hidden rounded-[28px] border border-border/60 bg-background/88 p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 animate-in fade-in zoom-in-95"
                        style={{ animationDelay: `${idx * 100}ms`, height: `${cardHeight}px` }}
                      >
                        <div className="relative overflow-hidden rounded-[20px] border border-border/50 bg-muted/40" style={{ height: `${imageHeight}px` }}>
                          {!loadedImages[project.id] && <Skeleton className="absolute inset-0 h-full w-full" />}
                          <img
                            src={project.image_card_url || ''}
                            alt={project.title}
                            className={cn(
                              'h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03]',
                              loadedImages[project.id] ? 'opacity-100' : 'opacity-0'
                            )}
                            loading="lazy"
                            onLoad={() => handleImageLoad(project.id)}
                          />
                        </div>

                        <div className="flex min-h-0 flex-1 flex-col px-1 pt-4 pb-1">
                          <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
                            <span className="min-w-0 flex-1 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/90">
                              {project.type}
                            </span>
                            {project.year && (
                              <span className="shrink-0 text-[11px] text-muted-foreground">{project.year}</span>
                            )}
                          </div>

                          <h3 className="truncate text-[18px] font-semibold leading-[1.15] tracking-tight text-foreground">
                            {project.title}
                          </h3>

                          <p className="mt-2 truncate text-[12px] font-medium text-muted-foreground">
                            {techTags}
                          </p>

                          <p className="mt-4 min-h-[54px] overflow-hidden text-[13px] leading-[1.38] text-muted-foreground line-clamp-3">
                            {previewText}
                          </p>

                          <div className="mt-auto border-t border-border/60 pt-4">
                            <Button
                              type="button"
                              onClick={() => setSelectedProject(project.id)}
                              className="h-11 w-full rounded-full text-[14px] font-semibold"
                              aria-label={`Visualizar detalhes do projeto ${project.title}`}
                            >
                              Visualizar
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-center space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus-ring ${index === currentIndex ? 'bg-primary w-8' : 'w-2.5 bg-muted-foreground/30 hover:bg-primary/50'}`}
                      aria-label={`Ir para página ${index + 1} de ${totalPages}`}
                      aria-current={index === currentIndex ? 'page' : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {p && (
        <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="w-[97vw] max-w-[1600px] h-[94vh] max-h-[94vh] p-0 overflow-hidden flex flex-col bg-[#0B1120] border-white/10 shadow-2xl rounded-xl">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 space-y-12">
              <div className="flex flex-col gap-2 border-b border-white/5 pb-8">
                <DialogTitle className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {p.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 uppercase font-bold tracking-widest text-xs text-primary/80">
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" /> {p.type}
                  </span>
                  <span className="text-white/10">|</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" aria-hidden="true" /> {p.year}
                  </span>
                </DialogDescription>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-muted/5 aspect-[4/3] flex flex-col">
                  {!loadedImages[`modal-${p.id}`] && <Skeleton className="w-full h-full" />}
                  <img
                    src={p.image_modal_url || p.image_card_url || ''}
                    alt={p.title}
                    className={cn(
                      'w-full h-full object-cover object-top transition-opacity duration-500',
                      loadedImages[`modal-${p.id}`] ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => handleImageLoad(`modal-${p.id}`)}
                  />
                </div>

                <div className="flex flex-col gap-10">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <Wrench className="w-4 h-4 text-primary" /> TECNOLOGIAS
                    </h4>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {p.tags?.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-muted-foreground font-normal hover:bg-white/10 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <Target className="w-4 h-4 text-primary" /> OBJETIVO
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.objective}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <Layers className="w-4 h-4 text-primary" /> ESCOPO & COMPLEXIDADE
                    </h4>
                    <ul className="space-y-3 pl-6">
                      {p.scope?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4 pl-6 pt-4">
                    {p.project_url && (
                      <Button asChild variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 h-10 px-6">
                        <a href={p.project_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2 text-muted-foreground" aria-hidden="true" />
                          Ver Projeto Online
                        </a>
                      </Button>
                    )}
                    {p.code_url && (
                      <Button asChild variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 h-10 px-6">
                        <a href={p.code_url} target="_blank" rel="noopener noreferrer">
                          <Code2 className="w-4 h-4 mr-2 text-muted-foreground" aria-hidden="true" />
                          Repositório / Docs
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 pt-12 border-t border-white/5">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <Box className="w-4 h-4 text-primary" /> CONTEXTO
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.context}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <Lightbulb className="w-4 h-4 text-primary" /> ABORDAGEM / ESTRATÉGIA
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.approach}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <TrendingUp className="w-4 h-4 text-primary" /> RESULTADOS & IMPACTO
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.results}
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <User className="w-4 h-4 text-primary" /> MEU PAPEL
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.my_role}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                      <AlertTriangle className="w-4 h-4 text-primary" /> PRINCIPAIS DESAFIOS
                    </h4>
                    <ul className="space-y-3 pl-6">
                      {p.challenges?.map((challenge: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                          <span className="leading-snug">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default PortfolioSection;
