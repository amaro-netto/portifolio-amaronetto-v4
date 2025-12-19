import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BookOpen, Clock, Calendar, ChevronRight, ArrowRight, Hash } from 'lucide-react';
import articlesData from '@/data/articles.json';

const ArticlesSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articlesData[0] | null>(null);

  return (
    <section id="artigos" className="section-snap bg-muted/20 scroll-mt-16 border-t border-border/30">
      <div className="container mx-auto px-4 py-20 h-full">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <div className="text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    TECH <span className="text-primary">NOTES</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Compartilho aqui um pouco da minha visão técnica, desafios superados e boas práticas de desenvolvimento.
                </p>
            </div>
            <Button variant="ghost" className="hidden md:flex group">
                Ver todos os artigos <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData.map((article, idx) => (
                <Card 
                    key={article.id} 
                    className="group hover:shadow-lg transition-all duration-300 border-border/60 bg-card flex flex-col cursor-pointer hover:-translate-y-1"
                    onClick={() => setSelectedArticle(article)}
                >
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                {article.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {article.readTime}
                            </span>
                        </div>
                        <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3" /> {article.date}
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
                            <ChevronRight className="w-4 h-4 ml-auto transition-transform group-hover/link:translate-x-1" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
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
                                <Clock className="w-3 h-3" /> {selectedArticle.readTime} leitura
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {selectedArticle.date}
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
                                    <Hash className="w-3 h-3 mr-1 opacity-50" /> {tag}
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