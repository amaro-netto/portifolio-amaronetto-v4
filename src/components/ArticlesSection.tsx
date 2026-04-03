import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BookOpen, Clock, Calendar, ChevronRight, ChevronLeft, Hash } from 'lucide-react';
import articlesData from '@/data/articles.json';

const ArticlesSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articlesData[0] | null>(null);
  
  // --- LÓGICA DE PAGINAÇÃO (Igual ao Portfólio) ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Ajusta quantidade de itens por tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(articlesData.length / itemsPerPage);
  const startIndex = currentIndex * itemsPerPage;
  const visibleArticles = articlesData.slice(startIndex, startIndex + itemsPerPage);

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

  return (
    <section id="artigos" className="section-snap bg-muted/20 scroll-mt-16 border-t border-border/30">
      <div className="container mx-auto px-4 py-12 md:py-16 xl:py-20 h-full">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <div className="text-left">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                    TECH <span className="text-primary">NOTES</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                    Compartilho aqui um pouco da minha visão técnica, desafios superados e boas práticas de desenvolvimento.
                </p>
            </div>
            {/* Botão "Ver todos" foi REMOVIDO aqui */}
        </div>

        <div className="relative">
             {/* Controles de Navegação (Igual ao Portfólio) */}
             <div className="flex items-center justify-between mb-8">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToPrev} 
                    disabled={totalPages <= 1} 
                    className="focus-ring hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Artigos anteriores"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" /> Anterior
                </Button>
                
                <div className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50 backdrop-blur-sm" role="status" aria-label={`Página ${currentIndex + 1} de ${totalPages}`}>
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
                    aria-label="Próximos artigos"
                >
                    Próximo <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
            </div>

            {/* Grid de Artigos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[350px]">
                {visibleArticles.map((article, idx) => (
                    <Card 
                        key={article.id} 
                        className="group hover:shadow-lg transition-all duration-300 border-border/60 bg-card flex flex-col cursor-pointer hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        onClick={() => setSelectedArticle(article)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Ler artigo: ${article.title}`}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedArticle(article)}
                        style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                    {article.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" aria-hidden="true" /> {article.readTime}
                                </span>
                            </div>
                            <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                {article.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                                <Calendar className="w-3 h-3" aria-hidden="true" /> {article.date}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                {article.excerpt}
                            </p>
                        </CardContent>
                        <CardFooter className="pt-0 border-t border-border/30 p-6 mt-auto">
                            <div className="flex items-center text-sm font-medium text-primary w-full group/link">
                                Ler artigo completo 
                                <ChevronRight className="w-4 h-4 ml-auto transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Paginação (Bolinhas) */}
            <div className="flex justify-center mt-10 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus-ring ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Ir para página de artigos ${index + 1}`}
                    aria-current={index === currentIndex ? "page" : undefined}
                />
                ))}
            </div>
        </div>

        {/* Modal de Leitura */}
        {selectedArticle && (
            <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
                <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
                    <DialogHeader className="p-6 md:p-8 pb-4 border-b border-border bg-muted/10 sticky top-0 z-10 backdrop-blur-md">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {selectedArticle.category}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="w-3 h-3" aria-hidden="true" /> {selectedArticle.readTime} leitura
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" aria-hidden="true" /> {selectedArticle.date}
                            </Badge>
                        </div>
                        <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight">
                            {selectedArticle.title}
                        </DialogTitle>
                        <DialogDescription className="text-base mt-2">
                            {selectedArticle.excerpt}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                        {/* Renderização segura do HTML do conteúdo */}
                        <div 
                            className="prose prose-zinc dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 
                            prose-p:leading-relaxed prose-p:mb-4 prose-p:text-muted-foreground
                            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono"
                            dangerouslySetInnerHTML={{ __html: selectedArticle.content }} 
                        />

                        <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-2">
                            {selectedArticle.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    <Hash className="w-3 h-3 mr-1 opacity-50" aria-hidden="true" /> {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
