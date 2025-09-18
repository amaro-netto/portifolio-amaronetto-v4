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
import { ExperienceForm } from './ExperienceForm';
import { Skeleton } from '@/components/ui/skeleton';

// Função de busca agora ordena por 'position' para respeitar a ordem manual
const fetchExperiences = async () => {
  const { data, error } = await supabase.from('experiences').select('*').order('position', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

// Componente para uma Linha da Tabela que pode ser arrastada
const DraggableTableRow = ({ experience, onEdit, onDelete }: { experience: any, onEdit: (exp: any) => void, onDelete: (id: number) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: experience.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Deixa a linha semi-transparente ao arrastar
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell className="w-10">
        <button {...listeners} className="cursor-grab p-2 active:cursor-grabbing">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell className="font-medium">{experience.role}</TableCell>
      <TableCell>{experience.company}</TableCell>
      <TableCell>{experience.years}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(experience)}>Editar</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">Excluir</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(experience.id)}>Sim, excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

const ExperienceManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]); // Estado local para gerenciar a ordem na tela
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<any | null>(null);

  const { data: experiences, isLoading, error } = useQuery({ 
    queryKey: ['experiences'], 
    queryFn: fetchExperiences 
  });

  // Atualiza o estado local 'items' sempre que os dados do Supabase mudam
  useEffect(() => {
    if (experiences) {
      setItems(experiences);
    }
  }, [experiences]);

  // Mutação para salvar a nova ordem no banco de dados
  const updateOrderMutation = useMutation({
    mutationFn: async (orderedIds: number[]) => {
      const { error } = await supabase.rpc('update_experience_order', { ids: orderedIds });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Ordem das experiências foi salva." });
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: (error: any) => toast({ title: "Erro!", description: `Não foi possível salvar a ordem: ${error.message}`, variant: "destructive" }),
  });

  // Mutação para deletar um item
  const deleteMutation = useMutation({
    mutationFn: async (experienceId: number) => {
      const { error } = await supabase.from('experiences').delete().eq('id', experienceId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Experiência excluída." });
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: (error: any) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  // Função para organizar automaticamente por data de criação
  const handleAutoSort = () => {
    if (!items) return;
    const sortedItems = [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setItems(sortedItems);
    const newOrderIds = sortedItems.map(item => item.id);
    updateOrderMutation.mutate(newOrderIds);
  };

  // Sensores para o dnd-kit (para detectar o clique e arrastar)
  const sensors = useSensors(useSensor(PointerSensor));

  // Função chamada quando o usuário solta um item após arrastar
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

  const handleAddNew = () => { setExperienceToEdit(null); setIsDialogOpen(true); };
  const handleEdit = (experience: any) => { setExperienceToEdit(experience); setIsDialogOpen(true); };
  
  const renderContent = () => {
    if (isLoading) return (<div className="space-y-4 p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>);
    if (error) return <p className="text-center text-destructive py-4">Erro ao carregar: {error.message}</p>;
    if (!items || items.length === 0) return <p className="text-center text-muted-foreground py-4">Nenhuma experiência cadastrada.</p>;
    
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((exp) => (
                <DraggableTableRow key={exp.id} experience={exp} onEdit={handleEdit} onDelete={(id) => deleteMutation.mutate(id)} />
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
            <CardTitle>Experiência Profissional</CardTitle>
            <CardDescription>Arraste para reordenar ou organize por data.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAutoSort}>
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Organizar por Data
            </Button>
            <Button onClick={handleAddNew}>Adicionar Experiência</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
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