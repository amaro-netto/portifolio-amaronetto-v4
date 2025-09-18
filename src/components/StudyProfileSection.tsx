import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GraduationCap, Award, BookOpen, Zap } from 'lucide-react';
import amaroPortrait from '@/assets/amaro-portrait2.webp';

const StudyProfileSection = () => {
  const learningPlatforms = [
    { 
      name: 'AWS Academy', 
      icon: '/placeholder.svg', 
      url: 'https://aws.amazon.com/certification/'
    },
    { 
      name: 'Google Cloud', 
      icon: '/placeholder.svg', 
      url: 'https://cloud.google.com/certification'
    },
    { 
      name: 'Microsoft Learn', 
      icon: '/placeholder.svg', 
      url: 'https://docs.microsoft.com/learn/'
    },
    { 
      name: 'Coursera', 
      icon: '/placeholder.svg', 
      url: 'https://coursera.org'
    },
    { 
      name: 'Udemy', 
      icon: '/placeholder.svg', 
      url: 'https://udemy.com'
    },
    { 
      name: 'Alura', 
      icon: '/placeholder.svg', 
      url: 'https://alura.com.br'
    },
    { 
      name: 'Rocketseat', 
      icon: '/placeholder.svg', 
      url: 'https://rocketseat.com.br'
    },
    { 
      name: 'Pluralsight', 
      icon: '/placeholder.svg', 
      url: 'https://pluralsight.com'
    }
  ];


  return (
    <section id="estudos" className="section-snap bg-background">
      <div className="container mx-auto px-4 py-20 h-full">
        <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
          {/* Left Column - Study Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                PERFIL DE <span className="text-primary">ESTUDOS</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 text-justify">
                O aprendizado contínuo é o coração da minha carreira. Mantenho-me sempre 
                atualizado com as últimas tecnologias e tendências através de diversas 
                plataformas de ensino e certificações reconhecidas mundialmente.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 text-justify">
                Acredito que a evolução profissional vem do equilíbrio entre teoria sólida 
                e prática constante. Por isso, invisto tempo em cursos, bootcamps, 
                certificações e projetos pessoais que desafiam minhas habilidades.
              </p>
            </div>


            {/* Learning Platforms */}
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                PLATAFORMAS DE APRENDIZADO
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                {learningPlatforms.map((platform) => (
                  <div 
                    key={platform.name} 
                    className="cursor-pointer hover:scale-105 transition-all duration-300 group text-center"
                    onClick={() => window.open(platform.url, '_blank')}
                  >
                    <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-lg shadow-md flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                      <img 
                        src={platform.icon} 
                        alt={`${platform.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium text-foreground">{platform.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 transform scale-100"></div>
              
              <div className="relative w-80 h-[480px] lg:w-96 lg:h-full overflow-hidden">
                <img 
                  src={amaroPortrait} 
                  alt="Amaro Neto - Perfil de Estudos" 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyProfileSection;