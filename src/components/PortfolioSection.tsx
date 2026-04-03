import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

  // Ajuste de responsividade da paginação - Original preservado
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ordenação baseada no campo position do JSON
  const projects = [...projectsData].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = currentIndex * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => {
    if (totalPages > 0) setCurrentIndex((prev) => (prev + 1) % totalPages);
  };
  const goToPrev = () => {
    if (totalPages > 0) setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Seleção do projeto consumindo dados reais do JSON
  const p: any = projects.find(proj => proj.id === selectedProject);

  return (
    <section id="portfolio" className="section-snap bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="text-left mb-12 animate-in slide-in-from-bottom-5 fade-in duration-700">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            MEU <span className="text-primary">PORTFÓLIO</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Aqui estão alguns dos projetos que desenvolvi, variando de aplicações web complexas a soluções de automação e infraestrutura.
          </p>
        </div>

        <div className="relative">
          {/* Controles de Navegação Originais */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              disabled={totalPages <= 1}
              className="focus-ring hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Ir para página anterior de projetos"
            >
              <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" /> Anterior
            </Button>

            <div className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50 backdrop-blur-sm" role="status">
              <span className="font-medium text-primary">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 opacity-50">/</span>
              <span>{String(totalPages).padStart(2, '0')}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={totalPages <= 1}
              className="focus-ring hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Ir para próxima página de projetos"
            >
              Próximo <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
          </div>

          {/* Grid de Projetos Original */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {visibleProjects.map((project, idx) => (
              <Card
                key={project.id}
                className="group relative cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden flex flex-col h-[380px] rounded-2xl animate-in fade-in zoom-in-95"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedProject(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedProject(project.id)}
              >
                {!loadedImages[project.id] && <Skeleton className="absolute inset-0 w-full h-full z-0" />}
                <img
                  src={project.image_card_url || ''}
                  alt={project.title}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                    loadedImages[project.id] ? "opacity-100" : "opacity-0"
                  )}
                  loading="lazy"
                  onLoad={() => handleImageLoad(project.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                  <div className="flex justify-start">
                    <Badge className="bg-primary/90 hover:bg-primary text-white border-0 backdrop-blur-sm shadow-sm">
                      {project.type}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-white group-hover:text-primary transition-colors drop-shadow-md">
                      {project.title}
                    </h3>
                    <div className="h-1 w-0 bg-primary mt-3 transition-all duration-500 group-hover:w-16 rounded-full"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Paginação Original (Bolinhas) */}
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus-ring ${index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                aria-label={`Ir para página ${index + 1} de ${totalPages}`}
                aria-current={index === currentIndex ? "page" : undefined}
              />
            ))}
          </div>
        </div>

        {/* --- MODAL DE ALTA FIDELIDADE (Design Imagem 2) --- */}
        {p && (
          <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-5xl w-[92vw] max-h-[90vh] p-0 overflow-hidden flex flex-col bg-[#0B1120] border-white/10 shadow-2xl rounded-xl">

              {/* Conteúdo com Scroll Interno para garantir visualização total */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 space-y-12">

                {/* Header do Modal */}
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

                {/* Bloco Superior: Grade de 2 Colunas */}
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                  {/* Imagem do Projeto */}
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-muted/5 aspect-[4/3] flex flex-col">
                    {!loadedImages[`modal-${p.id}`] && <Skeleton className="w-full h-full" />}
                    <img
                      src={p.image_modal_url || p.image_card_url || ''}
                      alt={p.title}
                      className={cn(
                        "w-full h-full object-cover object-top transition-opacity duration-500",
                        loadedImages[`modal-${p.id}`] ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() => handleImageLoad(`modal-${p.id}`)}
                    />
                  </div>

                  {/* Informações à Direita */}
                  <div className="flex flex-col gap-10">
                    {/* Tecnologias */}
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

                    {/* Objetivo */}
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-white">
                        <Target className="w-4 h-4 text-primary" /> OBJETIVO
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                        {p.objective}
                      </p>
                    </div>

                    {/* Escopo */}
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

                    {/* Botões de Ação na Coluna Direita (Imagem 2) */}
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

                {/* Bloco Inferior: Detalhamento Técnico (2 Colunas) */}
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 pt-12 border-t border-white/5">
                  {/* Coluna Esquerda: Contexto, Abordagem, Resultados */}
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

                  {/* Coluna Direita: Papel e Desafios */}
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
      </div>
    </section>
  );
};

export default PortfolioSection;