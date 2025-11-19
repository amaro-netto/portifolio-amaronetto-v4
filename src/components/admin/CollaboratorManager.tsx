import { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Pencil, Trash2, User, Mail, MessageCircle, Instagram, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';

const API_URL = 'http://localhost:3001/api/collaborators';

// --- PREVIEW DO CARD DO COLABORADOR ---
const CollaboratorCard = ({ collaborator, actions, isDragging }: { collaborator: any, actions?: React.ReactNode, isDragging?: boolean }) => {
  const [imgError, setImgError] = useState(false);
  useEffect(() => setImgError(false), [collaborator.image_url]);

  return (
    <Card className={`h-full border-muted-foreground/20 shadow-sm bg-card transition-all overflow-hidden flex flex-col ${isDragging ? 'opacity-50 ring-2 ring-primary' : 'hover:shadow-md'}`}>
      {/* Cabeçalho colorido ou imagem de fundo */}
      <div className="h-24 bg-muted/50 relative">
          <div className="absolute -bottom-8 left-5">
              <div className="h-16 w-16 rounded-full border-4 border-card overflow-hidden bg-background shadow-sm">
                 {collaborator.image_url && !imgError ? (
                    <img 
                        src={collaborator.image_url} 
                        alt={collaborator.name} 
                        className="h-full w-full object-cover"
                        onError={() => setImgError(true)} 
                    />
                 ) : (
                    <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                        <User className="h-8 w-8" />
                    </div>
                 )}
              </div>
          </div>
      </div>
      
      <CardContent className="p-5 pt-10 flex flex-col h-full">
        <h3 className="font-bold text-lg leading-tight">{collaborator.name || "Nome do Colaborador"}</h3>
        <p className="text-sm text-primary font-medium mb-1">{collaborator.subtitle || "Cargo / Especialidade"}</p>
        
        <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Building className="h-3 w-3 mr-1" />
            {collaborator.company || "Empresa"}
        </div>

        <div className="space-y-2 mb-4 flex-1">
            {collaborator.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                    <span className="font-semibold text-foreground/80">Sobre: </span> 
                    {collaborator.description}
                </p>
            )}
             {collaborator.collaboration && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                    <span className="font-semibold text-foreground/80">Colaboração: </span> 
                    {collaborator.collaboration}
                </p>
            )}
        </div>

        <div className="flex gap-2 mt-auto pt-3 border-t">
            {collaborator.social_instagram && <Instagram className="h-4 w-4 text-muted-foreground hover:text-pink-600 transition-colors cursor-pointer" />}
            {collaborator.social_whatsapp && <MessageCircle className="h-4 w-4 text-muted-foreground hover:text-green-600 transition-colors cursor-pointer" />}
            {collaborator.social_email && <Mail className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors cursor-pointer" />}
        </div>

        {actions && <div className="mt-3 pt-3 border-t flex justify-end gap-2">{actions}</div>}
      </CardContent>
    </Card>
  );
};

