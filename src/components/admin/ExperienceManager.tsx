import { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Pencil, Trash2, Briefcase, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { ExperienceForm } from './ExperienceForm';

const API_URL = 'http://localhost:3001/api/experiences';

// --- CARD VISUAL ---
const ExperienceCard = ({ experience, actions, isDragging }: { experience: any, actions?: React.ReactNode, isDragging?: boolean }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [experience.icon]);

  return (
    <Card className={`h-full border-muted-foreground/20 shadow-sm bg-card transition-all ${isDragging ? 'opacity-50 ring-2 ring-primary' : 'hover:shadow-md'}`}>
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
            <div className="bg-primary/10 p-3 rounded-lg h-12 w-12 flex items-center justify-center overflow-hidden shrink-0">
                {experience.icon && !imgError ? (
                    <img 
                        src={experience.icon} 
                        alt="icon" 
                        className="h-full w-full object-contain" 
                        onError={() => setImgError(true)} 
                    />
                ) : (
                    <Briefcase className="h-5 w-5 text-primary" />
                )}
            </div>
            {experience.years && <Badge variant="outline" className="text-xs">{experience.years}</Badge>}
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-1">{experience.role}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Building className="h-3 w-3 mr-1" />
            {experience.company}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
            {experience.description}
        </p>

        {/* CORREÇÃO AQUI: Tags com melhor contraste */}
        <div className="flex flex-wrap gap-1.5 mb-4">
            {experience.technologies?.slice(0, 3).map((tech: string, i: number) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="text-[10px] px-1.5 py-0.5 font-normal bg-muted text-foreground hover:bg-muted/80"
                >
                    {tech}
                </Badge>
            ))}
            {experience.technologies?.length > 3 && (
              <span className="text-[10px] text-muted-foreground self-center">
                +{experience.technologies.length - 3}
              </span>
            )}
        </div>

        {actions && <div className="mt-auto pt-3 border-t flex justify-end gap-2">{actions}</div>}
      </CardContent>
    </Card>
  );
};

// --- ITEM ARRASTÁVEL ---
const SortableExperienceItem = ({ experience, onEdit, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: experience.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative h-full group">
       <ExperienceCard experience={experience} isDragging={isDragging} actions={
           <>
               <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => onEdit(experience)}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" /> Editar
               </Button>
               <Button variant="destructive" size="sm" className="h-8 px-2" onClick={() => onDelete(experience.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
               </Button>
           </>
       } />
       <button {...attributes} {...listeners} className="absolute top-3 right-3 cursor-grab hover:bg-muted p-1.5 rounded-md touch-none opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
       </button>
    </div>
  );
};

const ExperienceManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any | null>(null);

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const sortedData = data.sort((a: any, b: any) => (Number(a.position) || 0) - (Number(b.position) || 0));
      setItems(sortedData);
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao conectar com servidor local.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchExperiences(); }, []);

  const saveOrder = async (newItems: any[]) => {
    try {
      const itemsWithPosition = newItems.map((item, index) => ({ ...item, position: index + 1 }));
      await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemsWithPosition)
      });
      setItems(itemsWithPosition);
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao salvar ordem.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Excluir esta experiência?")) return;
    const newItems = items.filter(item => String(item.id) !== String(id));
    await saveOrder(newItems);
    toast({ title: "Sucesso", description: "Item removido." });
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      saveOrder(newItems);
    }
  };

  const handleOpenDialog = (experience: any = null) => {
    if (experience) {
        setEditingExperience({ ...experience, id: String(experience.id) });
    } else {
        setEditingExperience(null);
    }
    setIsDialogOpen(true);
  };

  const onFormFinished = () => {
    setIsDialogOpen(false);
    fetchExperiences(); 
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold hidden md:block">Trajetória Profissional</h2>
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
               <Button size="lg" className="shadow-lg shadow-primary/20 gap-2" onClick={() => handleOpenDialog(null)}>
                  <Plus className="h-5 w-5" /> Nova Experiência
               </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>{editingExperience ? "Editar Experiência" : "Nova Experiência"}</DialogTitle>
                  <DialogDescription>Adicione detalhes sobre sua jornada profissional.</DialogDescription>
               </DialogHeader>
               <ExperienceForm experienceToEdit={editingExperience} onFinished={onFormFinished} />
            </DialogContent>
         </Dialog>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <Skeleton key={i} className="h-[250px] w-full rounded-xl" />)}
         </div>
      ) : (
         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((exp) => (
                     <SortableExperienceItem key={exp.id} experience={exp} onEdit={handleOpenDialog} onDelete={handleDelete} />
                  ))}
               </div>
            </SortableContext>
         </DndContext>
      )}
    </div>
  );
};

export default ExperienceManager;