import { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import Footer from './Footer'; // IMPORTANTE: Importar o Footer aqui

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
  subject: z.string().min(5, { message: "O assunto deve ter pelo menos 5 caracteres." }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." }),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo contato. Retornarei em breve.",
      variant: "default",
    });
    form.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  }

  const socialLinks = [
    { iconSrc: '/icons/whatsapp.svg', label: 'WhatsApp', url: 'https://wa.me/5521964039120' },
    { iconSrc: '/icons/instagram.svg', label: 'Instagram', url: 'https://instagram.com/ti.amaronetto' },
    { iconSrc: '/icons/facebook.svg', label: 'Facebook', url: 'https://www.facebook.com/people/Amaro-Netto-Solu%C3%A7%C3%B5es/61578435551178/' },
    { iconSrc: '/icons/github.svg', label: 'GitHub', url: 'https://github.com/amaro-netto' },
    { iconSrc: '/icons/linkedin.svg', label: 'LinkedIn', url: 'https://linkedin.com/in/amarosilvanetto' },
  ];

  return (
    // AJUSTE: flex flex-col para controlar o layout vertical e min-h-screen
    <section id="contato" className="section-snap bg-background pt-20 border-t border-border/30 scroll-mt-10 flex flex-col min-h-screen">
      
      {/* Container do Conteúdo Principal (grow para ocupar o espaço) */}
      <div className="container mx-auto px-4 flex-grow flex flex-col justify-center pb-20">
        
        <div className="text-center mb-12 animate-in slide-in-from-bottom-5 fade-in duration-700">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
             VAMOS <span className="text-primary">CONVERSAR?</span>
           </h2>
           <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
             Tem um projeto em mente ou quer apenas trocar uma ideia? Preencha o formulário ou me chame nas redes.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- COLUNA ESQUERDA --- */}
          <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
                <div className="grid gap-4">
                    <Card className="border-border/40 bg-card/50 shadow-sm hover:border-primary/30 transition-colors">
                        <CardContent className="p-5 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Mail className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h4 className="font-medium text-base text-foreground">Email Direto</h4>
                                <a href="mailto:ti.amaronetto@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    ti.amaronetto@gmail.com
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50 shadow-sm hover:border-primary/30 transition-colors">
                        <CardContent className="p-5 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Clock className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h4 className="font-medium text-base text-foreground">Horário</h4>
                                <p className="text-sm text-muted-foreground">Seg - Sex: 09h às 18h</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50 shadow-sm hover:border-primary/30 transition-colors">
                        <CardContent className="p-5 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <MapPin className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h4 className="font-medium text-base text-foreground">Localização</h4>
                                <p className="text-sm text-muted-foreground">Rio de Janeiro, RJ (Remoto Global)</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-4">
                       <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" /> Redes Sociais
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((social, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 rounded-xl bg-secondary/30 hover:bg-primary/10 hover:scale-110 transition-all border border-transparent hover:border-primary/20 group"
                            onClick={() => window.open(social.url, '_blank')}
                            title={social.label}
                            aria-label={`Ir para ${social.label}`}
                        >
                            <img 
                              src={social.iconSrc} 
                              alt=""
                              className="h-6 w-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                              aria-hidden="true"
                            />
                        </Button>
                        ))}
                    </div>
                </div>
          </div>

          {/* --- COLUNA DIREITA (FORMULÁRIO) --- */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Card className="border-border/40 bg-card shadow-lg">
                <CardContent className="p-6 md:p-8">
                    {isSuccess ? (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95" role="alert">
                            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Mensagem Enviada!</h3>
                            <p className="text-muted-foreground max-w-xs">
                                Sua mensagem já está comigo. Responderei o mais breve possível no e-mail informado.
                            </p>
                            <Button 
                                variant="outline" 
                                className="mt-6" 
                                onClick={() => setIsSuccess(false)}
                            >
                                Enviar outra mensagem
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Seu nome" {...field} className="bg-secondary/20 border-border/50" />
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
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="seu@email.com" {...field} className="bg-secondary/20 border-border/50" />
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
                                <FormLabel>Assunto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sobre o que vamos falar?" {...field} className="bg-secondary/20 border-border/50" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Mensagem</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Conte-me os detalhes do seu projeto..." 
                                        className="min-h-[150px] resize-none bg-secondary/20 border-border/50" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <Button 
                                type="submit" 
                                className="w-full h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
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
      
      {/* RODAPÉ INTEGRADO - Agora ele aparece no final desta seção */}
      <Footer />
      
    </section>
  );
};

export default ContactSection;