// src/components/admin/CollaboratorManager.tsx (com Drag-and-Drop)

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { CollaboratorForm } from './CollaboratorForm';
import { Skeleton } from '@/components/ui/skeleton';

// Atualizado para ordenar por 'position'
const fetchCollaborators = async () => {
  const { data, error } = await supabase.from('collaborators').select('*').order('position', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

// Componente para a Linha da Tabela que pode ser arrastada
const DraggableTableRow = ({ collaborator, onEdit, onDelete }: { collaborator: any, onEdit: (c: any) => void, onDelete: (id: number) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: collaborator.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell className="w-10">
        <button {...listeners} className="cursor-grab p-2 active:cursor-grabbing">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell className="font-medium">{collaborator.name}</TableCell>
      <TableCell>{collaborator.subtitle}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(collaborator)}>Editar</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Excluir</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Você tem certeza?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(collaborator.id)}>Sim, excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

const CollaboratorManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<any | null>(null);

  const { data: collaborators, isLoading, error } = useQuery({ 
    queryKey: ['collaborators'], 
    queryFn: fetchCollaborators 
  });

  useEffect(() => {
    if (collaborators) {
      setItems(collaborators);
    }
  }, [collaborators]);

  const updateOrderMutation = useMutation({
    mutationFn: async (orderedIds: number[]) => {
      const { error } = await supabase.rpc('update_collaborator_order', { ids: orderedIds });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Ordem dos colaboradores foi salva." });
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
    },
    onError: (error: any) => toast({ title: "Erro!", description: `Não foi possível salvar a ordem: ${error.message}`, variant: "destructive" }),
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
    onError: (error: any) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  const handleAutoSort = () => {
    if (!items) return;
    const sortedItems = [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setItems(sortedItems);
    const newOrderIds = sortedItems.map(item => item.id);
    updateOrderMutation.mutate(newOrderIds);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      
      const newOrderIds = newItems.map(item => item.id);
      updateOrderMutation.mutate(newOrderIds);
    }
  };

  const handleAddNew = () => { setCollaboratorToEdit(null); setIsDialogOpen(true); };
  const handleEdit = (collaborator: any) => { setCollaboratorToEdit(collaborator); setIsDialogOpen(true); };
  
  const renderContent = () => {
    if (isLoading) return (<div className="space-y-4 p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>);
    if (error) return <p className="text-center text-destructive py-4">Erro ao carregar: {error.message}</p>;
    if (!items || items.length === 0) return <p className="text-center text-muted-foreground py-4">Nenhum colaborador cadastrado.</p>;
    
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((collab) => (
                <DraggableTableRow key={collab.id} collaborator={collab} onEdit={handleEdit} onDelete={(id) => deleteMutation.mutate(id)} />
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Colaboradores</CardTitle>
            <CardDescription>Arraste para reordenar ou organize por data.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAutoSort}>
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Organizar por Data
            </Button>
            <Button onClick={handleAddNew}>Adicionar Novo Colaborador</Button>
          </div>
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