import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { B2BCategory } from '../../data/b2bData';
import styles from './B2B.module.css';

interface ConfiguratorProps {
  product: B2BCategory;
}

interface SizeBreakdown {
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

const emptySizes: SizeBreakdown = { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };

export const B2BConfigurator: React.FC<ConfiguratorProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<string>('');
  const [gsm, setGsm] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<{ name: string; hex: string }[]>([]);
  const [sizeMatrix, setSizeMatrix] = useState<Record<string, SizeBreakdown>>({});
  
  const [customization, setCustomization] = useState<string>('');
  const [frontDesign, setFrontDesign] = useState('');
  const [backDesign, setBackDesign] = useState('');
  // const [sleeveDesign, setSleeveDesign] = useState('');
  
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orgType, setOrgType] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [city, setCity] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize/cleanup size matrix when colors change
  useEffect(() => {
    const newMatrix = { ...sizeMatrix };
    selectedColors.forEach(c => {
      if (!newMatrix[c.name]) newMatrix[c.name] = { ...emptySizes };
    });
    // Remove unselected
    Object.keys(newMatrix).forEach(key => {
      if (!selectedColors.find(c => c.name === key)) {
        delete newMatrix[key];
      }
    });
    // If no colors selected but sizes are needed, create a "Default" row
    if (selectedColors.length === 0) {
      newMatrix['Default'] = newMatrix['Default'] || { ...emptySizes };
    } else {
      delete newMatrix['Default'];
    }
    setSizeMatrix(newMatrix);
  }, [selectedColors]);

  const handleColorToggle = (color: { name: string; hex: string }) => {
    if (selectedColors.find(c => c.name === color.name)) {
      setSelectedColors(selectedColors.filter(c => c.name !== color.name));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeChange = (colorName: string, size: keyof SizeBreakdown, value: string) => {
    const num = parseInt(value, 10) || 0;
    setSizeMatrix(prev => ({
      ...prev,
      [colorName]: {
        ...prev[colorName],
        [size]: num
      }
    }));
  };

  const totalSizesAssigned = Object.values(sizeMatrix).reduce((acc, row) => {
    return acc + row.S + row.M + row.L + row.XL + row.XXL;
  }, 0);

  const parsedQty = parseInt(quantity, 10) || 0;
  const isQtyValid = parsedQty >= product.moq;
  const isSizesValid = parsedQty > 0 && totalSizesAssigned === parsedQty;

  const handleSubmit = () => {
    if (!isQtyValid || !isSizesValid || !gsm || !customization || !email || !phone) {
      alert("Please check all required fields and ensure size allocation matches total quantity.");
      return;
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className={styles.configContainer}>
        <div className={styles.successMessage}>
          <h2 className={styles.sectionTitle} style={{ border: 'none', marginBottom: '16px' }}>Bulk Quote Request Submitted</h2>
          <p style={{ color: 'var(--muted-grey)' }}>Thank you. Our team will review your requirements and contact you with a quotation shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.configContainer}>
      {/* Left Column: Form Sections */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Product Details</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Selected Product</label>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-bone)' }}>{product.name}</div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Total Quantity (Pieces)</label>
            <input 
              type="number" 
              className={styles.input} 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              placeholder={`Min. ${product.moq} pieces`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted-grey)' }}>MOQ: {product.moq}</span>
              {quantity && !isQtyValid && (
                <span className={styles.errorText}>Minimum order quantity is {product.moq} pieces.</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fabric GSM</label>
            <div className={styles.flexOptions}>
              {product.availableGsm.map(val => (
                <button 
                  key={val}
                  className={`${styles.pillButton} ${gsm === val ? styles.active : ''}`}
                  onClick={() => setGsm(val)}
                >
                  {val} GSM
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Colors & Sizes</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Select Colors (Multiple allowed)</label>
            <div className={styles.colorGrid}>
              {product.availableColors.map(color => (
                <button
                  key={color.name}
                  className={`${styles.colorButton} ${selectedColors.find(c => c.name === color.name) ? styles.active : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorToggle(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Size Breakdown (S, M, L, XL, XXL)</label>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.sizeMatrix}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Color</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>XXL</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(sizeMatrix).map(rowKey => (
                    <tr key={rowKey}>
                      <td style={{ color: 'var(--text-bone)', fontSize: '0.9rem', textAlign: 'left' }}>{rowKey}</td>
                      {(['S', 'M', 'L', 'XL', 'XXL'] as Array<keyof SizeBreakdown>).map(sz => (
                        <td key={sz}>
                          <input 
                            type="number" 
                            min="0"
                            className={styles.sizeInput} 
                            value={sizeMatrix[rowKey][sz] || ''}
                            onChange={(e) => handleSizeChange(rowKey, sz, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: isSizesValid ? '#4CAF50' : 'var(--muted-grey)' }}>
                Allocated: {totalSizesAssigned} / {parsedQty} pieces
              </span>
              {parsedQty > 0 && !isSizesValid && (
                <span className={styles.errorText}>Your size breakdown totals {totalSizesAssigned} pieces. Please allocate all {parsedQty} pieces.</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Customization</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Printing / Embroidery Method</label>
            <div className={styles.flexOptions}>
              {product.availableCustomizations.map(opt => (
                <button 
                  key={opt}
                  className={`${styles.pillButton} ${customization === opt ? styles.active : ''}`}
                  onClick={() => setCustomization(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Front Design Details</label>
            <input type="text" className={styles.input} value={frontDesign} onChange={e => setFrontDesign(e.target.value)} placeholder="E.g. Center chest logo, 4x4 inches" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Back Design Details</label>
            <input type="text" className={styles.input} value={backDesign} onChange={e => setBackDesign(e.target.value)} placeholder="E.g. Full back print" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Upload Design (Optional)</label>
            <input type="file" className={styles.input} style={{ padding: '8px' }} accept=".png,.jpg,.jpeg,.pdf,.svg" />
            <span style={{ fontSize: '0.7rem', color: 'var(--muted-grey)', marginTop: '4px', display: 'block' }}>Supported formats: PNG, JPG, PDF, SVG</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={styles.formGroup}>
              <label className={styles.label}>Organization / Brand Name</label>
              <input type="text" className={styles.input} value={orgName} onChange={e => setOrgName(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Contact Person</label>
              <input type="text" className={styles.input} value={contactPerson} onChange={e => setContactPerson(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address *</label>
              <input type="email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number *</label>
              <input type="tel" className={styles.input} value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Organization Type</label>
              <select className={styles.input} value={orgType} onChange={e => setOrgType(e.target.value)}>
                <option value="">Select...</option>
                <option value="Clothing Brand">Clothing Brand</option>
                <option value="College / University">College / University</option>
                <option value="Corporate">Corporate</option>
                <option value="Sports Team">Sports Team</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Required Delivery Date</label>
              <input type="date" className={styles.input} value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className={`${styles.formGroup} md:col-span-2`}>
              <label className={styles.label}>Delivery City / Location</label>
              <input type="text" className={styles.input} value={city} onChange={e => setCity(e.target.value)} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Sticky Summary */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <div className={styles.summarySidebar}>
          <h3 className={styles.sectionTitle} style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Bulk Order Summary</h3>
          
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Product</span>
            <span className={styles.summaryValue}>{product.name}</span>
          </div>
          
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Quantity</span>
            <span className={styles.summaryValue} style={{ color: isQtyValid ? 'var(--text-bone)' : 'var(--accent-red)' }}>
              {parsedQty || 0} pieces
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>GSM</span>
            <span className={styles.summaryValue}>{gsm ? `${gsm} GSM` : '-'}</span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Colors</span>
            <span className={styles.summaryValue}>
              {selectedColors.length > 0 ? selectedColors.map(c => c.name).join(', ') : '-'}
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Sizes</span>
            <span className={styles.summaryValue} style={{ color: isSizesValid || !parsedQty ? 'var(--text-bone)' : 'var(--accent-red)' }}>
              {totalSizesAssigned} allocated
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Customization</span>
            <span className={styles.summaryValue}>{customization || '-'}</span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Delivery By</span>
            <span className={styles.summaryValue}>{deliveryDate || '-'}</span>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted-grey)', marginBottom: '16px' }}>Pricing will be shared upon review.</span>
            <button 
              className="btn-red w-full" 
              onClick={handleSubmit}
              disabled={!isQtyValid || !isSizesValid || !gsm || !customization || !email || !phone}
              style={{ opacity: (!isQtyValid || !isSizesValid || !gsm || !customization || !email || !phone) ? 0.5 : 1 }}
            >
              Request Bulk Quote
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
