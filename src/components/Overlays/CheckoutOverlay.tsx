import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle, Truck, CreditCard, QrCode } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { db } from '../../firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import styles from './Overlays.module.css';

interface CoFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  activeField: string | null;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
}

const CoField: React.FC<CoFieldProps> = ({ id, label, type = 'text', value, activeField, onChange, onFocus, onBlur, placeholder }) => (
  <div className={`${styles.coField} ${activeField === id ? styles.coFieldActive : ''} ${value ? styles.coFieldFilled : ''}`}>
    <label className={styles.coFieldLabel} htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      className={styles.coFieldInput}
      value={value}
      placeholder={placeholder || ''}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete="off"
    />
    <div className={styles.coFieldUnderline} />
  </div>
);

export const CheckoutOverlay: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, cartSubtotal, clearCart, triggerToast } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [phone, setPhone]   = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'qr'>('cod');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv]       = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    if (isCheckoutOpen) {
      const u = localStorage.getItem('banzook_user');
      if (u) { const p = JSON.parse(u); setName(p.name||''); setEmail(p.email||''); setPhone(p.phone||''); setAddress(p.address||''); }
      setOrderSuccess(null); setStep(1);
    }
  }, [isCheckoutOpen]);

  useEffect(() => {
    document.body.style.overflow = isCheckoutOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCheckoutOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsCheckoutOpen(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [setIsCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const orderTotal = cartSubtotal + 100;
  const heroProduct = cartItems[0]?.product;

  const advance = () => {
    if (step === 1) {
      if (!name || !email || !phone || !address) { triggerToast('PLEASE FILL IN ALL SHIPPING FIELDS ⚠'); return; }
      setStep(2);
    } else if (step === 2) {
      if (paymentMethod === 'card' && (!cardNumber || !expiry || !cvv)) { triggerToast('PLEASE FILL IN CARD DETAILS ⚠'); return; }
      if (paymentMethod === 'qr' && !transactionId) { triggerToast('PLEASE ENTER TRANSACTION ID ⚠'); return; }
      setStep(3);
    }
  };

  const placeOrder = async () => {
    setIsOrdering(true);
    let userId = 'anonymous';
    try {
      const saved = localStorage.getItem('banzook_user');
      if (saved) {
        const p = JSON.parse(saved);
        userId = p.uid || 'anonymous';
        if (p.uid) {
          const updatedUser = { ...p, name: name.toUpperCase(), email, phone, address };
          localStorage.setItem('banzook_user', JSON.stringify(updatedUser));
          setDoc(doc(db, 'users', p.uid), { name: name.toUpperCase(), email, phone, address }, { merge: true }).catch(() => {});
        }
      }
    } catch {}

    const payload = {
      userId,
      name: name.toUpperCase(), email, phone, address,
      items: cartItems.map(i => ({ productId: i.product.id, name: i.product.name, size: i.size, quantity: i.quantity, price: i.product.price })),
      total: orderTotal, paymentMethod: paymentMethod.toUpperCase(),
      transactionId: paymentMethod === 'qr' ? transactionId : null,
      date: new Date().toISOString(), status: 'in-transit'
    };
    try {
      const ref = await addDoc(collection(db, 'orders'), payload);
      setOrderSuccess(ref.id); clearCart();
    } catch (err: any) {
      console.error("Order save error:", err);
      alert("Failed to save order to Firebase: " + (err.message || 'Check Firestore rules'));
    } finally { setIsOrdering(false); }
  };

  const STEPS = ['SHIPPING', 'PAYMENT', 'CONFIRM'];



  return (
    <div className={styles.coScreen}>
      {/* ── ORDER CONFIRMED FULL-SCREEN ─────────────────────────────────── */}
      {orderSuccess && (
        <div className={styles.coConfirmedScreen}>
          <div className={styles.coConfirmedLeft}>
            {heroProduct && (
              <div className={styles.coConfirmedImg}>
                <img src={heroProduct.images[0]} alt={heroProduct.name} />
              </div>
            )}
          </div>
          <div className={styles.coConfirmedRight}>
            <div className={styles.coConfirmedEyebrow}>
              <CheckCircle size={20} style={{ color: '#FF4D00' }} />
              <span>ORDER CONFIRMED</span>
            </div>
            <h1 className={styles.coConfirmedTitle}>
              ORDER<br />
              <span className={styles.coOrange}>CONFIRMED.</span>
            </h1>
            <p className={styles.coConfirmedSub}>WELCOME TO THE ARCHIVE.</p>

            <div className={styles.coConfirmedMeta}>
              {[
                { k: 'ORDER NUMBER', v: orderSuccess },
                { k: 'STATUS', v: 'IN TRANSIT' },
                { k: 'ESTIMATED DELIVERY', v: '5 – 7 BUSINESS DAYS' },
                { k: 'SHIPPING TO', v: address },
              ].map(r => (
                <div key={r.k} className={styles.coMetaRow}>
                  <span className={styles.coMetaKey}>{r.k}</span>
                  <span className={styles.coMetaVal}>{r.v}</span>
                </div>
              ))}
            </div>

            <button className={styles.coPrimaryAction} onClick={() => setIsCheckoutOpen(false)}>
              <span>CONTINUE EXPLORING</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── ACTIVE CHECKOUT ─────────────────────────────────────────────── */}
      {!orderSuccess && (
        <div className={styles.coLayout}>

          {/* LEFT — Campaign Image Column */}
          <div className={styles.coImageCol}>
            {heroProduct ? (
              <div className={styles.coImageFrame}>
                <img src={heroProduct.images[0]} alt={heroProduct.name} className={styles.coHeroImg} />
                <div className={styles.coImageOverlay}>
                  <div className={styles.coImageMeta}>
                    <span className={styles.coImageTag}>DROP 001</span>
                    <span className={styles.coImageTag}>BANZOOK ARCHIVE</span>
                  </div>
                  <div className={styles.coImageProduct}>
                    <div className={styles.coImageProductName}>{heroProduct.name}</div>
                    {cartItems[0] && (
                      <div className={styles.coImageProductMeta}>
                        SIZE {cartItems[0].size} / QTY {String(cartItems[0].quantity).padStart(2,'0')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.coImagePlaceholder}>
                <span>YOUR ORDER</span>
              </div>
            )}

            {/* Order manifest below image */}
            <div className={styles.coManifest}>
              <div className={styles.coManifestHeader}>
                <span className={styles.coManifestTitle}>ORDER MANIFEST</span>
                <span className={styles.coManifestCount}>{cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'}</span>
              </div>
              {cartItems.map((item, i) => (
                <div key={i} className={styles.coManifestItem}>
                  <div className={styles.coManifestItemLeft}>
                    <div className={styles.coManifestImgWrap}>
                      <img src={item.product.images[0]} alt={item.product.name} />
                    </div>
                    <div>
                      <div className={styles.coManifestItemName}>{item.product.name}</div>
                      <div className={styles.coManifestItemMeta}>SIZE {item.size} / QTY {String(item.quantity).padStart(2,'0')}</div>
                    </div>
                  </div>
                  <div className={styles.coManifestItemPrice}>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              ))}
              <div className={styles.coManifestTotal}>
                <span className={styles.coManifestTotalLabel}>TOTAL</span>
                <span className={styles.coManifestTotalAmt}>₹{orderTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Form Column */}
          <div className={styles.coFormCol}>

            {/* Header */}
            <div className={styles.coHeader}>
              <div className={styles.coHeaderLeft}>
                <span className={styles.coHeaderBrand}>CHECKOUT</span>
                <span className={styles.coHeaderFrac}>0{step} / 03</span>
              </div>
              <button className={styles.coCloseBtn} onClick={() => setIsCheckoutOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Step progress */}
            <div className={styles.coStepRail}>
              {STEPS.map((s, i) => (
                <div key={i} className={`${styles.coStepRailItem} ${step === i+1 ? styles.coStepActive : ''} ${step > i+1 ? styles.coStepDone : ''}`}>
                  <span className={styles.coStepNum}>0{i+1}</span>
                  <span className={styles.coStepLabel}>{s}</span>
                </div>
              ))}
            </div>

            {/* Form body */}
            <div className={styles.coFormBody}>

              {/* STEP 1 — SHIPPING */}
              {step === 1 && (
                <div className={styles.coFormStep}>
                  <div className={styles.coFormStepTitle}>
                    <span className={styles.coFormStepNum}>01</span>
                    <span className={styles.coFormStepName}>SHIPPING COORDINATES</span>
                  </div>
                  <div className={styles.coFieldSet}>
                    <CoField id="co-name"  label="FULL NAME"       value={name}    activeField={activeField} onChange={setName}    onFocus={() => setActiveField('co-name')} onBlur={() => setActiveField(null)} />
                    <CoField id="co-email" label="EMAIL ADDRESS"   type="email" value={email}   activeField={activeField} onChange={setEmail}   onFocus={() => setActiveField('co-email')} onBlur={() => setActiveField(null)} />
                    <CoField id="co-phone" label="PHONE NUMBER"    value={phone}   activeField={activeField} onChange={setPhone}   onFocus={() => setActiveField('co-phone')} onBlur={() => setActiveField(null)} placeholder="+91 XXXXX XXXXX" />
                    <div className={`${styles.coField} ${activeField === 'co-addr' ? styles.coFieldActive : ''} ${address ? styles.coFieldFilled : ''}`}>
                      <label className={styles.coFieldLabel} htmlFor="co-addr">SHIPPING ADDRESS</label>
                      <textarea id="co-addr" className={`${styles.coFieldInput} ${styles.coFieldTextarea}`} value={address} rows={2} placeholder="BUILDING, STREET, AREA, CITY, PIN" onChange={e => setAddress(e.target.value)} onFocus={() => setActiveField('co-addr')} onBlur={() => setActiveField(null)} />
                      <div className={styles.coFieldUnderline} />
                    </div>
                  </div>
                  <button className={styles.coPrimaryAction} onClick={advance}>
                    <span>CONTINUE TO PAYMENT</span> <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {/* STEP 2 — PAYMENT */}
              {step === 2 && (
                <div className={styles.coFormStep}>
                  <div className={styles.coFormStepTitle}>
                    <span className={styles.coFormStepNum}>02</span>
                    <span className={styles.coFormStepName}>PAYMENT METHOD</span>
                  </div>
                  <div className={styles.coPayGrid}>
                    <button type="button" className={`${styles.coPayCard} ${paymentMethod==='cod' ? styles.coPayCardActive : ''}`} onClick={() => setPaymentMethod('cod')}>
                      <Truck size={22} />
                      <div className={styles.coPayCardText}>
                        <div className={styles.coPayCardTitle}>CASH ON DELIVERY</div>
                        <div className={styles.coPayCardSub}>PAY WHEN YOU RECEIVE</div>
                      </div>
                      <div className={`${styles.coPayDot} ${paymentMethod==='cod' ? styles.coPayDotActive : ''}`} />
                    </button>
                    <button type="button" className={`${styles.coPayCard} ${paymentMethod==='card' ? styles.coPayCardActive : ''}`} onClick={() => setPaymentMethod('card')}>
                      <CreditCard size={22} />
                      <div className={styles.coPayCardText}>
                        <div className={styles.coPayCardTitle}>CARD / ONLINE</div>
                        <div className={styles.coPayCardSub}>VISA, MASTERCARD, UPI</div>
                      </div>
                      <div className={`${styles.coPayDot} ${paymentMethod==='card' ? styles.coPayDotActive : ''}`} />
                    </button>
                    <button type="button" className={`${styles.coPayCard} ${paymentMethod==='qr' ? styles.coPayCardActive : ''}`} onClick={() => setPaymentMethod('qr')}>
                      <QrCode size={22} />
                      <div className={styles.coPayCardText}>
                        <div className={styles.coPayCardTitle}>QR / UPI</div>
                        <div className={styles.coPayCardSub}>SCAN & PAY DIRECTLY</div>
                      </div>
                      <div className={`${styles.coPayDot} ${paymentMethod==='qr' ? styles.coPayDotActive : ''}`} />
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className={styles.coFieldSet} style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.5rem' }}>
                      <CoField id="co-cardnum" label="CARD NUMBER" value={cardNumber} activeField={activeField} onChange={setCardNumber} onFocus={() => setActiveField('co-cardnum')} onBlur={() => setActiveField(null)} placeholder="0000 0000 0000 0000" />
                      <div className={styles.coFieldRow}>
                        <CoField id="co-exp" label="EXPIRY DATE" value={expiry} activeField={activeField} onChange={setExpiry} onFocus={() => setActiveField('co-exp')} onBlur={() => setActiveField(null)} placeholder="MM / YY" />
                        <CoField id="co-cvv" label="CVV" type="password" value={cvv} activeField={activeField} onChange={setCvv} onFocus={() => setActiveField('co-cvv')} onBlur={() => setActiveField(null)} placeholder="• • •" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'qr' && (
                    <div className={styles.coFieldSet} style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <img src="/qr.jpeg" alt="Scan to Pay" style={{ width: '200px', height: '200px', objectFit: 'contain', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }} />
                        <div style={{ fontSize: '0.875rem', fontWeight: 500, marginTop: '0.5rem', letterSpacing: '0.05em' }}>SCAN WITH ANY UPI APP</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)', marginTop: '0.25rem' }}>TOTAL: ₹{orderTotal.toLocaleString('en-IN')}</div>
                      </div>
                      <div style={{ width: '100%' }}>
                        <CoField id="co-txnid" label="TRANSACTION ID (REQUIRED)" value={transactionId} activeField={activeField} onChange={setTransactionId} onFocus={() => setActiveField('co-txnid')} onBlur={() => setActiveField(null)} placeholder="ENTER 12-DIGIT UPI REF / TXN ID" />
                      </div>
                    </div>
                  )}

                  <div className={styles.coNavRow}>
                    <button className={styles.coBackLink} onClick={() => setStep(1)}>← BACK</button>
                    <button className={styles.coPrimaryAction} onClick={advance}>
                      <span>REVIEW ORDER</span> <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 — CONFIRM */}
              {step === 3 && (
                <div className={styles.coFormStep}>
                  <div className={styles.coFormStepTitle}>
                    <span className={styles.coFormStepNum}>03</span>
                    <span className={styles.coFormStepName}>CONFIRM ORDER</span>
                  </div>

                  <div className={styles.coReviewBlock}>
                    {[
                      { k: 'SHIPPING TO', v: name, sub: address },
                      { k: 'CONTACT', v: email, sub: phone },
                      { k: 'PAYMENT', v: paymentMethod === 'cod' ? 'CASH ON DELIVERY' : paymentMethod === 'qr' ? `QR / UPI (TXN: ${transactionId})` : 'CARD PAYMENT' },
                    ].map(row => (
                      <div key={row.k} className={styles.coReviewRow}>
                        <span className={styles.coReviewKey}>{row.k}</span>
                        <div className={styles.coReviewVals}>
                          <span className={styles.coReviewVal}>{row.v}</span>
                          {row.sub && <span className={styles.coReviewSub}>{row.sub}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final total CTA */}
                  <div className={styles.coFinalBlock}>
                    <div className={styles.coFinalTotal}>
                      <div className={styles.coFinalTotalLabel}>ORDER TOTAL</div>
                      <div className={styles.coFinalTotalAmt}>₹{orderTotal.toLocaleString('en-IN')}</div>
                      <div className={styles.coFinalBreakdown}>SUBTOTAL ₹{cartSubtotal.toLocaleString('en-IN')} · SHIPPING ₹100</div>
                    </div>
                    <button
                      className={`${styles.coPrimaryAction} ${styles.coFinalAction}`}
                      onClick={placeOrder}
                      disabled={isOrdering}
                    >
                      <span>{isOrdering ? 'PLACING ORDER...' : 'PLACE ORDER'}</span>
                      {!isOrdering && <ArrowRight size={16} />}
                    </button>
                  </div>

                  <button className={styles.coBackLink} style={{ marginTop: '1rem' }} onClick={() => setStep(2)}>← BACK TO PAYMENT</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
