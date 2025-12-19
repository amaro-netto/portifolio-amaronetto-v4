import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import PortfolioSection from '@/components/PortfolioSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
// Footer removido daqui
import { SkipLink } from '@/components/SkipLink';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <Header />
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <PortfolioSection />
        <ArticlesSection />
        <ContactSection /> {/* O Footer agora vive aqui dentro */}
      </main>
      
      {/* <Footer />  <-- REMOVIDO DAQUI */}
    </div>
  );
};

export default Index;