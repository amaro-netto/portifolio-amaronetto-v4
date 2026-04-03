import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import logoLight from '@/assets/logolight.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 72);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { id: 'experiencia', label: 'Experiência' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'artigos', label: 'Tech Notes' },
    { id: 'contato', label: 'Contato' },
  ];

  const desktopLinkClass = 'relative px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white group';

  if (!isScrolled) {
    return (
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-transparent transition-all duration-300"
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('inicio')}
              className="flex items-center gap-2 rounded-lg text-white transition-colors group"
              aria-label="Ir para o início"
            >
              <img
                src={logoLight}
                alt="Amaro Netto Logo"
                className="h-8 w-8 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-display text-xl font-bold">
                Amaro <span className="text-primary">Netto</span>
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={desktopLinkClass}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-1/2" />
                  </button>
                ))}

                <div className="ml-2 text-white">
                  <ModeToggle />
                </div>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <div className="text-white">
                  <ModeToggle />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="focus-ring text-white hover:bg-white/10"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
                  aria-expanded={isMenuOpen}
                  aria-controls="top-navigation-menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-primary transition-transform rotate-90" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div
              id="top-navigation-menu"
              className="md:hidden mt-4 rounded-2xl border border-white/10 bg-background/95 pt-2 pb-4 shadow-xl backdrop-blur-md animate-in slide-in-from-top-5 fade-in duration-300"
            >
              <div className="flex flex-col space-y-1 px-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-between rounded-md px-4 py-3 text-left text-base font-medium text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary"
                  >
                    {item.label}
                    <span className="text-primary">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    );
  }

  return (
    <header
      ref={headerRef}
      className="fixed right-4 z-50"
      style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/88 p-2 shadow-xl backdrop-blur-xl">
        <button
          onClick={() => scrollToSection('inicio')}
          className="hidden h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-primary/10 sm:flex"
          aria-label="Ir para o início"
        >
          <img
            src={logoLight}
            alt="Amaro Netto Logo"
            className="h-6 w-6 dark:brightness-0 dark:invert"
          />
        </button>

        <div className="text-foreground">
          <ModeToggle />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="focus-ring h-10 w-10 rounded-xl p-0 text-foreground hover:bg-primary/10 hover:text-primary"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={isMenuOpen}
          aria-controls="floating-navigation-menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-primary transition-transform rotate-90" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {isMenuOpen && (
        <div
          id="floating-navigation-menu"
          className="absolute right-0 mt-3 overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-3 fade-in duration-300"
          style={{ width: 'min(20rem, calc(100vw - 2rem))' }}
        >
          <div className="border-b border-border/50 px-4 py-4">
            <button
              onClick={() => scrollToSection('inicio')}
              className="flex items-center gap-3 rounded-lg text-left transition-colors hover:text-primary"
            >
              <img
                src={logoLight}
                alt="Amaro Netto Logo"
                className="h-8 w-8 dark:brightness-0 dark:invert"
              />
              <div>
                <div className="font-display text-base font-semibold text-foreground">
                  Amaro <span className="text-primary">Netto</span>
                </div>
                <div className="text-xs text-muted-foreground">Navegação rápida</div>
              </div>
            </button>
          </div>

          <div className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-all hover:bg-primary/8 hover:text-primary"
              >
                <span>{item.label}</span>
                <span className="text-primary">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
