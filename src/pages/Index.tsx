import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { SkipLink } from '@/components/SkipLink'; // Importe aqui

const Index = () => {
  return (
    <div className="min-h-screen">
      <SkipLink /> {/* Adicione aqui no topo */}
      <Header />
      
      {/* Adicione o ID "main-content" aqui para o link funcionar */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;