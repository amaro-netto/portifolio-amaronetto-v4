import { useState, useEffect } from 'react';
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

const API_URL = 'http://localhost:3001/api/experiences';

const DraggableTableRow = ({ experience, onEdit, onDelete }: { experience: any, onEdit: (exp: any) => void, onDelete: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: experience.id });
  
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
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<any | null>(null);

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const sortedData = data.sort((a: any, b: any) => (Number(a.position) || 0) - (Number(b.position) || 0));
      setItems(sortedData);
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao buscar experiências.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const saveAll = async (newItems: any[]) => {
    try {
      const itemsWithPosition = newItems.map((item, index) => ({ ...item, position: index + 1 }));
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemsWithPosition)
      });
      setItems(itemsWithPosition);
      toast({ title: "Sucesso!", description: "Ordem das experiências foi salva." });
    } catch (error: any) {
      toast({ title: "Erro!", description: `Não foi possível salvar: ${error.message}`, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    await saveAll(newItems);
  };

  const handleAutoSort = () => {
    const sortedItems = [...items].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    saveAll(sortedItems);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      saveAll(newItems);
    }
  };

  const handleAddNew = () => { setExperienceToEdit(null); setIsDialogOpen(true); };
  const handleEdit = (experience: any) => { setExperienceToEdit(experience); setIsDialogOpen(true); };
  
  const onFormSuccess = () => {
    setIsDialogOpen(false);
    fetchExperiences();
  };

  const renderContent = () => {
    if (isLoading) return (<div className="space-y-4 p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>);
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
                <DraggableTableRow key={exp.id} experience={exp} onEdit={handleEdit} onDelete={handleDelete} />
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
            <CardDescription>Gerencie as experiências do arquivo JSON.</CardDescription>
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
            onFinished={onFormSuccess} 
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExperienceManager;