import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import type { OffcutProduct } from '../../data/offcutProducts';
import styles from './OffcutCartDrawer.module.css';

export interface CartItem {
  product: OffcutProduct;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string, size: string) => void;
  onUpdateQuantity: (productId: string, size: string, qty: number) => void;
  onCheckout: () => void;
}

export const OffcutCartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className={styles.header}>
          <div>
            <span className="font-mono-spec" style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>
              // BATCH RESERVATION
            </span>
            <h3 className={styles.title}>YOUR BAG ({items.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close bag">
            <X size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className={styles.itemsList}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <span className="font-mono-spec" style={{ fontSize: '0.85rem', color: 'var(--muted-grey)' }}>
                YOUR BAG IS EMPTY.
              </span>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Select a piece from Current Batch #001 to reserve your unit.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className={styles.itemCard}>
                <img 
                  src={item.product.staticImage} 
                  alt={item.product.name} 
                  className={styles.itemImg} 
                />
                
                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <span className="font-mono-spec" style={{ fontSize: '0.65rem', color: 'var(--accent-red)' }}>
                      {item.product.batchNumber}
                    </span>
                    <button 
                      className={styles.removeBtn}
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <h4 className={styles.itemName}>{item.product.name}</h4>
                  
                  <div className={styles.itemMeta}>
                    <span className="font-mono-spec">SIZE: {item.size}</span>
                    <span className="font-mono-spec">{item.product.gsm}</span>
                  </div>

                  <div className={styles.itemFooter}>
                    <div className={styles.qtyRow}>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="font-mono-spec">{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono-spec" style={{ fontWeight: 700, color: 'var(--accent-red)' }}>
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span className="font-mono-spec" style={{ color: 'var(--muted-grey)' }}>SUBTOTAL</span>
              <span className="font-mono-spec" style={{ fontSize: '1.1rem', color: 'var(--text-bone)', fontWeight: 700 }}>
                ${subtotal}
              </span>
            </div>

            <p className="font-mono-spec" style={{ fontSize: '0.65rem', color: 'var(--muted-grey)', margin: '0.5rem 0 1.25rem 0' }}>
              TAXES & SHIPPING CALCULATED AT CHECKOUT • LA DISPATCH
            </p>

            <button className="btn-red" style={{ width: '100%' }} onClick={onCheckout}>
              <span>CLAIM & PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
