import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import {
    Clock,
    MapPin,
    MessageCircle,
    Send,
    Loader2,
    Mail,
    CheckCircle2,
    Phone,
    Instagram,
    Facebook,
    Github,
    Linkedin,
} from 'lucide-react';
import Footer from './Footer';

const formSchema = z.object({
    name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
    email: z.string().email({ message: 'Insira um e-mail válido.' }),
    subject: z.string().min(5, { message: 'O assunto deve ter pelo menos 5 caracteres.' }),
    message: z.string().min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }),
});

const layoutPresets = {
    mobile: { width: 420, height: 940 },
    tablet: { width: 940, height: 700 },
    desktop: { width: 1240, height: 700 },
} as const;

type LayoutMode = keyof typeof layoutPresets;

const ContactSection = () => {
    const { toast } = useToast();
    const stageRef = useRef<HTMLDivElement | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('desktop');
    const [sectionLayout, setSectionLayout] = useState({
        width: layoutPresets.desktop.width,
        height: layoutPresets.desktop.height,
        scale: 1,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    useEffect(() => {
        const calculateLayout = () => {
            const viewportWidth = window.innerWidth;
            const nextMode: LayoutMode = viewportWidth < 768 ? 'mobile' : viewportWidth < 1100 ? 'tablet' : 'desktop';
            const preset = layoutPresets[nextMode];
            const stage = stageRef.current;

            const availableWidth = Math.max(stage?.clientWidth ?? viewportWidth - 24, 320);
            const availableHeight = Math.max(stage?.clientHeight ?? window.innerHeight - 160, 360);
            const nextScale = Math.min(availableWidth / preset.width, availableHeight / preset.height, 1);

            setLayoutMode(nextMode);
            setSectionLayout({
                width: preset.width,
                height: preset.height,
                scale: Math.max(nextScale, 0.52),
            });
        };

        calculateLayout();
        window.addEventListener('resize', calculateLayout);

        const observer = typeof ResizeObserver !== 'undefined' && stageRef.current
            ? new ResizeObserver(calculateLayout)
            : null;

        if (observer && stageRef.current) {
            observer.observe(stageRef.current);
        }

        return () => {
            window.removeEventListener('resize', calculateLayout);
            observer?.disconnect();
        };
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(values);
        setIsSubmitting(false);
        setIsSuccess(true);
        toast({
            title: 'Mensagem enviada!',
            description: 'Obrigado pelo contato. Retornarei em breve.',
            variant: 'default',
        });
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
    }

    const socialLinks = [
        { icon: Phone, label: 'WhatsApp', url: 'https://wa.me/5521964039120' },
        { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/ti.amaronetto' },
        { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/people/Amaro-Netto-Solu%C3%A7%C3%B5es/61578435551178/' },
        { icon: Github, label: 'GitHub', url: 'https://github.com/amaro-netto' },
        { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/amarosilvanetto' },
    ];

    const isMobile = layoutMode === 'mobile';
    const isTablet = layoutMode === 'tablet';
    const stackLayout = isMobile;

    const inputClassName = 'h-12 rounded-[16px] border border-[#D5D9DC] bg-white text-[#15181C] placeholder:text-[#15181C]/40 shadow-none focus-visible:ring-2 focus-visible:ring-[#0D2439]/25 focus-visible:ring-offset-0';
    const textareaClassName = 'resize-none rounded-[20px] border border-[#D5D9DC] bg-white text-[#15181C] placeholder:text-[#15181C]/40 shadow-none focus-visible:ring-2 focus-visible:ring-[#0D2439]/25 focus-visible:ring-offset-0';

    return (
        <section
            id="contato"
            className="section-snap flex h-[100svh] flex-col overflow-hidden border-t border-white/10 bg-[#0D2439] scroll-mt-16"
        >
            <div ref={stageRef} className="min-h-0 flex-1 overflow-hidden px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
                <div className="flex h-full w-full items-center justify-center overflow-hidden">
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
                                <div className="animate-in slide-in-from-bottom-5 fade-in duration-700 text-center lg:text-left">
                                    <p className="mb-4 text-[16px] font-semibold uppercase tracking-[0.26em] text-[#D5D9DC]">
                                        ENTRE EM CONTATO
                                    </p>
                                    <h2 className={`font-display font-bold leading-[0.96] text-white ${isMobile ? 'text-[44px]' : isTablet ? 'text-[48px]' : 'text-[54px]'}`}>
                                        VAMOS <span className="text-[#D5D9DC]">CONVERSAR?</span>
                                    </h2>
                                    <p className={`mx-auto mt-4 max-w-[820px] text-[#D5D9DC] lg:mx-0 ${isMobile ? 'text-[15px] leading-[1.45]' : 'text-[18px] leading-[1.5]'}`}>
                                        Tem um projeto em mente ou quer apenas trocar uma ideia? Preencha o formulário ou me chame nas redes. Tudo foi ajustado para caber com harmonia dentro da tela.
                                    </p>
                                </div>

                                <div className={`mt-6 grid min-h-0 flex-1 gap-6 ${stackLayout ? 'grid-cols-1' : 'grid-cols-12'}`}>
                                    <div className={`${stackLayout ? '' : 'col-span-5'} flex h-full min-h-0 flex-col gap-4`}>
                                        <div className="grid gap-3">
                                            <Card className="rounded-[28px] border border-[#D5D9DC] bg-[#F4F5F7] text-[#15181C] shadow-[0_18px_48px_rgba(13,36,57,0.16)]">
                                                <CardContent className="flex items-start gap-4 p-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-[#D5D9DC] bg-white text-[#0D2439]">
                                                        <Mail className="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-[16px] font-semibold text-[#15181C]">Email Direto</h4>
                                                        <a
                                                            href="mailto:ti.amaronetto@gmail.com"
                                                            className="mt-1 block truncate text-[14px] text-[#15181C]/70 transition-colors hover:text-[#0D2439]"
                                                        >
                                                            ti.amaronetto@gmail.com
                                                        </a>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card className="rounded-[28px] border border-[#D5D9DC] bg-[#F4F5F7] text-[#15181C] shadow-[0_18px_48px_rgba(13,36,57,0.16)]">
                                                <CardContent className="flex items-start gap-4 p-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-[#D5D9DC] bg-white text-[#0D2439]">
                                                        <Clock className="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[16px] font-semibold text-[#15181C]">Horário</h4>
                                                        <p className="mt-1 text-[14px] text-[#15181C]/70">Seg - Sex: 09h às 18h</p>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card className="rounded-[28px] border border-[#D5D9DC] bg-[#F4F5F7] text-[#15181C] shadow-[0_18px_48px_rgba(13,36,57,0.16)]">
                                                <CardContent className="flex items-start gap-4 p-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-[#D5D9DC] bg-white text-[#0D2439]">
                                                        <MapPin className="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[16px] font-semibold text-[#15181C]">Localização</h4>
                                                        <p className="mt-1 text-[14px] text-[#15181C]/70">Rio de Janeiro, RJ (Remoto Global)</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <Card className="flex min-h-0 flex-1 overflow-visible rounded-[30px] border border-[#D5D9DC] bg-[#F4F5F7] text-[#15181C] shadow-[0_18px_48px_rgba(13,36,57,0.16)]">
                                            <CardContent className="flex h-full min-h-0 flex-col p-5 pb-5">
                                                <h3 className="mb-3 flex items-center gap-2 text-[18px] font-semibold text-[#15181C]">
                                                    <MessageCircle className="h-5 w-5 text-[#0D2439]" aria-hidden="true" />
                                                    Redes Sociais
                                                </h3>
                                                <p className="text-[14px] leading-[1.55] text-[#15181C]/68">
                                                    Prefere falar por outro canal? Escolha a rede que for melhor para você.
                                                </p>
                                                <div className="mt-4">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        {socialLinks.map((social, index) => {
                                                            const Icon = social.icon;
                                                            return (
                                                                <a
                                                                    key={index}
                                                                    href={social.url}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#D5D9DC] bg-[#F4F5F7] text-[#0D2439] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-[#0D2439]/20 hover:bg-[#0D2439] hover:text-white hover:shadow-[0_12px_22px_rgba(13,36,57,0.18)]"
                                                                    title={social.label}
                                                                    aria-label={`Ir para ${social.label}`}
                                                                >
                                                                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                                                                </a>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className={stackLayout ? 'min-h-0' : 'col-span-7 min-h-0'}>
                                        <Card className="h-full rounded-[32px] border border-[#D5D9DC] bg-[#F4F5F7] text-[#15181C] shadow-[0_24px_60px_rgba(13,36,57,0.18)]">
                                            <CardContent className={`h-full ${isMobile ? 'p-5' : 'p-7 md:p-8'}`}>
                                                {isSuccess ? (
                                                    <div
                                                        className={`flex h-full min-h-0 flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 ${isMobile ? 'px-4' : 'px-8'}`}
                                                        role="alert"
                                                    >
                                                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0D2439]/10 text-[#0D2439]">
                                                            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                                                        </div>
                                                        <h3 className="text-[30px] font-bold leading-none text-[#15181C]">Mensagem Enviada!</h3>
                                                        <p className="mt-3 max-w-[420px] text-[16px] leading-[1.6] text-[#15181C]/68">
                                                            Sua mensagem já está comigo. Responderei o mais breve possível no e-mail informado.
                                                        </p>
                                                        <Button
                                                            variant="outline"
                                                            className="mt-7 h-11 rounded-full border-[#D5D9DC] bg-white px-6 text-[#15181C] hover:bg-[#15181C] hover:text-white"
                                                            onClick={() => setIsSuccess(false)}
                                                        >
                                                            Enviar outra mensagem
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full min-h-0 flex-col gap-4">
                                                            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                                                <FormField
                                                                    control={form.control}
                                                                    name="name"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0D2439]/72">
                                                                                Nome
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="Seu nome" {...field} className={inputClassName} />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="email"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0D2439]/72">
                                                                                E-mail
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="seu@email.com" {...field} className={inputClassName} />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>

                                                            <FormField
                                                                control={form.control}
                                                                name="subject"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0D2439]/72">
                                                                            Assunto
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="Sobre o que vamos falar?" {...field} className={inputClassName} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="message"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex min-h-0 flex-1 flex-col">
                                                                        <FormLabel className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0D2439]/72">
                                                                            Mensagem
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                placeholder="Conte-me os detalhes do seu projeto..."
                                                                                className={`${textareaClassName} mt-1 min-h-0 flex-1 ${isMobile ? 'min-h-[150px]' : 'min-h-[170px]'}`}
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <Button
                                                                type="submit"
                                                                className="mt-1 h-12 w-full shrink-0 rounded-full bg-[#0D2439] text-[15px] font-semibold text-white shadow-[0_16px_35px_rgba(13,36,57,0.28)] transition-all duration-300 hover:bg-[#15181C] hover:shadow-[0_22px_42px_rgba(21,24,28,0.26)]"
                                                                disabled={isSubmitting}
                                                            >
                                                                {isSubmitting ? (
                                                                    <>
                                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                                                                        Enviando...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Enviar Mensagem
                                                                        <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </form>
                                                    </Form>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shrink-0">
                <Footer />
            </div>
        </section>
    );
};

export default ContactSection;