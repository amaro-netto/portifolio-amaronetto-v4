import { useMemo } from 'react';
import {
  Code2,
  Palette,
  LayoutTemplate,
  PenTool,
  SearchCheck,
  Megaphone,
  BriefcaseBusiness,
  BarChart3,
} from 'lucide-react';

type Service = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

const ServicesSection = () => {
  const services = useMemo<Service[]>(
    () => [
      {
        id: 'web-dev',
        title: 'Desenvolvimento Web',
        icon: Code2,
        description: 'Sites, landing pages, sistemas e aplicações sob medida com foco em performance e conversão.',
      },
      {
        id: 'graphic-design',
        title: 'Design Gráfico',
        icon: Palette,
        description: 'Materiais visuais, identidade e peças digitais com linguagem mais profissional e consistente.',
      },
      {
        id: 'ui-ux',
        title: 'UI/UX e Web Design',
        icon: LayoutTemplate,
        description: 'Interfaces modernas, organizadas e pensadas para transmitir clareza, confiança e usabilidade.',
      },
      {
        id: 'branding',
        title: 'Branding e Identidade',
        icon: PenTool,
        description: 'Criação e refinamento de presença visual para marcas, serviços e posicionamento profissional.',
      },
      {
        id: 'seo',
        title: 'SEO e Conteúdo',
        icon: SearchCheck,
        description: 'Estruturação de páginas e conteúdo para melhorar presença digital e visibilidade orgânica.',
      },
      {
        id: 'marketing',
        title: 'Planejamento Digital',
        icon: Megaphone,
        description: 'Estratégia para comunicação, presença online, páginas institucionais e funis de contato.',
      },
      {
        id: 'consulting',
        title: 'Consultoria de Negócio',
        icon: BriefcaseBusiness,
        description: 'Apoio técnico e estratégico para decisões, estruturação de processos e melhoria operacional.',
      },
      {
        id: 'analytics',
        title: 'Análise de Dados',
        icon: BarChart3,
        description: 'Leitura de indicadores, organização de informações e apoio à tomada de decisão com dados.',
      },
    ],
    []
  );

  return (
    <section
      id="servicos"
      className="section-snap scroll-mt-16 border-t border-white/10 bg-transparent"
    >
      <div className="container mx-auto h-[100svh] px-4 py-[clamp(24px,4vh,40px)]">
        <div className="mx-auto flex h-full max-w-[1380px] flex-col justify-center">
          <div className="mb-[clamp(22px,4vh,42px)] text-center">
            <p className="mb-3 text-[clamp(11px,1.1vw,13px)] font-semibold uppercase tracking-[0.34em] text-[#D5D9DC]/80">
              O que eu entrego
            </p>

            <h2 className="font-display text-[clamp(28px,4vw,56px)] font-bold leading-[0.95] text-white">
              SOLUÇÕES E <span className="text-[#4D8DFF]">SERVIÇOS</span>
            </h2>

            <p className="mx-auto mt-5 max-w-[820px] text-[clamp(14px,1.2vw,18px)] leading-relaxed text-[#D5D9DC]/78">
              Uma seção pensada para apresentar com clareza as frentes em que posso atuar,
              mantendo o mesmo padrão visual refinado das outras áreas do portfólio.
            </p>
          </div>

          <div className="grid flex-1 auto-rows-fr gap-[clamp(14px,1.6vw,22px)] sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0A1422]/88 p-[clamp(18px,1.8vw,24px)] shadow-[0_16px_42px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4D8DFF]/35 hover:shadow-[0_22px_50px_rgba(0,0,0,0.28)]"
                >
                  <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[1px] transition-transform duration-300 group-hover:scale-110" />
                  <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                  <div className="relative flex h-full flex-col items-center text-center">
                    <div className="mb-[clamp(18px,2.3vh,26px)] flex h-[clamp(58px,6vw,72px)] w-[clamp(58px,6vw,72px)] items-center justify-center rounded-[20px] border border-[#ff6b4a]/20 bg-[#15181C] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 group-hover:border-[#ff6b4a]/35 group-hover:bg-[#181c21]">
                      <Icon className="h-[clamp(22px,2.3vw,30px)] w-[clamp(22px,2.3vw,30px)] text-[#ff6b4a]" />
                    </div>

                    <h3 className="min-h-[2.8em] text-[clamp(16px,1.35vw,22px)] font-bold leading-tight text-white">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-[clamp(12px,0.98vw,14px)] leading-relaxed text-[#D5D9DC]/72">
                      {service.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
