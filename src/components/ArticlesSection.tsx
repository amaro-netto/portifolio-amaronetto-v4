import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    BookOpen,
    Briefcase,
    Calendar,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock,
    Coffee,
    Flag,
    Globe2,
    Hash,
    Lightbulb,
    MessageSquareText,
    TrendingUp,
    type LucideIcon,
} from 'lucide-react';
import articlesData from '@/data/articles.json';

type Article = (typeof articlesData)[number];

type CanvasSize = {
    width: number;
    height: number;
};

const canvasByItems: Record<number, CanvasSize> = {
    1: { width: 460, height: 920 },
    2: { width: 980, height: 900 },
    3: { width: 1380, height: 860 },
};

const accentThemes = [
    'from-amber-300 via-amber-400 to-yellow-500',
    'from-orange-300 via-orange-400 to-red-500',
    'from-stone-400 via-stone-500 to-amber-900',
    'from-lime-400 via-green-500 to-emerald-600',
    'from-cyan-300 via-sky-400 to-cyan-500',
    'from-blue-500 via-blue-600 to-sky-700',
    'from-slate-400 via-slate-500 to-indigo-300',
    'from-violet-500 via-purple-500 to-fuchsia-500',
    'from-pink-400 via-fuchsia-500 to-pink-500',
] as const;

const articleIcons: LucideIcon[] = [
    BookOpen,
    MessageSquareText,
    Flag,
    Globe2,
    CalendarDays,
    Lightbulb,
    Coffee,
    Briefcase,
    TrendingUp,
];

