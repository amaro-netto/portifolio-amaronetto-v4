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
import { CollaboratorForm } from './CollaboratorForm';
import { Skeleton } from '@/components/ui/skeleton';

const API_URL = 'http://localhost:3001/api/collaborators';

const DraggableTableRow = ({ collaborator, onEdit, onDelete }: { collaborator: any, onEdit: (c: any) => void, onDelete: (id: string) => void }) => {
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
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<any | null>(null);

  const fetchCollaborators = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const sortedData = data.sort((a: any, b: any) => (Number(a.position) || 0) - (Number(b.position) || 0));
      setItems(sortedData);
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao buscar colaboradores.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
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
      toast({ title: "Sucesso!", description: "Lista salva localmente." });
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

  const handleAddNew = () => { setCollaboratorToEdit(null); setIsDialogOpen(true); };
  const handleEdit = (collaborator: any) => { setCollaboratorToEdit(collaborator); setIsDialogOpen(true); };

  const onFormSuccess = () => {
    setIsDialogOpen(false);
    fetchCollaborators();
  };
  
  const renderContent = () => {
    if (isLoading) return (<div className="space-y-4 p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>);
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
                <DraggableTableRow key={collab.id} collaborator={collab} onEdit={handleEdit} onDelete={handleDelete} />
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
            <CardDescription>Gerencie os colaboradores do arquivo JSON.</CardDescription>
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
            onFinished={onFormSuccess} 
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CollaboratorManager;