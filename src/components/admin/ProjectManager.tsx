import { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Pencil, Trash2, Image as ImageIcon, Eye, ExternalLink, Github, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';

const API_URL = 'http://localhost:3001/api/projects';

// --- PREVIEW DO CARD (Proporção 4:3) ---
const ProjectCardPreview = ({ project, actions, isDragging }: { project: any, actions?: React.ReactNode, isDragging?: boolean }) => {
  const [imgError, setImgError] = useState(false);
  useEffect(() => setImgError(false), [project.image_card_url]);

  return (
    <Card className={`overflow-hidden h-full flex flex-col border-muted-foreground/20 shadow-sm transition-all bg-background ${isDragging ? 'opacity-50 ring-2 ring-primary' : 'hover:shadow-md'}`}>
      {/* Proporção 4:3 para o Card */}
      <div className="relative aspect-[4/3] w-full bg-muted flex items-center justify-center overflow-hidden group">
        {project.image_card_url && !imgError ? (
          <img
            src={project.image_card_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center text-muted-foreground/50 p-4 text-center">
            <ImageIcon className="h-8 w-8 mb-2" />
            <span className="text-[10px]">Card (4:3)</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%]">
          {project.type && <Badge variant="secondary" className="shadow-sm text-[10px] bg-background/80 backdrop-blur">{project.type}</Badge>}
          {project.year && <Badge variant="outline" className="shadow-sm text-[10px] bg-background/80 backdrop-blur border-0">{project.year}</Badge>}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base mb-1 line-clamp-1" title={project.title}>{project.title || "Título do Projeto"}</h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags?.slice(0, 3).map((tag: string, i: number) => (
            <span key={i} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">
              {tag}
            </span>
          ))}
          {project.tags?.length > 3 && <span className="text-[10px] text-muted-foreground">+{project.tags.length - 3}</span>}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
          {project.description || "Descrição breve..."}
        </p>
        
        {actions && <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">{actions}</div>}
      </div>
    </Card>
  );
};

// --- PREVIEW DO MODAL (Proporção 21:9) ---
const ProjectModalPreview = ({ project }: { project: any }) => {
  const [imgError, setImgError] = useState(false);
  useEffect(() => setImgError(false), [project.image_modal_url]);

  return (
    <div className="bg-background rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
        {/* Proporção 21:9 para o Modal */}
        <div className="relative w-full aspect-[21/9] bg-muted flex items-center justify-center overflow-hidden">
            {project.image_modal_url && !imgError ? (
                <img
                    src={project.image_modal_url}
                    alt="Modal Cover"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="flex flex-col items-center text-muted-foreground/50">
                    <ImageIcon className="h-10 w-10 mb-2" />
                    <span className="text-xs">Imagem Modal (21:9)</span>
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-16 text-white">
                <h2 className="text-2xl font-bold">{project.title || "Título no Modal"}</h2>
                <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                    <Badge variant="outline" className="text-white border-white/40">{project.type}</Badge>
                    <span>{project.year}</span>
                </div>
            </div>
        </div>
        <div className="p-6 space-y-6">
            <div className="flex gap-2">
                {project.tags?.map((tag: string, i: number) => <Badge key={i} variant="secondary">{tag}</Badge>)}
            </div>
            <div className="space-y-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description || "A descrição completa do projeto aparecerá aqui..."}
                </p>
                {/* Exibe funcionalidades se houver */}
                {project.features && project.features.length > 0 && (
                   <ul className="list-disc list-inside text-xs text-muted-foreground mt-2">
                      {project.features.map((feat: string, i: number) => <li key={i}>{feat}</li>)}
                   </ul>
                )}
            </div>
            <div className="flex gap-3 pt-2">
                <Button className="flex-1 gap-2" disabled>
                    <ExternalLink className="h-4 w-4" /> Ver Projeto
                </Button>
                <Button variant="outline" className="flex-1 gap-2" disabled>
                    <Github className="h-4 w-4" /> Código
                </Button>
            </div>
        </div>
    </div>
  );
};

// --- DRAGGABLE WRAPPER ---
const SortableProjectItem = ({ project, onEdit, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative h-full">
       <ProjectCardPreview 
         project={project} 
         isDragging={isDragging}
         actions={
            <>
               <button {...attributes} {...listeners} className="cursor-grab hover:bg-muted p-1.5 rounded-md touch-none">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
               </button>
               <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => onEdit(project)}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                 </Button>
                 <Button variant="destructive" size="sm" className="h-8 px-2" onClick={() => onDelete(project.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                 </Button>
               </div>
            </>
         }
       />
    </div>
  );
};

const ProjectManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState<any>({
    title: "", type: "", year: "", description: "",
    image_card_url: "", image_modal_url: "",
    project_url: "", code_url: "",
    tags: [], features: []
  });
  
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState("card");

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const sortedData = data.sort((a: any, b: any) => (Number(a.position) || 0) - (Number(b.position) || 0));
      setItems(sortedData);
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao carregar projetos.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const saveAll = async (newItems: any[]) => {
    try {
      const itemsWithPosition = newItems.map((item, index) => ({ ...item, position: index + 1 }));
      await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemsWithPosition)
      });
      setItems(itemsWithPosition);
      return true;
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao salvar no servidor local.", variant: "destructive" });
      return false;
    }
  };

  const handleSaveItem = async () => {
    if (!formData.title) return toast({ title: "Erro", description: "O título é obrigatório", variant: "destructive" });
    
    const newItem = editingId 
      ? { ...formData, id: editingId }
      : { ...formData, id: Date.now().toString(), created_at: new Date().toISOString() };
      
    let newItems;
    if (editingId) {
      newItems = items.map(item => item.id === editingId ? newItem : item);
      toast({ title: "Sucesso", description: "Projeto atualizado!" });
    } else {
      newItems = [newItem, ...items];
      toast({ title: "Sucesso", description: "Projeto criado!" });
    }

    if (await saveAll(newItems)) {
      setIsDialogOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Tem certeza que deseja excluir este projeto?")) return;
    const newItems = items.filter(item => item.id !== id);
    if(await saveAll(newItems)) toast({ title: "Deletado", description: "Projeto removido." });
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      saveAll(newItems);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", type: "", year: "", description: "", image_card_url: "", image_modal_url: "", project_url: "", code_url: "", tags: [], features: [] });
    setEditingId(null);
    setTagInput("");
    setFeatureInput("");
    setPreviewMode("card");
  };

  const openEdit = (project: any) => {
    setFormData({ ...project, tags: project.tags || [], features: project.features || [] });
    setEditingId(project.id);
    setIsDialogOpen(true);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const newTags = [...(formData.tags || []), tagInput.trim()];
    setFormData({ ...formData, tags: newTags });
    setTagInput("");
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const newFeatures = [...(formData.features || []), featureInput.trim()];
    setFormData({ ...formData, features: newFeatures });
    setFeatureInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold hidden md:block">Meus Projetos</h2>
         <Dialog open={isDialogOpen} onOpenChange={(open) => { if(!open) resetForm(); setIsDialogOpen(open); }}>
            <DialogTrigger asChild>
               <Button size="lg" className="shadow-lg shadow-primary/20 gap-2">
                  <Plus className="h-5 w-5" /> Novo Projeto
               </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>{editingId ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
                  <DialogDescription>Configure as imagens (Card e Modal) e visualize o resultado.</DialogDescription>
               </DialogHeader>

               <div className="grid lg:grid-cols-12 gap-8 py-4">
                  {/* FORMULÁRIO (5 COLUNAS) */}
                  <div className="lg:col-span-5 space-y-5">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Título</Label>
                           <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Nome do projeto" />
                        </div>
                        <div className="space-y-2">
                           <Label>Ano</Label>
                           <Input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2025" />
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Input value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} placeholder="Web App" />
                     </div>

                     <div className="p-4 border rounded-lg bg-muted/20 space-y-4">
                        <h4 className="font-medium text-sm flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Imagens</h4>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Card (4:3)</Label>
                            <Input value={formData.image_card_url} onChange={e => setFormData({...formData, image_card_url: e.target.value})} placeholder="URL..." />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Modal (21:9)</Label>
                            <Input value={formData.image_modal_url} onChange={e => setFormData({...formData, image_modal_url: e.target.value})} placeholder="URL..." />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
                     </div>

                     {/* Tags */}
                     <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex gap-2">
                           <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} placeholder="Add Tag..." />
                           <Button type="button" onClick={handleAddTag} variant="secondary" size="sm">Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                           {formData.tags?.map((tag: string, i: number) => (
                              <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-white" onClick={() => setFormData({...formData, tags: formData.tags.filter((t: string) => t !== tag)})}>
                                 {tag} ×
                              </Badge>
                           ))}
                        </div>
                     </div>

                     {/* Features */}
                     <div className="space-y-2">
                        <Label>Funcionalidades</Label>
                        <div className="flex gap-2">
                           <Input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())} placeholder="Nova funcionalidade..." />
                           <Button type="button" onClick={handleAddFeature} variant="secondary" size="sm">Add</Button>
                        </div>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                           {formData.features?.map((feat: string, i: number) => (
                              <li key={i} className="cursor-pointer hover:text-destructive" onClick={() => setFormData({...formData, features: formData.features.filter((f: string) => f !== feat)})}>{feat}</li>
                           ))}
                        </ul>
                     </div>

                     <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                           <Label>Link Projeto</Label>
                           <Input value={formData.project_url} onChange={e => setFormData({...formData, project_url: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <Label>Link Código</Label>
                           <Input value={formData.code_url} onChange={e => setFormData({...formData, code_url: e.target.value})} />
                        </div>
                     </div>
                  </div>

                  {/* PREVIEW (7 COLUNAS) */}
                  <div className="lg:col-span-7 space-y-2">
                     <Label className="flex items-center gap-2 text-muted-foreground"><Eye className="h-4 w-4" /> Visualização em Tempo Real</Label>
                     
                     <Tabs value={previewMode} onValueChange={setPreviewMode} className="w-full h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="card" className="gap-2"><Smartphone className="h-4 w-4" /> Card (4:3)</TabsTrigger>
                            <TabsTrigger value="modal" className="gap-2"><Monitor className="h-4 w-4" /> Modal (21:9)</TabsTrigger>
                        </TabsList>

                        <div className="flex-1 bg-muted/30 border-2 border-dashed border-muted rounded-xl p-8 flex items-center justify-center min-h-[500px]">
                            <TabsContent value="card" className="mt-0 w-full max-w-[300px]">
                                <div className="pointer-events-none select-none shadow-xl transform transition-all hover:scale-105">
                                    <ProjectCardPreview project={formData} />
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="modal" className="mt-0 w-full h-full max-w-4xl">
                                <div className="pointer-events-none select-none shadow-2xl h-full flex items-center">
                                    <ProjectModalPreview project={formData} />
                                </div>
                            </TabsContent>
                        </div>
                     </Tabs>
                  </div>
               </div>
               
               <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSaveItem}>{editingId ? "Salvar Alterações" : "Criar Projeto"}</Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>

      {/* GRID LIST */}
      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <Skeleton key={i} className="h-[300px] w-full rounded-xl" />)}
         </div>
      ) : (
         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((project) => (
                     <SortableProjectItem key={project.id} project={project} onEdit={openEdit} onDelete={handleDelete} />
                  ))}
               </div>
            </SortableContext>
         </DndContext>
      )}
    </div>
  );
};

export default ProjectManager;