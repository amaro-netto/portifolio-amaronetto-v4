import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import CollaboratorsSection from '@/components/CollaboratorsSection';
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
        <CollaboratorsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;