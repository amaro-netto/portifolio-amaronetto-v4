// src/components/admin/CollaboratorManager.tsx

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { CollaboratorForm } from './CollaboratorForm';
import { Skeleton } from '@/components/ui/skeleton';

const fetchCollaborators = async () => {
  const { data, error } = await supabase.from('collaborators').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const CollaboratorManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<any | null>(null);

  const { data: collaborators, isLoading, error } = useQuery({ 
    queryKey: ['collaborators'], 
    queryFn: fetchCollaborators 
  });

  const deleteMutation = useMutation({
    mutationFn: async (collaboratorId: number) => {
      const { error } = await supabase.from('collaborators').delete().eq('id', collaboratorId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Colaborador excluído." });
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
    },
    onError: (error) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  const handleAddNew = () => {
    setCollaboratorToEdit(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (collaborator: any) => {
    setCollaboratorToEdit(collaborator);
    setIsDialogOpen(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4 p-4">
          <Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" />
        </div>
      );
    }
    if (error) return <p className="text-center text-destructive py-4">Erro ao carregar colaboradores: {error.message}</p>;
    if (!collaborators || collaborators.length === 0) {
      return <p className="text-center text-muted-foreground py-4">Nenhum colaborador encontrado. Adicione o primeiro!</p>;
    }
    return (
      <Table>
        <TableHeader><TableRow><TableHead>Nome</TableHead><TableHead>Cargo</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
        <TableBody>
          {collaborators.map((collab) => (
            <TableRow key={collab.id}>
              <TableCell className="font-medium">{collab.name}</TableCell>
              <TableCell>{collab.subtitle}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(collab)}>Editar</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Excluir</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Você tem certeza?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteMutation.mutate(collab.id)}>Sim, excluir</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Colaboradores</CardTitle>
            <CardDescription>Adicione, edite ou remova colaboradores.</CardDescription>
          </div>
          <Button onClick={handleAddNew}>Adicionar Novo Colaborador</Button>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{collaboratorToEdit ? 'Editar Colaborador' : 'Adicionar Novo Colaborador'}</DialogTitle>
          </DialogHeader>
          <CollaboratorForm 
            collaboratorToEdit={collaboratorToEdit} 
            onFinished={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CollaboratorManager;