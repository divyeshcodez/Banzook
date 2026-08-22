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
import { VideoTestimonials } from './components/VideoTestimonials';
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

export function App() {
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
    const randomOrderId = `BZ-${Math.floor(10000 + Math.random() * 90000)}`;
    setLastOrderNumber(randomOrderId);
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
      />

      {/* MAIN BODY FLOW */}
      <main className="flex-1">
        
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

        {/* 10. UGC / VIDEO STYLE CHECKS */}
        <VideoTestimonials
          onAddToCart={(p, size) => handleAddToCart(p, size)}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 11. EMAIL SIGNUP (GET 15% OFF) */}
        <EmailSignup
          onCouponClaimed={(code) => {
            handleApplyPromoCode(code);
          }}
        />

        {/* 12. INSTAGRAM GRID (@BANZOOK.LA) */}
        <InstagramGrid />

      </main>

      {/* 13. FOOTER (4 COLUMNS + LOGO + COPYRIGHT) */}
      <Footer
        onNavigateCategory={handleNavigateCategory}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
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