const ArticlesSection = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>(canvasByItems[3]);
    const [sectionScale, setSectionScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            let nextItemsPerPage = 3;

            if (window.innerWidth < 768) {
                nextItemsPerPage = 1;
            } else if (window.innerWidth < 1024) {
                nextItemsPerPage = 2;
            }

            const nextCanvasSize = canvasByItems[nextItemsPerPage];
            const horizontalPadding = window.innerWidth < 640 ? 28 : 56;
            const verticalPadding = window.innerWidth < 768 ? 138 : 158;
            const availableWidth = Math.max(window.innerWidth - horizontalPadding, 320);
            const availableHeight = Math.max(window.innerHeight - verticalPadding, 500);
            const nextScale = Math.min(
                availableWidth / nextCanvasSize.width,
                availableHeight / nextCanvasSize.height,
                1,
            );

            setItemsPerPage(nextItemsPerPage);
            setCanvasSize(nextCanvasSize);
            setSectionScale(nextScale);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(articlesData.length / itemsPerPage);

    useEffect(() => {
        if (currentIndex > totalPages - 1) {
            setCurrentIndex(0);
        }
    }, [currentIndex, totalPages]);

    const startIndex = currentIndex * itemsPerPage;
    const visibleArticles = useMemo(
        () => articlesData.slice(startIndex, startIndex + itemsPerPage),
        [startIndex, itemsPerPage],
    );

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
        <section
            id="artigos"
            className="section-snap min-h-[100svh] overflow-hidden border-t border-border/30 bg-muted/20 scroll-mt-16"
        >
            <div className="mx-auto flex h-[100svh] max-w-[1600px] items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
                <div
                    className="relative shrink-0"
                    style={{
                        width: canvasSize.width * sectionScale,
                        height: canvasSize.height * sectionScale,
                    }}
                >
                    <div
                        className="absolute left-0 top-0 flex flex-col text-left"
                        style={{
                            width: canvasSize.width,
                            height: canvasSize.height,
                            transform: `scale(${sectionScale})`,
                            transformOrigin: 'top left',
                        }}
                    >
                        <div className="mb-10 animate-in slide-in-from-bottom-5 fade-in duration-700">
                            <p className="mb-4 text-[18px] font-semibold uppercase tracking-[0.22em] text-primary/90">
                                Tech Notes
                            </p>
                            <h2 className="max-w-4xl text-[52px] font-bold leading-[0.96] tracking-[-0.05em] text-foreground">
                                Artigos, aprendizados e notas técnicas.
                            </h2>
                            <p className="mt-5 max-w-3xl text-[20px] leading-8 text-muted-foreground">
                                Compartilho aqui parte da minha visão técnica, decisões de arquitetura, desafios reais e boas práticas que fui refinando ao longo dos projetos.
                            </p>
                        </div>

                        <div className="mb-8 flex items-center justify-between">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={goToPrev}
                                disabled={totalPages <= 1}
                                className="h-12 rounded-full border-border/60 px-5 text-[15px] font-medium shadow-sm transition-colors hover:bg-primary/10 hover:text-primary"
                                aria-label="Artigos anteriores"
                            >
                                <ChevronLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
                                Anterior
                            </Button>

                            <div
                                className="rounded-full border border-border/50 bg-background/70 px-4 py-2 text-[15px] text-muted-foreground backdrop-blur-sm"
                                role="status"
                                aria-label={`Página ${currentIndex + 1} de ${totalPages}`}
                            >
                                <span className="font-semibold text-primary">{String(currentIndex + 1).padStart(2, '0')}</span>
                                <span className="mx-1.5 opacity-50">/</span>
                                <span>{String(totalPages).padStart(2, '0')}</span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={goToNext}
                                disabled={totalPages <= 1}
                                className="h-12 rounded-full border-border/60 px-5 text-[15px] font-medium shadow-sm transition-colors hover:bg-primary/10 hover:text-primary"
                                aria-label="Próximos artigos"
                            >
                                Próximo
                                <ChevronRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                            </Button>
                        </div>

                        <div
                            className={`grid flex-1 gap-7 ${itemsPerPage === 1 ? 'grid-cols-1' : itemsPerPage === 2 ? 'grid-cols-2' : 'grid-cols-3'
                                }`}
                        >
                            {visibleArticles.map((article, idx) => {
                                const theme = accentThemes[(startIndex + idx) % accentThemes.length];
                                const ArticleIcon = articleIcons[(startIndex + idx) % articleIcons.length];
                                const articleNumber = String(startIndex + idx + 1).padStart(2, '0');

                                return (
                                    <button
                                        key={article.id}
                                        type="button"
                                        onClick={() => setSelectedArticle(article)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                setSelectedArticle(article);
                                            }
                                        }}
                                        className="group h-full rounded-[30px] text-left outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary"
                                        aria-label={`Ler artigo: ${article.title}`}
                                        style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                                    >
                                        <div className="flex h-full overflow-hidden rounded-[30px] border border-white/90 bg-[#F6F7F9] text-slate-900 shadow-[0_22px_55px_rgba(15,23,42,0.18)]">
                                            <div className="flex min-w-0 flex-1 flex-col px-7 py-7">
                                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm">
                                                    <ArticleIcon className="h-5 w-5" aria-hidden="true" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                                                        {article.category}
                                                    </p>
                                                    <h3 className="mt-3 line-clamp-2 text-[31px] font-semibold leading-[1.02] tracking-[-0.045em] text-slate-900">
                                                        {article.title}
                                                    </h3>
                                                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-slate-500">
                                                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                                            {article.readTime}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                                            {article.date}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="mt-6 line-clamp-5 text-[15px] leading-7 text-slate-600">
                                                    {article.excerpt}
                                                </p>

                                                <div className="mt-auto pt-7">
                                                    <span className="inline-flex h-11 items-center gap-2 rounded-full bg-slate-900 px-5 text-[14px] font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                                                        Visualizar
                                                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={`flex w-[58px] shrink-0 flex-col justify-between bg-gradient-to-b ${theme} px-3 py-4 text-white`}>
                                                <span className="ml-auto text-[24px] font-semibold leading-none tracking-[-0.04em]">
                                                    {articleNumber}
                                                </span>
                                                <span
                                                    className="self-center text-[10px] uppercase tracking-[0.24em] text-white/80"
                                                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                                >
                                                    notes
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex justify-center gap-2.5">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${index === currentIndex ? 'w-10 bg-primary' : 'w-2.5 bg-muted-foreground/30 hover:bg-primary/50'
                                        }`}
                                    aria-label={`Ir para página de artigos ${index + 1}`}
                                    aria-current={index === currentIndex ? 'page' : undefined}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {selectedArticle && (
                <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
                    <DialogContent className="w-[97vw] max-w-[1600px] h-[94vh] max-h-[94vh] overflow-hidden rounded-xl border border-border/60 bg-background p-0 shadow-2xl">
                        <div className="flex h-full flex-col">
                            <DialogHeader className="sticky top-0 z-10 border-b border-border bg-background/95 p-6 pb-4 backdrop-blur-md md:p-8 md:pb-5">
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                                        {selectedArticle.category}
                                    </Badge>
                                    <Badge variant="outline" className="flex items-center gap-1.5">
                                        <Clock className="h-3 w-3" aria-hidden="true" />
                                        {selectedArticle.readTime} leitura
                                    </Badge>
                                    <Badge variant="outline" className="flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3" aria-hidden="true" />
                                        {selectedArticle.date}
                                    </Badge>
                                </div>
                                <DialogTitle className="text-2xl font-bold leading-tight md:text-3xl xl:text-4xl">
                                    {selectedArticle.title}
                                </DialogTitle>
                                <DialogDescription className="mt-3 max-w-4xl text-base leading-7 text-muted-foreground md:text-lg">
                                    {selectedArticle.excerpt}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-8 xl:p-10">
                                <div
                                    className="prose prose-zinc dark:prose-invert max-w-none
                  prose-headings:font-bold prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-xl
                  prose-p:mb-4 prose-p:leading-relaxed prose-p:text-muted-foreground
                  prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono"
                                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                                />

                                <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                                    {selectedArticle.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            <Hash className="mr-1 h-3 w-3 opacity-50" aria-hidden="true" />
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </section>
    );
};

export default ArticlesSection;
