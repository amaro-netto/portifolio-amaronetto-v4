import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection'; // Importar Nova Seção
import PortfolioSection from '@/components/PortfolioSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { SkipLink } from '@/components/SkipLink';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <Header />
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <AboutSection />
        <ExperienceSection /> {/* Adicionar Nova Seção aqui */}
        <PortfolioSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;