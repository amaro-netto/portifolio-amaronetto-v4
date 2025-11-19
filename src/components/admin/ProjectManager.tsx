import { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Pencil, Trash2, Image as ImageIcon, Eye, ExternalLink, Github, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';

const API_URL = 'http://localhost:3001/api/projects';

// --- PREVIEW FIEL AO SITE (CARD) ---
const ProjectCardPreview = ({ project, isDragging }: { project: any, isDragging?: boolean }) => {
  const [imgError, setImgError] = useState(false);
  useEffect(() => setImgError(false), [project.image_card_url]);

  // As classes aqui são IDÊNTICAS ao PortfolioSection.tsx
  return (
    <Card 
      className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-secondary backdrop-blur-sm aspect-square flex flex-col overflow-hidden ${isDragging ? 'opacity-50 ring-2 ring-primary' : ''}`}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg h-3/4 bg-muted">
          {project.image_card_url && !imgError ? (
            <img
              src={project.image_card_url} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50">
                <ImageIcon className="h-10 w-10 mb-2" />
                <span className="text-[10px]">Imagem Card</span>
            </div>
          )}
          
          {/* Overlay do Hover igual ao site */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 pointer-events-none">
            <div className="text-white flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Ver Detalhes</span>
            </div>
          </div>
        </div>

        <div className="p-4 h-1/4 flex flex-col justify-center bg-secondary">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs text-blue-500 border-white/30 bg-transparent">
                {project.type || "Tipo"}
            </Badge>
            <span className="text-xs text-muted-foreground">{project.year || "Ano"}</span>
          </div>
          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {project.title || "Título do Projeto"}
          </h3>                    
        </div>
      </CardContent>
    </Card>
  );
};

// --- PREVIEW FIEL AO SITE (MODAL) ---
const ProjectModalPreview = ({ project }: { project: any }) => {
    const [imgError, setImgError] = useState(false);
    useEffect(() => setImgError(false), [project.image_modal_url]);

    // Estrutura copiada do DialogContent do PortfolioSection.tsx
    return (
        <div className="bg-background rounded-lg border shadow-sm p-6 max-h-full overflow-y-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">{project.title || "Título do Projeto"}</h2>
                <div className="flex items-center space-x-4 text-base mt-2 text-muted-foreground">
                  <Badge>{project.type || "Tipo"}</Badge>
                  <span>{project.year || "Ano"}</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden aspect-video bg-muted">
                   {/* Tenta usar modal, se não tiver usa card, igual ao site */}
                   {(project.image_modal_url || project.image_card_url) && !imgError ? (
                       <img
                        src={project.image_modal_url || project.image_card_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                   ) : (
                       <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50">
                            <ImageIcon className="h-12 w-12 mb-2" />
                            <span className="text-xs">Imagem Modal ou Card</span>
                       </div>
                   )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags?.length > 0 ? project.tags.map((tag: string, i: number) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                  )) : <Badge variant="outline">Tags aparecerão aqui</Badge>}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Sobre o Projeto</h3>
                  <p className="text-muted-foreground leading-relaxed">
                      {project.description || "Descrição do projeto..."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Principais Funcionalidades</h3>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {project.features?.length > 0 ? project.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    )) : (
                        <>
                            <li className="flex items-start space-x-2"><span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current"></span><span>Funcionalidade 1</span></li>
                            <li className="flex items-start space-x-2"><span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current"></span><span>Funcionalidade 2</span></li>
                        </>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button className="flex-1 opacity-50 cursor-not-allowed" title="Botão de exemplo"> Ver Projeto </Button>
                  <Button variant="outline" className="flex-1 opacity-50 cursor-not-allowed" title="Botão de exemplo"> Documentação </Button>
                </div>
            </div>
        </div>
    );
};

// --- DRAGGABLE WRAPPER (Para a lista) ---
const SortableProjectItem = ({ project, onEdit, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative h-full group/item">
       {/* Na lista, usamos o mesmo Card Preview */}
       <ProjectCardPreview project={project} isDragging={isDragging} />
       
       {/* Botões de Ação Flutuantes (só aparecem no hover do item na lista) */}
       <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity z-20">
            <button {...attributes} {...listeners} className="bg-background/80 backdrop-blur p-2 rounded-md shadow-sm hover:bg-background cursor-grab active:cursor-grabbing text-muted-foreground">
                <GripVertical className="h-4 w-4" />
            </button>
            <Button size="icon" variant="secondary" className="h-8 w-8 shadow-sm" onClick={() => onEdit(project)}>
                <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant="destructive" className="h-8 w-8 shadow-sm" onClick={() => onDelete(project.id)}>
                <Trash2 className="h-3.5 w-3.5" />
            </Button>
       </div>
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
      toast({ title: "Erro", description: "Servidor local offline?", variant: "destructive" });
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
      toast({ title: "Erro", description: "Erro ao salvar.", variant: "destructive" });
      return false;
    }
  };

  const handleSaveItem = async () => {
    if (!formData.title) return toast({ title: "Erro", description: "Título obrigatório", variant: "destructive" });
    
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
    if(!confirm("Excluir projeto?")) return;
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
    setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
    setTagInput("");
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] });
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
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0">
               <div className="p-6 border-b flex-shrink-0 bg-background z-10">
                   <DialogHeader>
                      <DialogTitle>{editingId ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
                      <DialogDescription>Edite os detalhes e veja como ficará no site em tempo real.</DialogDescription>
                   </DialogHeader>
               </div>

               <div className="flex-1 overflow-hidden grid lg:grid-cols-12 h-full">
                  {/* COLUNA ESQUERDA: FORMULÁRIO (Scrollável) */}
                  <div className="lg:col-span-5 overflow-y-auto p-6 border-r space-y-6 bg-muted/10">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Título</Label>
                           <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <Label>Ano</Label>
                           <Input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Input value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} placeholder="Ex: Web App" />
                     </div>

                     <div className="space-y-2">
                        <Label>Imagens</Label>
                        <div className="grid gap-3 p-3 border rounded bg-background">
                            <Input value={formData.image_card_url} onChange={e => setFormData({...formData, image_card_url: e.target.value})} placeholder="URL Card (Quadrado)" className="text-xs" />
                            <Input value={formData.image_modal_url} onChange={e => setFormData({...formData, image_modal_url: e.target.value})} placeholder="URL Modal (Wide)" className="text-xs" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} />
                     </div>

                     {/* Tags */}
                     <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex gap-2">
                           <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} placeholder="Nova tag..." />
                           <Button type="button" onClick={handleAddTag} size="sm" variant="secondary">Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                           {formData.tags?.map((tag: string, i: number) => (
                              <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-white" onClick={() => setFormData({...formData, tags: formData.tags.filter((t: string) => t !== tag)})}>{tag} ×</Badge>
                           ))}
                        </div>
                     </div>

                     {/* Features (Funcionalidades) */}
                     <div className="space-y-2">
                        <Label>Funcionalidades (Lista)</Label>
                        <div className="flex gap-2">
                           <Input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())} placeholder="Nova funcionalidade..." />
                           <Button type="button" onClick={handleAddFeature} size="sm" variant="secondary">Add</Button>
                        </div>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                           {formData.features?.map((feat: string, i: number) => (
                              <li key={i} className="cursor-pointer hover:text-destructive truncate" onClick={() => setFormData({...formData, features: formData.features.filter((f: string) => f !== feat)})}>{feat}</li>
                           ))}
                        </ul>
                     </div>

                     <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2"><Label>Link Projeto</Label><Input value={formData.project_url} onChange={e => setFormData({...formData, project_url: e.target.value})} /></div>
                        <div className="space-y-2"><Label>Link Código</Label><Input value={formData.code_url} onChange={e => setFormData({...formData, code_url: e.target.value})} /></div>
                     </div>
                  </div>

                  {/* COLUNA DIREITA: PREVIEW (Fixo) */}
                  <div className="lg:col-span-7 p-6 bg-muted/30 flex flex-col h-full overflow-hidden">
                     <Tabs value={previewMode} onValueChange={setPreviewMode} className="w-full h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4 flex-shrink-0">
                            <Label className="flex items-center gap-2 text-muted-foreground"><Eye className="h-4 w-4" /> Visualização Fiel</Label>
                            <TabsList>
                                <TabsTrigger value="card" className="text-xs"><Smartphone className="h-3 w-3 mr-2" /> Card</TabsTrigger>
                                <TabsTrigger value="modal" className="text-xs"><Monitor className="h-3 w-3 mr-2" /> Modal</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/20 rounded-xl bg-background/50 relative">
                            {/* Background pattern opcional para dar destaque */}
                            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                            <TabsContent value="card" className="mt-0 w-full max-w-[350px] z-10 animate-in zoom-in-95 duration-300">
                                <div className="pointer-events-none select-none">
                                    <ProjectCardPreview project={formData} />
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="modal" className="mt-0 w-full max-w-3xl h-[90%] z-10 animate-in zoom-in-95 duration-300">
                                <div className="pointer-events-none select-none h-full">
                                    <ProjectModalPreview project={formData} />
                                </div>
                            </TabsContent>
                        </div>
                     </Tabs>
                  </div>
               </div>
               
               <div className="p-4 border-t bg-background flex justify-end gap-3 flex-shrink-0">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSaveItem} className="min-w-[150px]">{editingId ? "Salvar Alterações" : "Criar Projeto"}</Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>

      {/* LISTA PRINCIPAL (Grid) */}
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