// supabase/functions/send-contact-email/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// CORS Headers para permitir que seu site acesse a função
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Responde a requisições pre-flight do navegador (necessário para CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message, token } = await req.json()
    const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY')

    // Faz a requisição para a API do Google para verificar o token
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const recaptchaData = await response.json()

    // Verifica se a resposta do Google foi bem-sucedida e se a pontuação é boa
    // Scores vão de 0.0 (bot) a 1.0 (humano). 0.5 é um bom ponto de corte.
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.warn('Verificação reCAPTCHA falhou:', recaptchaData['error-codes'])
      return new Response(JSON.stringify({ error: 'Você parece ser um robô.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      })
    }

    // Se a verificação passou, aqui você colocaria a lógica para enviar o email.
    // Por enquanto, vamos apenas retornar sucesso.
    console.log(`Mensagem recebida de ${name} (${email}): ${message}`);

    return new Response(JSON.stringify({ message: 'Mensagem recebida com sucesso!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})