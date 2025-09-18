// src/components/admin/ProjectForm.tsx (com a correção na linha 129)

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const projectSchema = z.object({
  title: z.string().min(3, { message: "O título é obrigatório." }),
  description: z.string().min(10, { message: "A descrição é obrigatória." }),
  type: z.string().optional(),
  year: z.string().optional(),
  tags: z.string().optional(),
  features: z.string().optional(),
  project_url: z.string().url({ message: "URL inválida." }).optional().or(z.literal('')),
  code_url: z.string().url({ message: "URL inválida." }).optional().or(z.literal('')),
  image_card_file: z.instanceof(FileList).optional(),
  image_modal_file: z.instanceof(FileList).optional(),
});

const stringToArray = (str: string | undefined) => str ? str.split(',').map(item => item.trim()) : [];

export function ProjectForm({ projectToEdit, onFinished }: { projectToEdit?: any, onFinished: () => void }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: projectToEdit?.title || "",
      description: projectToEdit?.description || "",
      type: projectToEdit?.type || "",
      year: projectToEdit?.year || "",
      tags: projectToEdit?.tags?.join(', ') || "",
      features: projectToEdit?.features?.join(', ') || "",
      project_url: projectToEdit?.project_url || "",
      code_url: projectToEdit?.code_url || "",
    },
  });

  const saveProjectMutation = useMutation({
    mutationFn: async (values: z.infer<typeof projectSchema>) => {
      let imageCardUrl = projectToEdit?.image_card_url;
      let imageModalUrl = projectToEdit?.image_modal_url;

      if (values.image_card_file && values.image_card_file.length > 0) {
        const file = values.image_card_file[0];
        const fileName = `card-${uuidv4()}-${file.name}`;
        const { error } = await supabase.storage.from('project_images').upload(fileName, file);
        if (error) throw new Error(`Erro no upload da imagem do card: ${error.message}`);
        imageCardUrl = supabase.storage.from('project_images').getPublicUrl(fileName).data.publicUrl;
      }

      if (values.image_modal_file && values.image_modal_file.length > 0) {
        const file = values.image_modal_file[0];
        const fileName = `modal-${uuidv4()}-${file.name}`;
        const { error } = await supabase.storage.from('project_images').upload(fileName, file);
        if (error) throw new Error(`Erro no upload da imagem do modal: ${error.message}`);
        imageModalUrl = supabase.storage.from('project_images').getPublicUrl(fileName).data.publicUrl;
      }

      const projectData = {
        ...values,
        tags: stringToArray(values.tags),
        features: stringToArray(values.features),
        image_card_url: imageCardUrl,
        image_modal_url: imageModalUrl,
      };
      delete projectData.image_card_file;
      delete projectData.image_modal_file;

      if (projectToEdit) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', projectToEdit.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(projectData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Projeto salvo." });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      onFinished();
    },
    onError: (error) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  function onSubmit(values: z.infer<typeof projectSchema>) {
    saveProjectMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>Título do Projeto</FormLabel><FormControl><Input placeholder="Ex: E-commerce Mobile App" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem><FormLabel>Tipo</FormLabel><FormControl><Input placeholder="Mobile Application" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="year" render={({ field }) => (
            <FormItem><FormLabel>Ano</FormLabel><FormControl><Input placeholder="2024" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="tags" render={({ field }) => (
          <FormItem><FormLabel>Tags (separadas por vírgula)</FormLabel><FormControl><Input placeholder="React Native, Redux, Firebase" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Sobre o Projeto (Descrição)</FormLabel><FormControl><Textarea placeholder="Descreva o projeto..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="features" render={({ field }) => (
          <FormItem><FormLabel>Principais Funcionalidades (separadas por vírgula)</FormLabel><FormControl><Textarea placeholder="Interface nativa, Integração com Stripe, etc..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="project_url" render={({ field }) => (
              <FormItem><FormLabel>URL do Projeto (Ver Projeto)</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="code_url" render={({ field }) => (
              <FormItem><FormLabel>URL do Código (Ver Código)</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl><FormMessage /></FormItem> // <-- CORREÇÃO AQUI
            )} />
        </div>
        <FormField control={form.control} name="image_card_file" render={({ field }) => (
          <FormItem><FormLabel>Imagem do Card (capa)</FormLabel><FormControl><Input type="file" accept="image/webp, image/jpeg, image/png" {...form.register("image_card_file")} /></FormControl>{projectToEdit?.image_card_url && <p className="text-xs text-muted-foreground mt-1">Deixe em branco para manter a imagem atual.</p>}<FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="image_modal_file" render={({ field }) => (
          <FormItem><FormLabel>Imagem do Modal (detalhes)</FormLabel><FormControl><Input type="file" accept="image/webp, image/jpeg, image/png" {...form.register("image_modal_file")} /></FormControl>{projectToEdit?.image_modal_url && <p className="text-xs text-muted-foreground mt-1">Deixe em branco para manter a imagem atual.</p>}<FormMessage /></FormItem>
        )} />
        <Button type="submit" disabled={saveProjectMutation.isPending}>
          {saveProjectMutation.isPending ? 'Salvando...' : 'Salvar Projeto'}
        </Button>
      </form>
    </Form>
  );
}