import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Alterado para w-full e bg-transparent/backdrop para integrar melhor
    <footer className="w-full py-6 mt-auto border-t border-border/4 bg-background/20 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground text-center">
            © {currentYear} Amaro Netto Soluções. <br className="md:hidden" /> Todos os direitos reservados.
          </div>
          </div>
    </footer>
  );
};

export default Footer;