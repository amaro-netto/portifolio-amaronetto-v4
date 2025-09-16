import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Eye } from 'lucide-react';
import project1 from '@/assets/project-1.webp';
import project2 from '@/assets/project-2.webp';
import project3 from '@/assets/project-3.webp';

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Dashboard Analytics Pro',
      image: project1,
      tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
      type: 'Web Application',
      year: '2024',
      description: 'Plataforma completa de analytics com visualizações de dados em tempo real. Sistema desenvolvido para grandes empresas que precisam monitorar KPIs críticos e tomar decisões baseadas em dados. Inclui dashboards personalizáveis, relatórios automatizados e integração com múltiplas fontes de dados.',
      features: [
        'Dashboard em tempo real com WebSocket',
        'Visualizações interativas com D3.js',
        'Sistema de alertas personalizáveis',
        'Exportação de relatórios em PDF/Excel',
        'API REST completa e documentada',
        'Autenticação OAuth2 e controle de acesso'
      ],
      projectUrl: 'https://dashboard-demo.amaronetto.dev',
      codeUrl: 'https://github.com/amaronetto/dashboard-pro',
      status: 'live'
    },
    {
      id: 2,
      title: 'E-commerce Mobile App',
      image: project2,
      tags: ['React Native', 'Redux', 'Firebase', 'Stripe'],
      type: 'Mobile Application',
      year: '2024',
      description: 'Aplicativo móvel de e-commerce completo com experiência de usuário excepcional. Desenvolvido com foco em performance e conversão, inclui recursos avançados como recomendações personalizadas, chat em tempo real e sistema de pagamentos integrado.',
      features: [
        'Interface nativa para iOS e Android',
        'Carrinho de compras offline-first',
        'Integração completa com Stripe',
        'Push notifications personalizadas',
        'Sistema de reviews e avaliações',
        'Rastreamento de entregas em tempo real'
      ],
      projectUrl: 'https://app.store/ecommerce-app',
      codeUrl: 'https://github.com/amaronetto/ecommerce-mobile',
      status: 'live'
    },
    {
      id: 3,
      title: 'Corporate Branding System',
      image: project3,
      tags: ['Adobe CC', 'Figma', 'Brand Design', 'Print'],
      type: 'Brand Identity',
      year: '2023',
      description: 'Sistema completo de identidade visual para empresa multinacional. Projeto que envolveu desde a criação do logo até a aplicação em todos os materiais corporativos. Desenvolvido com foco na consistência da marca em todos os pontos de contato.',
      features: [
        'Logo e identidade visual completa',
        'Manual de marca de 80+ páginas',
        'Templates para materiais impressos',
        'Iconografia personalizada',
        'Paleta de cores estratégica',
        'Aplicação em materiais digitais'
      ],
      projectUrl: 'https://behance.net/amaronetto/corporate',
      codeUrl: 'https://behance.net/amaronetto/brand-system',
      status: 'live'
    },
    // Add more projects for demonstration
    {
      id: 4,
      title: 'SaaS Platform Architecture',
      image: project1,
      tags: ['Next.js', 'PostgreSQL', 'AWS', 'Docker'],
      type: 'Full-Stack Platform',
      year: '2023',
      description: 'Arquitetura completa de plataforma SaaS escalável para gerenciamento de projetos. Sistema multi-tenant com alta disponibilidade e performance otimizada para grandes volumes de dados.',
      features: [
        'Arquitetura multi-tenant',
        'Auto-scaling com AWS',
        'CI/CD pipeline completo',
        'Monitoramento e alertas',
        'API GraphQL performática',
        'Backup automatizado'
      ],
      projectUrl: 'https://saas-demo.amaronetto.dev',
      codeUrl: 'https://github.com/amaronetto/saas-platform',
      status: 'live'
    },
    {
      id: 5,
      title: 'AI-Powered Chat Bot',
      image: project2,
      tags: ['Python', 'TensorFlow', 'FastAPI', 'WebSocket'],
      type: 'AI Application',
      year: '2023',
      description: 'Chatbot inteligente com processamento de linguagem natural para atendimento ao cliente. Integração com modelos de AI para respostas contextuais e aprendizado contínuo.',
      features: [
        'NLP avançado para PT/EN',
        'Integração com ChatGPT API',
        'Dashboard de analytics',
        'Treinamento personalizado',
        'WebSocket para tempo real',
        'Integração com CRM'
      ],
      projectUrl: 'https://chatbot-demo.amaronetto.dev',
      codeUrl: 'https://github.com/amaronetto/ai-chatbot',
      status: 'live'
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = currentIndex * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openProject = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="portfolio" className="section-snap bg-muted/30">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="text-left mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            MEU <span className="text-primary">PORTFÓLIO</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Aqui estão alguns dos projetos destacados que desenvolvi, desde aplicações web complexas até sistemas de identidade visual completos.
          </p>
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              disabled={totalPages <= 1}
              className="focus-ring"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={totalPages <= 1}
              className="focus-ring"
            >
              Próximo
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[350px]">
            {visibleProjects.map((project) => (
              <Card 
                key={project.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm h-[320px] flex flex-col"
                onClick={() => openProject(project.id)}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ aspectRatio: '4/3' }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">Ver Detalhes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {project.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors focus-ring ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProjectData && (
          <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProjectData.title}
                </DialogTitle>
                <DialogDescription className="flex items-center space-x-4 text-base">
                  <Badge>{selectedProjectData.type}</Badge>
                  <span>{selectedProjectData.year}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Image */}
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedProjectData.image}
                    alt={selectedProjectData.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* About the Project */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Sobre o Projeto</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProjectData.description}
                  </p>
                </div>
                
                {/* Features */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Principais Funcionalidades</h3>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {selectedProjectData.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button
                    onClick={() => window.open(selectedProjectData.projectUrl, '_blank')}
                    className="flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Projeto
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(selectedProjectData.codeUrl, '_blank')}
                    className="flex-1"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Ver Código
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;