// --- ITEM DRAGGABLE ---
const SortableCollaboratorItem = ({ collaborator, onEdit, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: collaborator.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative h-full group">
       <CollaboratorCard collaborator={collaborator} isDragging={isDragging} actions={
           <>
               <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => onEdit(collaborator)}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" /> Editar
               </Button>
               <Button variant="destructive" size="sm" className="h-8 px-2" onClick={() => onDelete(collaborator.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
               </Button>
           </>
       } />
       
       {/* Handle de arrastar */}
       <button {...attributes} {...listeners} className="absolute top-3 right-3 cursor-grab hover:bg-muted p-1.5 rounded-md touch-none opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
       </button>
    </div>
  );
};

const CollaboratorManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Estado do formulário (Tudo que o collab tem)
  const [formData, setFormData] = useState<any>({
    name: "", subtitle: "", image_url: "", company: "",
    description: "", collaboration: "", expertise: "",
    social_instagram: "", social_whatsapp: "", social_email: ""
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCollaborators = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const sortedData = data.sort((a: any, b: any) => (Number(a.position) || 0) - (Number(b.position) || 0));
      setItems(sortedData);
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao carregar colaboradores.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchCollaborators(); }, []);

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
      toast({ title: "Erro", description: "Erro ao salvar ordem.", variant: "destructive" });
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Excluir colaborador?")) return;
    const newItems = items.filter(item => String(item.id) !== String(id));
    if(await saveAll(newItems)) toast({ title: "Sucesso", description: "Removido." });
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

  // --- FUNÇÕES DE EDIÇÃO ---
  const resetForm = () => {
    setFormData({ name: "", subtitle: "", image_url: "", company: "", description: "", collaboration: "", expertise: "", social_instagram: "", social_whatsapp: "", social_email: "" });
    setEditingId(null);
  };

  const openEdit = (collab: any) => {
    setFormData(collab);
    setEditingId(String(collab.id)); // CORREÇÃO: Força string para evitar erro de comparação
    setIsDialogOpen(true);
  };

  const handleSaveItem = async () => {
    if (!formData.name) return toast({ title: "Erro", description: "Nome obrigatório", variant: "destructive" });

    const newItem = editingId 
      ? { ...formData, id: editingId }
      : { ...formData, id: Date.now().toString(), created_at: new Date().toISOString() };
    
    let newItems;
    if (editingId) {
      // CORREÇÃO: Compara como String
      newItems = items.map(item => String(item.id) === String(editingId) ? newItem : item);
      toast({ title: "Sucesso", description: "Colaborador atualizado!" });
    } else {
      newItems = [newItem, ...items];
      toast({ title: "Sucesso", description: "Colaborador criado!" });
    }

    if (await saveAll(newItems)) {
      setIsDialogOpen(false);
      resetForm();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold hidden md:block">Parceiros & Colaboradores</h2>
         <Dialog open={isDialogOpen} onOpenChange={(open) => { if(!open) resetForm(); setIsDialogOpen(open); }}>
            <DialogTrigger asChild>
               <Button size="lg" className="shadow-lg shadow-primary/20 gap-2">
                  <Plus className="h-5 w-5" /> Novo Colaborador
               </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle>{editingId ? "Editar" : "Novo"} Colaborador</DialogTitle>
                  <DialogDescription>Gerencie os parceiros exibidos no site.</DialogDescription>
               </DialogHeader>
               
               <div className="grid lg:grid-cols-12 gap-8 py-4">
                  {/* ESQUERDA: FORMULÁRIO (7 COLUNAS) */}
                  <div className="lg:col-span-7 space-y-4 border-r pr-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Nome</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                        <div className="space-y-2"><Label>Cargo / Subtítulo</Label><Input value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} /></div>
                     </div>
                     
                     <div className="space-y-2"><Label>Empresa</Label><Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} /></div>
                     
                     <div className="space-y-2"><Label>URL da Foto</Label><Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." /></div>

                     <div className="space-y-2"><Label>Descrição (Bio)</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} /></div>
                     
                     <div className="space-y-2"><Label>O que fizemos juntos?</Label><Textarea value={formData.collaboration} onChange={e => setFormData({...formData, collaboration: e.target.value})} rows={2} /></div>
                     
                     <div className="space-y-2"><Label>Especialidades (Expertise)</Label><Textarea value={formData.expertise} onChange={e => setFormData({...formData, expertise: e.target.value})} rows={2} placeholder="Separar por vírgulas..." /></div>

                     <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1"><Label className="text-xs">Instagram URL</Label><Input className="h-8 text-xs" value={formData.social_instagram} onChange={e => setFormData({...formData, social_instagram: e.target.value})} /></div>
                        <div className="space-y-1"><Label className="text-xs">Whatsapp Link</Label><Input className="h-8 text-xs" value={formData.social_whatsapp} onChange={e => setFormData({...formData, social_whatsapp: e.target.value})} /></div>
                        <div className="space-y-1"><Label className="text-xs">Email</Label><Input className="h-8 text-xs" value={formData.social_email} onChange={e => setFormData({...formData, social_email: e.target.value})} /></div>
                     </div>
                  </div>

                  {/* DIREITA: PREVIEW (5 COLUNAS) */}
                  <div className="lg:col-span-5 space-y-2 flex flex-col">
                     <Label className="text-muted-foreground">Visualização em Tempo Real</Label>
                     <div className="flex-1 bg-muted/30 border-2 border-dashed border-muted rounded-xl p-6 flex items-center justify-center">
                        <div className="w-full max-w-xs pointer-events-none select-none">
                             <CollaboratorCard collaborator={formData} />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSaveItem}>{editingId ? "Salvar Alterações" : "Criar Colaborador"}</Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-[250px] w-full rounded-xl" />)}
         </div>
      ) : (
         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((collab) => (
                     <SortableCollaboratorItem key={collab.id} collaborator={collab} onEdit={openEdit} onDelete={handleDelete} />
                  ))}
               </div>
            </SortableContext>
         </DndContext>
      )}
    </div>
  );
};

export default CollaboratorManager;