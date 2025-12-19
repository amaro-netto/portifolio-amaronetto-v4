import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ArticlesSection from '@/components/ArticlesSection'; // Importar
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ArticlesSection /> {/* Adicionar a seção */}
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;