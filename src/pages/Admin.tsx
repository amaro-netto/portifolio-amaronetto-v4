import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Layers, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectManager from '@/components/admin/ProjectManager'; 
import CollaboratorManager from '@/components/admin/CollaboratorManager';
import ExperienceManager from '@/components/admin/ExperienceManager';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground hidden md:block">Painel Administrativo</h1>
              <p className="text-xs text-muted-foreground hidden md:block">Gerencie seu portfólio localmente</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10">
              <Home className="h-4 w-4" />
              Voltar ao Site
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-8">
          <div className="flex items-center justify-between border-b pb-6">
            <TabsList className="grid w-full max-w-[500px] grid-cols-3">
              <TabsTrigger value="projects" className="gap-2">
                <Layers className="h-4 w-4" /> Projetos
              </TabsTrigger>
              <TabsTrigger value="collaborators" className="gap-2">
                <Users className="h-4 w-4" /> Colaboradores
              </TabsTrigger>
              <TabsTrigger value="experiences" className="gap-2">
                <Briefcase className="h-4 w-4" /> Experiência
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="projects" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
            <ProjectManager />
          </TabsContent>
          
          <TabsContent value="collaborators" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
            <CollaboratorManager />
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
            <ExperienceManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;