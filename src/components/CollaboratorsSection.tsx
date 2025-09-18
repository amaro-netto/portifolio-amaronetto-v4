// src/components/CollaboratorsSection.tsx (versão final, dinâmica)

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Mail, Building, Users } from 'lucide-react';

// 1. Função que busca os colaboradores no Supabase
const fetchCollaborators = async () => {
  const { data, error } = await supabase
    .from('collaborators')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};


const CollaboratorsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // 2. Usando o useQuery para buscar os dados dos colaboradores
  const { data: collaborators, isLoading, error } = useQuery({
    queryKey: ['collaborators'],
    queryFn: fetchCollaborators,
  });

  const itemsPerPage = 4;
  const totalPages = collaborators ? Math.ceil(collaborators.length / itemsPerPage) : 0;
  const startIndex = currentIndex * itemsPerPage;
  const visibleCollaborators = collaborators ? collaborators.slice(startIndex, startIndex + itemsPerPage) : [];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setFlippedCard(null);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setFlippedCard(null);
  };

  const handleCardClick = (collaboratorId: number) => {
    setFlippedCard(flippedCard === collaboratorId ? null : collaboratorId);
  };

  const openSocialLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <section id="colaboradores" className="section-snap bg-background">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="text-left mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            COLABORADORES E <span className="text-primary">PARCEIROS</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça os profissionais com quem trabalho. Juntos, criamos soluções que fazem a diferença.
          </p>
        </div>

        <div className="relative">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" size="sm" onClick={goToPrev} disabled={totalPages <= 1} className="focus-ring">
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="font-medium">{String(currentIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
            </div>
            <Button variant="outline" size="sm" onClick={goToNext} disabled={totalPages <= 1} className="focus-ring">
              Próximo <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* 3. Lógica para Loading e Erro */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[480px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="h-[450px]">
                  <CardContent className="p-0 h-full flex flex-col">
                    <Skeleton className="w-full h-full rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {error && <p className="text-destructive">Não foi possível carregar os colaboradores.</p>}

          {/* Grid de Colaboradores (renderiza quando os dados chegam) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[480px]">
            {visibleCollaborators && visibleCollaborators.map((collaborator) => (
              <div key={collaborator.id} className="perspective-1000 h-[450px]">
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                    flippedCard === collaborator.id ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => handleCardClick(collaborator.id)}
                >
                  {/* Front Card */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden border-0 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardContent className="p-0 h-full">
                      <div className="relative w-full h-full">
                        <img
                          src={collaborator.image_url}
                          alt={collaborator.name}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                          <div className="text-white">
                            <h3 className="font-semibold text-lg drop-shadow-md">{collaborator.name}</h3>
                            <p className="text-primary font-medium text-sm drop-shadow-md">{collaborator.subtitle}</p>
                            <div className="flex items-center text-sm text-white/80 mt-2 drop-shadow-md">
                              <Building className="h-4 w-4 mr-1.5" />
                              {collaborator.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Back Card */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-0 bg-primary/5 backdrop-blur-sm">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Conteúdo do verso do card continua o mesmo, usando a variável 'collaborator' */}
                      <div className="flex-1 space-y-4">
                         {/* ... (código do verso do card que você já tem) ... */}
                      </div>
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-center space-x-3">
                          {/* ... (botões de redes sociais que você já tem) ... */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setFlippedCard(null);
                }}
                className={`w-2 h-2 rounded-full transition-colors focus-ring ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;