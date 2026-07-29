import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { ShopPage as Shop } from './pages/Shop/Shop';
import { DropsPage as Drops } from './pages/Drops/Drops';
import { AboutPage as About } from './pages/About/About';
import { Footer } from './components/Footer/Footer';
import { SearchOverlay } from './components/Overlays/SearchOverlay';
import { AccountPanel } from './components/Overlays/AccountPanel';
import { CartDrawer } from './components/Overlays/CartDrawer';
import { CheckoutOverlay } from './components/Overlays/CheckoutOverlay';
import { HelpOverlay } from './components/Overlays/HelpOverlay';
import { CartProvider, useCart } from './context/CartContext';
import { Check } from 'lucide-react';
import { IntroExperience } from './components/IntroExperience/IntroExperience';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'drops' | 'about'>('home');
  const [helpTab, setHelpTab] = useState<'returns' | 'size-guide' | 'faq' | null>(null);
  const { toastMessage, toastVisible } = useCart();

  const handleNavigate = (page: string) => {
    if (page === 'home' || page === 'shop' || page === 'drops' || page === 'about') {
      setCurrentPage(page as 'home' | 'shop' | 'drops' | 'about');
    } else {
      setCurrentPage('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#F8F7F5', color: '#111111', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <IntroExperience onEnterComplete={() => {}} />
      
      {/* Noise Grain Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed Top Navbar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onPageChange={handleNavigate} 
        onOpenHelp={(tab) => setHelpTab(tab)} 
      />

      {/* Single Viewport Interactive Visual Index Canvas Homepage */}
      <main>
        {currentPage === 'home' && (
          <HeroSection onCtaClick={() => handleNavigate('shop')} />
        )}

        {currentPage === 'shop' && (
          <Shop />
        )}

        {currentPage === 'drops' && (
          <Drops onNavigateToShop={() => handleNavigate('shop')} />
        )}

        {currentPage === 'about' && (
          <About onNavigateToShop={() => handleNavigate('shop')} />
        )}
      </main>

      {/* Footer only rendered on subpages, keeping Homepage clean full-screen canvas */}
      {currentPage !== 'home' && (
        <Footer 
          currentPage={currentPage}
          onPageChange={handleNavigate}
          onNavigate={handleNavigate}
          onOpenHelp={(tab) => setHelpTab(tab)}
        />
      )}

      {/* Global Interactive Overlays */}
      <SearchOverlay onNavigateToShop={() => handleNavigate('shop')} />
      <AccountPanel />
      <CartDrawer />
      <CheckoutOverlay />
      <HelpOverlay activeTab={helpTab} onClose={() => setHelpTab(null)} setActiveTab={setHelpTab} />

      {/* Global Notification Toast */}
      <div 
        className={`global-toast ${toastVisible ? 'global-toast-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <Check size={14} style={{ color: 'var(--orange)' }} aria-hidden="true" />
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
