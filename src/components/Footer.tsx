import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Alterado para w-full e bg-transparent/backdrop para integrar melhor
    <footer className="w-full py-6 mt-auto border-t border-border/10 bg-background/20 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Amaro Netto Soluções. <br className="md:hidden" /> Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => window.open('https://github.com/amaro-netto', '_blank')}
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => window.open('https://linkedin.com/in/amarosilvanetto', '_blank')}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => window.open('mailto:ti.amaronetto@gmail.com', '_blank')}
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;