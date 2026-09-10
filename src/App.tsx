import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/storeData';

// Components
import { AnnouncementMarquee } from './components/AnnouncementMarquee';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryTileGrid } from './components/CategoryTileGrid';
import { BestSellers } from './components/BestSellers';
import { QuoteSlider } from './components/QuoteSlider';
import { LifestyleCarousel } from './components/LifestyleCarousel';
import { MarqueeCTAStrip } from './components/MarqueeCTAStrip';
import { PressQuoteSlider } from './components/PressQuoteSlider';
import { EmailSignup } from './components/EmailSignup';
import { InstagramGrid } from './components/InstagramGrid';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { FitQuizModal } from './components/FitQuizModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AccountModal } from './components/AccountModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { BulkOrdersPage } from './pages/BulkOrdersPage';
import { BundleBuilderModal } from './components/BulkOrders/BundleBuilderModal';
import { InfoPage } from './pages/InfoPage';
import { useAuth } from './context/AuthContext';

export function App() {
  const { user, userProfile, createOrderRecord } = useAuth();
  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('banzook_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromoCode, setAppliedPromoCode] = useState<string>(() => {
    return localStorage.getItem('banzook_promo_code') || '';
  });

  // Navigation / Filter State
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [currentRoute, setCurrentRoute] = useState<string>('home');

  // Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [lastOrderNumber, setLastOrderNumber] = useState('');
  
  // Quick View Product
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [bundleBuilderProduct, setBundleBuilderProduct] = useState<Product | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('banzook_cart_items', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to sync cart:', err);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedPromoCode) {
        localStorage.setItem('banzook_promo_code', appliedPromoCode);
      }
    } catch (err) {
      console.error('Failed to sync promo code:', err);
    }
  }, [appliedPromoCode]);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string = 'M', color: string = 'Standard') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color,
          quantity: 1,
          image: product.image
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromoCode = (code: string): boolean => {
    if (code === 'BANZOOK15') {
      setAppliedPromoCode('BANZOOK15');
      return true;
    }
    return false;
  };

  const handleCheckout = () => {
    const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = appliedPromoCode === 'BANZOOK15' ? rawSubtotal * 0.15 : 0;
    const finalSubtotal = rawSubtotal - discountAmount;
    const shippingFee = cartItems.length === 0 ? 0 : 99;
    const grandTotal = finalSubtotal + shippingFee;

    const fallbackId = `BZ-${Math.floor(10000 + Math.random() * 90000)}`;
    setLastOrderNumber(fallbackId);

    // Save order in Firestore via AuthContext
    createOrderRecord({
      customerName: userProfile?.name || user?.displayName || 'Banzook Member',
      shippingAddress: userProfile?.address || 'Standard Delivery Destination',
      phone: userProfile?.phone || '',
      items: cartItems.map((i) => ({
        id: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
        image: i.image
      })),
      subtotal: rawSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: grandTotal,
      status: 'confirmed'
    }).then((createdId) => {
      if (createdId) {
        setLastOrderNumber(createdId.substring(0, 10).toUpperCase());
      }
    });

    setCartItems([]);
    setIsCartOpen(false);
    setIsCheckoutSuccessOpen(true);
  };

  // Category navigation scroll handler
  const handleNavigateCategory = (cat: string) => {
    setActiveCategoryFilter(cat);
    const element = document.getElementById('best-sellers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProductPiece = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setQuickViewProduct(found);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F5F4F1] text-[#111111] selection:bg-[#A35843] selection:text-white flex flex-col font-sans antialiased">
      
      {/* 1. ANNOUNCEMENT MARQUEE BAR */}
      <AnnouncementMarquee
        onPromoClick={(tag) => {
          if (tag.includes('QUIZ')) setIsQuizOpen(true);
        }}
      />

      {/* 2. STICKY HEADER */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigateCategory={handleNavigateCategory}
        onNavigate={(route) => {
          setCurrentRoute(route as 'home' | 'shop' | 'about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MAIN BODY FLOW */}
      <main className="flex-1">
        
        {currentRoute === 'home' ? (
          <>
            {/* 3. HERO: TWO-PANEL SPLIT */}
        <Hero
          onShopNewArrivals={() => handleNavigateCategory('new')}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onExploreDrops={() => handleNavigateCategory('bestsellers')}
        />

        {/* 4. CATEGORY TILES (4 TILES WITH ARROWS) */}
        <CategoryTileGrid
          onSelectCategory={(categoryId) => handleNavigateCategory(categoryId)}
        />

        {/* 5. BEST SELLERS & CORE UNIFORM GRID */}
        <BestSellers
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          activeCategoryFilter={activeCategoryFilter}
          onFilterChange={(cat) => setActiveCategoryFilter(cat)}
        />

        {/* 6. CUSTOMER QUOTE / TESTIMONIAL SLIDER */}
        <QuoteSlider />

        {/* 7. LIFESTYLE SECTION (FOR WORK / FOR WEEKENDS / FOR TRAVEL) */}
        <LifestyleCarousel
          onExplorePiece={handleOpenProductPiece}
          onExploreAll={() => handleNavigateCategory('all')}
        />

        {/* 8. CTA MARQUEE STRIP (FIND YOUR FIT) */}
        <MarqueeCTAStrip
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 9. PRESS QUOTE SECTION (GQ, HIGHSNOBIETY, KINFOLK, HYPEBEAST) */}
        <PressQuoteSlider />

        {/* 11. EMAIL SIGNUP (GET 15% OFF) */}
        <EmailSignup
          onCouponClaimed={(code) => {
            handleApplyPromoCode(code);
          }}
        />

        {/* 12. INSTAGRAM GRID (@BANZOOK.LA) */}
            <InstagramGrid />
          </>
        ) : currentRoute === 'shop' ? (
          <ShopPage 
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        ) : currentRoute === 'about' ? (
          <AboutPage />
        ) : currentRoute === 'bulk-orders' ? (
          <BulkOrdersPage 
            onAddToCart={handleAddToCart}
            onOpenBundle={(p) => setBundleBuilderProduct(p)}
          />
        ) : currentRoute === 'faq' ? (
          <InfoPage title="FAQ" content="Coming Soon. We are working hard to gather the most frequently asked questions." />
        ) : currentRoute === 'returns' ? (
          <InfoPage title="Returns" content="All Sales Final. No Returns or Exchanges.\nPlease review your order carefully before purchasing. Once sold, items cannot be exchanged or returned." />
        ) : currentRoute === 'shipping' ? (
          <InfoPage title="Shipping" content="All orders are processed within 24-48 hours and shipped via express courier tracking.\nStandard delivery takes 3-5 business days." />
        ) : currentRoute === 'care-guide' ? (
          <InfoPage title="Care Guide" content="Machine wash cold with like colors. Tumble dry low. Do not bleach. Cool iron if needed." />
        ) : currentRoute === 'policies' ? (
          <InfoPage title="Store Policies" content="All sales are final. Please review your items carefully before checkout." />
        ) : null}

      </main>

      {/* 13. FOOTER (4 COLUMNS + LOGO + COPYRIGHT) */}
      <Footer
        onNavigateCategory={handleNavigateCategory}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigate={(route) => {
          setCurrentRoute(route);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={handleApplyPromoCode}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setIsSizeGuideOpen(true);
        }}
      />

      {bundleBuilderProduct && (
        <BundleBuilderModal 
          product={bundleBuilderProduct} 
          onClose={() => setBundleBuilderProduct(null)} 
        />
      )}

      <FitQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => {
          setIsQuizOpen(false);
          setQuickViewProduct(p);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onNavigateToShop={() => {
          setCurrentPage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        orderNumber={lastOrderNumber}
      />

    </div>
  );
}
export default App;
