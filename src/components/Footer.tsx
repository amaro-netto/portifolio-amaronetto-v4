import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Amaro Netto Portfolio. Todos os direitos reservados.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>em Rio de Janeiro, Brasil</span>
          </div>

          {/* Optional Links */}
          <div className="flex items-center space-x-6 text-sm">
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1"
              onClick={() => {
                // Placeholder for privacy policy modal or page
                console.log('Privacy Policy clicked');
              }}
            >
              Política de Privacidade
            </button>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1"
              onClick={() => {
                // Placeholder for terms modal or page
                console.log('Terms clicked');
              }}
            >
              Termos de Uso
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;