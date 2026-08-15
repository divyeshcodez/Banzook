import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/Home/HomePage';
import { ShopPage as Shop } from './pages/Shop/Shop';
import { DropsPage as Drops } from './pages/Drops/Drops';
import { AboutPage as About } from './pages/About/About';
import { B2BPage } from './pages/B2B/B2BPage';
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
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'drops' | 'about' | 'b2b'>('home');
  const [helpTab, setHelpTab] = useState<'returns' | 'size-guide' | 'faq' | null>(null);
  const { toastMessage, toastVisible } = useCart();

  const handleNavigate = (page: string) => {
    if (page === 'home' || page === 'shop' || page === 'drops' || page === 'about' || page === 'b2b') {
      setCurrentPage(page as 'home' | 'shop' | 'drops' | 'about' | 'b2b');
    } else {
      setCurrentPage('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0B0B0C] text-white min-h-screen w-full relative">
      <IntroExperience onEnterComplete={() => {}} />
      
      {/* Noise Grain Overlay (Optimized for performance) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-repeat" style={{ backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAABZWVlpaWl2dnZ+fn6Kioqenp4I4n5BAAAABnRSTlMAAAAAAABupgeOAAAAwklEQVR4AWMAghSRAyEEU1sYhUAFiRkYgQwmBkYGA4YghlADBiYGxgQGlmCGIKYgBhYmBvYAhoCGMKYgBuYIhtCGMKYgBnYmBvcAhrCGMKYgBlYmBh8gQ1hDGCOYmBmYQBjIGsIYwRTBDOaQhrCmMHEzgTGEM1BDWDmYmJgYTAAFIYyhDGHiZgJjCGcIawgTNzMwARmCGMKawozNBGIMYQphDWFiZGBiCGcIYwhrCBMjA3MIawozFBMzM7AhjCkYQxoAAN/3i56x+B8eAAAAAElFTkSuQmCC")' }} aria-hidden="true" />

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
          <HomePage onNavigateToShop={() => handleNavigate('shop')} onNavigateToB2B={() => handleNavigate('b2b')} />
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

        {currentPage === 'b2b' && (
          <B2BPage />
        )}
      </main>

      {/* Footer rendered globally */}
      <Footer 
        currentPage={currentPage}
        onPageChange={handleNavigate}
        onNavigate={handleNavigate}
        onOpenHelp={(tab) => setHelpTab(tab)}
      />

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
