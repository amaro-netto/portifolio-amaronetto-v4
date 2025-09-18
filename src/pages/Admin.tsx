// src/pages/Admin.tsx (versão final e completa)

import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Importa os componentes de gerenciamento de seus arquivos dedicados
import ProjectManager from '@/components/admin/ProjectManager'; 
import CollaboratorManager from '@/components/admin/CollaboratorManager';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie o conteúdo do seu portfólio.</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </header>

      <main>
        <Tabs defaultValue="projects" className="w-full">
        
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="collaborators">Colaboradores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="mt-6">
            <ProjectManager />
          </TabsContent>
          
          <TabsContent value="collaborators" className="mt-6">
            <CollaboratorManager />
          </TabsContent>
          
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;