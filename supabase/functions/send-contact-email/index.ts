// supabase/functions/send-contact-email/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message, token } = await req.json()
    const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY')

    if (!secretKey) {
      throw new Error('Chave secreta do reCAPTCHA não configurada.')
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    })

    const recaptchaData = await response.json()

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.warn('Verificação reCAPTCHA falhou:', recaptchaData['error-codes'])
      return new Response(JSON.stringify({ error: 'Você parece ser um robô.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      })
    }

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