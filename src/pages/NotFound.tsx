import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.location.href = "/"}
            className="flex items-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Voltar ao Início</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Página Anterior</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
