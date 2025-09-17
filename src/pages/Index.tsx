import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <CollaboratorsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;