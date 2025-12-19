import { Button } from "@/components/ui/button";

export const SkipLink = () => {
  return (
    <Button
      asChild
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[110]"
    >
      <a href="#main-content">
        Pular para o conteúdo principal
      </a>
    </Button>
  );
};