import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import logoLight from '@/assets/logolight.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);

  // Detecta rolagem para mudar o fundo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu mobile se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen && 
        headerRef.current && 
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  // Lista de itens do menu atualizada
  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'artigos', label: 'Tech Notes' }, // Novo item da Fase 4
    { id: 'contato', label: 'Contato' },
  ];

  // Lógica de Cores Dinâmicas:
  // Se rolou ou menu aberto -> Usa cores do tema (foreground)
  // Se está no topo transparente -> Força branco (para contraste com o Hero)
  const isSolid = isScrolled || isMenuOpen;

  const textColorClass = isSolid 
    ? "text-muted-foreground hover:text-foreground" 
    : "text-white/90 hover:text-white";
    
  const logoColorClass = isSolid 
    ? "text-foreground" 
    : "text-white";
    
  const mobileButtonClass = isSolid 
    ? "text-foreground hover:bg-secondary/20" 
    : "text-white hover:bg-white/10";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        isSolid
          ? 'bg-background/95 backdrop-blur-md shadow-md border-border/40' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => scrollToSection('inicio')}
            className={`flex items-center gap-2 transition-colors rounded-lg group ${logoColorClass}`}
            aria-label="Ir para o início"
          >
            <img 
              src={logoLight} 
              alt="Amaro Netto Logo" 
              // Inverte a cor do logo SVG se estiver no topo (para ficar branco)
              // Se estiver no tema Dark, também inverte/ajusta conforme necessidade
              className={`h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${!isSolid ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert'}`} 
            />
            <span className="font-display text-xl font-bold">
              Amaro <span className="text-primary">Netto</span>
            </span>
          </button>

          <div className="flex items-center space-x-2">
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group ${textColorClass}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2"></span>
                </button>
              ))}
              
              {/* Botão Dark Mode (Desktop) */}
              <div className={`ml-2 ${!isSolid ? 'text-white' : ''}`}>
                <ModeToggle />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
               {/* Botão Dark Mode (Mobile) */}
               <div className={!isSolid ? 'text-white' : ''}>
                 <ModeToggle />
               </div>

              {/* Botão Hamburguer */}
              <Button
                variant="ghost"
                size="sm"
                className={`focus-ring ${mobileButtonClass}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-primary transition-transform rotate-90" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-2 pb-4 border-t border-border/50 animate-in slide-in-from-top-5 fade-in duration-300">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-md flex items-center justify-between group"
                >
                  {item.label}
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;