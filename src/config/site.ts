export const siteConfig = {
  name: "Amaro Netto",
  title: "Amaro Netto - Soluções em Tecnologia",
  description: "Profissional de TI e Designer Gráfico/Web especializado em soluções tecnológicas para seu negócio.",
  url: "https://amaronetto.dev",
  ogImage: "https://amaronetto.dev/og-image.webp",
  author: {
    name: "Amaro Netto",
    email: "contato@amaronetto.dev",
    social: {
      github: "https://github.com/amaronetto",
      linkedin: "https://linkedin.com/in/amaronetto",
      instagram: "https://instagram.com/amaronetto",
      whatsapp: "https://wa.me/5511999998888"
    }
  },
  admin: {
    // This will be configurable after Supabase connection
    secretPath: "/admin-portal-secreto-2024",
    defaultCredentials: {
      // Will be replaced with Supabase auth
      username: "admin",
      password: "change-me-after-deploy"
    }
  }
};

export const navigationItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'colaboradores', label: 'Colaboradores' },
  { id: 'contato', label: 'Contato' },
];

export const metaTags = {
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  googlebot: "index, follow",
  keywords: [
    "tecnologia", "design", "desenvolvimento web", 
    "TI", "portfolio", "Amaro Netto", "São Paulo",
    "freelancer", "full-stack", "UI/UX", "branding"
  ].join(", ")
};