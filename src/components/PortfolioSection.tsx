import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

// IMPORTAÇÃO DIRETA DO JSON
import projectsData from '@/data/projects.json';

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Estado para controlar itens por página

  // Lógica para detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Mobile: 1 por vez
      } else {
        setItemsPerPage(3); // Desktop: 3 por vez
      }
    };

    // Executa ao carregar
    handleResize();

    // Executa ao redimensionar a tela
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
  
  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="portfolio" className="section-snap bg-muted/30">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="text-left mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            MEU <span className="text-primary">PORTFÓLIO</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Aqui estão alguns dos projetos que desenvolvi, desde aplicações web complexas até sistemas de identidade visual.
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" size="sm" onClick={goToPrev} disabled={totalPages <= 1} className="focus-ring">
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{String(currentIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
            </div>
            <Button variant="outline" size="sm" onClick={goToNext} disabled={totalPages <= 1} className="focus-ring">
              Próximo <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Grid ajustado para exibir 1 coluna no mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {visibleProjects.map((project) => (
              <Card 
                key={project.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-secondary backdrop-blur-sm aspect-square flex flex-col"
                onClick={() => setSelectedProject(project.id)}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-t-lg h-3/4">
                    <img
                      src={project.image_card_url || ''} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">Ver Detalhes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 h-1/4 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs text-blue-500 border-white/30">{project.type}</Badge>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors focus-ring ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {selectedProjectData && (
          <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto pr-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProjectData.title}</DialogTitle>
                <DialogDescription className="flex items-center space-x-4 text-base">
                  <Badge>{selectedProjectData.type}</Badge>
                  <span>{selectedProjectData.year}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedProjectData.image_modal_url || selectedProjectData.image_card_url || ''}
                    alt={selectedProjectData.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.tags?.map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Sobre o Projeto</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProjectData.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Principais Funcionalidades</h3>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {selectedProjectData.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  {selectedProjectData.project_url && <Button onClick={() => window.open(selectedProjectData.project_url, '_blank')} className="flex-1"> Ver Projeto </Button>}
                  {selectedProjectData.code_url && <Button variant="outline" onClick={() => window.open(selectedProjectData.code_url, '_blank')} className="flex-1"> Documentação </Button>}
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