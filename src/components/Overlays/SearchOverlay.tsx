import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';
import styles from './Overlays.module.css';

interface SearchOverlayProps {
  onNavigateToShop: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onNavigateToShop }) => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen]);

  // Escape key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  // Handle typing search
  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter((product) => {
      const q = val.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.collection.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
      );
    });
    setResults(filtered);
  };

  const handleReset = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const handleProductSelect = (product: Product) => {
    setIsSearchOpen(false);
    onNavigateToShop();
    setTimeout(() => {
      const el = document.getElementById(`prod-card-${product.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Trigger visual highlight by adding a class temporary
        el.classList.add('highlight-flash');
        setTimeout(() => el.classList.remove('highlight-flash'), 2000);
      }
    }, 300);
  };

  if (!isSearchOpen) return null;

  return (
    <div className={styles.overlayContainer} onClick={() => setIsSearchOpen(false)}>
      <div className={styles.searchPanel} onClick={(e) => e.stopPropagation()}>
        {/* Header bar */}
        <header className={styles.panelHeader}>
          <div className={styles.headerLabel}>SEARCH BANZOOK</div>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search overlay"
          >
            <X size={22} />
          </button>
        </header>

        {/* Input Bar */}
        <div className={styles.searchBarContainer}>
          <Search size={22} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="WHAT ARE YOU LOOKING FOR?"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button className={styles.clearBtn} onClick={handleReset}>
              CLEAR
            </button>
          )}
        </div>

        {/* Body Area */}
        <div className={styles.panelBody}>
          {query && results.length === 0 ? (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>NOTHING FOUND.</h3>
              <p className={styles.emptySub}>TRY A DIFFERENT DIRECTION.</p>
              <button className="btn-secondary" onClick={handleReset}>
                RESET SEARCH
              </button>
            </div>
          ) : query ? (
            <div className={styles.resultsGrid}>
              <h4 className={styles.resultsHeader}>
                SEARCH RESULTS ({results.length})
              </h4>
              <div className={styles.resultsList}>
                {results.map((product) => {
                  const isSoldOut = product.availability === 'sold-out';
                  return (
                    <div key={product.id} className={styles.resultItem}>
                      <div 
                        className={styles.resultImageWrapper}
                        onClick={() => handleProductSelect(product)}
                      >
                        <img src={product.images[0]} alt={product.name} />
                      </div>
                      <div className={styles.resultDetails}>
                        <span className={styles.resultCollection}>{product.collection}</span>
                        <h4 
                          className={styles.resultName}
                          onClick={() => handleProductSelect(product)}
                        >
                          {product.name}
                        </h4>
                        <span className={styles.resultPrice}>
                          {isSoldOut ? 'SOLD OUT' : `₹${product.price.toLocaleString('en-IN')}`}
                        </span>

                        {/* Quick Size selection block directly in search overlay */}
                        {!isSoldOut && (
                          <div className={styles.quickAddBlock}>
                            <span className={styles.quickAddLabel}>QUICK BAG:</span>
                            <div className={styles.quickSizes}>
                              {product.sizes.map((size) => (
                                <button
                                  key={size}
                                  className={styles.quickSizeBtn}
                                  onClick={() => addToCart(product, size)}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.searchSuggestions}>
              <h4 className={styles.suggestHeader}>SUGGESTED FILTERS</h4>
              <div className={styles.suggestPills}>
                {['TEE', 'HOODIE', 'CAP', 'DROP 001', 'ACCESSORIES'].map((sug) => (
                  <button
                    key={sug}
                    className={styles.suggestPill}
                    onClick={() => handleSearch(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
