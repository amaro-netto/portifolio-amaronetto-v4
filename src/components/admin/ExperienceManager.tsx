// src/components/admin/ExperienceManager.tsx

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { ExperienceForm } from './ExperienceForm';
import { Skeleton } from '@/components/ui/skeleton';

const fetchExperiences = async () => {
  const { data, error } = await supabase.from('experiences').select('*').order('years', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const ExperienceManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<any | null>(null);

  const { data: experiences, isLoading, error } = useQuery({ 
    queryKey: ['experiences'], 
    queryFn: fetchExperiences 
  });

  const deleteMutation = useMutation({
    mutationFn: async (experienceId: number) => {
      const { error } = await supabase.from('experiences').delete().eq('id', experienceId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Experiência excluída." });
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: (error) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  const handleAddNew = () => {
    setExperienceToEdit(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (experience: any) => {
    setExperienceToEdit(experience);
    setIsDialogOpen(true);
  };

  const renderContent = () => {
    if (isLoading) return (<div className="space-y-4 p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>);
    if (error) return <p className="text-center text-destructive py-4">Erro ao carregar: {error.message}</p>;
    if (!experiences || experiences.length === 0) return <p className="text-center text-muted-foreground py-4">Nenhuma experiência cadastrada.</p>;

    return (
      <Table>
        <TableHeader><TableRow><TableHead>Cargo</TableHead><TableHead>Empresa</TableHead><TableHead>Período</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
        <TableBody>
          {experiences.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.role}</TableCell>
              <TableCell>{exp.company}</TableCell>
              <TableCell>{exp.years}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(exp)}>Editar</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Excluir</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Você tem certeza?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteMutation.mutate(exp.id)}>Sim, excluir</AlertDialogAction>
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
            <CardTitle>Experiência Profissional</CardTitle>
            <CardDescription>Gerencie sua linha do tempo profissional.</CardDescription>
          </div>
          <Button onClick={handleAddNew}>Adicionar Experiência</Button>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{experienceToEdit ? 'Editar Experiência' : 'Adicionar Nova Experiência'}</DialogTitle>
          </DialogHeader>
          <ExperienceForm 
            experienceToEdit={experienceToEdit} 
            onFinished={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExperienceManager;