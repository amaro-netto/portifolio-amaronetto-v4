// src/pages/Admin.tsx (atualizado com a nova aba)

import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectManager from '@/components/admin/ProjectManager'; 
import CollaboratorManager from '@/components/admin/CollaboratorManager';
import ExperienceManager from '@/components/admin/ExperienceManager'; // 1. IMPORTE O NOVO GERENCIADOR

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
        <Button variant="outline" onClick={handleLogout}>Sair</Button>
      </header>

      <main>
        <Tabs defaultValue="projects" className="w-full">
          {/* 2. ATUALIZE A LISTA DE ABAS */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="collaborators">Colaboradores</TabsTrigger>
            <TabsTrigger value="experiences">Experiência</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6"><ProjectManager /></TabsContent>
          <TabsContent value="collaborators" className="mt-6"><CollaboratorManager /></TabsContent>

          {/* 3. ADICIONE O CONTEÚDO DA NOVA ABA */}
          <TabsContent value="experiences" className="mt-6"><ExperienceManager /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;