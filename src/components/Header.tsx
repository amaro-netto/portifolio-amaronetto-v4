import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoLight from '@/assets/logolight.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Referência para detectar cliques dentro do header
  const headerRef = useRef<HTMLElement>(null);

  // Efeito para detectar Scroll (muda a cor do header)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para fechar o menu ao clicar fora dele
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

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'colaboradores', label: 'Colaboradores' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || isMenuOpen
          ? 'bg-background/80 backdrop-blur-md shadow-md border-border/40' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('inicio')}
            className="flex items-center gap-2 text-foreground transition-colors rounded-lg group"
            aria-label="Ir para o início"
          >
            <img 
              src={logoLight} 
              alt="Amaro Netto Logo" 
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
            />
            <span className="font-display text-xl font-bold text-foreground">
              Amaro <span className="text-primary">Netto</span>
            </span>
          </button>

          {/* Desktop Navigation & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {item.label}
                  {/* Linha animada abaixo do link */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden focus-ring hover:bg-primary/10"
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