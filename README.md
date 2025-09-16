# 🚀 Portfolio Amaro Netto - Soluções em Tecnologia

Portfolio profissional desenvolvido com React, TypeScript e Tailwind CSS, com design system completo e otimizações de performance.

## 🎨 Características

- ✅ **Mobile-First & Responsivo**: Design otimizado para todos os dispositivos
- ✅ **Full-Screen Sections**: Cada seção ocupa exatamente a viewport com scroll-snap
- ✅ **Modo Claro/Escuro**: Toggle de tema com suporte ao `prefers-color-scheme`
- ✅ **Performance Otimizada**: Core Web Vitals, lazy loading, WebP/SVG
- ✅ **Acessibilidade WCAG 2.1 AA**: Navegação por teclado, aria-labels, contrastes
- ✅ **SEO Completo**: Meta tags, Open Graph, Schema.org, sitemap.xml
- ✅ **Design System**: Tokens semânticos, gradientes, animações
- ✅ **Microinterações**: Respeitando `prefers-reduced-motion`

## 📱 Seções

1. **Hero** - Apresentação com CTA e certificações
2. **Sobre** - Jornada profissional, habilidades e timeline interativa
3. **Portfólio** - Carrossel de projetos com modais detalhados
4. **Colaboradores** - Cards com flip effect e links sociais
5. **Contato** - Formulário funcional e informações de contato

## 🚀 Instalação e Deploy

### Desenvolvimento Local

```bash
# 1. Clone o repositório
git clone <YOUR_GIT_URL>
cd portfolio-amaronetto

# 2. Instale as dependências
npm install

# 3. Execute em modo desenvolvimento
npm run dev

# 4. Abra no navegador
# http://localhost:8080
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Visualizar preview local do build
npm run preview
```

### Deploy

**Opção 1: Lovable (Recomendado)**
- Clique em "Publish" no painel do Lovable
- Configure domínio personalizado em Project > Settings > Domains

**Opção 2: Netlify/Vercel**
```bash
# Build da aplicação
npm run build

# Deploy da pasta dist/
# Configurar redirects para SPA se necessário
```

**Opção 3: VPS/Servidor**
```bash
# Após build, servir arquivos estáticos
# Nginx example:
server {
    listen 80;
    server_name amaronetto.dev;
    root /var/www/portfolio/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    
    # Cache headers
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Configuração do Backend (Próximos Passos)

Este frontend está pronto para conectar ao backend. Para funcionalidades completas:

### 1. Conectar Supabase
- Clique no botão Supabase no Lovable
- Configure autenticação para painel admin
- Crie tabelas: projects, collaborators, messages, skills

### 2. Painel Administrativo
**URL**: `/admin-portal-secreto-2024` (customizável)
**Login**: Configure no Supabase após conexão

**Funcionalidades do Admin:**
- ✅ Gerenciar projetos (CRUD, upload WebP)
- ✅ Gerenciar colaboradores
- ✅ Visualizar mensagens do formulário
- ✅ Editar conteúdo das seções
- ✅ Configurações SEO e SMTP

### 3. Formulário de Contato
Atualmente com validação frontend. Para funcionar:
- Conecte Supabase
- Configure SMTP ou serviço de email
- Adicione reCAPTCHA (opcional)

## 🎯 Performance & SEO

### Core Web Vitals
- **LCP**: Otimizado com preload de fontes e lazy loading
- **FID**: Componentes eficientes, sem JavaScript desnecessário  
- **CLS**: Layout estável com dimensões fixas

### SEO Implementado
- ✅ Meta tags completas (title, description, keywords)
- ✅ Open Graph + Twitter Cards
- ✅ Schema.org JSON-LD (Person + Organization)
- ✅ Sitemap.xml gerado
- ✅ Robots.txt configurado
- ✅ URLs canônicas

### Otimizações de Imagem
- ✅ WebP para fotos (fallback automático)
- ✅ SVG para ícones e logos
- ✅ Lazy loading com IntersectionObserver
- ✅ Dimensões responsivas

## 🔒 Segurança & Configuração

### Alterar Credenciais Admin
1. Conecte Supabase no Lovable
2. Acesse o painel Supabase
3. Configure Authentication > Users
4. Altere URL admin em `src/config/admin.ts` (após criar)

### Headers de Segurança (Recomendado)
```nginx
# Adicionar ao servidor web
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'";
```

## 🛠 Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Design System customizado
- **UI**: shadcn/ui, Lucide React icons
- **Routing**: React Router DOM
- **Forms**: React Hook Form, Zod validation
- **State**: React Query (TanStack)
- **Animations**: Framer Motion (configurado)
- **Backend Ready**: Supabase integration

## 📞 Suporte

Para questões sobre implementação ou customização:
- **Email**: contato@amaronetto.dev
- **WhatsApp**: +55 (11) 99999-8888
- **GitHub**: github.com/amaronetto

## 📝 Checklist de Deploy

- [ ] Build sem erros (`npm run build`)
- [ ] SSL configurado (HTTPS)
- [ ] Domínio apontando corretamente
- [ ] Gzip/Brotli compression habilitado
- [ ] Headers de cache configurados
- [ ] Sitemap.xml acessível
- [ ] Robots.txt configurado
- [ ] Google Analytics (opcional)
- [ ] Search Console cadastrado
- [ ] Performance teste (Lighthouse)

## 🎨 Customização

O design system permite fácil customização:
- **Cores**: `src/index.css` (HSL values)
- **Tipografia**: Google Fonts no `index.html`
- **Componentes**: `src/components/ui/` (shadcn)
- **Layouts**: `tailwind.config.ts`

---

**Desenvolvido com ❤️ por Amaro Netto**
**Soluções em Tecnologia para seu Negócio**