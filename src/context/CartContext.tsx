import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  toastMessage: string;
  toastVisible: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  clearCart: () => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  triggerToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('banzook_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('banzook_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    const hasUser = localStorage.getItem('banzook_user');
    if (!hasUser) {
      setIsAccountOpen(true);
      triggerToast('PLEASE SIGN IN TO ADD ITEMS TO BAG ⚠');
      return;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { product, size, quantity }];
    });

    triggerToast(`ADDED TO BAG: ${product.name} (${size}) ✓`);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // Derived counts
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  // Focus management rules: only one global overlay open at a time
  const handleSetCartOpen = (open: boolean) => {
    if (open) {
      setIsSearchOpen(false);
      setIsAccountOpen(false);
      setIsCheckoutOpen(false);
    }
    setIsCartOpen(open);
  };

  const handleSetSearchOpen = (open: boolean) => {
    if (open) {
      setIsCartOpen(false);
      setIsAccountOpen(false);
      setIsCheckoutOpen(false);
    }
    setIsSearchOpen(open);
  };

  const handleSetAccountOpen = (open: boolean) => {
    if (open) {
      setIsCartOpen(false);
      setIsSearchOpen(false);
      setIsCheckoutOpen(false);
    }
    setIsAccountOpen(open);
  };

  const handleSetCheckoutOpen = (open: boolean) => {
    if (open) {
      setIsCartOpen(false);
      setIsSearchOpen(false);
      setIsAccountOpen(false);
    }
    setIsCheckoutOpen(open);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen: handleSetCartOpen,
        isSearchOpen,
        setIsSearchOpen: handleSetSearchOpen,
        isAccountOpen,
        setIsAccountOpen: handleSetAccountOpen,
        isCheckoutOpen,
        setIsCheckoutOpen: handleSetCheckoutOpen,
        toastMessage,
        toastVisible,
        addToCart,
        clearCart,
        removeFromCart,
        updateQuantity,
        triggerToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
