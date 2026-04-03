import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChevronLeft, ChevronRight, ExternalLink, Code2, Calendar, Layers,
  Wrench, Target, Box, User, Lightbulb, AlertTriangle, TrendingUp, Globe
} from 'lucide-react';
import projectsData from '@/data/projects.json';
import { cn } from '@/lib/utils';

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
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

  // Utilizando any temporariamente para aceitar os novos campos que serão adicionados ao JSON
  const selectedProjectData: any = projects.find(p => p.id === selectedProject);

  // Mocks de dados baseados na imagem de referência para quando o JSON ainda não tiver os campos
  const getExtendedData = (data: any) => {
    return {
      title: data.title || "CPA - Cálculo de Pensão Alimentícia",
      type: data.type || "Web Application",
      year: data.year || "2025",
      description: data.description || "Criar uma aplicação web para automatizar o cálculo e gerar um resultado confiável para uso em análise e documentação.",
      tags: data.tags || ["React", "TypeScript", "Tailwind CSS"],
      scope: data.scope || data.features || ["Cálculo por período customizado", "Regras envolvendo correção + juros + multas + honorários", "Saída com exportação/impressão para uso prático"],
      objective: data.objective || "Criar uma aplicação web para automatizar o cálculo e gerar um resultado confiável para uso em análise e documentação.",
      context: data.context || "Profissionais do direito e contabilidade precisam calcular pensão alimentícia com juros, correção monetária, multas e honorários, e isso costuma ser feito manualmente/planilhas, gerando erro e retrabalho.",
      my_role: data.my_role || "Responsável pelo desenvolvimento completo (front-end e back-end), definição das regras de cálculo e estrutura do projeto.",
      approach: data.approach || "Implementei um fluxo guiado: entrada de dados -> aplicação das regras -> geração do demonstrativo. Priorizei clareza de interface e separação entre camada de regra de negócio e camada de UI.",
      challenges: data.challenges || ["Organizar regras de cálculo de forma legível e fácil de manter", "Evitar inconsistências em datas/períodos", "Gerar uma saída (impressão/exportação) clara e apresentável"],
      results: data.results || "Aplicação pronta para reduzir tempo de cálculo e padronizar o demonstrativo, facilitando a conferência e o uso em rotinas profissionais.",
      project_url: data.project_url,
      code_url: data.code_url,
    }
  }

  const p = selectedProjectData ? getExtendedData(selectedProjectData) : null;

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
            >
              Próximo <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
          </div>

          {/* Grid de Projetos Estilo Poster */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {visibleProjects.map((project, idx) => (
              <Card
                key={project.id}
                className="group relative cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden flex flex-col h-[400px] rounded-2xl animate-in fade-in zoom-in-95"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                onClick={() => setSelectedProject(project.id)}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalhes do projeto: ${project.title}`}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedProject(project.id)}
              >
                {!loadedImages[project.id] && (
                  <Skeleton className="absolute inset-0 w-full h-full z-0" />
                )}

                <img
                  src={project.image_card_url || ''}
                  alt={`Capa do projeto ${project.title}`}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                    loadedImages[project.id] ? "opacity-100" : "opacity-0"
                  )}
                  loading="lazy"
                  onLoad={() => handleImageLoad(project.id)}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10" />

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

          {/* Paginação */}
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

        {/* --- MODAL DE DETALHES DO PROJETO FIELL À IMAGEM 2 --- */}
        {p && (
          <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-[1100px] w-[95vw] max-h-[90vh] p-6 md:p-10 gap-8 overflow-y-auto custom-scrollbar bg-[#0B1120] border-border/20 shadow-2xl rounded-xl">

              {/* Cabeçalho */}
              <div className="flex flex-col gap-1.5">
                <DialogTitle className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                  {p.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" /> {p.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" /> {p.year}
                  </span>
                </DialogDescription>
              </div>

              {/* TOPO: Imagem (Esquerda) e Blocos Principais (Direita) */}
              <div className="grid lg:grid-cols-2 gap-10 items-start">

                {/* Coluna Esquerda: Imagem Limpa */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-muted/10 aspect-[4/3] flex flex-col">
                  {!loadedImages[`modal-${selectedProjectData?.id}`] && (
                    <Skeleton className="absolute inset-0 w-full h-full" />
                  )}
                  <img
                    src={selectedProjectData?.image_modal_url || selectedProjectData?.image_card_url || ''}
                    alt={`Visual do projeto ${p.title}`}
                    className={cn(
                      "w-full h-full object-cover object-top transition-opacity duration-700",
                      loadedImages[`modal-${selectedProjectData?.id}`] ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => handleImageLoad(`modal-${selectedProjectData?.id}`)}
                  />
                </div>

                {/* Coluna Direita: Tecnologias, Objetivo, Escopo e Botões */}
                <div className="flex flex-col gap-8">

                  {/* Tecnologias */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <Wrench className="w-4 h-4 text-primary" /> Tecnologias
                    </h4>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {p.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 border-white/10 text-muted-foreground font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Objetivo */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <Target className="w-4 h-4 text-primary" /> Objetivo
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                      {p.objective}
                    </p>
                  </div>

                  {/* Escopo & Complexidade */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <Layers className="w-4 h-4 text-primary" /> Escopo & Complexidade
                    </h4>
                    <ul className="space-y-2 pl-6">
                      {p.scope.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botões de Ação (Abaixo do escopo, como na imagem) */}
                  <div className="flex flex-wrap gap-4 pl-6 pt-2">
                    {p.project_url && (
                      <Button asChild variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5">
                        <a href={p.project_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2 text-muted-foreground" aria-hidden="true" />
                          Ver Projeto Online
                        </a>
                      </Button>
                    )}

                    {p.code_url && (
                      <Button asChild variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5">
                        <a href={p.code_url} target="_blank" rel="noopener noreferrer">
                          <Code2 className="w-4 h-4 mr-2 text-muted-foreground" aria-hidden="true" />
                          Repositório / Docs
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* BASE: 2 Colunas Detalhadas (Contexto, Papel, Desafios, etc.) */}
              <div className="grid md:grid-cols-2 gap-10 pt-8 border-t border-white/10">

                {/* Coluna Esquerda Inferior */}
                <div className="space-y-8">
                  {/* Contexto */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <Box className="w-4 h-4 text-primary" /> Contexto
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.context}
                    </p>
                  </div>

                  {/* Abordagem / Estratégia */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <Lightbulb className="w-4 h-4 text-primary" /> Abordagem / Estratégia
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.approach}
                    </p>
                  </div>

                  {/* Resultados & Impacto */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <TrendingUp className="w-4 h-4 text-primary" /> Resultados & Impacto
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.results}
                    </p>
                  </div>
                </div>

                {/* Coluna Direita Inferior */}
                <div className="space-y-8">
                  {/* Meu Papel */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <User className="w-4 h-4 text-primary" /> Meu Papel
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6 text-justify">
                      {p.my_role}
                    </p>
                  </div>

                  {/* Principais Desafios */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white">
                      <AlertTriangle className="w-4 h-4 text-primary" /> Principais Desafios
                    </h4>
                    <ul className="space-y-2 pl-6">
                      {p.challenges.map((challenge: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                          <span className="leading-snug">{challenge}</span>
                        </li>
                      ))}
                    </ul>
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