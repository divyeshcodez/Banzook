import React, { useEffect } from 'react';
import { X, Trash2, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Overlays.module.css';

export const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    cartSubtotal, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart,
    triggerToast,
    setIsCheckoutOpen,
    setIsAccountOpen
  } = useCart();

  // Escape key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const handleCheckout = () => {
    const hasUser = localStorage.getItem('banzook_user');
    if (!hasUser) {
      setIsCartOpen(false);
      setIsAccountOpen(true);
      triggerToast('PLEASE SIGN IN TO CHECKOUT ⚠');
      return;
    }
    setIsCheckoutOpen(true);
  };

  if (!isCartOpen) return null;

  return (
    <div className={styles.overlayContainer} onClick={() => setIsCartOpen(false)}>
      <div className={styles.cartPanel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={styles.panelHeader}>
          <div className={styles.headerLabel}>
            YOUR BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
          </div>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Shopping Bag"
          >
            <X size={22} />
          </button>
        </header>

        {/* Body (List items) */}
        <div className={styles.cartBody}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCartState}>
              <h3 className={styles.emptyCartTitle}>YOUR BAG IS EMPTY.</h3>
              <p className={styles.emptyCartSub}>CHOOSE SILHOUETTES THAT CLAIM SPACE.</p>
              <button 
                className="btn-primary" 
                onClick={() => setIsCartOpen(false)}
              >
                CONTINUE BROWSING
              </button>
            </div>
          ) : (
            <div className={styles.cartItemsList}>
              {cartItems.map((item, idx) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div key={`${item.product.id}-${item.size}-${idx}`} className={styles.cartItemRow}>
                    <div className={styles.cartItemImgWrapper}>
                      <img src={item.product.images[0]} alt={item.product.name} />
                    </div>
                    <div className={styles.cartItemDetails}>
                      <div className={styles.cartItemHeader}>
                        <h4 className={styles.cartItemName}>{item.product.name}</h4>
                        <button 
                          className={styles.cartItemRemoveBtn}
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          aria-label={`Remove ${item.product.name} size ${item.size} from bag`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className={styles.cartItemSize}>SIZE: {item.size}</span>
                      
                      <div className={styles.cartItemFooter}>
                        {/* Quantity adjusters */}
                        <div className={styles.quantityAdjuster}>
                          <button 
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className={styles.qtyVal}>{item.quantity}</span>
                          <button 
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <span className={styles.cartItemPrice}>
                          ₹{itemTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer subtotal & checkout */}
        {cartItems.length > 0 && (
          <footer className={styles.cartFooter}>
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>SUBTOTAL</span>
              <span className={styles.subtotalPrice}>
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className={styles.shippingNotice}>
              TAXES AND SHIPPING CALCULATED AT CHECKOUT.
            </p>
            <button className={`${styles.checkoutBtn} btn-primary`} onClick={handleCheckout}>
              PROCEED TO CHECKOUT <ArrowUpRight size={16} style={{ marginLeft: '6px' }} />
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
