// src/components/PortfolioSection.tsx (versão final completa com duas imagens)

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Eye } from 'lucide-react';

// Função para buscar os projetos no Supabase
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
};

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
  
  const itemsPerPage = 3;
  // Garante que o cálculo só é feito quando 'projects' já foi carregado
  const totalPages = projects ? Math.ceil(projects.length / itemsPerPage) : 0;
  const startIndex = currentIndex * itemsPerPage;
  const visibleProjects = projects ? projects.slice(startIndex, startIndex + itemsPerPage) : [];
  
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
  
  const selectedProjectData = projects?.find(p => p.id === selectedProject);

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
          {/* Navegação do Carrossel */}
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

          {/* Grid de Projetos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {isLoading && (
              // Efeito de "skeleton" enquanto os dados carregam
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>
              ))
            )}

            {error && <p className="col-span-3 text-center text-destructive">Não foi possível carregar os projetos.</p>}
            
            {visibleProjects && visibleProjects.map((project) => (
              <Card 
                key={project.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-secondary backdrop-blur-sm aspect-square flex flex-col"
                onClick={() => setSelectedProject(project.id)}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-t-lg h-3/4">
                    {/* IMAGEM 1: Usando a imagem do card */}
                    <img
                      src={project.image_card_url} 
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

          {/* Paginação */}
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

        {/* Modal (Dialog) para Detalhes do Projeto */}
        {selectedProjectData && (
          <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProjectData.title}</DialogTitle>
                <DialogDescription className="flex items-center space-x-4 text-base">
                  <Badge>{selectedProjectData.type}</Badge>
                  <span>{selectedProjectData.year}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  {/* IMAGEM 2: Usando a imagem do modal, com fallback para a imagem do card */}
                  <img
                    src={selectedProjectData.image_modal_url || selectedProjectData.image_card_url}
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
                  <Button onClick={() => window.open(selectedProjectData.project_url, '_blank')} className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" /> Ver Projeto
                  </Button>
                  <Button variant="outline" onClick={() => window.open(selectedProjectData.code_url, '_blank')} className="flex-1">
                    <Github className="h-4 w-4 mr-2" /> Ver Código
                  </Button>
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