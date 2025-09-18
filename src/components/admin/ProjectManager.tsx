// src/components/admin/ProjectManager.tsx (versão final)

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { ProjectForm } from './ProjectForm'; // Importamos nosso novo formulário

const fetchProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const ProjectManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<any | null>(null);

  const { data: projects, isLoading, error } = useQuery({ 
    queryKey: ['projects'], 
    queryFn: fetchProjects 
  });

  const deleteMutation = useMutation({
    mutationFn: async (projectId: number) => {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Projeto excluído." });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  const handleAddNew = () => {
    setProjectToEdit(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: any) => {
    setProjectToEdit(project);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projetos</CardTitle>
            <CardDescription>Adicione, edite ou remova projetos.</CardDescription>
          </div>
          <Button onClick={handleAddNew}>Adicionar Novo Projeto</Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Lógica de Loading e Erro */}
        {isLoading && <p>Carregando projetos...</p>}
        {error && <p className="text-destructive">Erro ao carregar projetos: {error.message}</p>}

        {/* Tabela de Projetos */}
        {projects && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>Editar</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Excluir</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá deletar permanentemente o projeto.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteMutation.mutate(project.id)}>
                            Sim, excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Modal (Dialog) para Adicionar/Editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{projectToEdit ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</DialogTitle>
          </DialogHeader>
          <ProjectForm 
            projectToEdit={projectToEdit} 
            onFinished={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProjectManager;