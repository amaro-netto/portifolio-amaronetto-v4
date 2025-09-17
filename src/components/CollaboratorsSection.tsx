import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Mail, Building, Users } from 'lucide-react';
import collaborator1 from '@/assets/collaborator-1.webp';
import collaborator2 from '@/assets/collaborator-2.webp';
import collaborator3 from '@/assets/collaborator-3.webp';

const CollaboratorsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const collaborators = [
    {
      id: 1,
      name: 'Marina Silva',
      subtitle: 'UX/UI Designer',
      image: collaborator1,
      company: 'Design Studio Pro',
      description: 'Parceira em diversos projetos de design de interfaces e experiência do usuário. Marina traz uma visão única de usabilidade e estética que eleva a qualidade de todos os projetos.',
      collaboration: 'Trabalhamos juntos há 3 anos em mais de 15 projetos, desde startups até grandes corporações. Nossa parceria resultou em designs premiados e alta satisfação dos clientes.',
      expertise: 'Design Systems, Prototipagem, Research UX',
      social: {
        instagram: 'https://instagram.com/marinasilva_ux',
        whatsapp: 'https://wa.me/5511999887766',
        email: 'marina@designstudio.com'
      }
    },
    {
      id: 2,
      name: 'Carlos Roberto',
      subtitle: 'DevOps Engineer',
      image: collaborator2,
      company: 'CloudTech Solutions',
      description: 'Especialista em infraestrutura e deploy de aplicações. Carlos garante que todos os projetos tenham a melhor performance e disponibilidade possível.',
      collaboration: 'Nossa parceria técnica é fundamental para entregar projetos escaláveis. Carlos implementa as melhores práticas de DevOps, garantindo deploys seguros e monitoramento completo.',
      expertise: 'AWS, Docker, Kubernetes, CI/CD',
      social: {
        instagram: 'https://instagram.com/carlos_devops',
        whatsapp: 'https://wa.me/5511888776655',
        email: 'carlos@cloudtech.com'
      }
    },
    {
      id: 3,
      name: 'Ana Paula Costa',
      subtitle: 'Marketing Digital',
      image: collaborator3,
      company: 'Growth Marketing Hub',
      description: 'Estrategista de marketing digital que transforma projetos técnicos em sucessos comerciais. Ana desenvolve campanhas que conectam produtos com seus públicos ideais.',
      collaboration: 'Ana é responsável por levar nossos projetos ao mercado. Sua expertise em growth marketing e análise de dados resulta em campanhas que geram ROI excepcional.',
      expertise: 'Growth Hacking, Analytics, Conversão',
      social: {
        instagram: 'https://instagram.com/anapaulacosta_mkt',
        whatsapp: 'https://wa.me/5511777665544',
        email: 'ana@growthhub.com'
      }
    },
    {
      id: 4,
      name: 'Pedro Henrique',
      subtitle: 'Backend Developer',
      image: collaborator1,
      company: 'API Solutions',
      description: 'Desenvolvedor backend sênior especializado em APIs robustas e escaláveis. Pedro constrói a fundação técnica que sustenta aplicações de alta performance.',
      collaboration: 'Parceiro técnico essencial em projetos full-stack. Pedro desenvolve APIs que são verdadeiras obras de engenharia, sempre pensando em performance e manutenibilidade.',
      expertise: 'Node.js, Python, PostgreSQL, Redis',
      social: {
        instagram: 'https://instagram.com/pedro_backend',
        whatsapp: 'https://wa.me/5511666554433',
        email: 'pedro@apisolutions.com'
      }
    },
    {
      id: 5,
      name: 'Juliana Santos',
      subtitle: 'Product Manager',
      image: collaborator2,
      company: 'Product Excellence',
      description: 'Gerente de produtos com visão estratégica e foco no usuário. Juliana alinha stakeholders e garante que todos os projetos atendam às necessidades reais do mercado.',
      collaboration: 'Juliana lidera a estratégia de produtos em nossos projetos mais complexos. Sua capacidade de transformar ideias em roadmaps claros é fundamental para o sucesso.',
      expertise: 'Strategy, Analytics, Agile, Roadmapping',
      social: {
        instagram: 'https://instagram.com/juliana_pm',
        whatsapp: 'https://wa.me/5511555443322',
        email: 'juliana@productexcellence.com'
      }
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(collaborators.length / itemsPerPage);
  const startIndex = currentIndex * itemsPerPage;
  const visibleCollaborators = collaborators.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setFlippedCard(null); // Reset flipped state when changing page
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setFlippedCard(null); // Reset flipped state when changing page
  };

  const handleCardClick = (collaboratorId: number) => {
    setFlippedCard(flippedCard === collaboratorId ? null : collaboratorId);
  };

  const openSocialLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <section id="colaboradores" className="section-snap bg-background">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="text-left mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            COLABORADORES E <span className="text-primary">CLIENTES</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça as empresas e profissionais com quem trabalho. Juntos, criamos soluções que fazem a diferença no mercado.
          </p>
        </div>

        {/* Collaborators Carousel */}
        <div className="relative">
          {/* Navigation */}
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
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
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

          {/* Collaborators Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[480px]">
            {visibleCollaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="perspective-1000 h-[450px]"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                    flippedCard === collaborator.id ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => handleCardClick(collaborator.id)}
                >
                  {/* Front Card */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden border-0 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardContent className="p-0 h-full">
                      <div className="flex flex-col h-full">
                        {/* Image - 3/4 of card */}
                        <div className="relative h-3/4 overflow-hidden rounded-t-lg">
                          <img
                            src={collaborator.image}
                            alt={collaborator.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Content - 1/4 of card */}
                        <div className="h-1/4 p-4 flex flex-col justify-center">
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {collaborator.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="text-primary font-medium">{collaborator.subtitle}</span>
                            <span className="mx-2">•</span>
                            <span>{collaborator.company}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Back Card */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-0 bg-primary/5 backdrop-blur-sm">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {collaborator.description}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-foreground mb-2">
                            Nossa Colaboração
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {collaborator.collaboration}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-foreground mb-2">
                            Especialidades
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {collaborator.expertise}
                          </p>
                        </div>
                      </div>
                      
                      {/* Social Links */}
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-center space-x-3">
                          <span className="text-sm font-medium text-foreground">Contactar</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => openSocialLink(collaborator.social.instagram, e)}
                            className="p-1.5"
                          >
                            <Instagram className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => openSocialLink(collaborator.social.whatsapp, e)}
                            className="p-1.5"
                          >
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => openSocialLink(`mailto:${collaborator.social.email}`, e)}
                            className="p-1.5"
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setFlippedCard(null);
                }}
                className={`w-2 h-2 rounded-full transition-colors focus-ring ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;