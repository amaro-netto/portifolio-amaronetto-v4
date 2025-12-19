import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, Eye, ExternalLink, Code2, Calendar, Layers } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { cn } from '@/lib/utils';

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  // Estado para controlar o carregamento individual das imagens
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

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

  const projects = [...projectsData].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));
  
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = currentIndex * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);
  
  const goToNext = () => {
    if (totalPages > 0) {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }
  };
  const goToPrev = () => {
    if (totalPages > 0) {
      setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };
  
  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="portfolio" className="section-snap bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="text-left mb-12 animate-in slide-in-from-bottom-5 fade-in duration-700">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            MEU <span className="text-primary">PORTFÓLIO</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Aqui estão alguns dos projetos que desenvolvi, variando de aplicações web complexas a soluções de automação e design.
          </p>
        </div>

        <div className="relative">
          {/* Controles de Navegação */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPrev} 
              disabled={totalPages <= 1} 
              className="focus-ring hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Projetos anteriores"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <div className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50 backdrop-blur-sm">
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
              aria-label="Próximos projetos"
            >
              Próximo <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Grid de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {visibleProjects.map((project, idx) => (
              <Card 
                key={project.id}
                className="group cursor-pointer hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 border-border/60 bg-card overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                onClick={() => setSelectedProject(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project.id)}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Imagem do Card com Skeleton */}
                  <div className="relative overflow-hidden h-48 md:h-56 bg-muted">
                    {/* Skeleton Loader (visível apenas enquanto carrega) */}
                    {!loadedImages[project.id] && (
                        <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    
                    <img
                      src={project.image_card_url || ''} 
                      alt={project.title}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                        loadedImages[project.id] ? "opacity-100" : "opacity-0" // Fade-in effect
                      )}
                      loading="lazy"
                      onLoad={() => handleImageLoad(project.id)}
                    />
                    
                    {/* Overlay e Badges (só aparecem após carregar ou se quiser, sempre) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    <div className="absolute top-3 right-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75 z-10">
                         <Badge variant="secondary" className="shadow-lg backdrop-blur-md bg-white/10 text-white border-white/20">
                            Ver Detalhes
                         </Badge>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                       <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-primary/90 hover:bg-primary text-[10px] px-1.5 h-5 border-0">
                             {project.type}
                          </Badge>
                       </div>
                    </div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-5 flex flex-col flex-1 border-t border-border/40">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {project.title}
                        </h3>
                        <span className="text-xs text-muted-foreground font-mono mt-1">{project.year}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-secondary/50 text-secondary-foreground border border-border/50">
                                {tag}
                            </span>
                        ))}
                        {(project.tags?.length || 0) > 3 && (
                            <span className="text-[10px] px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground border border-border/50">
                                +{(project.tags?.length || 0) - 3}
                            </span>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus-ring ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-primary/50'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* --- MODAL DE DETALHES --- */}
        {selectedProjectData && (
          <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden flex flex-col bg-background border-border shadow-2xl">
              
              <DialogHeader className="p-6 pb-4 border-b border-border bg-background/95 backdrop-blur z-20 sticky top-0">
                <div className="flex flex-col gap-1 pr-8">
                    <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                        {selectedProjectData.title}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-3 text-sm pt-1">
                        <Badge variant="outline" className="flex items-center gap-1.5">
                            <Layers className="w-3 h-3" /> {selectedProjectData.type}
                        </Badge>
                        <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Calendar className="w-3 h-3" /> {selectedProjectData.year}
                        </span>
                    </DialogDescription>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                
                {/* Imagem Principal do Modal com Skeleton */}
                <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-inner bg-muted/20 group min-h-[200px]">
                    {!loadedImages[`modal-${selectedProjectData.id}`] && (
                        <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <img
                        src={selectedProjectData.image_modal_url || selectedProjectData.image_card_url || ''}
                        alt={selectedProjectData.title}
                        className={cn(
                            "w-full h-auto max-h-[400px] object-cover object-top transition-all duration-700 hover:scale-[1.02]",
                            loadedImages[`modal-${selectedProjectData.id}`] ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => handleImageLoad(`modal-${selectedProjectData.id}`)}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
                                Sobre o Projeto
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-justify">
                                {selectedProjectData.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3 text-foreground">
                                Principais Funcionalidades
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {selectedProjectData.features?.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground p-3 rounded-lg bg-secondary/20 border border-border/30">
                                    <span className="text-primary mt-0.5 block w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></span>
                                    <span className="leading-snug">{feature}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-secondary/10 p-5 rounded-xl border border-border/40">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                                Tecnologias
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedProjectData.tags?.map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="bg-background hover:bg-background border border-border/60 text-foreground/80">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {selectedProjectData.project_url && (
                                <Button onClick={() => window.open(selectedProjectData.project_url, '_blank')} className="w-full shadow-lg shadow-primary/20">
                                    <ExternalLink className="w-4 h-4 mr-2" /> 
                                    Ver Projeto Online
                                </Button>
                            )}
                            
                            {selectedProjectData.code_url && (
                                <Button variant="outline" onClick={() => window.open(selectedProjectData.code_url, '_blank')} className="w-full">
                                    <Code2 className="w-4 h-4 mr-2" /> 
                                    Repositório / Docs
                                </Button>
                            )}
                            
                            {!selectedProjectData.project_url && !selectedProjectData.code_url && (
                                <div className="text-center p-3 text-xs text-muted-foreground bg-muted/30 rounded-lg">
                                    Projeto privado ou interno.
                                </div>
                            )}
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