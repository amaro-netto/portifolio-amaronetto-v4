// src/components/admin/CollaboratorForm.tsx (versão final com exclusão de imagem antiga)

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const collaboratorSchema = z.object({
  name: z.string().min(3, { message: "O nome é obrigatório." }),
  subtitle: z.string().min(3, { message: "O subtítulo é obrigatório." }),
  company: z.string().optional(),
  description: z.string().optional(),
  collaboration: z.string().optional(),
  expertise: z.string().optional(),
  social_instagram: z.string().url({ message: "URL do Instagram inválida." }).optional().or(z.literal('')),
  social_whatsapp: z.string().optional(),
  social_email: z.string().email({ message: "Email inválido." }).optional().or(z.literal('')),
  image_file: z.instanceof(FileList).optional(),
});

export function CollaboratorForm({ collaboratorToEdit, onFinished }: { collaboratorToEdit?: any, onFinished: () => void }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof collaboratorSchema>>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: {
      name: collaboratorToEdit?.name || "",
      subtitle: collaboratorToEdit?.subtitle || "",
      company: collaboratorToEdit?.company || "",
      description: collaboratorToEdit?.description || "",
      collaboration: collaboratorToEdit?.collaboration || "",
      expertise: collaboratorToEdit?.expertise || "",
      social_instagram: collaboratorToEdit?.social_instagram || "",
      social_whatsapp: collaboratorToEdit?.social_whatsapp || "",
      social_email: collaboratorToEdit?.social_email || "",
    },
  });

  const saveCollaboratorMutation = useMutation({
    mutationFn: async (values: z.infer<typeof collaboratorSchema>) => {
      let finalImageUrl = collaboratorToEdit?.image_url;

      if (values.image_file && values.image_file.length > 0) {
        // --- NOVA LÓGICA DE EXCLUSÃO ---
        if (collaboratorToEdit?.image_url) {
          const oldFilePath = collaboratorToEdit.image_url.split('/collaborator_images/')[1];
          if (oldFilePath) {
            await supabase.storage.from('collaborator_images').remove([oldFilePath]);
          }
        }
        // --- FIM DA NOVA LÓGICA ---
        
        const file = values.image_file[0];
        const fileName = `${uuidv4()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('collaborator_images').upload(fileName, file);
        if (uploadError) throw new Error(`Erro no upload da imagem: ${uploadError.message}`);
        
        finalImageUrl = supabase.storage.from('collaborator_images').getPublicUrl(fileName).data.publicUrl;
      }

      const collaboratorData = {
        name: values.name,
        subtitle: values.subtitle,
        company: values.company,
        description: values.description,
        collaboration: values.collaboration,
        expertise: values.expertise,
        social_instagram: values.social_instagram,
        social_whatsapp: values.social_whatsapp,
        social_email: values.social_email,
        image_url: finalImageUrl,
      };

      if (collaboratorToEdit) {
        const { error } = await supabase.from('collaborators').update(collaboratorData).eq('id', collaboratorToEdit.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('collaborators').insert(collaboratorData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Colaborador salvo com sucesso." });
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      onFinished();
    },
    onError: (error: any) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  function onSubmit(values: z.infer<typeof collaboratorSchema>) {
    saveCollaboratorMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="subtitle" render={({ field }) => (
              <FormItem><FormLabel>Cargo/Subtítulo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>
        <FormField control={form.control} name="company" render={({ field }) => (
          <FormItem><FormLabel>Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Sobre o Colaborador</FormLabel><FormControl><Textarea placeholder="Parceira em diversos projetos..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="collaboration" render={({ field }) => (
          <FormItem><FormLabel>Nossa Colaboração</FormLabel><FormControl><Textarea placeholder="Trabalhamos juntos há 3 anos..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="expertise" render={({ field }) => (
            <FormItem><FormLabel>Especialidades</FormLabel><FormControl><Input placeholder="Design Systems, Prototipagem, Research UX" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="social_email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="contato@email.com" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <FormField control={form.control} name="social_whatsapp" render={({ field }) => (
            <FormItem><FormLabel>Link do WhatsApp</FormLabel><FormControl><Input placeholder="https://wa.me/..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="social_instagram" render={({ field }) => (
            <FormItem><FormLabel>Link do Instagram</FormLabel><FormControl><Input placeholder="https://instagram.com/..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="image_file" render={({ field }) => (
          <FormItem><FormLabel>Foto</FormLabel><FormControl><Input type="file" accept="image/webp, image/jpeg, image/png" {...form.register("image_file")} /></FormControl>{collaboratorToEdit?.image_url && <p className="text-xs text-muted-foreground mt-1">Deixe em branco para manter a foto atual.</p>}<FormMessage /></FormItem>
        )} />
        <Button type="submit" disabled={saveCollaboratorMutation.isPending}>
          {saveCollaboratorMutation.isPending ? 'Salvando...' : 'Salvar Colaborador'}
        </Button>
      </form>
    </Form>
  );
}