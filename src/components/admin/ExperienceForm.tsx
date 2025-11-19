import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Image as ImageIcon } from "lucide-react";

const API_URL = 'http://localhost:3001/api/experiences';

interface ExperienceFormProps {
  experienceToEdit?: any;
  onFinished: () => void;
}

export function ExperienceForm({ experienceToEdit, onFinished }: ExperienceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    years: "",
    description: "",
    icon: "", // Agora será a URL
    achievements: [] as string[],
    technologies: [] as string[]
  });

  const [achievementInput, setAchievementInput] = useState("");
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (experienceToEdit) {
      setFormData({
        role: experienceToEdit.role || "",
        company: experienceToEdit.company || "",
        years: experienceToEdit.years || "",
        description: experienceToEdit.description || "",
        icon: experienceToEdit.icon || "",
        achievements: experienceToEdit.achievements || [],
        technologies: experienceToEdit.technologies || []
      });
    }
  }, [experienceToEdit]);

  const handleAddAchievement = () => {
    if (!achievementInput.trim()) return;
    setFormData(prev => ({ ...prev, achievements: [...prev.achievements, achievementInput.trim()] }));
    setAchievementInput("");
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setFormData(prev => ({ ...prev, technologies: [...prev.technologies, techInput.trim()] }));
    setTechInput("");
  };

  const removeItem = (field: 'achievements' | 'technologies', index: number) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL);
      const currentList = await response.json();

      let newList;
      // Converte para string para comparação segura
      const editId = experienceToEdit ? String(experienceToEdit.id) : null;

      if (editId) {
        newList = currentList.map((item: any) => 
          String(item.id) === editId ? { ...formData, id: item.id, created_at: item.created_at, position: item.position } : item
        );
      } else {
        const newItem = { 
          ...formData, 
          id: Date.now().toString(), 
          created_at: new Date().toISOString(),
          position: 0 
        };
        newList = [newItem, ...currentList];
      }

      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList)
      });

      toast({ title: "Sucesso!", description: "Salvo com sucesso." });
      onFinished();
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Falha ao salvar.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cargo</Label>
          <Input value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
        </div>
        <div className="space-y-2">
          <Label>Empresa</Label>
          <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Período</Label>
          <Input value={formData.years} onChange={e => setFormData({...formData, years: e.target.value})} required />
        </div>
        
        {/* CAMPO DE URL DO ÍCONE COM PREVIEW */}
        <div className="space-y-2">
            <Label>URL do Ícone</Label>
            <div className="flex gap-2 items-center">
                <div className="flex-1">
                    <Input 
                        value={formData.icon} 
                        onChange={e => setFormData({...formData, icon: e.target.value})} 
                        placeholder="https://exemplo.com/icone.svg" 
                    />
                </div>
                {/* Preview da Imagem */}
                <div className="h-10 w-10 bg-muted rounded border flex items-center justify-center overflow-hidden shrink-0">
                    {formData.icon ? (
                        <img src={formData.icon} alt="Preview" className="h-6 w-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                    ) : (
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Descrição</Label>
        <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
      </div>

      <div className="space-y-2">
        <Label>Tecnologias</Label>
        <div className="flex gap-2">
          <Input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTech())} placeholder="Add..." />
          <Button type="button" onClick={handleAddTech} size="sm" variant="secondary"><Plus className="h-4 w-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.technologies.map((item, idx) => (
            <Badge key={idx} variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-white" onClick={() => removeItem('technologies', idx)}>{item} ×</Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onFinished}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando..." : "Salvar"}</Button>
      </div>
    </form>
  );
}