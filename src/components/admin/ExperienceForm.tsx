// src/components/admin/ExperienceForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const experienceSchema = z.object({
  role: z.string().min(3, { message: "O cargo é obrigatório." }),
  company: z.string().optional(),
  years: z.string().optional(),
  description: z.string().optional(),
  achievements: z.string().optional(),
  technologies: z.string().optional(),
  icon: z.string({ required_error: "Selecione um ícone." }),
});

// Converte uma string com quebras de linha em um array
const stringToArrayByNewline = (str: string | undefined) => str ? str.split('\n').map(item => item.trim()).filter(Boolean) : [];

export function ExperienceForm({ experienceToEdit, onFinished }: { experienceToEdit?: any, onFinished: () => void }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: experienceToEdit?.role || "",
      company: experienceToEdit?.company || "",
      years: experienceToEdit?.years || "",
      description: experienceToEdit?.description || "",
      achievements: experienceToEdit?.achievements?.join('\n') || "",
      technologies: experienceToEdit?.technologies?.join('\n') || "",
      icon: experienceToEdit?.icon || undefined,
    },
  });

  const saveExperienceMutation = useMutation({
    mutationFn: async (values: z.infer<typeof experienceSchema>) => {
      const experienceData = {
        ...values,
        achievements: stringToArrayByNewline(values.achievements),
        technologies: stringToArrayByNewline(values.technologies),
      };

      if (experienceToEdit) {
        const { error } = await supabase.from('experiences').update(experienceData).eq('id', experienceToEdit.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('experiences').insert(experienceData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Sucesso!", description: "Experiência salva." });
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      onFinished();
    },
    onError: (error) => {
      toast({ title: "Erro!", description: error.message, variant: "destructive" });
    },
  });

  function onSubmit(values: z.infer<typeof experienceSchema>) {
    saveExperienceMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        <FormField control={form.control} name="role" render={({ field }) => (
          <FormItem><FormLabel>Cargo</FormLabel><FormControl><Input placeholder="Tech Lead & Designer" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem><FormLabel>Empresa</FormLabel><FormControl><Input placeholder="Freelancer" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="years" render={({ field }) => (
              <FormItem><FormLabel>Período</FormLabel><FormControl><Input placeholder="2022 - Atual" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>
        <FormField control={form.control} name="icon" render={({ field }) => (
          <FormItem>
            <FormLabel>Ícone</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecione um ícone para a timeline" /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="Code">Código (Desenvolvimento)</SelectItem>
                <SelectItem value="Network">Rede (Infra/DevOps)</SelectItem>
                <SelectItem value="Palette">Paleta (Design)</SelectItem>
                <SelectItem value="Shield">Escudo (TI/Segurança)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Descrição</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="achievements" render={({ field }) => (
          <FormItem>
            <FormLabel>Principais Conquistas</FormLabel>
            <FormControl><Textarea placeholder="Liste cada conquista em uma nova linha..." {...field} rows={4} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="technologies" render={({ field }) => (
          <FormItem>
            <FormLabel>Tecnologias</FormLabel>
            <FormControl><Textarea placeholder="Liste cada tecnologia em uma nova linha..." {...field} rows={4} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={saveExperienceMutation.isPending}>
          {saveExperienceMutation.isPending ? 'Salvando...' : 'Salvar Experiência'}
        </Button>
      </form>
    </Form>
  );
}