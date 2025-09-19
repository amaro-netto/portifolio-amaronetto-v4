// src/components/admin/ProjectManager.tsx (com Drag-and-Drop)

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
// MODIFICAÇÃO: Importar DialogDescription
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription as AlertDialogDesc, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { ProjectForm } from './ProjectForm';
import { Skeleton } from '@/components/ui/skeleton';

// Atualizado para ordenar por 'position'
const fetchProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*').order('position', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

// Componente para a Linha da Tabela que pode ser arrastada
const DraggableTableRow = ({ project, onEdit, onDelete }: { project: any, onEdit: (p: any) => void, onDelete: (id: number) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  
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
       <TableCell className="font-medium">{project.title}</TableCell>
       <TableCell>{project.type}</TableCell>
       <TableCell className="text-right space-x-2">
         <Button variant="outline" size="sm" onClick={() => onEdit(project)}>Editar</Button>
         <AlertDialog>
           <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Excluir</Button></AlertDialogTrigger>
           <AlertDialogContent>
             <AlertDialogHeader><AlertDialogTitle>Você tem certeza?</AlertDialogTitle><AlertDialogDesc>Esta ação não pode ser desfeita.</AlertDialogDesc></AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction onClick={() => onDelete(project.id)}>Sim, excluir</AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
       </TableCell>
     </TableRow>
  );
};

const ProjectManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<any | null>(null);

  const { data: projects, isLoading, error } = useQuery({ 
    queryKey: ['projects'], 
    queryFn: fetchProjects 
  });

  useEffect(() => {
    if (projects) {
      setItems(projects);
    }
  }, [projects]);

  const updateOrderMutation = useMutation({
    mutationFn: async (orderedIds: number[]) => {
      const { error } = await supabase.rpc('update_project_order', { ids: orderedIds });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Ordem dos projetos foi salva." });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: any) => toast({ title: "Erro!", description: `Não foi possível salvar a ordem: ${error.message}`, variant: "destructive" }),
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

  const handleAddNew = () => { setProjectToEdit(null); setIsDialogOpen(true); };
  const handleEdit = (project: any) => { setProjectToEdit(project); setIsDialogOpen(true); };
  
  const renderContent = () => {
    if (isLoading) return (<div className="space-y-4 p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>);
    if (error) return <p className="text-center text-destructive py-4">Erro ao carregar: {error.message}</p>;
    if (!items || items.length === 0) return <p className="text-center text-muted-foreground py-4">Nenhum projeto cadastrado.</p>;
    
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead className="w-10"></TableHead>
                 <TableHead>Título</TableHead>
                 <TableHead>Tipo</TableHead>
                 <TableHead className="text-right">Ações</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {items.map((project) => (
                 <DraggableTableRow key={project.id} project={project} onEdit={handleEdit} onDelete={(id) => deleteMutation.mutate(id)} />
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
             <CardTitle>Projetos</CardTitle>
             <CardDescription>Arraste para reordenar ou organize por data.</CardDescription>
           </div>
           <div className="flex gap-2">
             <Button variant="outline" size="sm" onClick={handleAutoSort}>
               <ArrowDownUp className="h-4 w-4 mr-2" />
               Organizar por Data
             </Button>
             <Button onClick={handleAddNew}>Adicionar Novo Projeto</Button>
           </div>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
             <DialogTitle>{projectToEdit ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</DialogTitle>
             {/* MODIFICAÇÃO: Adicionada a descrição para acessibilidade */}
             <DialogDescription>
                Preencha as informações abaixo para adicionar ou editar um projeto.
             </DialogDescription>
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